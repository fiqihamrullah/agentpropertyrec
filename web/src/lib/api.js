const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function fetchRecommendations(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/api/recommendations?${query}`);

  let data = {};
  try {
    data = await res.json();
  } catch {
    // not JSON Response, ignore
  }

  if (!res.ok) {
    throw new Error(
      data.message || `Request failed with status ${res.status}`
    );
  }

  return data;
}
