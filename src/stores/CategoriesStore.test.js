import CategoriesStore from './CategoriesStore';

describe('CategoriesStore', () => {
  let categoriesStore;

  beforeEach(() => {
    categoriesStore = new CategoriesStore();
  });

  describe('fetchCategories', () => {
    it('카테고리 목록 확인', async () => {
      await categoriesStore.fetchCategories();

      expect(categoriesStore.categories.length).toBe(2);
      expect(categoriesStore.categories[0].id).toBe(1);
      expect(categoriesStore.categories[0].name).toBe('상의');
    });
  });
});
