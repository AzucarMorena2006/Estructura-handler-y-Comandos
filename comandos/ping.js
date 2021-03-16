module.exports = {
    name: 'ping',
    alias: ['p'],
    run: (client, message, args) => {
        message.channel.send('Pong!')
    }
}