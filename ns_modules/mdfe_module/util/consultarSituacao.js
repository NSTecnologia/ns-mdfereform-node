const nsAPI = require('../../api_module/nsAPI')
const url = "https://mdfe.ns.eti.br/mdfe/stats"
const util = require('../../api_module/util')

class Body {
    constructor(licencaCnpj, chMDFe, tpAmb) {
        this.licencaCnpj = licencaCnpj;
        this.chMDFe = chMDFe;
        this.tpAmb = tpAmb;
    }
}

class Response {
    constructor({ status, motivo, retConsSitMDFe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retConsSitMDFe = retConsSitMDFe;
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

module.exports = { sendPostRequest, Body }