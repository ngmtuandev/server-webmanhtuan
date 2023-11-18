const userRouter = require("./user");
const productRouter = require("./product");
const category = require("./category");
const blogCategory = require("./blogCategory");
const blog = require("./blog");
const brand = require("./brand");
const coupon = require("./coupon");
const order = require("./order");
const insertData = require("./insertData");
const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", category);
  app.use("/api/blogCategory", blogCategory);
  app.use("/api/blog", blog);
  app.use("/api/brand", brand);
  app.use("/api/coupon", coupon);
  app.use("/api/order", order);
  app.use("/api/insert", insertData);
};

module.exports = initRoute;
