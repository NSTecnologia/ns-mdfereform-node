const nsAPI = require('../../api_module/nsAPI')
const downloadEvento = require('./downloadEvento')

const url = "https://mdfe.ns.eti.br/mdfe/adddfe"

class Body {
    constructor(chMDFe, tpAmb, dhEvento, nSeqEvento, nProt, xMun, cMun, infDocs) {
        this.chMDFe = chMDFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nSeqEvento = nSeqEvento;
        this.nProt = nProt;
        this.xMun = xMun;
        this.cMun = cMun;
        this.infDocs = infDocs; // (cMUn, xMun, chNFe)
    }
}

class Response {
    constructor({ status, motivo, retEvento, xml, erro, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.erro = erro
        this.retEvento = retEvento;
        this.xml = xml;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar, token) {

    try{

        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo, token))

             if (responseAPI.status == 200) {

                 if (responseAPI.retEvento.cStat == 135) {

                     let downloadEventoBody = new downloadEvento.Body(
                     responseAPI.retEvento.chMDFe,
                     conteudo.tpAmb,
                     tpDown,
                     "INCDFE",
                     "1"
            )

                try{

                    await new Promise(resolve => setTimeout(resolve, 500));

                    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar, token)

                    return downloadEventoResponse
                    }

                    catch (error) {
                        util.gravarLinhaLog("[ERRO_DOWNLOAD_EVENTO_CORRECAO]: " + error)
                    }

                }

            }

                return responseAPI

        }
        catch (error) {
            util.gravarLinhaLog("[ERRO_CANCELAMENTO]: " + error)
            return error
        }
}

module.exports = { Body, sendPostRequest }