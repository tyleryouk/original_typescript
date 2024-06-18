import axios from 'utils/axios';

import { Products, ProductsFilter } from 'types/e-commerce';

// ⬇️ this is the loader for the detail route
export async function loader() {
  try {
    const response = await axios.get('/api/products/list');
    return response.data.products as Products[];
  } catch (error) {
    return error;
  }
}

export async function filterProducts(filter: ProductsFilter) {
  return await axios.post('/api/products/filter', { filter });
}

export async function productLoader({ params }: any) {
  try {
    const response = await axios.post('/api/product/details', { id: params.id });
    return response.data as Products;
  } catch (error) {
    return error;
  }
}

export async function getRelatedProducts(id: string | undefined) {
  return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
  return await axios.get('/api/review/list');
}
