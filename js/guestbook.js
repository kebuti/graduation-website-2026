console.log("guestbook.js loaded!");
const guestForm = document.getElementById("guestForm");
const nameInput = document.getElementById("name");

const relationshipInput = document.getElementById("relationship");

const messageInput = document.getElementById("message");

const messageList = document.getElementById("messageList");

guestForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = nameInput.value;

const relationship = relationshipInput.value;

const message = messageInput.value;

console.log(name);
console.log(relationship);
console.log(message);

const card = document.createElement("div");

card.classList.add("message-card");

const today = new Date();

card.innerHTML = `
    <h3>${name}</h3>

    <small>${relationship}</small>

    <p>${message}</p>

    <span class="date">
        ${today.toLocaleString()}
    </span>
`;
const emptyMessage = document.querySelector(".empty");

if (emptyMessage) {

    emptyMessage.remove();

}
messageList.appendChild(card);
guestForm.reset();
});
