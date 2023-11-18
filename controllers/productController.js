const Product = require("../model/product");
const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const slugify = require("slug");
const productController = {
  createProduct: asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({
        status: -1,
        mess: "Không có thông tin đơn hàng",
      });
    } else {
      const { title, slug, ...data } = req.body;
      // const thumb = req?.files?.thumb[0];
      // console.log("img : ", thumb);
      // console.log("data : ", data);
      if (req.body && title) {
        const createSlug = await slugify(title);
        console.log("create slug", createSlug);
        const newProduct = await Product.create({
          title: title,
          slug: createSlug,
          ...data,
        });
        return res.status(200).json({
          status: newProduct ? 0 : 1,
          mess: newProduct
            ? "Tạo sản phẩm thành công"
            : "Tạo sản phẩm thất bại",
          data: newProduct ? newProduct : "",
        });
      }
    }
  }),
  getOneProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findProductCurrent = await Product.findById({ _id: id }).populate({
      path: "ratings",
      populate: {
        path: "voteBy",
      },
    });
    console.log("find prd >>>>>", findProductCurrent.see + 1);
    findProductCurrent.see += 1;

    // Save the updated product
    const product = await findProductCurrent.save();
    if (product) {
      res.status(200).json({
        status: 0,
        mess: "Lấy sản phẩm thành công",
        data: product,
      });
    } else {
      res.status(401).json({
        status: 1,
        mess: "Lấy sản phẩm thất bại",
      });
    }
  }),

  getAllProducts: asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((item) => delete queries[item]);

    // Tạo một đối tượng truy vấn rỗng
    let query = {};

    // Lọc theo tiêu đề (title)
    if (queries.title) {
      query.title = { $regex: queries.title, $options: "i" };
    }

    // Lọc theo danh mục (category)
    if (queries.category) {
      query.category = { $regex: queries.category, $options: "i" };
    }

    // Lọc theo màu sắc (color)
    if (queries.color) {
      query.color = { $regex: queries.color, $options: "i" };
    }

    // Lọc theo giá
    if (queries.from && queries.to) {
      query.price = {
        $gte: queries.from, // Lớn hơn hoặc bằng `from`
        $lte: queries.to, // Nhỏ hơn hoặc bằng `to`
      };
    }
    // Nếu chỉ có tham số `from`, lọc từ `from` trở đi
    else if (queries.from) {
      query.price = {
        $gte: queries.from,
      };
    }
    // Nếu chỉ có tham số `to`, lọc từ `to` trở lại
    else if (queries.to) {
      query.price = {
        $lte: queries.to,
      };
    }

    // Truy vấn dựa trên đối tượng truy vấn
    console.log(query);
    let queryCommand = Product.find(query);

    // Sắp xếp dữ liệu (nếu được yêu cầu)
    if (req.query.sort) {
      const setSortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(setSortBy);
    }

    // Phân trang

    const maxLimit = 50;

    const page = +req.query.page || 1;
    const limit = +req.query.limit || maxLimit;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);

    try {
      const rs = await queryCommand.exec();
      const count = await Product.countDocuments();

      res.status(200).json({
        status: 0,
        mess: "Lấy tất cả sản phẩm thành công",
        data: rs,
        count,
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        mess: "Lấy toàn bộ sản phẩm thất bại",
      });
    }
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newUpdateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: "true" }
    );
    if (newUpdateProduct) {
      res.status(201).json({
        status: 0,
        mess: "Cập nhập sản phẩm thành công",
        newData: newUpdateProduct,
      });
    }
  }),
  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete({ _id: id });
    if (deleteProduct) {
      res.status(200).json({
        status: 0,
        mess: "Xóa sản phẩm thành công",
      });
    }
  }),
  uploadFileProduct: asyncHandler(async (req, res) => {
    // console.log(req.files); // file : up 1 ảnh, 1 file // files : up nhiều anh, nhiều files
    const { id } = req.params;
    if (req.files) {
      const newProduct = await Product.findByIdAndUpdate(
        id,
        {
          $push: { img: { $each: req.files.map((item) => item.path) } },
        },
        { new: true }
      );
      console.log(newProduct);
      if (newProduct) {
        return res.status(201).json({
          status: newProduct ? 0 : -1,
          mess: newProduct ? "Cập nhập thành công" : "Cập nhập thất bại",
          data: newProduct ? newProduct : "",
        });
      }
    }
  }),
  ratingProduct: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { star, comment, pid } = req.body;
    if (!star || !comment) {
      return res.status(400).json({
        status: 1,
        mess: "Đánh giá sản phẩm thất bại",
      });
    } else {
      const productRating = await Product.findById(pid);
      const checkIsUserRated = await productRating?.ratings.find(
        (el) => el.voteBy.toString() === id.toString()
      );
      if (checkIsUserRated) {
        // Đã đánh giá trước đó --> updated
        await Product.updateOne(
          {
            ratings: { $elemMatch: checkIsUserRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          }
        );
        return res.status(201).json({
          status: 0,
          mess: "Cập nhập bài đánh giá thành công",
        });
      } else {
        // chưa đánh giá --> đánh giá mới
        await Product.findByIdAndUpdate(pid, {
          $push: { ratings: { star, comment, voteBy: id } },
        });
        return res.status(201).json({
          status: 0,
          mess: "Đánh giá thành công",
        });
      }
    }
  }),
  addVariantProduct: asyncHandler(async (req, res) => {
    const { pid } = req.params;
    console.log("params : ", pid);
    // console.log("file", req.files);
    const { color, price, title } = req.body;
    if (!color || !price || !title) {
      return res.status(401).json({
        status: 1,
        mess: "Thêm biến thể sản phẩm thất bại",
      });
    } else {
      const newVariant = await Product.findByIdAndUpdate(pid, {
        $push: {
          variants: { ...req.body, id: Math.random() },
        },
      });
      if (newVariant) {
        return res.status(201).json({
          status: 0,
          mess: "Thêm biến thể sản phẩm thành công",
        });
      }
    }
  }),
};

module.exports = productController;
