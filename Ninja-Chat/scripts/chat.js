// 1- Adding a new chat documents (DONE)
// 2- Setting up a real-time listener to get new  (DONE)
// 3- Update the username (DONE)
// 4- Updating the room (DONE)

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message) {
        // format a chat object
        const now = new Date();
        const chat = {
            // message: message,
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now),
        };
        // saving the chat documents
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update UI
                        callback(change.doc.data()); //Passing the data to the callback function
                    }
                });
            });
    }
    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room) {
        this.room = room;
        console.log('Room Updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}

// // Testing function
// const test = () => {
//     const chatroom = new Chatroom('general', 'shaun');
//     // chatroom.addChat('Hello Everyone, my name is Jeff')
//     //     .then(() => console.log('chat added'))
//     //     .catch(err => console.log(err));

//     setTimeout(() => {
//         chatroom.updateRoom('music');
//         chatroom.updateName('Yoshi');
//         chatroom.getChats(data => {
//             console.log(data);
//         });
//         chatroom.addChat('hello');
//     }, 3000);
// };
// // test();


