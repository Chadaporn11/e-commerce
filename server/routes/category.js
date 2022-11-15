const express = require("express");
const router = express.Router();

//controller
const {
  list,
  read,
  create,
  update,
  remove,
} = require("../controllers/category");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:5000/api/category
//@Method    GET
//@Access    Private
router.get("/category", list);

//@Endpoint  http://localhost:5000/api/category
//@Method    POST
//@Access    Private
router.post("/category",auth, adminCheck, create);

//@Endpoint  http://localhost:5000/api/category/:id
//@Method    GET
//@Access    Private
router.get("/category/:id", auth, adminCheck, read);

//@Endpoint  http://localhost:5000/api/category/:id
//@Method    PUT
//@Access    Private
router.put("/category/:id", auth, adminCheck, update);

//@Endpoint  http://localhost:5000/api/category/:id
//@Method    DELETE
//@Access    Private
router.delete("/category/:id", auth, adminCheck, remove);


module.exports = router;
