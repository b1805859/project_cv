import React, { useState, useEffect, useRef, useCallback, createContext, useContext, useReducer } from 'react';
import { AppContext } from './context/AppContext';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { OrderSuccessPage } from "./components/OrderSuccessPage/OrderSuccessPage";
import { OrdersPage } from './pages/OrdersPage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage } from './pages/AboutPage';
import { WishlistPage } from './pages/WishlistPage';
import { InvoicePage } from './pages/InvoicePage';
import { HomePageV2 } from './components/HomePageV2/HomePageV2';
import { ComparePage } from './pages/ComparePage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";
import { CheckoutPage } from "./components/CheckoutPage/CheckoutPage";
import { FlashSalePage } from './pages/FlashSalePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function Router() {
  const { state } = useContext(AppContext);
  switch (state.page) {
    case 'home':          return <HomePageV2/>;
    case 'products':      return <ProductsPage/>;
    case 'product':       return <ProductDetailPage/>;
    case 'flash-sale':    return <FlashSalePage/>;
    case 'cart':          return <CartPage/>;
    case 'checkout':      return <CheckoutPage/>;
    case 'order-success': return <OrderSuccessPage/>;
    case 'orders':        return <OrdersPage/>;
    case 'wishlist':      return <WishlistPage/>;
    case 'invoice':       return <InvoicePage/>;
    case 'compare':       return <ComparePage/>;
    case 'login':         return <AuthPage/>;
    case 'admin':         return <AdminDashboard/>;
    case 'about':         return <AboutPage/>;
    case 'profile':       return <ProfilePage/>;
    default:              return <NotFoundPage/>;
  }
}