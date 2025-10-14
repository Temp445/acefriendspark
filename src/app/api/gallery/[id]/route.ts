import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return NextResponse.json({ success: false, message: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: gallery }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return NextResponse.json({ success: false, message: "Gallery not found" }, { status: 404 });
    }

    if (name) gallery.name = name;
    if (category) gallery.category = category;

    const imageFiles = formData.getAll("image");
    if (imageFiles.length > 0) {
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
      gallery.image = imageUrls[0]; 
    }

    await gallery.save();
    return NextResponse.json({ success: true, data: gallery }, { status: 200 });
  } catch (err: any) {
    console.error("PUT Gallery Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return NextResponse.json({ success: false, message: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Gallery deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE Gallery Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}