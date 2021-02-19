import ChatMessage from "./components/MessageComponent.js"

(() => {
    const socket = io();

    function setUserId({ sID, message }) {
        vm.socketID = sID;
    }

    // function appendMessage(message) {
    //     vm.messages.push(message);
    // }

    const vm = new Vue({
        data: {
            messages: [],
            username: "",
            socketID: "",
            message: "",
            typing: false,
            ready: false,
            info: [],
            connections: 0,
        },

        created() {
            window.onbeforeunload = () => {
                socket.emit('leave', this.username);
            }

            socket.on('typing', (data) => {
                this.typing = data;
            });

            socket.on('stopTyping', () => {
                this.typing = false;
            });

            socket.on('joined', (data) => {
                this.info.push({
                    username: data,
                    type: 'joined'
                });

                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });

            socket.on('leave', (data) => {
                this.info.push({
                    username: data,
                    type: 'left'
                });

                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });

            socket.on('connections', (data) => {
                this.connections = data;
            });
        },

        watch: {
            message(value) {
                value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
            }
        },

        methods: {
            send() {
                this.messages.push({
                    message: this.message,
                    type: 0,
                    user: 'Me',
                });

                socket.emit('chatmessage', {
                    content: this.message,
                    name: this.username || 'Annonymous',
                    user: this.username
                });
                this.message = "";
            },

            addUser() {
                this.ready = true;
                socket.emit('joined', this.username)
                window.location.href = "/chat"
            }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    // socket.addEventListener('message', appendMessage);

})();