// Import the necessary functions from Firebase SDK v9+
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // Import Realtime Database functions

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOFh5dfwnoEZPvcD6mfQu0fqaI_n79sGo",
  authDomain: "fridgecontrol-2ee73.firebaseapp.com",
  databaseURL: "https://fridgecontrol-2ee73-default-rtdb.firebaseio.com",
  projectId: "fridgecontrol-2ee73",
  storageBucket: "fridgecontrol-2ee73.firebasestorage.app",
  messagingSenderId: "779837783703",
  appId: "1:779837783703:web:3cd52b4efefcbaa2fe73d2",
  measurementId: "G-8724NEPWPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

// Function to update the fridge status in Firebase
const updateFridgeStatus = (field, value) => {
  const statusRef = ref(database, `fridgeStatus/${field}`);
  set(statusRef, value);
};

export { database, updateFridgeStatus };
