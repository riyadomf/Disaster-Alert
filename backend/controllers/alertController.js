import asyncHandler from "express-async-handler";
import PhoneSubscriber from "../models/phoneSubscriberModel.js";
import EmailSubscriber from "../models/emailSubscriberModel.js";

// @desc    subscribe user by phone
// @route   POST /api/alerts/subscribeByPhone
// @access  Public
const subscribeByPhone = asyncHandler(async (req, res) => {
  const { phone, latitude, longitude } = req.body;

  const subscriberExists = await PhoneSubscriber.findOne({ phone });

  if (subscriberExists) {
    res.status(400);
    throw new Error("Phone Subscriber already exists");
  }

  const phoneSubscriber = await PhoneSubscriber.create({
    phone,
    latitude,
    longitude,
  });

  if (phoneSubscriber) {
    res.status(201).json({
      _id: phoneSubscriber._id,
      phone: phoneSubscriber.phone,
      latitude: phoneSubscriber.latitude,
      longitude: phoneSubscriber.longitude,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Subscriber data");
  }
});

// @desc    subscribe user by email
// @route   POST /api/alerts/subscribeByEmail
// @access  Public
const subscribeByEmail = asyncHandler(async (req, res) => {
  const { email, latitude, longitude } = req.body;

  const subscriberExists = await EmailSubscriber.findOne({ email });

  if (subscriberExists) {
    res.status(400);
    throw new Error("Email Subscriber already exists");
  }

  const emailSubscriber = await EmailSubscriber.create({
    email,
    latitude,
    longitude,
  });

  if (emailSubscriber) {
    res.status(201).json({
      _id: emailSubscriber._id,
      email: emailSubscriber.email,
      latitude: emailSubscriber.latitude,
      longitude: emailSubscriber.longitude,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Subscriber data");
  }
});

// @desc    unsubscribe user by phone
// @route   POST /api/alerts/unsubscribeByPhone
// @access  Public
const unsubscribeByPhone = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const phoneSubscriber = await PhoneSubscriber.findOne({ phone });

  if (phoneSubscriber) {
    await phoneSubscriber.deleteOne();
    res.json({ message: "Phone Subcriber removed" });
  } else {
    res.status(404);
    throw new Error("Phone Subscriber not found");
  }
});

// @desc    unsubscribe user by email
// @route   POST /api/alerts/unsubscribeByEmail
// @access  Public
const unsubscribeByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailSubscriber = await EmailSubscriber.findOne({ email });

  if (emailSubscriber) {
    await EmailSubscriber.deleteOne();
    res.json({ message: "Email Subcriber removed" });
  } else {
    res.status(404);
    throw new Error("Email Subscriber not found");
  }
});

// @desc    Get all phone subscribers
// @route   GET /api/alerts/phone-subscribers
// @access  public
const getPhoneSubscribers = asyncHandler(async (req, res) => {
  const phoneSubscribers = await PhoneSubscriber.find({});
  res.json(phoneSubscribers);
});

// @desc    Get all email subscribers
// @route   GET /api/alerts/email-subscribers
// @access  public
const getEmailSubscribers = asyncHandler(async (req, res) => {
  const emailSubscribers = await EmailSubscriber.find({});
  res.json(emailSubscribers);
});

// @desc    Post phone subscription status
// @route   POST /api/alerts/phone-subscription-status
// @access  public
const getPhoneSubscriptionStatus = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const phoneSubscriber = await PhoneSubscriber.findOne({ phone });
  if (phoneSubscriber) {
    res.json({
      subscriptionStatus: true,
    });
  } else {
    res.json({
      subscriptionStatus: false,
    });
  }
});

// @desc    Post email subscription status
// @route   POST /api/alerts/email-subscription-status
// @access  public
const getEmailSubscriptionStatus = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const emailSubscriber = await EmailSubscriber.findOne({ email });
  if (emailSubscriber) {
    res.json({
      subscriptionStatus: true,
    });
  } else {
    res.json({
      subscriptionStatus: false,
    });
  }
});

export {
  subscribeByPhone,
  subscribeByEmail,
  unsubscribeByPhone,
  unsubscribeByEmail,
  getPhoneSubscribers,
  getEmailSubscribers,
  getPhoneSubscriptionStatus,
  getEmailSubscriptionStatus,
};
