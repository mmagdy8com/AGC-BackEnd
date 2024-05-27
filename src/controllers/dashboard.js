const Gifts = require("../models/Gift");
const User = require("../models/User");
const Bitaqty = require("../models/Bitaqty");
const axios = require("axios");
const crypto = require("crypto");
const Binance = require("../models/Binance");
const BestSelling = require("../models/BestSelling");
const Collection = require("../models/Collection");
const Order = require("../models/Order");

exports.getData = async (req, res) => {
  try {
    console.log("hererere")
    const binanceCount = await Binance.countDocuments();
    const bitaqtyCount = await Bitaqty.countDocuments();
    const customerCount = await User.countDocuments({ role: 'customer' });
    const orderCount = await Order.countDocuments();
    const orderData = await Order.find()
      .populate("userId")
      .populate({
        path: "products.productId",
        populate: {
          path: "category", // Populate the category field inside the productId object
        },
      });

    // Create an object to store orders month-wise and date-wise
    const ordersByMonthAndDate = {};

    orderData.forEach(order => {
      const createdAt = new Date(order.createdAt);
      const monthYearKey = `${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
      const dayKey = createdAt.getDate();

      if (!ordersByMonthAndDate[monthYearKey]) {
        ordersByMonthAndDate[monthYearKey] = {};
      }

      if (!ordersByMonthAndDate[monthYearKey][dayKey]) {
        ordersByMonthAndDate[monthYearKey][dayKey] = [];
      }

      ordersByMonthAndDate[monthYearKey][dayKey].push(order);
    });

    const lastOrders = await Order.find()
      .sort({ _id: -1 }) // Sort by _id in descending order
      .limit(10) // Limit the results to 10 documents
      .populate("userId")
      .populate({
        path: "products.productId",
        populate: {
          path: "category", // Populate the category field inside the productId object
        },
      });

    const orders = await Order.find();
    let salesCount = 0;

    for (let i = 0; i < orders.length; i++) {
      salesCount += orders[i].products.length;
    }

    const result = {
      "products": bitaqtyCount + binanceCount,
      "customers": customerCount,
      "sales": salesCount,
      "orders": orderCount
    };

    // Convert salesData object to array of objects
    const salesDataArray = Object.keys(ordersByMonthAndDate).map(month => ({
      [month]: Object.keys(ordersByMonthAndDate[month]).map(day => ({
        [day]: ordersByMonthAndDate[month][day]
      }))
    }));

    console.log(salesDataArray);

    return res.status(200).json({
      code: 200,
      message: "All data fetched successfully!",
      data: result,
      lastOrders: lastOrders,
      salesData: salesDataArray
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};