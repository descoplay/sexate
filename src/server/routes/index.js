module.exports = _server => {
    require('./Auth')(_server)
    require('./Config')(_server)
    require('./Topic')(_server)
}