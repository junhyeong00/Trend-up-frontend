import { reviewsStore } from '../stores/ReviewsStore';
import useStore from './useStore';

export default function useReviewsStore() {
  return useStore(reviewsStore);
}
