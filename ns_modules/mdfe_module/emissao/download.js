const nsAPI = require('../../api_module/nsAPI')
const util = require("../../api_module/util")
var fs = require('fs');

const url = "https://mdfe.ns.eti.br/mdfe/get"

class Body {
    constructor(chMDFe, tpDown, tpAmb) {
        this.chMDFe = chMDFe;
        this.tpDown = tpDown;
        this.tpAmb = tpAmb;
    }
}

class Response {
    constructor({ status, motivo, chMDFe, xml, pdf, mdfeProc, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.chMDFe = chMDFe;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(mdfeProc);
        this.erro = erro
    }
}

async function sendPostRequest(body, caminho, token){

    let responseAPI = new Response(await nsAPI.PostRequest(url, body, token))

    if (responseAPI.json != null && caminho !== null) {
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.json", responseAPI.json)
    }

    if (responseAPI.pdf != null && caminho !== null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.pdf", buff)
    }

    if (responseAPI.xml != null && caminho !== null) {
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.xml", responseAPI.xml)
    }

    return responseAPI
}

module.exports = { Body, sendPostRequest }

