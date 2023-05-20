// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKDBmoKm3yhXKYLBZMKYc7OXNDZZpAtQE",
    authDomain: "to-do-list-b2f2a.firebaseapp.com",
    databaseURL: "https://to-do-list-b2f2a-default-rtdb.firebaseio.com/",
    projectId: "to-do-list-b2f2a",
    storageBucket: "to-do-list-b2f2a.appspot.com",
    messagingSenderId: "206102318921",
    appId: "1:206102318921:web:79a0f07483b95e574ad498",
    measurementId: "G-FDW29KW455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export async function getTasks() {

    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks
}

export async function addTask(taskTitle) {

    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: taskTitle,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}
