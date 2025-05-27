import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🔎 Step 1: Get the data from the request
    const body = await req.json();
    const { user } = body;

    console.log("📥 API received user data:", user);

    if (!user) {
      return NextResponse.json({ error: "User data missing" }, { status: 400 });
    }

    // 🔎 Step 2: Check if user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    console.log("🔎 Existing user:", existingUser);

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0]);
    }

    // 🔎 Step 3: Insert new user
    const newUser = await db
      .insert(usersTable)
      .values({
        id: user.id, // Add user.id (optional)
        name: user.fullName || "",
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl || "",
        createdAt: new Date(), // Optional: for timestamps
      })
      .returning();

    console.log("✅ New user inserted:", newUser);
    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
