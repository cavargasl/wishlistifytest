type CategoryDTO = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export type ProductDTO = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryDTO;
  images: string[];
  creationAt: string;
  updatedAt: string;
};