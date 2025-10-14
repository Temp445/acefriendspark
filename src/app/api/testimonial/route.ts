import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Mongoose();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (err: any) {
    console.error("Testimonial Fetch Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await Mongoose();
    const formData = await req.formData();

    const platform = formData.get("platform") as string;
    const username = formData.get("username") as string;
    const review = formData.get("review") as string;
    const rating = Number(formData.get("rating"));
    const date = formData.get("date") as string;
    const imageFile = formData.get("image") as File | null;

    if (!platform || !username || !review || !rating || !date) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    let imageUrl = "";
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
      imageUrl = upload.secure_url;
    }

    const newTestimonial = new Testimonial({
      platform,
      username,
      review,
      rating,
      date,
      image: imageUrl,
    });

    await newTestimonial.save();

    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch (err: any) {
    console.error("Testimonial Upload Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save testimonial" },
      { status: 500 }
    );
  }
}
