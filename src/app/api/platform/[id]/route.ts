import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Platform from "@/models/TestimonialPlatform";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const platform = await Platform.findById(id);
    if (!platform) {
      return NextResponse.json({ success: false, message: "Platform not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: platform }, { status: 200 });
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
    const rating = formData.get("rating") ? Number(formData.get("rating")) : undefined;
    const reviews = formData.get("reviews") ? Number(formData.get("reviews")) : undefined;
    const link = formData.get("link") as string;

    const platform = await Platform.findById(id);
    if (!platform) {
      return NextResponse.json({ success: false, message: "Platform not found" }, { status: 404 });
    }

    if (name) platform.name = name;
    if (rating !== undefined) platform.rating = rating;
    if (reviews !== undefined) platform.reviews = reviews;
    if (link) platform.link = link;

    const logoFile = formData.get("logo");
    if (logoFile && logoFile instanceof File) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const upload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "platforms" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      platform.logo = upload.secure_url;
    }

    await platform.save();
    return NextResponse.json({ success: true, data: platform }, { status: 200 });
  } catch (err: any) {
    console.error("PUT Platform Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const platform = await Platform.findByIdAndDelete(id);
    if (!platform) {
      return NextResponse.json({ success: false, message: "Platform not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Platform deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE Platform Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}