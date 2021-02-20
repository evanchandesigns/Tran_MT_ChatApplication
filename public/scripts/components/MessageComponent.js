export default {
    props: ['msg', 'socketid'],

    template:
        `
    <div class="new-message" :class="{'my-message' : matchedID}">
        <div class="nameBox">
            <img :src="msg.message.symbol" alt="Symbol">
            <h5>{{msg.message.name}}</h5>
        </div>
        <p>{{msg.message.content}}</p>
    </div>
    `
    ,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}