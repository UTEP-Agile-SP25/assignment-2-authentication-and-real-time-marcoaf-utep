import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "./config";
import { db } from "./config";
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";



onAuthStateChanged (auth, async (user)=> {
    if (user) {
        console.log("User logged in: ", user.email)
        await fetchUserData(user.uid)
        
    } else {
        console.log("No user signed in")
    }
});

async function fetchUserData(userID){
    try{
        const userDoc = await getDoc(doc(db, "users", userID))
        const userData = userDoc.data()
        console.log("User data: ", userData)
        document.getElementById("greeting").innerHTML = "<h1> Hi, "+userData.firstname +"</h1>"
    }catch(error){
        console.error("Error getting user data: ", error)
    }
}

export async function signUp (firstName, lastName, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up successfully", userCredential.user.email)
        console.log("User ID", userCredential.user.uid)
        const userRef = doc(db, "users", userCredential.user.uid) // Use UID as the document ID

        await setDoc(userRef, {
            firstname: firstName,
            lastname: lastName,
            timestamp: new Date()
        })
        // window.location.href = "userprofile.html"
    } catch (error) {
        console.error("Error signing up user:", error)
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // window.location.href = "songmanager.html"
    }catch (error) {
        console.error("Login Error: ",error.message)
    
    }
}

export async function logout() {
    try {
        await signOut(auth)
        console.log("User logged out")
    } catch (error) {
        console.error("Logout Error: ",error.message)
    }
}