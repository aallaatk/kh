import mongoose from 'mongoose';


const candidateProfileSchema = new mongoose.Schema({
  resume: { type: String }, // URL or file reference
  skills: [String],
  experience: { type: String },
  // Add more candidate-specific fields as needed
}, { _id: false });

const recruiterProfileSchema = new mongoose.Schema({
  company: { type: String },
  companyWebsite: { type: String },
  // Add more recruiter-specific fields as needed
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String,  },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Candidate', 'Recruiter', 'Admin'], default: 'Candidate', index: true },
  candidateProfile: { type: candidateProfileSchema },
  recruiterProfile: { type: recruiterProfileSchema },
  // For future extensibility, you can add an array of permissions or other fields
}, { timestamps: true });

export default mongoose.model('User', userSchema);
