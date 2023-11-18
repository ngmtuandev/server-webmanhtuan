const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Category = require("../model/category");

const categoryController = {
  createCategory: asyncHandler(async (req, res) => {
    // const findCategory = Category.find({ title: req.body });
    // console.log("findCategory", findCategory);
    // if (findCategory) {
    //   return res.status(401).json({
    //     status: 1,
    //     mess: "Tạo danh mục thất bại",
    //   });
    // } else {
    const newCategory = await Category.create(req.body);
    if (newCategory) {
      return res.status(200).json({
        status: 0,
        mess: "Tạo danh mục thành công",
      });
    }
    // }
  }),
  getCategorys: asyncHandler(async (req, res) => {
    const allCategory = await Category.find().select("title _id");
    if (allCategory) {
      return res.status(200).json({
        status: 0,
        mess: "Lấy danh mục thành công",
        data: allCategory,
      });
    } else {
      return res.status(400).json({
        status: -1,
        mess: "Lấy danh mục thất bại",
      });
    }
  }),
  updateCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const categoryUpdate = await Category.findByIdAndUpdate(id, req.body, {
      new: "true",
    });
    if (categoryUpdate) {
      return res.status(201).json({
        status: -1,
        mess: "Cập nhập thành công",
      });
    }
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      return res.status(200).json({
        status: 0,
        mess: "Xóa danh mục thành công",
      });
    }
  }),
};

module.exports = categoryController;
