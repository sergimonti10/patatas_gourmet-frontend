// import { create } from 'zustand';
// import useUserStore from './authStore';

// const useCartStore = create((set) => ({
//     cart: [],

//     initializeCart: () => {
//         const user = useUserStore.getState().user;
//         if (user) {
//             const savedCart = localStorage.getItem(`cart_${user.id}`);
//             set({ cart: savedCart ? JSON.parse(savedCart) : [] });
//         }
//     },

//     addToCart: (product) => {
//         set((state) => {
//             const user = useUserStore.getState().user;
//             const newCart = [...state.cart, product];
//             localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
//             return { cart: newCart };
//         });
//     },

//     removeFromCart: (productId) => {
//         set((state) => {
//             const user = useUserStore.getState().user;
//             const newCart = state.cart.filter(product => product.id !== productId);
//             localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
//             return { cart: newCart };
//         });
//     },

//     removeProductFromCart: (productId) => {
//         set((state) => {
//             const user = useUserStore.getState().user;
//             const productIndex = state.cart.findIndex(product => product.id === productId);
//             if (productIndex === -1) return { cart: state.cart };
//             const newCart = [
//                 ...state.cart.slice(0, productIndex),
//                 ...state.cart.slice(productIndex + 1)
//             ];
//             localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
//             return { cart: newCart };
//         });
//     },

//     getCartCount: () => {
//         const user = useUserStore.getState().user;
//         const currentCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
//         return currentCart.length;
//     },

//     clearCart: () => {
//         set(() => {
//             const user = useUserStore.getState().user;
//             localStorage.removeItem(`cart_${user.id}`);
//             return { cart: [] };
//         });
//     },
// }));

// export default useCartStore;

// store/cartStore.jsx
import { create } from 'zustand';
import useUserStore from './authStore';

const MAX_ITEMS_PER_ORDER = 40;
const isBrowser = () => typeof window !== 'undefined';

const cartKey = () => {
    const u = useUserStore.getState().user;
    return `cart_${u?.id ?? 'guest'}`;
};

const readMap = () => {
    if (!isBrowser()) return {};
    try { return JSON.parse(localStorage.getItem(cartKey()) || '{}'); }
    catch { return {}; }
};

const writeMap = (map) => {
    if (!isBrowser()) return;
    try { localStorage.setItem(cartKey(), JSON.stringify(map)); }
    catch (e) { console.error('Cart quota exceeded', e); }
};

const sum = (map) => Object.values(map).reduce((s, n) => s + Number(n || 0), 0);

const useCartStore = create((set, get) => ({
    // Solo guardamos ids con cantidades: { [productId]: qty }
    cart: {},

    MAX: MAX_ITEMS_PER_ORDER,

    initializeCart: () => {
        set({ cart: readMap() });
    },

    // añadir 1 (para el botón "+")
    addToCart: (product) => get().addMany(product.id, 1),

    // añadir N de golpe (textbox)
    addMany: (productId, qty) => {
        qty = Math.floor(Number(qty));
        const map = { ...get().cart };
        const total = sum(map);

        if (!Number.isFinite(qty) || qty <= 0) {
            return { ok: false, reason: 'invalid_qty', totalItems: total, remaining: Math.max(0, MAX_ITEMS_PER_ORDER - total) };
        }

        const remaining = Math.max(0, MAX_ITEMS_PER_ORDER - total);
        if (remaining <= 0) {
            return { ok: false, reason: 'over_limit', totalItems: total, remaining: 0 };
        }

        const toAdd = Math.min(qty, remaining);
        map[productId] = (map[productId] || 0) + toAdd;

        writeMap(map);
        set({ cart: map });

        const totalItems = total + toAdd;
        return { ok: true, added: toAdd, newQuantity: map[productId], totalItems, remaining: MAX_ITEMS_PER_ORDER - totalItems };
    },

    // quitar una unidad (botón "-")
    removeProductFromCart: (productId) => {
        const map = { ...get().cart };
        if (!map[productId]) return;
        map[productId] = map[productId] - 1;
        if (map[productId] <= 0) delete map[productId];
        writeMap(map);
        set({ cart: map });
    },

    // quitar todas las unidades de un producto (botón "Eliminar")
    removeFromCart: (productId) => {
        const map = { ...get().cart };
        if (map[productId]) {
            delete map[productId];
            writeMap(map);
            set({ cart: map });
        }
    },

    clearCart: () => {
        if (isBrowser()) { try { localStorage.removeItem(cartKey()); } catch { } }
        set({ cart: {} });
    },

    // contador del badge = suma de cantidades
    getCartCount: () => sum(get().cart),

    // cuánto cabe hasta el límite
    getRemaining: () => Math.max(0, MAX_ITEMS_PER_ORDER - sum(get().cart)),
}));

export default useCartStore;
