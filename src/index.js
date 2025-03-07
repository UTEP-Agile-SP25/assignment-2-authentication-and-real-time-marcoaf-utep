import { signUp,logout, login } from "./auth"
import { db } from "./config.js";
import { collection, doc, setDoc, getDoc, getDocs, getFirestore, deleteDoc, updateDoc } from "firebase/firestore"


const signUpForm = document.querySelector("#signupForm")
signUpForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const firstname = document.getElementById("firstname").value
    const lastname = document.getElementById("lastname").value
    const email = document.getElementById("signupemail").value
    const password = document.getElementById("signuppassword").value

    signUp(firstname, lastname, email, password)
})


const logInForm = document.querySelector("#loginForm")
logInForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const eamil = document.getElementById("loginemail").value
    const password = document.getElementById("loginpassword").value
    login(eamil, password)
})

const logOutForm = document.querySelector("#logoutForm")
logOutForm.addEventListener("submit", (event) => {
    event.preventDefault()
    logout()
})

const updateForm = document.querySelector("#updateDisplayNameForm")
updateForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const nameID = document.getElementById("UpdateDisplayNameInput").value
    const newDisplayName = document.getElementById("newDisplayNameInput").value
    try {
        await updateDoc(doc(db, "users", nameID), {
            firstname: newDisplayName
        });
        alert("New Display Name updated successfully")
        location.reload(); // REFRESH PAGE AFTER UPDATING
    } catch (error) {
        console.error("Error updating name:", error)
    }
});
