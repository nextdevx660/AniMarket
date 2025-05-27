import { db } from "@/configs/db";
import { productTable, usersTable } from "@/configs/schema";
import { desc, eq, getTableColumns, asc, sql, and, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { limit, offset, searchText, sort } = await req.json();
    console.log("API Request Data:", { limit, offset, searchText, sort });

    // Build conditions
    let conditions = [];

    if (searchText && searchText.trim() !== "") {
      conditions.push(sql`LOWER(${productTable.title}) LIKE LOWER(${`%${searchText}%`})`);
    }

    const orderField = sort?.field || 'id';
    const orderDirection = sort?.order === 'asc' ? asc(productTable[orderField]) : desc(productTable[orderField]);

    const result = await db
      .select({
        ...getTableColumns(productTable),
        user: {
          name: usersTable.name,
          image: usersTable.image,
        },
      })
      .from(productTable)
      .innerJoin(usersTable, eq(productTable.createdBy, usersTable.email))
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(orderDirection)
      .limit(Number(limit) || 10)
      .offset(Number(offset) || 0);

    console.log("API Query Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
