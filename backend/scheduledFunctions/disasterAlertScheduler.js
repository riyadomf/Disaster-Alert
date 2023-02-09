import CronJob from "node-cron";
import dotenv from "dotenv";
import axios from "axios";
import { sendPhoneMessage, sendEmail } from "../notifySubscribers.js";

dotenv.config();

// "0 */12 * * *"  : executes every 12 hour from 00:00:00
const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("0 */12 * * *", () => {
    console.log("I'm executed on a schedule!");

    const getAllPhoneSubscribers = async () => {
      const phoneSubscribers = await axios.get(
        `http://127.0.0.1:${process.env.PORT}/api/alerts/phone-subscribers`
      );
    };

    const getAllEmailSubscribers = async () => {
      const emailSubscribers = await axios.get(
        `http://127.0.0.1:${process.env.PORT}/api/alerts/email-subscribers`
      );
    };

    getAllPhoneSubscribers();
    getAllEmailSubscribers();

    phoneSubscribers.map((phoneSub) => {
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/alerts",
        params: { lat: phoneSub.latitude, lon: phoneSub.longitude },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_ALERT_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_ALERT_HOST,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.data.alerts.length != 0) {
            // send Phone msg
            sendPhoneMessage({
              alerts: response.data.alerts,
              phone: phoneSub.phone,
            });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    });

    emailSubscribers.map((emailSub) => {
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/alerts",
        params: { lat: phoneSub.latitude, lon: phoneSub.longitude },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_ALERT_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_ALERT_HOST,
        },
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.data.alerts.length != 0) {
            // send email
            sendEmail({
              alerts: response.data.alerts,
              email: emailSub.email,
            });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });

  scheduledJobFunction.start();
};
export default initScheduledJobs;
