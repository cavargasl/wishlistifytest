import { Product } from "@core/products/domain/product";
import { ProductDTO } from "../dto";

export function productAdapter(dto: ProductDTO): Product {
  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    description: dto.description,
    category: {
      id: dto.category.id,
      name: dto.category.name,
      image: dto.category.image,
    },
    images: dto.images,
  };
}

export function productsAdapter(productsDTO: ProductDTO[]): Product[] {
  return productsDTO.map(productAdapter);
}