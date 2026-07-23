import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

console.log("guestbook.js loaded!");

const guestForm = document.getElementById("guestForm");
const nameInput = document.getElementById("name");
const relationshipInput = document.getElementById("relationship");
const messageInput = document.getElementById("message");
const messageList = document.getElementById("messageList");
const celebration = document.getElementById("celebration");

guestForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    console.log("Form submitted!");

    console.log("Before Firebase");

    const name = nameInput.value;
    const relationship = relationshipInput.value;
    const message = messageInput.value;
    const today = new Date();

    try {
        console.log("Calling addDoc...");

        await addDoc(collection(db, "guestbook"), {

            name: name,
            relationship: relationship,
            message: message,
date: serverTimestamp()
        });
        console.log("Calling addDoc...");

        console.log("✅ Message saved!");

    } catch (error) {

        console.error("Firebase Error:", error);
        return;

    }

    const emptyMessage = document.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const card = document.createElement("div");

    card.classList.add("message-card");

    card.innerHTML = `
        <h3>${name}</h3>
        <small>${relationship}</small>
        <p>${message}</p>
        <span class="date">${today.toLocaleString()}</span>
    `;

    messageList.appendChild(card);

    celebration.classList.add("show");

    setTimeout(function () {

        celebration.classList.remove("show");

    }, 6000);

    guestForm.reset();

});
async function loadMessages() {

    console.log("Loading messages...");

    const q = query(

        collection(db, "guestbook"),

        orderBy("date", "desc")

    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        const card = document.createElement("div");

        card.classList.add("message-card");

        card.innerHTML = `
            <h3>${data.name}</h3>
            <small>${data.relationship}</small>
            <p>${data.message}</p>
            <span class="date">
${
    data.date?.toDate
        ? data.date.toDate().toLocaleString()
        : data.date || "Just now"
}            </span>
        `;

        const emptyMessage = document.querySelector(".empty");

        if (emptyMessage) {

            emptyMessage.remove();

        }

        messageList.appendChild(card);

    });

}
loadMessages();