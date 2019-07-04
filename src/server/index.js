const server = require('express')()

require('./Db').connect()
    .then(Db => {
        require('./routes')(server)

        server.listen(3001, () => {
            console.log('Running')
        })
    })