const server = require('express')()
const cors = require('cors')()

server.use(cors)

require('./Db').connect()
    .then(Db => {
        require('./routes')(server)

        server.listen(3001, () => {
            console.log('Running')
        })
    })