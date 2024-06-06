import { create } from 'zustand';
import useUserStore from './authStore';

const useCartStore = create((set) => ({
    cart: [],

    initializeCart: () => {
        const user = useUserStore.getState().user;
        const savedCart = localStorage.getItem(`cart_${user.id}`);
        set({ cart: savedCart ? JSON.parse(savedCart) : [] });
    },

    addToCart: (product) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const newCart = [...state.cart, product];
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
            return { cart: newCart };
        });
    },

    removeFromCart: (productId) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const newCart = state.cart.filter(product => product.id !== productId);
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
            return { cart: newCart };
        });
    },

    getCartCount: () => {
        const user = useUserStore.getState().user;
        const currentCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
        return currentCart.length;
    },

    clearCart: () => {
        set(() => {
            const user = useUserStore.getState().user;
            localStorage.removeItem(`cart_${user.id}`);
            return { cart: [] };
        });
    },

    incrementQuantity: (productId) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const newCart = state.cart.map((product) =>
                product.id === productId ? { ...product, quantity: (product.quantity || 1) + 1 } : product
            );
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
            return { cart: newCart };
        });
    },

    decrementQuantity: (productId) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const newCart = state.cart.map((product) =>
                product.id === productId && (product.quantity || 1) > 1 ? { ...product, quantity: (product.quantity || 1) - 1 } : product
            );
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
            return { cart: newCart };
        });
    },
}));

export default useCartStore;
