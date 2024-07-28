import { db } from "@/utils/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export const fetchUserData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

export const fetchUserLinks = async (uid: string) => {
  const linksCollectionRef = collection(db, "users", uid, "links");
  const linksSnapshot = await getDocs(linksCollectionRef);
  const links = linksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  return links;
};