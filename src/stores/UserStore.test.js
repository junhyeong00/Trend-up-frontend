import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('login', () => {
    context('올바른 아이디와 비밀번호를 입력했을 경우', () => {
      it('아이디 정보를 불러옴', async () => {
        await userStore.login({ userName: 'test123', password: 'Password1234!' });

        expect(userStore.name).toBe('배준형');
      });
    });

    context('아이디가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await userStore.login({ userName: 'xxx', password: 'Password1234!' });

        expect(userStore.name).toBeFalsy();
      });
    });

    context('비밀번호가 틀렸을 경우', () => {
      it('정보를 불러오지 못한다.', async () => {
        await userStore.login({ userName: 'test123', password: 'xxx' });

        expect(userStore.name).toBeFalsy();
      });
    });
  });

  describe('fetchUserInformation', () => {
    it('유저 정보 확인', async () => {
      await userStore.fetchUser();

      expect(userStore.name).toBe('배준형');
      expect(userStore.phoneNumber).toBe('01012341234');
    });
  });
});
