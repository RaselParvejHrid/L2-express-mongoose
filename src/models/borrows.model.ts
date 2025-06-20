import { Schema, model } from "mongoose";

export interface IBorrow {
  book: Schema.Types.ObjectId; // References the _id of the Books model
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a positive integer",
      },
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
