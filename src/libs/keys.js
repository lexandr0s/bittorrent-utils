const secp256k1 = require("secp256k1")
const protobuf = require("protobufjs")
const crypto = require('crypto')
const keysProto = protobuf.loadSync('./protos/keys.proto')
const PrivateKeyMessage = keysProto.lookupType('PrivateKey')

class PrivateKey {
    constructor(key) {
        // [BTFS] BASE64 string -> PROTOBUF SERIALIZED buffer -> KEY buffer
        if (key.length === 48) this.private = PrivateKeyMessage.decode(Buffer.from(key, 'base64')).Data
        // [SPEED] HEX string -> KEY buffer
        else if (key.length === 64) this.private = Buffer.from(key, 'hex')
        else throw new Error(`Private key ${key} not recognized`)
        if (!secp256k1.privateKeyVerify(this.private)) throw new Error(`Private key ${key} verification failed`)

        this.public = new PublicKey(this.private)
        this.source = key
    }        

    hashAndSign(message) {
        const messageHash = crypto.createHash('sha256').update(message).digest()
        const signature = secp256k1.ecdsaSign(messageHash, this.private).signature
        if (!secp256k1.ecdsaVerify(signature, messageHash, this.public.uncompressedUint8Array)) throw new Error(`Signature verification failed`)
        return secp256k1.signatureExport(signature)
    }
}

class PublicKey {
    constructor(key) {
        if (typeof key === 'string' && key.length === 88) {
            this.uncompressed = Buffer.from(key, 'base64')
            this.compressed = Buffer.from(secp256k1.publicKeyConvert(this.uncompressed, true))
        } else if (Buffer.isBuffer(key) && key.length === 32) {
            this.compressed = Buffer.from(secp256k1.publicKeyCreate(key))
            this.uncompressed = Buffer.from(secp256k1.publicKeyConvert(this.compressed, false))
        }
        if (!secp256k1.publicKeyVerify(this.compressed)) throw new Error(`Public key ${key} verification failed`)
        else if (!secp256k1.publicKeyVerify(this.uncompressed)) throw new Error(`Public key ${key} verification failed`)
        this.uncompressedUint8Array = new Uint8Array(this.uncompressed)
        this.source = key
    }
}

function processKey(key) {
    switch (key.length) {
        case 48:
        case 64:
            return new PrivateKey(key)
        case 88:
            return new PublicKey(key)
        default: throw new Error(`Key ${key} not recognized`)
    }
}

module.exports = {
    PrivateKey,
    PublicKey,
    processKey
}