import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBjzyGGyjfGJzubszI3WnwyEjodrSkMElE",
  authDomain: "cornelio-9f37a.firebaseapp.com",
  projectId: "cornelio-9f37a",
  storageBucket: "cornelio-9f37a.appspot.com",
  messagingSenderId: "508669213208",
  appId: "1:508669213208:web:f05526cf410ff57d73216d",
  clientId: "605098004143-qhd7j3t7fb1p72sllu320fgg9b21f6bj.apps.googleusercontent.com"
}

const app =  initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)

export { storage }
export { db }
export { auth }
