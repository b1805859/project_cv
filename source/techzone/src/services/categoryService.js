import { categoryApi } from "../api/categoryApi";

function countProductsByCategory(category, products = []) {
  const categoryId = category.id ?? category.categoryId ?? category.catId;
  const categoryName = category.name ?? category.categoryName;

  return products.filter((product) => {
    const productCategoryId = product.catId ?? product.categoryId;
    return (
      String(productCategoryId) === String(categoryId) ||
      String(product.category || "") === String(categoryName || "")
    );
  }).length;
}

export const categoryService = {
  normalizeCategory(category, products = []) {
    if (!category) return null;

    const id = category.categoryId ?? category.id ?? category.catId;
    const name = category.name ?? category.categoryName ?? "";

    return {
      ...category,
      id,
      categoryId: category.categoryId ?? id,
      name,
      icon: category.icon ?? "\uD83D\uDCE6",
      count:
        category.count ??
        category.productCount ??
        category.itemCount ??
        countProductsByCategory({ ...category, id, name }, products),
    };
  },

  async getCategories(products = []) {
    const response = await categoryApi.fetchCategories();
    const rawList = response.data || [];
    return rawList
      .map((category) => this.normalizeCategory(category, products))
      .filter(Boolean);
  },

  async saveCategory(categoryData) {
    const response = await categoryApi.createCategory(categoryData);
    return this.normalizeCategory(response.data);
  },

  async deleteCategory(categoryId) {
    await categoryApi.deleteCategory(categoryId);
    return categoryId;
  },
};
