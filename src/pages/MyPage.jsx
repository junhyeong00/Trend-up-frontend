import { useNavigate } from 'react-router-dom';
import My from '../components/My';

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <My
      navigate={navigate}
    />
  );
}
