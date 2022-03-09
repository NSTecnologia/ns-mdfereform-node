const nsAPI = require('../../api_module/nsAPI')
const url = "https://mdfe.ns.eti.br/mdfe/issue"

class Response {
    constructor({ status, motivo, chCTe, nsNRec, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.chCTe = chCTe;
        this.nsNRec = nsNRec;
        this.erros = erros;
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