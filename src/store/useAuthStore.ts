import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/features/user/type";

type AuthState = {
  user: User | null;
  isLogin: boolean;
  todos: string[];
};

type AuthActions = {
  onAuthSuccess: (user: User | null) => void;
  onAddTodos: (todo: string[]) => void;
  clearAuth: () => void;
};

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<
  AuthStore,
  [["zustand/persist", Pick<AuthStore, "user">]]
>(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      todos: [],
      onAuthSuccess: (payload) => set(() => ({ user: payload, isLogin: true })),
      onAddTodos: (payload) => set(() => ({ todos: payload })),
      clearAuth: () => set(() => ({ user: null, isLogin: false })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
        todos: state.todos,
      }),
    }
  )
);

export default useAuthStore;
