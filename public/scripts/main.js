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
            typecheck: false,
            newMessage: "",
            username: "",
            connections: 0,
        },

        methods: {
            dispatchMessage() {
                // debugger;
                socket.emit('chatmessage', {
                    content: this.message,
                    name: this.nickname || 'Annonymous'
                });
                this.message = "";
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount("app");
    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);

})();