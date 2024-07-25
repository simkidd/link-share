import {
  CreateLinkInput,
  Link,
  UpdateLinkInput,
} from "@/interfaces/link.interface";
import { create } from "zustand";
import { db } from "@/utils/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface ILinkStore {
  loading: boolean;
  links: Link[];
  setLinks: (links: Link[]) => void;
  addLink: (input: CreateLinkInput) => Promise<void>;
  updateLink: (input: UpdateLinkInput) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  fetchLinks: () => Promise<void>;
}

export const useLinkStore = create<ILinkStore>((set) => ({
  loading: false,
  links: [],
  setLinks: (links: Link[]) => set({ links }),
  addLink: async (input) => {
    try {
      set({ loading: true });
      const { platform, url } = input;
      const newLink = { platform, url };
      const docRef = await addDoc(collection(db, "links"), newLink);
      set((state) => ({
        links: [...state.links, { id: docRef.id, ...newLink }],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  updateLink: async (input) => {
    try {
      set({ loading: true });
      const linkDoc = doc(db, "links", input.id);
      const { platform, url } = input;
      const updatedLink = { platform, url };
      await updateDoc(linkDoc, updatedLink);
      set((state) => ({
        links: state.links.map((link) =>
          link.id === input.id ? { ...link, ...updatedLink } : link
        ),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteLink: async (id) => {
    try {
      set({ loading: true });
      const linkDoc = doc(db, "links", id);
      await deleteDoc(linkDoc);
      set((state) => ({
        links: state.links.filter((link) => link.id !== id),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  fetchLinks: async () => {
    try {
      const snapshot = await getDocs(collection(db, "links"));
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
}));
