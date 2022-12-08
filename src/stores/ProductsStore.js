import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductsStore extends Store {
  constructor() {
    super();

    this.products = [];

    this.totalPageCount = 0;
    this.currentPage = 1;
  }

  async fetchProducts(page) {
    const { products, totalPageCount } = await apiService.fetchProducts(page);
    this.products = products;
    this.totalPageCount = totalPageCount;
    this.publish();
  }

  async changePage(page) {
    this.currentPage = page;

    await this.fetchProducts(page);
    this.publish();
  }
}

export const productsStore = new ProductsStore();
