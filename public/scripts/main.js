import ChatMessage from "./components/MessageComponent.js";

(() => {
    const socket = io();

    function setUserId({ sID, message }) {
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [],
            symbol: "images/symbol1.svg",
            username: "",
            emoji: "",
            socketID: "",
            message: "",
            usercheck: false
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage',
                    {
                        content: this.message,
                        name: this.username || 'Annonymous',
                        symbol: this.symbol
                    });

                this.message = "";
            },

            addUser() {
                this.usercheck = true;
            },

            setasSymbol(event) {
                this.symbol = `images/${event.target.id}`;
            },

            insertEmoji(event) {
                this.emoji = String.fromCodePoint(event.target.id);
                this.message = this.message + this.emoji;

            }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMessage);

})();