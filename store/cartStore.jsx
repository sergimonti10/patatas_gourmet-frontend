import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [],
    addToCart: (product) => {
        set((state) => {
            const newCart = [...state.cart, product];
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            return { cart: newCart };
        });
    },
    removeFromCart: (productId) => {
        set((state) => {
            const newCart = state.cart.filter(product => product.id !== productId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            return { cart: newCart };
        });
    },
    getCartCount: () => {
        const currentCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [];
        return currentCart.length;
    },
    clearCart: () => {
        set(() => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
            return { cart: [] };
        });
    },
}));

export default useCartStore;
