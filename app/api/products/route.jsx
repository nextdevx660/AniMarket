import { v2 as cloudinary } from "cloudinary";
import { db } from "@/configs/db";
import { orderTable, productTable, usersTable } from "@/configs/schema";
import { NextResponse } from "next/server";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import Products from "@/app/_mockData/Products";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary
async function uploadToCloudinary(file, folder) {
  if (!file) throw new Error("No file provided");
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });
}

// POST API - Upload Product
export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const file = formData.get("file");
    const rawData = formData.get("data");

    if (!image || !file || !rawData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = JSON.parse(rawData);
    const imageUrl = await uploadToCloudinary(image, "preview-images");
    const fileUrl = await uploadToCloudinary(file, "files");

    const result = await db
      .insert(productTable)
      .values({
        id: crypto.randomUUID(),
        title: data.title || "Untitled",
        price: parseInt(data.price, 10),
        description: data.description || "",
        about: data.about || "",
        category: data.category || "Uncategorized",
        imageUrl,
        fileUrl,
        message: data.message || "",
        createdBy: data.userEmail,
      })
      .returning();

    return NextResponse.json({ success: true, product: result[0] });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// GET API - Fetch Products
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  if (email) {
    const result = await db
      .select({
        ...getTableColumns(productTable),
        user: { name: usersTable.name, image: usersTable.image },
      })
      .from(productTable)
      .innerJoin(usersTable, eq(productTable.createdBy, usersTable.email))
      .where(eq(productTable.createdBy, email))
      .orderBy(desc(productTable.id));

    return NextResponse.json(result);
  }

  if (id) {
    const result = await db
      .select({
        ...getTableColumns(productTable),
        user: { name: usersTable.name, image: usersTable.image },
      })
      .from(productTable)
      .innerJoin(usersTable, eq(productTable.createdBy, usersTable.email))
      .where(eq(productTable.id, id))
      .orderBy(desc(productTable.id));

    return NextResponse.json(result[0]);
  }

  if (category) {
    const result = await db
      .select({
        ...getTableColumns(productTable),
        user: { name: usersTable.name, image: usersTable.image },
      })
      .from(productTable)
      .innerJoin(usersTable, eq(productTable.createdBy, usersTable.email))
      .where(eq(productTable.category, category))
      .orderBy(desc(productTable.id));

    return NextResponse.json(result);
  }

  // Default - All Products
  const result = await db
    .select({
      ...getTableColumns(productTable),
      user: { name: usersTable.name, image: usersTable.image },
    })
    .from(productTable)
    .innerJoin(usersTable, eq(productTable.createdBy, usersTable.email))
    .orderBy(desc(productTable.id));

  return NextResponse.json(result);
}




export async function DELETE(req) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  console.log("Full user object:", user);
  console.log("User email (used to delete):", userEmail);
  console.log("Product ID:", productId);

  if (!userEmail || !productId) {
    return NextResponse.json({ error: "Invalid user or productId" }, { status: 400 });
  }

  try {
    // Step 1: Delete related orders
    const deleteOrders = await db
      .delete(orderTable)
      .where(eq(orderTable.productId, productId));

    console.log("Deleted related orders:", deleteOrders);

    // Step 2: Delete the product (only if user owns it)
    const deleteProduct = await db
      .delete(productTable)
      .where(
        and(
          eq(productTable.id, productId),
          eq(productTable.createdBy, userEmail)
        )
      );

    console.log("Deleted product:", deleteProduct);

    return NextResponse.json({ success: true, message: "Product and related orders deleted successfully." });
  } catch (err) {
    console.error("DB DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
