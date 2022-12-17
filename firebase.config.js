import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "./firebaseApp/firebase-app";

export const db = getFirestore(app);

export const auth = getAuth(app);
