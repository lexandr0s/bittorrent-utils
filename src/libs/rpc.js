const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const protobuf = require('protobufjs')

const grpcAdress = 'ledger.bt.co:443'
const ledgerProtoPath = './protos/ledger.proto'
const packageDefinition = protoLoader.loadSync(ledgerProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const ledgerProto = protobuf.loadSync(ledgerProtoPath).nested.ledger
const ledgerGrpc = grpc.loadPackageDefinition(packageDefinition).ledger
const ledgerChannel =  new ledgerGrpc.Channels(grpcAdress, grpc.credentials.createSsl())

const getAccount = ({publicKeyUncompressed}) => new Promise((resolve, reject) => {
    const request = {key: publicKeyUncompressed}

    ledgerChannel.CreateAccount(request, function(error, response) {
        if (error) reject(error)
        else resolve(response)
    })
}).catch(error => {throw new Error(error)})

const signedTransfer = ({payerPrivateKeyObject, recipientPublicKeyUncompressed, amount}) => new Promise((resolve, reject) => {
    const payload = {
        payer: {key: payerPrivateKeyObject.public.uncompressed},
        recipient: {key: recipientPublicKeyUncompressed},
        amount
    }

    const TransferRequestMessage = ledgerProto.lookupType("ledger.TransferRequest")
    const message = TransferRequestMessage.create(payload)
    const serializedMessage = TransferRequestMessage.encode(message).finish()
    const signature = payerPrivateKeyObject.hashAndSign(serializedMessage)
    
    const request = {
        transfer_request: payload,
        signature: signature
    }

    ledgerChannel.Transfer(request, function(error, response) {
        if (error) reject(error)
        else resolve(response)
    })
}).catch(error => {throw new Error(error)})

module.exports = {
    getAccount,
    signedTransfer
}
