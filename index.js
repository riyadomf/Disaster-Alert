// require("dotenv").config();
// const axios = require("axios");

// const API_KEY = process.env.API_KEY;

// //
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const sender_number = process.env.SENDER_NUMBER;

// console.log(authToken);

// const twilio = require("twilio");
// const client = new twilio(accountSid, authToken);
// //

// const sendNotification = (msg) => {
//   client.messages
//     .create({
//       body: msg,
//       to: "+8801820079909",
//       from: sender_number,
//     })
//     .then((message) => console.log(message.sid))
//     .done();
// };

// const forecast = (latitude, longitude) => {
//   var url =
//     `http://api.openweathermap.org/data/2.5/weather?` +
//     `lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//   axios.get(url).then(function (res) {
//     msg = `It's currently ${res.data.main.temp} but it feels like ${res.data.main.feels_like}`;
//     // sendNotification(msg);
//     console.log(msg);
//   });
// };

// var latitude = 24.8949; // Indore latitude
// var longitude = 91.8687; // Indore longitude

// // Function call
// forecast(latitude, longitude);
