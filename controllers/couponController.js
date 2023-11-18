const Coupon = require("../model/coupon");
const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi

const couponController = {
  createCoupon: asyncHandler(async (req, res) => {
    const { name, discout, dayExpire } = req.body;
    if (!name || !discout || !dayExpire) {
      return res.status(401).json({
        status: -1,
        mess: "Trường này không được bỏ trống",
      });
    } else {
      const newCoupon = await Coupon.create({
        ...req.body,
        dayExpire: Date.now() + +dayExpire * 24 * 60 * 60 * 1000,
      });
      if (newCoupon) {
        return res.status(200).json({
          status: 0,
          mess: "Tạo giảm giá thành công",
          data: newCoupon,
        });
      }
    }
  }),
  updateCoupon: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (Object.keys(req.body).length !== 0) {
      const updateCouponNew = await Coupon.findByIdAndUpdate(id, {
        ...req.body,
        dayExpire: Date.now() + +req.body.dayExpire * 24 * 60 * 60 * 1000,
      });
      if (updateCouponNew) {
        return res.status(201).json({
          status: 0,
          mess: "Cập nhập giảm giá thành công",
          data: updateCouponNew,
        });
      }
    }
  }),
  deleteCoupon: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteCouponItem = await Coupon.findByIdAndDelete(id);
    if (deleteCouponItem) {
      return res.status(401).json({
        status: 0,
        mess: "Xóa giảm giá thành công",
      });
    }
  }),
  getAllCoupons: asyncHandler(async (req, res) => {
    const allCounpons = await Coupon.find();
    if (allCounpons) {
      return res.status(201).json({
        status: 0,
        mess: "Lấy coupon thành công",
        data: allCounpons,
      });
    }
  }),
  getOneCoupon: asyncHandler(async (req, res) => {
    const { id } = req.body;
    const findCoupon = await Coupon.findById(id);
    if (findCoupon) {
      return res.status(201).json({
        status: 0,
        mess: "Lấy coupon thành công",
        data: findCoupon,
      });
    }
  }),
};

module.exports = couponController;
