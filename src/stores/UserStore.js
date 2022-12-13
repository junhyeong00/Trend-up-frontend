import { apiService } from '../services/ApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';

    this.loginError = '';
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
