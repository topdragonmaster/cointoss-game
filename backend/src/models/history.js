import mongoose from "mongoose";

const Schema = mongoose.Schema;

const resultEnum = ['Head', 'Tail'];

const historySchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  wager: { type: Number, required: true },
  finalPayout: { type: Number, required: true },
  isWin: { type: Boolean, required: true },
  tossResult: { type: String, enum: resultEnum, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("History", historySchema);