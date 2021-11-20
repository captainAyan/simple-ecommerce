const express = require("express");
const router = express.Router();
const Products = require("../models/Product");
const CartItem = require("../models/CartItem");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res) => {
  Products.find().exec(function (err, products) {
    res.render("index", {
      user: req.user,
      top_products: products.filter((p) => p.price > 100),
      all_products: products,
    });
  });
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  Products.find(
    {
      $or: [
        { name: new RegExp(keyword, "i") },
        { seller: new RegExp(keyword, "i") },
      ],
    },
    (err, products) => {
      res.render("search", {
        user: req.user,
        products: products,
      });
    }
  );
});

// product
router.get("/product/:product_id", (req, res) => {
  Products.findOne({ _id: req.params.product_id }).exec(function (
    err,
    product
  ) {
    res.render("product", {
      user: req.user,
      product: product,
    });
  });
});

// Cart
router.get("/cart", ensureAuthenticated, (req, res) => {
  CartItem.aggregate([
    { $match: { user_id: req.user._id } },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
  ]).exec((err, data) => {
    if (data) {
      res.render("cart", {
        user: req.user,
        cart: data,
      });
    } else res.status(400).send({ message: "error" });
  });
});

// add item to cart
router.post("/cart/:product_id", ensureAuthenticated, (req, res) => {
  CartItem.findOne(
    { user_id: req.user._id, product_id: req.params.product_id },
    (err, _cartItem) => {
      if (_cartItem) {
        CartItem.findOneAndUpdate(
          { _id: _cartItem._id },
          { $inc: { quantity: 1 } }
        ).exec((err, c) => {
          if (c) res.json(c);
          else res.status(400).send({ message: "error" });
        });
      } else {
        new CartItem({
          user_id: req.user._id,
          product_id: req.params.product_id,
          quantity: 1,
        }).save((err, cardItem) => {
          if (cardItem) res.json(cardItem);
          else res.status(400).send({ message: "error" });
        });
      }
    }
  );
});

router.put("/cart/:cartitem_id", ensureAuthenticated, (req, res) => {
  CartItem.findOne(
    { _id: req.params.cartitem_id, user_id: req.user._id },
    (err, _cartItem) => {
      if (_cartItem.quantity != 1) {
        CartItem.findOneAndUpdate(
          { _id: req.params.cartitem_id, user_id: req.user._id },
          { $inc: { quantity: -1 } }
        ).exec((err, c) => {
          if (c) res.json(c);
          else res.status(400).send({ message: "error" });
        });
      } else {
        _cartItem.deleteOne((err, result) => {
          if (result) res.json({ message: "done" });
          else res.status(400).send({ message: "error" });
        });
      }
    }
  );
});

// remove item from cart
router.delete("/cart/:cartitem_id", ensureAuthenticated, (req, res) => {
  CartItem.find({
    user_id: req.user._id,
    _id: req.params.cartitem_id,
  }).deleteOne((err, result) => {
    if (result) res.json({ message: "done" });
    else res.status(400).send({ message: "error" });
  });
});

module.exports = router;
