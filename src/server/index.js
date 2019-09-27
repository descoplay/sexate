const server = require('express')()
const cors = require('cors')()
const bodyParser = require('body-parser').json()

const validateToken = require('./validateToken')

server.use(cors)
server.use(bodyParser)

server.use(validateToken)

require('./Db').connect()
    .then(Db => {
        require('./routes')(server)

        server.listen(3001, () => {
            console.log('Running')
        })
    })