import { signUpFormStore } from '../stores/SignUpFormStore';
import useStore from './useStore';

export default function useSignUpFormStore() {
  return useStore(signUpFormStore);
}
