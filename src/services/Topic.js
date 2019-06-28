class Topic {
    constructor () {
        this.record = [
            {
                id: 1,
                title: 'Introdução',
                icon: 'el-icon-menu',
            },
            {
                id: 2,
                title: 'Configurações',
                icon: 'el-icon-setting',
                childrens: [
                    {
                        id: 3,
                        title: 'E-mail',
                        icon: 'el-icon-message',
                    },
                ],
            },
        ]
    }

    list () {
        return {
            data: this.record,
        }
    }
}

export default new Topic()