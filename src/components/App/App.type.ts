export interface Image {
  id: string;
  url: string;

  title?: string;
  description?: string;
}

export interface FetchImagesResponse {
  results: Image[];
  total: number;
}
