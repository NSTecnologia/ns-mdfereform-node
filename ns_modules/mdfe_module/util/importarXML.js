const nsAPI = require('../../api_module/nsAPI')

const url = "https://mdfe.ns.eti.br/mdfe/import"

class Response {
    constructor({ status, motivo, xml, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.xml = xml;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, token) {

    try {
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo, token))
        return responseAPI
    }

    catch (error) {
        util.gravarLinhaLog("[ERRO_EMISSAO]: " + error)
        return error
    }
}

module.exports = { sendPostRequest }