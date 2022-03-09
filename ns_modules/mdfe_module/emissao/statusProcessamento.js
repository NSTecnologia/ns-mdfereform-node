const nsAPI = require('../../api_module/nsAPI')
const url = "https://mdfe.ns.eti.br/mdfe/issue/status"

class Body {
    constructor(CNPJ, nsNRec, tpAmb) {
        this.CNPJ = CNPJ;
        this.nsNRec = nsNRec;
        this.tpAmb = tpAmb
    }
}

class Response {
    constructor({ status, motivo, chMDFe, cStat, xMotivo, xml, nProt, dhRecbto, consultarNSNRec, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.chMDFe = chMDFe;
        this.cStat = cStat;
        this.xMotivo = xMotivo;
        this.nProt = nProt;
        this.xml = xml;
        this.dhRecbto = dhRecbto;
        this.consultarNSNRec = consultarNSNRec;
        this.erro = erro
    }
}

async function sendPostRequest(body, token) {

    try {
        let responseAPI = new Response(await nsAPI.PostRequest(url, body, token))
        return responseAPI
    }

    catch (error) {
        gravarLinhaLog("[ERRO_CONSULTA_STATUS_PROCESSAMENTO]: " + error)
        return error
    }

}

module.exports = { Body, sendPostRequest }