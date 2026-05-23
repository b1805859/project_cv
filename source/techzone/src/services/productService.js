import { productApi } from "../api/productApi";

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toOptionalNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export const productService = {
  normalizeProduct(item) {
    if (!item) return null;

    let parsedSpecs = {};
    if (item.specs) {
      try {
        parsedSpecs =
          typeof item.specs === "string" ? JSON.parse(item.specs) : item.specs;
      } catch (error) {
        console.error("Failed to parse product specs:", item.specs, error);
        parsedSpecs = {};
      }
    }

    const categoryObject = typeof item.category === "object" ? item.category : null;
    const id = item.itemId ?? item.id;
    const catId =
      item.categoryId ??
      item.catId ??
      categoryObject?.categoryId ??
      categoryObject?.id ??
      null;
    const categoryName =
      item.categoryName ??
      categoryObject?.name ??
      (typeof item.category === "string" ? item.category : "");

    return {
      ...item,
      id,
      itemId: item.itemId ?? id,
      catId,
      categoryId: item.categoryId ?? catId,
      name: item.name ?? item.itemName ?? "",
      price: toNumber(
        item.price ?? item.sellPrice ?? item.salePrice ?? item.discountPrice,
      ),
      oldPrice: toOptionalNumber(
        item.oldPrice ?? item.originalPrice ?? item.listPrice ?? item.marketPrice,
      ),
      rating: toNumber(item.rating ?? item.avgRating ?? item.averageRating),
      reviews: toNumber(item.reviews ?? item.reviewCount ?? item.totalReviews),
      sold: toNumber(item.sold ?? item.soldCount ?? item.totalSold),
      stock: toNumber(item.stock ?? item.quantity ?? item.availableQuantity),
      brand: item.brandName ?? item.brand ?? "",
      emoji: item.emoji ?? item.icon ?? "\uD83D\uDCE6",
      isNew: Boolean(item.isNew),
      isHot: Boolean(item.isHot),
      specs: parsedSpecs,
      category: categoryName,
    };
  },

  async getProductsList(params = {}) {
    const response = await productApi.fetchItems(params);
    const rawList = response.data || [];
    return rawList.map((item) => this.normalizeProduct(item)).filter(Boolean);
  },

  async getProductDetails(itemId) {
    const response = await productApi.getItemById(itemId);
    return this.normalizeProduct(response.data);
  },

  async saveProduct(productData, itemId = null) {
    const payload = {
      ...productData,
      categoryId: productData.categoryId ?? productData.catId,
      specs: productData.specs ? JSON.stringify(productData.specs) : null,
    };

    let response;
    if (itemId) {
      response = await productApi.updateProduct(itemId, payload);
    } else {
      response = await productApi.createProduct(payload);
    }
    return this.normalizeProduct(response.data);
  },

  async deleteProduct(itemId) {
    await productApi.deleteProduct(itemId);
    return itemId;
  },
};
