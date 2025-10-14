import mongoose, { models, model } from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
      image: {
      type: String,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema);

export default Testimonial;
