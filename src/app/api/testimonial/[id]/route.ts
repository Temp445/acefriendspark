import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial }, { status: 200 });
  } catch (err: any) {
    console.error("GET Testimonial Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const formData = await req.formData();

    const platform = formData.get("platform") as string;
    const username = formData.get("username") as string;
    const review = formData.get("review") as string;
    const rating = formData.get("rating") ? Number(formData.get("rating")) : null;
    const date = formData.get("date") as string;
    
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (platform) testimonial.platform = platform;
    if (username) testimonial.username = username;
    if (review) testimonial.review = review;
    if (rating !== null) testimonial.rating = rating;
    if (date) testimonial.date = date;

    const imageFile = formData.get("image");
    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
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
      testimonial.image = upload.secure_url;
    }

    await testimonial.save();
    return NextResponse.json({ success: true, data: testimonial }, { status: 200 });
  } catch (err: any) {
    console.error("PUT Testimonial Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE Testimonial Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
