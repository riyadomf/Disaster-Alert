import express from "express";
import {
  getEmailSubscribers,
  getEmailSubscriptionStatus,
  getPhoneSubscribers,
  getPhoneSubscriptionStatus,
  subscribeByEmail,
  subscribeByPhone,
  unsubscribeByEmail,
  unsubscribeByPhone,
} from "../controllers/alertController.js";

const router = express.Router();

router.route("/subscribeByPhone").post(subscribeByPhone);
router.route("/subscribeByEmail").post(subscribeByEmail);

router.route("/unsubscribeByPhone").post(unsubscribeByPhone);
router.route("/unsubscribeByEmail").post(unsubscribeByEmail);

router.route("/phone-subscribers").get(getPhoneSubscribers);
router.route("/email-subscribers").get(getEmailSubscribers);

router.route("/phone-subscription-status").post(getPhoneSubscriptionStatus);
router.route("/email-subscription-status").post(getEmailSubscriptionStatus);

export default router;
