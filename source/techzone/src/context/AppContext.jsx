import { createContext } from 'react';

export const AppContext = createContext();

export const initialState = {
  user: null,
  cart: [],
  promoCode: null,
  page: 'home',
  pageData: null,
  searchQuery: '',
  toasts: [],

  products: [],
  categories: [],
  blogs: [],

  chatOpen: false,
  chatTab: 'bot',
  chatMessages: [{ from: 'bot', text: '🤖 Xin chào! Tôi là TechBot của TechZone. Hãy hỏi về sản phẩm hoặc đơn hàng.', type: 'TEXT', products: [] }],

  wishlist: [],
  orders: [],

  // coupons giữ nguyên vì hiện chưa có API coupons/discount flow trong FE source
  coupons: [
    { code:'TECHZONE10', type:'percent', value:10, min:500000, label:'Giảm 10%', used:234, limit:1000, active:true, expiry:'2024-03-31' },
    { code:'NEWUSER50K', type:'fixed', value:50000, min:200000, label:'Giảm 50.000đ', used:89, limit:500, active:true, expiry:'2024-02-28' },
    { code:'MOMO15', type:'percent', value:15, min:1000000, label:'Giảm 15% thanh toán MoMo', used:167, limit:300, active:true, expiry:'2024-02-15' },
    { code:'FREESHIP', type:'ship', value:0, min:0, label:'Miễn phí vận chuyển', used:445, limit:2000, active:true, expiry:'2024-12-31' },
  ],

  adminTab: 'dashboard',
  recentlyViewed: [],
  compareList: [],

  adminProducts: [],
};

export function reducer(state, action) {
  switch(action.type) {
    case 'SET_PAGE': return { ...state, page: action.page, pageData: action.data || null };
    case 'SET_USER': return { ...state, user: action.user };
    case 'LOGOUT': return { ...state, user: null, cart: [], page: 'home', promoCode: null };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.product.id === action.product.id);
      if (existing) {
        return { ...state, cart: state.cart.map(i => i.product.id === action.product.id ? { ...i, qty: i.qty + (action.qty||1) } : i) };
      }
      return { ...state, cart: [...state.cart, { product: action.product, qty: action.qty||1 }] };
    }
    case 'UPDATE_CART_QTY': return { ...state, cart: state.cart.map(i => i.product.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i) };
    case 'REMOVE_FROM_CART': return { ...state, cart: state.cart.filter(i => i.product.id !== action.id) };
    case 'CLEAR_CART': return { ...state, cart: [], promoCode: null };
    case 'SET_PROMO': return { ...state, promoCode: action.code };
    case 'TOGGLE_WISHLIST': {
      const has = state.wishlist.includes(action.id);
      return { ...state, wishlist: has ? state.wishlist.filter(x => x !== action.id) : [...state.wishlist, action.id] };
    }
    case 'ADD_TOAST': return { ...state, toasts: [...state.toasts, { ...action.toast, id: action.id || Date.now() }] };
    case 'REMOVE_TOAST': return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    case 'TOGGLE_CHAT': return { ...state, chatOpen: !state.chatOpen };
    case 'SET_CHAT_TAB': return { ...state, chatTab: action.tab };
    case 'ADD_CHAT_MSG': return { ...state, chatMessages: [...state.chatMessages, action.msg] };
    case 'ADD_ORDER': return { ...state, orders: [action.order, ...state.orders], cart: [], promoCode: null };
    case 'UPDATE_ORDER_STATUS': return { ...state, orders: state.orders.map(o => o.id === action.id ? { ...o, status: action.status } : o) };
    case 'SET_SEARCH': return { ...state, searchQuery: action.query };
    case 'SET_ADMIN_TAB': return { ...state, adminTab: action.tab };
    case 'ADD_RECENTLY_VIEWED': {
      const filtered = (state.recentlyViewed || []).filter(id => id !== action.id);
      return { ...state, recentlyViewed: [action.id, ...filtered].slice(0, 10) };
    }
    case 'TOGGLE_COMPARE': {
      const has = state.compareList.includes(action.id);
      if (has) return { ...state, compareList: state.compareList.filter(x => x !== action.id) };
      if (state.compareList.length >= 3) return state;
      return { ...state, compareList: [...state.compareList, action.id] };
    }
    case 'CLEAR_COMPARE': return { ...state, compareList: [] };
    case 'ADMIN_ADD_PRODUCT': return { ...state, adminProducts: [action.product, ...state.adminProducts] };
    case 'ADMIN_UPDATE_PRODUCT': return { ...state, adminProducts: state.adminProducts.map(p => p.id === action.product.id ? action.product : p) };
    case 'ADMIN_DELETE_PRODUCT': return { ...state, adminProducts: state.adminProducts.filter(p => p.id !== action.id) };
    case 'ADMIN_ADD_COUPON': return { ...state, coupons: [action.coupon, ...state.coupons] };
    case 'ADMIN_UPDATE_COUPON': return { ...state, coupons: state.coupons.map(c => c.code === action.coupon.code ? action.coupon : c) };
    case 'ADMIN_DELETE_COUPON': return { ...state, coupons: state.coupons.filter(c => c.code !== action.code) };
    case 'SET_PRODUCTS': return { ...state, products: action.products };
    case 'SET_CATEGORIES': return { ...state, categories: action.categories };
    case 'SET_BLOGS': return { ...state, blogs: action.blogs };
    case 'SET_ADMIN_PRODUCTS': return { ...state, adminProducts: action.products };
    default: return state;
  }
}

export function reducerV2(state, action) {
  switch(action.type) {
    case 'TRACK_ACTIVITY': {
      const a = { productId: action.productId, catId: action.catId, type: action.actType, ts: action.ts || Date.now() };
      return { ...state, userActivity: [...(state.userActivity||[]), a] };
    }
    case 'ADD_RECENTLY_VIEWED': {
      if (action.id === -1) return { ...state, recentlyViewed: [] }; // clear
      const filtered = (state.recentlyViewed||[]).filter(id => id !== action.id);
      return { ...state, recentlyViewed: [action.id, ...filtered].slice(0,10) };
    }
    default: return reducer(state, action);
  }
}