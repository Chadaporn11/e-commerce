const express = require("express");
const router = express.Router();

//controller
const {
  list,
  read,
  create,
  update,
  remove,
  listBy,
  searchFilters,
} = require("../controllers/product");

// middleware
const { auth, adminCheck } = require("../middleware/auth");


//@Endpoint  http://localhost:5000/api/product
//@Method    POST
//@Access    Private
router.post("/product", auth, adminCheck, create);

//@Endpoint  http://localhost:5000/api/products
//@Method    GET
//@Access    Private
router.get("/products/:count", list);

//@Endpoint  http://localhost:5000/api/product/:id
//@Method    DELETE
//@Access    Private
router.delete("/product/:id", auth, adminCheck, remove);

//@Endpoint  http://localhost:5000/api/product
//@Method    GET
//@Access    Private
router.get("/product/:id", read);

//@Endpoint  http://localhost:5000/api/product/:id
//@Method    PUT
//@Access    Private
router.put("/product/:id", auth, adminCheck, update);

//@Endpoint  http://localhost:5000/api/productby
//@Method    POST
//@Access    Private
router.post("/productby", listBy);

//search
router.post("/search/filters", searchFilters);



module.exports = router;
