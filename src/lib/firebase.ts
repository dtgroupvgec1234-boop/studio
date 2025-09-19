// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { BookResource } from "./data";


const firebaseConfig = {
  "projectId": "studio-2882934127-f0c19",
  "appId": "1:459860989941:web:d02aaf7e88f76e6009f2bc",
  "apiKey": "AIzaSyCGmQQtqCd_T8kjUxyNgtH5ZTciWCinXIQ",
  "authDomain": "studio-2882934127-f0c19.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "459860989941",
  storageBucket: "studio-2882934127-f0c19.appspot.com",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const booksCollection = collection(db, 'books');


export async function addBook(book: Omit<BookResource, 'id'>): Promise<BookResource> {
    const docRef = await addDoc(booksCollection, book);
    return {
        id: docRef.id,
        ...book,
    };
}

export async function getBooks(): Promise<BookResource[]> {
    const querySnapshot = await getDocs(booksCollection);
    const books: BookResource[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() } as BookResource);
    });
    return books;
}

export async function uploadFile(file: File, path: string): Promise<{ downloadUrl: string, fullPath: string }> {
    const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return { downloadUrl, fullPath: snapshot.ref.fullPath };
}
