import { create } from "zustand";
import { auth } from "@/utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { CreateUserInput, LoginUserInput } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/user.interface";

interface IAuthStore {
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  createUser: (input: CreateUserInput) => Promise<void>;
  login: (input: LoginUserInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  loading: false,
  user: null,
  setUser: (user: User) => set({ user }),
  createUser: async (input) => {
    try {
      set({ loading: true });
      await createUserWithEmailAndPassword(auth, input.email, input.password);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  login: async (input) => {
    try {
      set({ loading: true });
      await signInWithEmailAndPassword(auth, input.email, input.password);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
