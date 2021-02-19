export default {
    props: ['msg', 'socketid'],

    template:
        `
    <article class="new-message" :class="{'my-message' : matchedID}">
        <h4>{{this.username}} says:</h4>
        <p>{{this.message}}</p>
    </article>
    `
    ,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}