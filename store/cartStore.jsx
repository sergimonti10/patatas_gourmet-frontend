import { create } from 'zustand';
import useUserStore from './authStore';

const useCartStore = create((set) => ({
    cart: [],

    initializeCart: () => {
        const user = useUserStore.getState().user;
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.id}`);
            set({ cart: savedCart ? JSON.parse(savedCart) : [] });
        }
    },

    // addToCart: (product) => {
    //     set((state) => {
    //         const user = useUserStore.getState().user;
    //         const newCart = [...state.cart, product];
    //         localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
    //         return { cart: newCart };
    //     });
    // },

    addToCart: (product) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const existingProduct = state.cart.find(item => item.id === product.id);
            let newCart;
            if (existingProduct) {
                newCart = state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...state.cart, { id: product.id, price: product.price, quantity: 1 }];
            }
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

    removeProductFromCart: (productId) => {
        set((state) => {
            const user = useUserStore.getState().user;
            const productIndex = state.cart.findIndex(product => product.id === productId);
            if (productIndex === -1) return { cart: state.cart };
            const newCart = [
                ...state.cart.slice(0, productIndex),
                ...state.cart.slice(productIndex + 1)
            ];
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
            return { cart: newCart };
        });
    },

    // getCartCount: () => {
    //     const user = useUserStore.getState().user;
    //     const currentCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
    //     return currentCart.length;
    // },

    getCartCount: () => {
        const user = useUserStore.getState().user;
        const currentCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
        return currentCart.reduce((count, item) => count + item.quantity, 0);
    },


    clearCart: () => {
        set(() => {
            const user = useUserStore.getState().user;
            localStorage.removeItem(`cart_${user.id}`);
            return { cart: [] };
        });
    },
}));

export default useCartStore;
