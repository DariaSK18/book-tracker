const BASE_URL = import.meta.env.VITE_API_URL;

// --- Get all books ---
export async function getAllBooks() {
  const res = await fetch(`${BASE_URL}/api/book`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to fetch books");
  }

  return res.json();
}

// --- Get one book by id ---
export async function getBookById(id) {
  const res = await fetch(`${BASE_URL}/api/book/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to fetch book");
  }

  return res.json();
}

// --- Upload book ---
export async function createBook(bookData) {
  console.log(bookData);
  
  const res = await fetch(`${BASE_URL}/api/book`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
  //   const text = await res.text();
  // console.error("SERVER ERROR:", text);
  // throw new Error(text);
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to create book");
  }

  return res.json();
}

// --- Update book ---
export async function updateBook(id, bookData) {
  const res = await fetch(`${BASE_URL}/api/book/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to update book");
  }

  return res.json();
}

// --- Delete book ---
export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/api/book/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to delete book");
  }

  return res.json();
}
