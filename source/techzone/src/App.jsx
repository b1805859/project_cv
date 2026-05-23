import { useEffect, useReducer } from "react";
import { AppContext, initialState, reducerV2 } from "./context/AppContext";
import { ToastContainer } from "./components/ToastContainer/ToastContainer";
import { ChatWidget } from "./components/ChatWidget/ChatWidget";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { MobileBottomNav } from "./components/MobileBottomNav/MobileBottomNav";
import { NavbarV2 } from "./components/NavbarV2/NavbarV2";
import { CompareBar } from "./pages/ComparePage";
import { Router } from "./Router";
import { productService } from "./services/productService";
import { categoryService } from "./services/categoryService";
import { blogService } from "./services/blogService";

export function App() {
  const [state, dispatch] = useReducer(reducerV2, {
    ...initialState,
    userActivity: [],
  });

  useEffect(() => {
    if (state.page === "product" && state.pageData?.productId) {
      const product = (state.adminProducts && state.adminProducts.length > 0
        ? state.adminProducts
        : state.products
      ).find((x) => x.id === state.pageData.productId);
      if (product) {
        dispatch({
          type: "TRACK_ACTIVITY",
          productId: product.id,
          catId: product.catId,
          actType: "VIEW",
        });
        dispatch({ type: "ADD_RECENTLY_VIEWED", id: product.id });
      }
    }
  }, [state.page, state.pageData?.productId, state.adminProducts, state.products]);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialData() {
      try {
        const products = await productService.getProductsList();
        const categories = await categoryService.getCategories(products);
        const blogs = await blogService.getPosts();
        if (cancelled) return;
        dispatch({ type: "SET_PRODUCTS", products });
        dispatch({ type: "SET_CATEGORIES", categories });
        dispatch({ type: "SET_BLOGS", blogs });
        dispatch({ type: "SET_ADMIN_PRODUCTS", products });
      } catch (error) {
        console.warn("Unable to load initial app data", error);
      }
    }

    loadInitialData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavbarV2 />
      <Router />
      <CompareBar />
      <ChatWidget />
      <ScrollToTop />
      <ToastContainer />
      <MobileBottomNav />
    </AppContext.Provider>
  );
}
