import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  authorId: mongoose.Schema.Types.ObjectId;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IPost>('Post', PostSchema);
