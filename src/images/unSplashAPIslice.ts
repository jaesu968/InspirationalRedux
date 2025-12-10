const API_URL = 'https://api.unsplash.com/photos';
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const fetchImages = async (query: string) => {
  try {
    const response = await fetch(
      `${API_URL}/random?query=${query}&client_id=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export default fetchImages;
