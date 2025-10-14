import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Attraction from "@/models/Attraction";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await Mongoose();
    const attractions = await Attraction.find();
    return NextResponse.json({ success: true, data: attractions }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await Mongoose();
    const formData = await req.formData();

    const placeName = formData.get("placeName") as string;
    const distance = formData.get("distance") as string;
    const travelingTime = formData.get("travelingTime") as string;
    const description = formData.get("description") as string;
    const keyPoints = formData.getAll("keyPoints") as string[];

    if (!placeName || !distance || !travelingTime || !description) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
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
            { folder: "attractions" },
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

    const attraction = new Attraction({
      image: imageUrls[0],
      placeName,
      distance,
      travelingTime,
      description,
      keyPoints,
    });

    await attraction.save();

    return NextResponse.json({ success: true, data: attraction }, { status: 201 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save attraction" },
      { status: 500 }
    );
  }
}
