const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // Code
    var {id, password} = req.body.values
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    //Check User
    let user = await User.findOne({username: req.user.username}).exec();
    let products = [];
    //Check CartOld
    let cartOld = await Cart.findOne({ orderBy: user._id}).exec();
    if(cartOld){
      cartOld.remove();
    }
    //แต่งสินค้า
    for(let i = 0; i < cart.length; i++){
      let object = {}

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object)
    }
    //หาผลรวมของตะกร้า
    let cartTotal =0;
    for(let i = 0; i < products.length; i++){
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();
    console.log(newCart);
    res.send('Save UserCart Success!');
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.getUserCart = async (req, res) => {
  try{
    const user = await User.findOne({ username: req.user.username}).exec();
    const cart = await Cart.findOne({orderBy: user._id})
    .populate('products.product','_id title price')
    .exec();

    const { products, cartTotal } = cart;
    res.json({products,cartTotal});


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");

  }

};

//Save Address
exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      {
        username: req.user.username
      },
      {
        address: req.body.address
      }).exec();
    res.json({ok:true});

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};

//Save Order
exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({username: req.user.username}).exec();
    let userCart = await Cart.findOne({orderBy: user._id}).exec();
    let order = await new Order({
      product: userCart.product,
      orderBy: user._id,
      cartTotal: userCart.total
    }).save();
    
    // + - product
    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne:{
          filter: {_id:item.product._id},
          update: { $inc: { quantity: -item.count, sold:+item.count}}
        }
      }
    })

    let updated = await Product.bulkWrite(bulkOption,{})


    res.send(updated);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
