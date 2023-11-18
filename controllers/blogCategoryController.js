const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const BlogCategory = require("../model/blogCategory");

const blogCategoryController = {
  createBlog: asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(401).json({
        status: -1,
        mess: "Tạo blog thất bại",
      });
    } else {
      const newBlog = await BlogCategory.create(req.body);
      if (newBlog) {
        res.status(201).json({
          status: 0,
          data: newBlog,
          mess: "Tạo blog thành công",
        });
      }
    }
  }),
  getAllBlogs: asyncHandler(async (req, res) => {
    const allBlogs = await BlogCategory.find();
    if (allBlogs) {
      return res.status(200).json({
        status: 0,
        data: allBlogs,
        mess: "Lấy bài viết blogs thành công",
      });
    }
  }),
  getOneBlog: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await BlogCategory.findById(id);
    if (blog) {
      return res.status(200).json({
        status: 0,
        data: blog,
        mess: "Lấy blog thành công",
      });
    }
  }),
  updateBlog: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const newBlogUpdated = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: "true",
    });
    if (newBlogUpdated) {
      return res.status(201).json({
        status: 0,
        mess: "Cập nhập blog thành công",
      });
    }
  }),
  deleteBlog: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteBlog = await BlogCategory.findByIdAndDelete(id);
    if (deleteBlog) {
      return res.status(201).json({
        status: 0,
        mess: "Xóa blog thành công",
      });
    }
  }),
};

module.exports = blogCategoryController;
