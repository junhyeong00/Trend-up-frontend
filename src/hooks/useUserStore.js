import { userStore } from '../stores/UserStore';
import useStore from './useStore';

export default function useProductsStore() {
  return useStore(userStore);
}
