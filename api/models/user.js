import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  walletId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
