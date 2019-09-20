const server = require('express')()
const cors = require('cors')()
const bodyParser = require('body-parser').json()

server.use(cors)
server.use(bodyParser)

require('./Db').connect()
    .then(Db => {
        require('./routes')(server)

        server.listen(3001, () => {
            console.log('Running')
        })
    })