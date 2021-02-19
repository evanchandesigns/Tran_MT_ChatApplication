export default {
    props: ['msg', 'socketid'],

    template:
        `
    <article class="new-message" :class="{'my-message' : matchedID}">
        <img :src="msg.message.symbol" alt="Symbol">
        <h5>{{msg.message.name}}</h5>
        <p>{{msg.message.content}}</p>
    </article>
    `
    ,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}