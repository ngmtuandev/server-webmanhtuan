const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Blog = require("../model/blog");

const blogController = {
  createBlog: asyncHandler(async (req, res) => {
    const { title, desc, category } = req.body;
    if (!title || !desc || !category) {
      throw new Error("Không được bỏ trống thông tin");
    } else {
      const newBlog = await Blog.create(req.body);
      if (newBlog) {
        res.status(200).json({
          status: 0,
          mess: "Tạo blog thành công",
          data: newBlog,
        });
      } else {
        res.status(400).json({
          status: -1,
          mess: "Tạo blog thất bại",
        });
      }
    }
  }),
  getOneBlog: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const getOneBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numberView: 1 } }, // đếm số lượng xem -> inc(increase : tăng lên) : tăng lên bao nhiêu đơn vi sau mỗi
      // lần gọi api getOneBlog (1 : tăng 1)
      { new: true }
    )
      .populate("likes", "firstName lastName")
      .populate("disLikes", "firstName lastName");
    if (getOneBlog) {
      return res.status(200).json({
        status: 0,
        mess: "Lấy thông tin blog thành công",
        data: getOneBlog,
      });
    }
  }),
  getAllBlog: asyncHandler(async (req, res) => {
    const allBlog = await Blog.find();
    if (allBlog) {
      res.status(200).json({
        status: 0,
        data: allBlog,
        mess: "Lấy tất cả sản phẩm thành công",
      });
    }
  }),
  updatedBlog: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: -1,
        mess: "Lấy thông tin cập nhập không được bỏ trống",
      });
    } else {
      const blogUpdated = await Blog.findByIdAndUpdate(id, req.body, {
        new: "true",
      });
      console.log(blogUpdated);
      return res.status(200).json({
        status: blogUpdated ? 0 : -1,
        data: blogUpdated ? blogUpdated : null,
        mess: blogUpdated ? "Cập nhập blog thành công" : "Cập nhập thất bại",
      });
    }
  }),
  checkIsLike: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { bid } = req.params;
    console.log("iddd >>> ", id);
    const blogCurr = await Blog.findById(bid);
    const checkDislike = await blogCurr?.disLikes?.find(
      (item) => item.toString() === id.toString()
    );
    if (checkDislike) {
      const respone = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { disLikes: id },
        },
        { new: true }
      );
      res.status(201).json({
        status: 0,
        mess: "Bỏ dislike thành công",
        data: respone,
      });
    }
    const checkLike = await blogCurr?.likes?.find(
      (item) => item.toString() === id.toString()
    );
    if (!checkLike) {
      const respone = await Blog.findByIdAndUpdate(
        bid,
        {
          $push: { likes: id },
        },
        { new: true }
      );
      // console.log("respone like : ", respone);
      res.status(201).json({
        status: 0,
        mess: "Like thành công",
        data: respone,
      });
    } else {
      const respone = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: id },
        },
        { new: true }
      );
      return res.status(201).json({
        status: 0,
        mess: "Bỏ like thành công",
        data: respone,
      });
    }
  }),
  checkIsDisLike: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { bid } = req.params;
    console.log("iddd >>> ", id);
    const blogCurr = await Blog.findById(bid);
    const checkDislike = await blogCurr?.disLikes?.find(
      (item) => item.toString() === id.toString()
    );
    if (checkDislike) {
      const respone = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { disLikes: id },
        },
        { new: true }
      );
      res.status(201).json({
        status: 0,
        mess: "Bỏ dislike thành công",
        data: respone,
      });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $push: { disLikes: id },
        },
        { new: true }
      );
      res.status(201).json({
        status: 0,
        mess: "dislike thành công",
        data: response,
      });
    }
    const checkLike = await blogCurr?.likes?.find(
      (item) => item.toString() === id.toString()
    );
    if (checkLike) {
      const respone = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: id },
        },
        { new: true }
      );
      return res.status(201).json({
        status: 0,
        mess: "Bỏ like thành công",
        data: respone,
      });
    }
  }),
  uploadFile: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("req.file.path >>>>>", req.file.path);
    if (req.file) {
      const updateBlog = await Blog.findByIdAndUpdate(
        id,
        { image: req.file.path },
        { new: true }
      );
      console.log(updateBlog);
      if (updateBlog) {
        return res.status(201).json({
          status: 0,
          mess: "Câp nhập Blog thành công",
          data: updateBlog,
        });
      }
    }
  }),
};

module.exports = blogController;
