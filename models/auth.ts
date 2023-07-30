import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
