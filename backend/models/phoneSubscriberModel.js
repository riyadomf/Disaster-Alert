import mongoose from "mongoose";

const phoneSubscriberSchema = mongoose.Schema(
  {
    phone: {
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

const PhoneSubscriber = mongoose.model(
  "PhoneSubscriber",
  phoneSubscriberSchema
);

export default PhoneSubscriber;
