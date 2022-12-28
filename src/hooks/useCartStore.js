import { cartStore } from '../stores/CartStore';
import useStore from './useStore';

export default function useCartStore() {
  return useStore(cartStore);
}
