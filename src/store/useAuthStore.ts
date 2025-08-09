import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserAuth } from "@/interface/userauth";

type AuthState = {
  user: UserAuth | null;
};

type AuthActions = {
  onSuccess: (user?: UserAuth | null) => void;
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
      onSuccess: (payload) => set(() => ({ user: payload })),
      clearAuth: () => set(() => ({ user: null })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
