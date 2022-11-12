const express = require("express");
const router = express.Router();

//controller
const {
    createImage, 
    removeImage 
} = require("../controllers/cloudinary");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:5000/api/images
//@Method    POST
//@Access    Private
router.post("/images", auth, adminCheck, createImage);

//@Endpoint  http://localhost:5000/api/images
//@Method    DELETE
//@Access    Private
router.post("/removeimages", auth, adminCheck, removeImage);




module.exports = router;
