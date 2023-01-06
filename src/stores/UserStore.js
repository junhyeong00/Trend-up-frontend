import { apiService } from '../services/ApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.userName = '';
    this.phoneNumber = '';

    this.loginError = '';
  }

  async fetchUser() {
    const { name, userName, phoneNumber } = await apiService.fetchUserInformation();
    this.name = name;
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.publish();
  }

  async login({ userName, password }) {
    try {
      const { accessToken, name } = await apiService.postSession({
        userName, password,
      });

      this.name = name;

      return accessToken;
    } catch (error) {
      this.loginError = error.response.data.errorMessage;
      this.publish();
      return '';
    }
  }

  async kakaoLogin(code) {
    try {
      const data = await apiService.kakaoLogin(code);

      this.name = data.name;
      this.publish();

      return data.accessToken;
    } catch (error) {
      return '';
    }
  }
}

export const userStore = new UserStore();
