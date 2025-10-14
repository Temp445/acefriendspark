import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import TestimonialPlatform from "@/models/TestimonialPlatform";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Mongoose();
    const platforms = await TestimonialPlatform.find();
    return NextResponse.json({ success: true, data: platforms }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch platforms" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await Mongoose();
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const reviews = parseInt(formData.get("reviews") as string);
    const link = formData.get("link") as string;

    if (!name || !rating || !reviews || !link) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    let logoUrl = "";
    const logoFile = formData.get("logo");
    if (logoFile instanceof File) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const upload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "testimonials" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      logoUrl = upload.secure_url;
    }

    const newPlatform = new TestimonialPlatform({
      name,
      rating,
      reviews,
      logo: logoUrl,
      link,
    });

    await newPlatform.save();

    return NextResponse.json({ success: true, data: newPlatform }, { status: 201 });
  } catch (err: any) {
    console.error("Testimonial Platform Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save platform" },
      { status: 500 }
    );
  }
}
