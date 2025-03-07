import { signUp, logout, login, onAuthStateChanged } from "./auth.js";
import { db } from "./config.js";
import { doc, setDoc, collection, deleteDoc, onSnapshot } from "firebase/firestore";

const saveSong = async function (){
    const songName = document.getElementById("songname").value.trim()
    const artist = document.getElementById("artist").value.trim()
    const year = document.getElementById("year").value.trim()
    const rating = document.getElementById("rating").value.trim()

    try{
            //----SET DOC ID TO SONG NAME WITHOUT SPACES ----//
            const songRef = doc(db, "songs", songName.replace(/\s+/g, '').toLowerCase() ) //REMOVED APPENDING ARTIST NAME TO SONG NAME + "-" + artist.toLowerCase()"

            await setDoc(songRef,{
                song: songName,
                artist: artist,
                year: year,
                rating: rating,
                timestamp: new Date()
            })
            console.log("Song Successfully Created")
            console.log("Song Name: ", songName)
            console.log("Artist: ", artist)
            document.getElementById("songname").value = ""
            document.getElementById("artist").value = ""
            document.getElementById("year").value = ""
            document.getElementById("rating").value = ""
    }catch(error){
        console.error("Error saving song: ", error)
    }
}

const deleteSong = async function (collection, docID){
    try{
        await deleteDoc(doc(db, collection, docID))
        console.log(`Song name: ${docID} successfully deleted`)
        
    }catch (error){
        console.error("Error deleting song: ", error)
    }
}


const songCollection = collection(db, "songs")
onSnapshot(songCollection, (snapshot) => {
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ""
//--------------------SORT SONGS BY SONG NAME-------------------//
    const songs = []
    snapshot.forEach((doc) => {
        songs.push(doc.data())
    })

    songs.sort((a, b) => a.song.localeCompare(b.song))

    songs.forEach((data) => {
        const row = document.createElement("tr")

        row.innerHTML = `
        <td>${data.song}</td>
        <td>${data.artist}</td>
        <td>${data.year}</td>
        <td>${data.rating}</td>
        `
        tableBody.appendChild(row)
    })
})

const addSongForm = document.querySelector("#addSong")
addSongForm.addEventListener("submit", (event) => {
    event.preventDefault()
    saveSong()
})



const deleteSongForm = document.querySelector("#deleteSong")
deleteSongForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const song = document.getElementById("songID").value.trim().replace(/\s+/g, '').toLowerCase() //REMOVED SPACES ENTERED BY USER ON SONG NAME
    deleteSong("songs", song)
    document.getElementById("songID").value = "" // CLEAR INPUT FIELD AFTER DELETING
})
