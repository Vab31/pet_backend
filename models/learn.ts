import mongoose, { Schema, Document } from 'mongoose';

interface ILearn extends Document {
  title: string;
  url: string;
  price: string;
}

const learnSchema: Schema = new Schema({
  title: String,
  url: String,
  price: String,
});

const Learn = mongoose.model<ILearn>('Learn', learnSchema);

export default Learn;
