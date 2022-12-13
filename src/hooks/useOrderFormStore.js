import { orderFormStore } from '../stores/OrderFormStore';
import useStore from './useStore';

export default function useProductsStore() {
  return useStore(orderFormStore);
}
