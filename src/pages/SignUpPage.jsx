import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <SignUpForm
      navigate={navigate}
    />
  );
}
