const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Brand = require("../model/brand");

const brandController = {
  createBrand: asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
      res.status(401).json({
        status: -1,
        mess: "Tạo brand thất bại",
      });
    } else {
      const newBrand = await Brand.create(req.body);
      if (newBrand) {
        res.status(201).json({
          status: 0,
          data: newBrand,
          mess: "Tạo brand thành công",
        });
      }
    }
  }),
  getAllBrand: asyncHandler(async (req, res) => {
    const allBrands = await Brand.find();
    if (allBrands) {
      return res.status(200).json({
        status: 0,
        data: allBrands,
        mess: "Lấy bài tất cả brand thành công",
      });
    }
  }),
  getOneBrand: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (brand) {
      return res.status(200).json({
        status: 0,
        data: brand,
        mess: "Lấy brand thành công",
      });
    }
  }),
  updateBrand: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const newBrandUpdated = await Brand.findByIdAndUpdate(id, req.body, {
      new: "true",
    });
    if (newBrandUpdated) {
      return res.status(201).json({
        status: 0,
        mess: "Cập nhập brand thành công",
      });
    }
  }),
  deleteBrand: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteBrandItem = await Brand.findByIdAndDelete(id);
    if (deleteBrandItem) {
      return res.status(201).json({
        status: 0,
        mess: "Xóa blog thành công",
      });
    }
  }),
};

module.exports = brandController;
