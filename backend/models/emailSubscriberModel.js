import mongoose from "mongoose";

const emailSubscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmailSubscriber = mongoose.model(
  "EmailSubscriber",
  emailSubscriberSchema
);

export default EmailSubscriber;
