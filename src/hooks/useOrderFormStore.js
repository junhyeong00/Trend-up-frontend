import { orderFormStore } from '../stores/OrderFormStore';
import useStore from './useStore';

export default function useOrderFormStore() {
  return useStore(orderFormStore);
}
