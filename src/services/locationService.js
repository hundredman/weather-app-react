
const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";

/**
 * Searches for a location using the Nominatim API.
 * @param {string} query - The search query (e.g., "Seoul", "New York").
 * @returns {Promise<object|null>} A promise that resolves to the first matching location's data (latitude, longitude), or null if no results.
 */
export const searchLocation = async (query) => {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: 1,
  });

  try {
    const response = await fetch(`${NOMINATIM_API_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error searching location:", error);
    throw error;
  }
};
