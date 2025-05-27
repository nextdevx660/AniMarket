import { db } from "@/configs/db";
import { orderTable, productTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
          const user = await currentUser()

          try {
                    const result = await db.select().from(orderTable)
                              .innerJoin(productTable, eq(orderTable.productId, productTable.id))
                              .innerJoin(usersTable, eq(usersTable.email, productTable.createdBy))
                              .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))

                    return NextResponse.json(result)

          } catch (error) {
                    return NextResponse.json(error)
          }
}