import { apiService } from '../services/ApiService';

import Store from './Store';

export default class CategoriesStore extends Store {
  constructor() {
    super();

    this.categories = [];
  }

  async fetchCategories() {
    const { categories } = await apiService.fetchCategories();
    this.categories = categories;
    this.publish();
  }

  getCategory(categoryId) {
    if (!categoryId) {
      return '전체';
    }
    return this.categories.find((category) => category.id === categoryId).name;
  }
}

export const categoriesStore = new CategoriesStore();
