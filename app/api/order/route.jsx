import { db } from "@/configs/db";
import { cartTable, orderTable, usersTable, productTable } from "@/configs/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from 'resend';
import EmailOrder from "@/emails/email";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";


const resend = new Resend(process.env.RESEND_API_KEY);;

export async function POST(req) {
          try {
                    const body = await req.json();
                    const { orderDetail, email } = body;

                    // Validate input
                    if (!Array.isArray(orderDetail) || !email) {
                              return NextResponse.json({ error: "Invalid input" }, { status: 400 });
                    }

                    // Optional: Check if user exists (to avoid foreign key error)
                    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
                    if (!user) {
                              return NextResponse.json({ error: "User not found" }, { status: 404 });
                    }

                    // Prepare order insert data
                    const orderList = orderDetail.map((order) => ({
                              id: randomUUID(),
                              email,
                              productId: order.productId,
                    }));

                    // Insert orders
                    const insertResult = await db.insert(orderTable).values(orderList);

                    // Delete cart items for this user
                    const deleteResult = await db.delete(cartTable).where(eq(cartTable.email, email));

                    const sentEmailResult = await sendEmsil(orderDetail, email);

                    return NextResponse.json({
                              success: true,
                              message: "Order placed and cart cleared",
                              inserted: insertResult,
                              deleted: deleteResult,
                    });
          } catch (err) {
                    console.error("API /api/order error:", err);
                    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
          }
}



const sendEmsil = async (orderDetail, userEmail) => {
          const totalAmount = orderDetail.reduce((sum, item) => {
                    return sum + (item.price * (item.quantity || 1)); // default quantity = 1
          }, 0);

          const result = await resend.emails.send({
                    from: 'AniMarket@resend.dev',
                    to: userEmail,
                    subject: 'Order Receipt',
                    react: <EmailOrder orderDetail={orderDetail} totalAmount={totalAmount} />
          });

          return result;
};



export async function GET(req) {
          const user = await currentUser();

          if (!user) {
                    return new NextResponse("Unauthorized", { status: 401 });
          }

          console.log("Current user email:", user.primaryEmailAddress.emailAddress);

          try {
                    const result = await db
                              .select({
                                        ...getTableColumns(productTable),
                              })
                              .from(orderTable)
                              .leftJoin(productTable, eq(productTable.id, orderTable.productId))
                              .where(eq(orderTable.email, user.primaryEmailAddress.emailAddress))
                              .orderBy(desc(orderTable.id));

                    console.log("Result:", result);

                    return NextResponse.json(result);
          } catch (error) {
                    console.error("DB error:", error);
                    return new NextResponse("Internal Server Error", { status: 500 });
          }
}
