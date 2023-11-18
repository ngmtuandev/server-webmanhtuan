const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Product = require("./model/product");
const Category = require("./model/category");
const data = require("../data/data2.json");
const data2 = require("../data/categoryBrand");
const slug = require("slug");
const fnInsert = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slug(product?.name) + new Date(),
    desc: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    selled: Math.round(Math.random() * 1000),
    img: product?.images,
    color: product?.variants?.find((item) => item.label === "Color")
      ?.variants[0],
    thumb: product?.thumb,
    totalRating: 0,
  });
};

const insertCategory = async (category) => {
  await Category.create({
    title: category?.cate,
    brand: category?.brand,
  });
};

const inserData = {
  insertDataProduct: asyncHandler(async (req, res) => {
    const promiseAllDataProduct = [];
    for (let product of data) {
      promiseAllDataProduct.push(fnInsert(product));
    }
    await Promise.all(promiseAllDataProduct);
    return res.json("Insset Data Complete");
  }),
  insertDataCategory: asyncHandler(async (req, res) => {
    const promiseCategory = [];
    for (let category of data2) {
      promiseCategory.push(insertCategory(category));
    }
    await Promise.all(promiseCategory);
    return res.json("Insset Data Complete");
  }),
};

module.exports = inserData;
