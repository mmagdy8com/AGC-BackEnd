const Gifts = require("../models/Gift");
const User = require("../models/User");
const Bitaqty = require("../models/Bitaqty");
const crypto = require("crypto");
const Binance = require("../models/Binance");
const BestSelling = require("../models/BestSelling");
const Collection = require("../models/Collection");
const Order = require("../models/Order");
const { default: axios } = require('axios');

const baseURL = 'https://arabgiftcard.com/elm/api';
const accessToken = '3jS7:4yl(*9KwEDqq';

exports.createSession = async (req, res) => {
const nationalId = req.body['National-ID']
console.log(nationalId, "aaaaaaaaaaaaaa")
    try {
    const response = await axios.post(`${baseURL}/create-session.php`, {}, {
      headers: {
        'Authorization': accessToken, // Set the Authorization header directly
        'National-ID': nationalId, // Set the National-ID header directly
        'Content-Type': 'application/json'
      }
    });
    console.log('Session created:', response.data);
    return res.status(200).json({
          data: response.data,
        });

  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }};

exports.getStatus = async (req, res) => {
const transId = req.headers['transid']
const nationalId = req.headers['national-id']
const random = req.headers['random']
console.log("id:", nationalId,"token:", accessToken, "transId:", transId, "random:", random)
    try {
      const response = await axios.get(`${baseURL}/get-status.php`, {
      headers: {
	'National-ID' : nationalId,
        'Authorization': accessToken, // Ensure the Authorization header is included
        'transId': transId, // Include transId if provided
        'random': random // Include random if provided
      }
    });
    console.log('Session status:', response.data);
    return res.status(200).json({
	data: response.data
	});
  } catch (error) {
    console.error('Error getting session status:', error);
    throw error;
  }

};