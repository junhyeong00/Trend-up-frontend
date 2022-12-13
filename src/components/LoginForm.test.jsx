import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const navigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   useNavigate: () => navigate,
// }));

describe('LoginForm', () => {
  it('로그인 성공', async () => {
    render(<LoginForm
      navigate={navigate}
    />);

    fireEvent.change(screen.getByLabelText('아이디'), {
      target: { value: 'test123' },
    });

    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'Password1234!' },
    });

    fireEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(navigate).toBeCalled();
    });
  });
});
