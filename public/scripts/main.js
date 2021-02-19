import ChatMessage from "./components/MessageComponent.js"

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
            symbol: "images/symbol1.jpg",
            username: "",
            socketID: "",
            message: "",
            typing: false,
            usercheck: false
        },

        watch: {
            message(value) {
                value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
            }
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
                socket.emit('joined', this.username)
            },

            setasSymbol(event) {
                this.symbol = `images/${event.target.id}`;
                console.log(this.symbol);
                socket.emit('joined', this.symbol)
            }

        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);

})();