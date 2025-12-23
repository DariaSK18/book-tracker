import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import Book from "../models/book.mjs";
import Collection from "../models/collection.mjs";
// import Category from "../models/category.mjs";
// import User from "../models/user.mjs";
import { sendResponse } from "../utils/helpers/sendResponse.mjs";
// import { Op } from "sequelize";

// --- get all posts ---
export const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll({ where: { user_id: req.user.id } });
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
      author,
      description,
      collection,
      genre,
      pages_total,
      pages_read,
      rating,
      reading_status,
      image_url,
    },
  } = req;
  if (!title || !description)
    return next(new AppError("Title and description are required", 400));

  let collectionId = null;

  if (collection) {
    let col = await Collection.findOne({
      where: {
        slug: collection.toLowerCase().replace(/\s+/g, "-"),
        user_id: user.id,
      },
    });

    if (!col) {
      col = await Collection.create({
        label: collection,
        slug: collection.toLowerCase().replace(/\s+/g, "-"),
        user_id: user.id,
      });
    }

    collectionId = col.id;
  }

  const book = await Book.create({
    title,
    author,
    description,
    collection_id: collectionId,
    genre,
    pages_total,
    pages_read,
    rating,
    reading_status,
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
      collection,
      genre,
      reading_status,
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
  if (pages_read) book.pages_read = pages_read;
  if (collection) book.collection = collection;
  if (genre) book.genre = genre;
  if (pages_total) book.pages_total = pages_total;
  if (reading_status) book.reading_status = reading_status;
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

  const collectionId = book.collection_id;

  await book.destroy();
  if (collectionId) {
    const count = await Book.count({ where: { collection_id: collectionId } });
    if (count === 0) {
      await Collection.destroy({ where: { id: collectionId } });
    }
  }

  sendResponse(res, 200, { msg: "Book deleted successfully" });
});

// --- toggle like for book ---
export const toggleFavourite = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const book = await Book.findOne({
    where: {
      id,
      user_id: userId,
    },
  });
  if (!book) return next(new AppError("Book not found", 404));

  book.is_favourite = !book.is_favourite;
  await book.save();

  sendResponse(res, 200, {
    favourite: book.is_favourite,
    bookId: book.id,
  });
});

// --- get collections ---
export const getCollections = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const specialCollections = [
    { slug: "to-read", label: "To Read", filter: { reading_status: "will" } },
    { slug: "reading", label: "Reading", filter: { reading_status: "now" } },
    { slug: "finished", label: "Finished", filter: { reading_status: "done" } },
    { slug: "favourite", label: "Favourite", filter: { is_favourite: true } },
  ];

  // const books = await Book.findAll({
  //   where: { user_id: req.user.id },
  //   attributes: ["collection", "reading_status", "is_favourite"],
  // });

  const map = new Map();

  for (const col of specialCollections) {
    const count = await Book.count({
      where: { user_id: userId, ...col.filter },
    });
    if (count > 0) {
      map.set(col.slug, { slug: col.slug, label: col.label });
    }
  }

  const collections = await Collection.findAll({
    where: { user_id: userId },
    order: [["label", "ASC"]],
  });

  // books.forEach((book) => {
  //   if (book.reading_status === "will")
  //     map.set("to-read", { slug: "to-read", label: "To Read" });

  //   if (book.reading_status === "now")
  //     map.set("reading", { slug: "reading", label: "Reading" });

  //   if (book.reading_status === "done")
  //     map.set("finished", { slug: "finished", label: "Finished" });

  //   if (book.is_favourite)
  //     map.set("favourite", { slug: "favourite", label: "Favourite" });

  //   if (book.collection) {
  //     const slug = book.collection.toLowerCase().replace(/\s+/g, "-");
  //     map.set(slug, { slug, label: book.collection });
  //   }
  // });

  collections.forEach((col) => {
    map.set(col.slug, { slug: col.slug, label: col.label });
  });

  sendResponse(res, 200, { collections: Array.from(map.values()) });
});

// --- get books by collection name ---
export const getBooksByCollection = catchAsync(async (req, res, next) => {
  const { collection: slug } = req.params;
  const userId = req.user.id;

  if (slug === "to-read") {
    const books = await Book.findAll({
      where: { user_id: userId, reading_status: "will" },
    });
    return sendResponse(res, 200, { books });
  }

  if (slug === "reading") {
    const books = await Book.findAll({
      where: { user_id: userId, reading_status: "now" },
    });
    return sendResponse(res, 200, { books });
  }

  if (slug === "finished") {
    const books = await Book.findAll({
      where: { user_id: userId, reading_status: "done" },
    });
    return sendResponse(res, 200, { books });
  }

  if (slug === "favourite") {
    const books = await Book.findAll({
      where: { user_id: userId, is_favourite: true },
    });
    return sendResponse(res, 200, { books });
  }

  // const where = {
  //   user_id: userId,
  // };

  // if (collection === "to-read") {
  //   where.reading_status = "will";
  // }

  // if (collection === "reading") {
  //   where.reading_status = "now";
  // }

  // if (collection === "finished") {
  //   where.reading_status = "done";
  // }

  // if (collection === "favourite") {
  //   where.is_favourite = true;
  // }

  const collection = await Collection.findOne({
    where: { slug, user_id: userId },
  });
  if (!collection) return sendResponse(res, 200, { books: [] });

  const books = await Book.findAll({
    where: { user_id: userId, collection_id: collection.id },
  });

  // if (!["to-read", "reading", "finished", "favourite"].includes(collection)) {
  //   where.collection = collection;
  // }

  // const books = await Book.findAll({ where });
  sendResponse(res, 200, { books });
});
