import mongoose, { model, models } from "mongoose";

const AttractionSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: String,
      required: true,
    },
    travelingTime: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    keyPoints: {
      type: [String], 
    },
  },
  { timestamps: true } 
);

const Attraction = models.Attraction || model("Attraction", AttractionSchema);

export default Attraction