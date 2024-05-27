const axios = require("axios");

async function sendOtpOnPhone(to, message) {
  try {
    const requestData = {
      AppSid: process.env.APP_SID,
      Recipient: to, // Use the provided 'to' parameter as the recipient phone number
      Body: message,
      SenderID: process.env.SENDER_ID,
    };
console.log(requestData, 'requestData',process.env.UNIFONIC_API_BASE_URL)
    const response = await axios.post(
      process.env.UNIFONIC_API_BASE_URL,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: "OTP sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP", data: null };
  }
}

module.exports = {
  sendOtpOnPhone,
};