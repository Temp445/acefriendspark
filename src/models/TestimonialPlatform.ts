import mongoose, { model, models } from 'mongoose';


const PlatformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true},
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    logo: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const TestimonialPlatform =  models.Platform || model('Platform', PlatformSchema);

export default TestimonialPlatform
