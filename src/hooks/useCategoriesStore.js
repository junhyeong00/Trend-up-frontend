import { categoriesStore } from '../stores/CategoriesStore';
import useStore from './useStore';

export default function useCategoriesStore() {
  return useStore(categoriesStore);
}
