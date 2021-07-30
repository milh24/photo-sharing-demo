import firebaseConfig from "configs/firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
