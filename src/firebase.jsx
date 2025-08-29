// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbHev7uhA8zjWNiivClAwetJjPrhcnzqU',
  authDomain: 'twitter-clone-b7dc2.firebaseapp.com',
  projectId: 'twitter-clone-b7dc2',
  storageBucket: 'twitter-clone-b7dc2.firebasestorage.app',
  messagingSenderId: '103496690475',
  appId: '1:103496690475:web:8ced9da1b9260ea39af36e',
  measurementId: 'G-2DSLP21S4S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const get_comments = async () => {
  try {
    console.log('Starting to fetch comments...');
    const { docs } = await getDocs(collection(db, 'comments'));
    console.log('Raw docs from Firebase:', docs);
    console.log('Number of docs found:', docs.length);

    const comments = docs.map((doc) => {
      const data = doc.data();
      console.log('Document data:', data);
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log('Processed comments:', comments);
    return comments;
  } catch (error) {
    console.error('Error in get_comments:', error);
    throw error;
  }
};

// Test function to verify Firebase connection
const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    console.log('Database instance:', db);

    // Try to get any collection to test connection
    const testSnapshot = await getDocs(collection(db, 'comments'));
    console.log('Connection successful! Found', testSnapshot.size, 'documents');
    return true;
  } catch (error) {
    console.error('Firebase connection failed:', error);
    return false;
  }
};

// Function to add a test comment
const addTestComment = async (text = 'This is a test comment!') => {
  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      text: text,
      timestamp: new Date(),
    });
    console.log('Test comment added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding test comment:', error);
    throw error;
  }
};

export { get_comments, testFirebaseConnection, addTestComment, db };
