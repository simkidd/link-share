import { create } from "zustand";
import { auth } from "@/utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { CreateUserInput, LoginUserInput } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/user.interface";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import Cookies from "js-cookie";
import { TOKEN_NAME, USER_DETAILS } from "@/utils/constants";

interface IAuthStore {
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  createUser: (input: CreateUserInput) => Promise<void>;
  login: (input: LoginUserInput) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

const getFirebaseErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "The email address already exist";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/user-not-found":
      return "There is no user corresponding to the given email.";
    case "auth/wrong-password":
      return "The password is invalid for the given email.";
    case "auth/invalid-credential":
      return "Invalid login credendtials.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later";
    default:
      return error.message;
  }
};

export const useAuthStore = create<IAuthStore>((set) => ({
  loading: false,
  user: null,
  setUser: (user: User) => set({ user }),
  createUser: async (input) => {
    try {
      set({ loading: true });
      await createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((res) => {
          if (res.user) {
            toast.success("Account Created Successfully");
          }
        })
        .finally(() => {
          window.location.href = "/login";
        });
    } catch (error) {
      console.log(error);
      const errorMsg = getFirebaseErrorMessage(error as FirebaseError);
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },
  login: async (input) => {
    try {
      set({ loading: true });
      await signInWithEmailAndPassword(auth, input.email, input.password)
        .then((res) => {
          if (res.user) {
            toast.success("Login Successful");
          }
        })
        .finally(() => {
          window.location.href = "/";
        });
    } catch (error) {
      console.log(error);
      const errorMsg = getFirebaseErrorMessage(error as FirebaseError);
      toast.error(errorMsg);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    window.location.href = "/login";
    Cookies.remove(TOKEN_NAME);
    await signOut(auth);
    set({ user: null });
  },
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set(TOKEN_NAME, token);
        set({
          user: {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoUrl: user.photoURL || "",
          },
        });
      } else {
        Cookies.remove(TOKEN_NAME);
        set({ user: null });
      }
    });

    return () => unsubscribe();
  },
}));
