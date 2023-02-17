import { waitFor } from '@testing-library/react';
import SignUpFormStore from './SignUpFormStore';

const context = describe;

describe('SignUpFormStore', () => {
  let signUpFormStore;

  beforeEach(() => {
    signUpFormStore = new SignUpFormStore();
  });

  function changeInput({
    name, userName, password, confirmPassword, phoneNumber,
  }) {
    signUpFormStore.changeName(name);
    signUpFormStore.changeUserName(userName);
    signUpFormStore.changePassword(password);
    signUpFormStore.changeConfirmPassword(confirmPassword);
    signUpFormStore.changePhoneNumber(phoneNumber);
  }

  describe('signUp', () => {
    it('signup is success', async () => {
      changeInput({
        name: '배준형',
        userName: 'test123',
        password: 'Password1234!',
        confirmPassword: 'Password1234!',
        phoneNumber: '01012341234',
      });

      const name = await signUpFormStore.signUp();

      expect(name).toBe('배준형');
    });

    context('when userName is Already Existing', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'exist123',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.signUpError).toBe('이미 존재하는 아이디입니다');
        });
      });
    });

    context('when name is blank', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '',
          userName: 'test123',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.name).toBe('이름을 입력해주세요');
        });
      });
    });

    context('when userName is blank', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: '',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.userName).toBe('아이디를 입력해주세요');
        });
      });
    });

    context('when password is blank', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test123',
          password: '',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.password).toBe('비밀번호를 입력해주세요');
        });
      });
    });

    context('when phoneNumber is blank', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test123',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.phoneNumber).toBe('전화번호를 입력해주세요');
        });
      });
    });

    context('when userName is incorrect', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.userName).toBe('아이디를 다시 확인해주세요');
        });
      });
    });

    context('when name is incorrect', () => {
      it('signup is fail', async () => {
        changeInput({
          name: 'jh',
          userName: 'test123',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.name).toBe('이름을 다시 확인해주세요');
        });
      });
    });

    context('when password is incorrect', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test123',
          password: 'incorrect',
          confirmPassword: 'Password1234!',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.password).toBe('비밀번호를 다시 확인해주세요');
        });
      });
    });

    context('when confirmPassword is incorrect', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test123',
          password: 'Password1234!',
          confirmPassword: 'Password',
          phoneNumber: '01012341234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.confirmPassword).toBe('비밀번호가 일치하지 않습니다');
        });
      });
    });

    context('when phoneNumber is incorrect', () => {
      it('signup is fail', async () => {
        changeInput({
          name: '배준형',
          userName: 'test123',
          password: 'Password1234!',
          confirmPassword: 'Password1234!',
          phoneNumber: '1234',
        });

        signUpFormStore.signUp();

        await waitFor(() => {
          expect(signUpFormStore.errors.phoneNumber).toBe('전화번호를 다시 확인해주세요');
        });
      });
    });
  });
});
