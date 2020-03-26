'use strict'

const createNubank = require("nubank").default
const nubank  = createNubank()

class NubankController {

    async login({ request }) {
        const { login, password } = request.all()
        nubank.getLoginToken({
            password,
            login
        }).then(response => {
            console.log("Usuário logado com SUCESSO!")
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
    }

    async history() {
        nubank.getWholeFeed().then((history) => {
            return history
        })
    }

    async customer() {
        nubank.getCustomer().then(customer => console.log(customer))
        return nubank.signInData
    }

}

module.exports = NubankController
