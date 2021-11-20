const mongoose = require("mongoose");
const Product = require("./models/Product");

// DB Config
require("dotenv").config();
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const products = [
  new Product({
    name: "Amoxicillin 500 mg",
    seller: "Amoxil",
    price: 50,
    image_id: "1",
  }),
  new Product({
    name: "Vitamin D 50,000 IU",
    seller: "Drisdol",
    price: 20,
    image_id: "2",
  }),
  new Product({
    name: "Ibuprofen 800 mg",
    seller: "Motrin",
    price: 90,
    image_id: "3",
  }),
  new Product({
    name: "Cetirizine hydrochloride 10 mg",
    seller: "Zyrtec",
    price: 150,
    image_id: "4",
  }),
  new Product({
    name: "Azithromycin 250 mg",
    seller: "Zithromax",
    price: 30,
    image_id: "5",
  }),
  new Product({
    name: "Amlodipine besylate 10 mg",
    seller: "Norvasc",
    price: 120,
    image_id: "6",
  }),
  new Product({
    name: "Albuterol sulfate HFA 90 mcg/act",
    seller: "Proventil HFA",
    price: 130,
    image_id: "7",
  }),
  new Product({
    name: "Cyclobenzaprine hydrochloride 10 mg",
    seller: "Flexeril",
    price: 85,
    image_id: "8",
  }),
  new Product({
    name: "Cephalexin 500 mg",
    seller: "Keflex",
    price: 50,
    image_id: "9",
  }),
  new Product({
    name: "Hydrochlorothiazide 25 mg",
    seller: "Microzide",
    price: 180,
    image_id: "10",
  }),
];

for (var i = 0; i < products.length; i++) {
  products[i].save((err, d) => {
    console.log("DONE", d);
  });
}
