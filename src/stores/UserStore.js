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

  async fetchUserInformation() {
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
}

export const userStore = new UserStore();
