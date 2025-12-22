const BASE_URL = import.meta.env.VITE_API_URL;

// --- get all statistic ---
export async function getAllStats(period = "all") {
  const res = await fetch(`${BASE_URL}/api/statistic?period=${period}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.msg || "Failed to fetch books");
  }

  return res.json();
}