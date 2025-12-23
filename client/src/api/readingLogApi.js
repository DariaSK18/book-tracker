const BASE_URL = import.meta.env.VITE_API_URL;

// --- get all statistic ---
export async function addReadingLog({ book_id, date, pages_read = 0, minutes_read = 0 }) {
  const res = await fetch(`${BASE_URL}/api/reading-log`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ book_id, date, pages_read, minutes_read }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to fetch books");
  }

  return res.json();
}