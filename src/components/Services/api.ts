import axios from "axios";

const ACCESS_KEY = "1Wa-7CTx8d2JEaZFnSqCBUQzfWsVcYY6jXg_Vy-9STU";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  description?: string;
  user: {
    name: string;
  };
  likes: number;
}

interface FetchImagesResponse {
  results: Image[];
  total: number;
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResponse> => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  const { results, total } = response.data;
  return { results, total };
};
