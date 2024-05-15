import { create } from 'zustand';

const useUserStore = create(set => ({
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('roles') : null,
    setUser: (user) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
        set(state => ({ ...state, user }));
    },
    setToken: (token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
        set(state => ({ ...state, token }));
    },
    setRole: (role) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('roles', role);
        }
        set(state => ({ ...state, role }));
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
        }
        set({ user: null, token: null, role: null });
    },
}));

export default useUserStore;
