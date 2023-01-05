import { inquiriesStore } from '../stores/InquiriesStore';
import useStore from './useStore';

export default function useInquiriesStore() {
  return useStore(inquiriesStore);
}
