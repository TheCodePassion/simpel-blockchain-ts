"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto"); // npm install @types/node
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    calculateHash(nonce) {
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
    mine() {
        let hash;
        let nonce = 0;
        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);
        return { nonce, hash };
    }
}
