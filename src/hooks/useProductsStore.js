import { productsStore } from '../stores/ProductsStore';
import useStore from './useStore';

export default function useProductsStore() {
  return useStore(productsStore);
}
