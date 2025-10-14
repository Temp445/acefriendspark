import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Mongoose();
    const galleries = await Gallery.find();
    return NextResponse.json({ success: true, data: galleries }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await Mongoose();
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required" },
        { status: 400 }
      );
    }

    const imageFiles = formData.getAll("image");
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "gallery" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        imageUrls.push(upload.secure_url);
      }
    }

    const galleryItem = new Gallery({
      name,
      category,
      image: imageUrls[0], 
    });

    await galleryItem.save();

    return NextResponse.json({ success: true, data: galleryItem }, { status: 201 });
  } catch (err: any) {
    console.error("Gallery Upload Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save gallery" },
      { status: 500 }
    );
  }
}
