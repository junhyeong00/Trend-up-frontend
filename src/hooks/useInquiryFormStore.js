import { inquiryFormStore } from '../stores/InquiryFormStore';
import useStore from './useStore';

export default function useInquiryFormStore() {
  return useStore(inquiryFormStore);
}
