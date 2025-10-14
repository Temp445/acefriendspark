import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Attraction from "@/models/Attraction";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;

    const attraction = await Attraction.findById(id);

    if (!attraction) {
      return NextResponse.json(
        { success: false, message: "Attraction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: attraction },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Get by ID error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch attraction" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;
    const formData = await req.formData();

    const placeName = formData.get("placeName") as string;
    const distance = formData.get("distance") as string;
    const travelingTime = formData.get("travelingTime") as string;
    const description = formData.get("description") as string;
    const keyPoints = formData.getAll("keyPoints") as string[];

    let imageUrl: string | null = null;
    const imageFiles = formData.getAll("image");

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
        imageUrl = upload.secure_url;
      }
    }

    const updateData: any = {
      placeName,
      distance,
      travelingTime,
      description,
      keyPoints,
    };

    if (imageUrl) updateData.image = imageUrl;

    const updatedAttraction = await Attraction.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAttraction) {
      return NextResponse.json(
        { success: false, message: "Attraction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedAttraction },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update attraction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await Mongoose();
    const { id } = await params;

    const deletedAttraction = await Attraction.findByIdAndDelete(id);

    if (!deletedAttraction) {
      return NextResponse.json(
        { success: false, message: "Attraction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Attraction deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete attraction" },
      { status: 500 }
    );
  }
}