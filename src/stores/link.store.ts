import {
  CreateLinkInput,
  Link,
  UpdateLinkInput,
} from "@/interfaces/link.interface";
import { create } from "zustand";
import { db, auth } from "@/utils/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { toast } from "sonner";

interface ILinkStore {
  loading: boolean;
  loadingSave: boolean;
  links: Link[];
  userInfo: any | null;
  setLinks: (links: Link[]) => void;
  setUserInfo: (info: any) => void;
  addLink: (input: CreateLinkInput) => Promise<void>;
  updateLink: (input: UpdateLinkInput) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  fetchLinks: () => Promise<void>;
  fetchUserData: (uid: string) => Promise<void>;
}

export const useLinkStore = create<ILinkStore>((set) => ({
  loading: false,
  loadingSave: false,
  links: [],
  userInfo: null,
  setLinks: (links: Link[]) => set({ links }),
  setUserInfo: (info: any) => set({ userInfo: info }),
  addLink: async (input) => {
    try {
      set({ loadingSave: true });
      const user = auth.currentUser;

      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      const { platform, url } = input;
      const newLink = { platform, url, author: user.uid };
      const userLinksRef = collection(db, "users", user.uid, "links");
      const docRef = await addDoc(userLinksRef, newLink);

      set((state) => ({
        links: [...state.links, { id: docRef.id, ...newLink }],
      }));
      toast.success("Link added");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add link");
    } finally {
      set({ loadingSave: false });
    }
  },
  updateLink: async (input) => {
    try {
      set({ loadingSave: true });
      const user = auth.currentUser;

      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      const linkDoc = doc(db, "users", user.uid, "links", input.id);
      const { platform, url } = input;
      const updatedLink = { platform, url };
      await updateDoc(linkDoc, updatedLink);

      set((state) => ({
        links: state.links.map((link) =>
          link.id === input.id ? { ...link, ...updatedLink } : link
        ),
      }));
      toast.success("Link updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update link");
    } finally {
      set({ loadingSave: false });
    }
  },
  deleteLink: async (id) => {
    try {
      set({ loading: true });
      const user = auth.currentUser;

      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      const linkDoc = doc(db, "users", user.uid, "links", id);
      await deleteDoc(linkDoc);

      set((state) => ({
        links: state.links.filter((link) => link.id !== id),
      }));
      toast.success("Link removed");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove link");
    } finally {
      set({ loading: false });
    }
  },
  fetchLinks: async () => {
    try {
      set({ loading: true });
      const user = auth.currentUser;

      if (!user) {
        toast.error("User is not authenticated");
        return;
      }

      const userLinksRef = collection(db, "users", user.uid, "links");
      const snapshot = await getDocs(userLinksRef);
      const links = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Link[];
      set({ links });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  fetchUserData: async (uid) => {
    try {
      set({ loading: true });
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        set({ userInfo: userDoc.data() });
      }

      const linksCollectionRef = collection(db, "users", uid, "links");
      const linksSnapshot = await getDocs(linksCollectionRef);
      const userLinks = linksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Link, "id">),
      }));

      set({ links: userLinks });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
