export const bookCreateValidation = {
  title: {
    exists: { errorMessage: "Title is required" },
    isString: { errorMessage: "Title must be a string" },
    notEmpty: { errorMessage: "Title cannot be empty" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Title must be between 1 and 255 characters",
    },
    trim: true,
    stripLow: true,
  },
  description: {
    exists: { errorMessage: "Description is required" },
    isString: { errorMessage: "Description must be a string" },
    notEmpty: { errorMessage: "Description cannot be empty" },
    isLength: {
      options: { min: 10 },
      errorMessage: "Description must be at least 10 characters",
    },
    trim: true,
    stripLow: true,
  },
  category: {
    optional: true,
    isString: { errorMessage: "Category must be a string" },
    trim: true,
    stripLow: true,
  },
  rating: {
    optional: true,
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage: "Rating must be between 0 and 5",
    },
    toInt: true,
  },
  pages_total: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Total pages must be at least 1",
    },
    toInt: true,
  },
  pages_read: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Pages read must be 0 or greater",
    },
    toInt: true,
  },
  image_url: {
    optional: { options: { nullable: true } },
    isURL: { errorMessage: "Must be a valid URL" },
    trim: true,
  }
};

export const bookPatchValidation = {
  title: {
    optional: true,
    isString: { errorMessage: "Title must be a string" },
    notEmpty: { errorMessage: "Title cannot be empty" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Title must be 1-255 characters",
    },
    trim: true,
    stripLow: true,
  },
  description: {
    optional: true,
    isString: { errorMessage: "Description must be a string" },
    notEmpty: { errorMessage: "Description cannot be empty" },
    trim: true,
    stripLow: true,
  },
  category: {
    optional: true,
    isString: { errorMessage: "Category must be a string" },
    trim: true,
  },
  rating: {
    optional: true,
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage: "Rating must be between 0 and 5",
    },
    toInt: true,
  },
  pages_total: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Total pages must be at least 1",
    },
    toInt: true,
  },
  pages_read: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Pages read must be 0 or more",
    },
    toInt: true,
  },
  image_url: {
    optional: true,
    isString: { errorMessage: "Image URL must be a string" },
    isURL: { errorMessage: "Must be a valid URL" },
    trim: true,
  },
};


