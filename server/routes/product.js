const express = require("express");
const router = express.Router();

//controller
const {
  list,
  read,
  create,
  update,
  remove,
} = require("../controllers/product");

// middleware
const { auth, adminCheck } = require("../middleware/auth");


//@Endpoint  http://localhost:5000/api/product
//@Method    POST
//@Access    Private
router.post("/product", auth, adminCheck, create);

//@Endpoint  http://localhost:5000/api/product
//@Method    GET
//@Access    Private
router.get("/product", list);



module.exports = router;
