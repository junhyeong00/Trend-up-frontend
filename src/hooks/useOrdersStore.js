import { ordersStore } from '../stores/OrdersStore';
import useStore from './useStore';

export default function useOrdersStore() {
  return useStore(ordersStore);
}
