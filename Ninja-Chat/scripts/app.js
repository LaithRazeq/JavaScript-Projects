// Dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const clr = document.querySelector('.clr');

// Adding a new Chat using the form submit
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// Updating Username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    // let user know about name update
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// Updating Rooms using the buttons
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

// Clearing Chat from a room

// Check local storage for a name
const username = localStorage.username ? localStorage.username : 'Anonymous'; 

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// Get chats and render
chatroom.getChats(data => chatUI.render(data));
