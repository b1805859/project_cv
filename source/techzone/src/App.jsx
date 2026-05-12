import { useEffect, useReducer } from "react";
import { PRODUCTS } from "./data/mockData";
import { AppContext, initialState, reducerV2 } from "./context/AppContext";
import { ToastContainer } from "./components/ToastContainer/ToastContainer";
import { ChatWidget } from "./components/ChatWidget/ChatWidget";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { MobileBottomNav } from "./components/MobileBottomNav/MobileBottomNav";
import { NavbarV2 } from "./components/NavbarV2/NavbarV2";
import { CompareBar } from "./pages/ComparePage";
import { Router } from "./Router";

export function App() {
  const [state, dispatch] = useReducer(reducerV2, {
    ...initialState,
    userActivity: [],
  });

  useEffect(() => {
    if (state.page === "product" && state.pageData?.productId) {
      const p = (state.adminProducts || PRODUCTS).find(
        (x) => x.id === state.pageData.productId,
      );
      if (p) {
        dispatch({
          type: "TRACK_ACTIVITY",
          productId: p.id,
          catId: p.catId,
          actType: "VIEW",
        });
        dispatch({ type: "ADD_RECENTLY_VIEWED", id: p.id });
      }
    }
  }, [state.page, state.pageData?.productId]);

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
