import { catchAsync } from "../utils/catchAsync.mjs";
// import AppError from "../utils/AppError.mjs";
import Book from "../models/book.mjs";
// import User from "../models/user.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";
// import { Op } from "sequelize";

// --- get all posts ---
export const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll();
  sendResponse(res, 200, { books });
});

// export const getAllPosts = catchAsync(async (req, res, next) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const { search, category } = req.query;

//   const where = {};

//   if (category) where.category = category;

//   let searchCondition = [];

//   if (search) {
//     searchCondition.push({ title: { [Op.like]: `%${search}%` } });

//     const taggedPosts = await Meme.findAll({
//       include: [
//         {
//           model: Tag,
//           as: "tags",
//           where: { tag_name: { [Op.like]: `%${search}%` } },
//           attributes: [],
//           through: { attributes: [] },
//           required: true,
//         },
//       ],
//       attributes: ["id"],
//     });
//     if (taggedPosts.length > 0) {
//       const postIds = taggedPosts.map((p) => p.id);
//       searchCondition.push({ id: { [Op.in]: postIds } });
//     }
//     if (searchCondition.length > 0) {
//       where[Op.or] = searchCondition;
//     }
//   }
//   const { count: totalPosts, rows: posts } = await Meme.findAndCountAll({
//     where,
//     include: [
//       { model: User, as: "user", attributes: ["id", "username"] },
//       { model: Like, as: "likes", attributes: ["id"] },
//       { model: Comment, as: "comments", attributes: ["id"] },
//       { model: Tag, as: "tags", through: { attributes: [] } },
//     ],
//     order: [["createdAt", "DESC"]],
//     limit,
//     offset: (page - 1) * limit,
//     distinct: true,
//   });

//   const postsWithCounts = posts.map((post) => {
//     const p = post.toJSON();
//     return {
//       ...p,
//       likesCount: p.likes.length,
//       commentsCount: p.comments.length,
//     };
//   });

//   const totalPages = Math.ceil(totalPosts / limit);

//   sendResponse(res, 200, {
//     posts: postsWithCounts,
//     pagination: {
//       currentPage: page,
//       totalPages,
//     },
//   });
// });

// --- upload a book  ---
export const uploadBook = catchAsync(async (req, res, next) => {
  const {
    user,
    body: {
      title,
      description,
      category,
      rating,
      pages_total,
      pages_read,
      image_url,
    },
  } = req;
  if (!title || !description)
    return next(new AppError("Title and description are required", 400));

  const book = await Book.create({
    title,
    description,
    category,
    rating,
    pages_total,
    pages_read,
    image_url,
    user_id: user.id,
  });

  sendResponse(res, 201, book);
});

// --- get one book by id ---
export const getOneBook = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const book = await Book.findByPk(id);
  if (!book) return next(new AppError("Book not found", 404));
  sendResponse(res, 200, book);
});

// --- update a field ---
export const updateBook = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body: {
      title,
      description,
      category,
      rating,
      pages_total,
      pages_read,
      image_url,
    },
    user,
  } = req;

  const book = await Book.findByPk(id);
  if (!book) return next(new AppError("Post not found", 404));
  if (book.user_id !== user.id)
    return next(new AppError("Not the author", 403));

  if (title) book.title = title;
  if (description) book.description = description;
  if (category) book.category = category;
  if (rating) book.rating = rating;
  if (pages_total) book.pages_total = pages_total;
  if (pages_read) book.pages_read = pages_read;
  if (image_url) book.image_url = image_url;

  const updated = await book.save();
  sendResponse(res, 200, updated);
});

// --- delete book by id ---
export const deleteBook = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;

  const book = await Book.findByPk(id);
  if (!book) return next(new AppError("Book not found", 404));

  if (book.user_id !== user.id)
    return next(new AppError("Not the author", 403));

  await book.destroy();

  sendResponse(res, 200, { msg: "Book deleted successfully" });
});

// // --- toggle like for post ---
// export const toggleLike = catchAsync(async (req, res, next) => {
//   const postId = req.params.id;
//   const userId = req.user.id;

//   const post = await Meme.findByPk(postId);
//   if (!post) return next(new AppError("Post not found", 404));

//   const existingLike = await Like.findOne({
//     where: { user_id: userId, meme_id: postId },
//   });

//   let liked;

//   if (existingLike) {
//     await existingLike.destroy();
//     liked = false;
//   } else {
//     await Like.create({
//       user_id: userId,
//       meme_id: postId,
//     });
//     liked = true;
//   }

//   const likeCount = await Like.count({
//     where: { meme_id: postId },
//   });
//   sendResponse(res, 200, {
//     likes: likeCount,
//     liked: liked,
//   });
// });
