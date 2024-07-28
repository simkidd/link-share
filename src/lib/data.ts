import { db } from "@/utils/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export const fetchUserData = async (uid: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No user data found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchUserLinks = async (uid: string) => {
  try {
    const linksCollectionRef = collection(db, "users", uid, "links");
    const linksSnapshot = await getDocs(linksCollectionRef);
    const links = linksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return links;
  } catch (error) {
    console.error("Error fetching user links:", error);
    return [];
  }
};
