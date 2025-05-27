import { db } from "@/configs/db";
import { cartTable, productTable } from "@/configs/schema";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { eq, getTableColumns } from "drizzle-orm";

export async function POST(req) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json({ error: "Missing email or productId" }, { status: 400 });
    }

    const result = await db.insert(cartTable).values({
      id: randomUUID(),       // Generate UUID for primary key
      email: email,
      productId: productId
    }).returning();

    return NextResponse.json({ message: "Product added to cart", data: result });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const result = await db
      .select({
        ...getTableColumns(productTable),
        ...getTableColumns(cartTable)
      })
      .from(cartTable)
      .innerJoin(productTable, eq(cartTable.productId, productTable.id))
      .where(eq(cartTable.email, email));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get('recordId');

  const result = await db.delete(cartTable).where(eq(cartTable.id, recordId)).returning();
  if (result.length > 0) {
    return NextResponse.json({ message: "Product removed from cart", data: result });
  }

}