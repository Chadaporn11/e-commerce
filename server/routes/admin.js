const express = require("express");
const router = express.Router();

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//controller
const {
    getOrderAdmin,
    changeOrderStatus,
} = require("../controllers/admin");

//@Endpoint  http://localhost:5000/api/admin/orders
//@Method    GET
//@Access    Private
router.get("/admin/orders", auth, adminCheck, getOrderAdmin);

//@Endpoint  http://localhost:5000/api/user/order-status
//@Method    PUT
//@Access    Private
router.put("/admin/order-status", auth, adminCheck, changeOrderStatus);

module.exports = router;
