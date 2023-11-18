const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Order = require("../model/order");
const User = require("../model/user");
const Coupon = require("../model/coupon");
const categoryController = {
  createOrder: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { products, total } = req.body;
    const rs = await Order.create({ products, total, orderBy: id });
    if (rs) {
      return res.status(201).json({
        mess: "Tạo đơn hàng thành công",
        data: rs,
      });
    }
  }),
  updateStatus: asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        status: -1,
        mess: "Trạng thái đơn hàng cập nhập thất bại",
      });
    } else {
      const updatedOrderStatus = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true }
      );
      if (updatedOrderStatus) {
        return res.status(201).json({
          status: 0,
          mess: "Cập nhập trạng thái đơn hàng thành công",
          data: updatedOrderStatus,
        });
      }
    }
  }),
  getUserOrder: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const findOrder = await Order.find({ orderBy: id });
    return res.status(200).json({
      status: 0,
      mess: "Lấy thông tin đơn hàng của bạn thành công",
      data: findOrder,
    });
  }),
  getAllOrderbyAdmin: asyncHandler(async (req, res) => {
    const findOrderAll = await Order.find();
    return res.status(200).json({
      status: 0,
      mess: "Lấy tất cả thông tin đơn hàng thành công",
      data: findOrderAll,
    });
  }),
};

module.exports = categoryController;
