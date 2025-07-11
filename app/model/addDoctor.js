import mongoose from 'mongoose';
const addDoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hospital: { type: String },
    speciality: { type: String, required: true },
    location: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    relationship: {
      type: String,
      enum: ['strong', 'moderate', 'new'],
      default: 'new',
    },
    email: { type: String },
    contact: { type: String },
    totalValue: { type: Number },
    
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model('Doctor', addDoctorSchema);
