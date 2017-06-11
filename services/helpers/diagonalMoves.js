module.exports = function diagonal() {
    this.add({
        role: "movement",
        cmd: "diagonalMoves"
    }, (msg, reply) => {
        const result = diagonalImpl(msg.position, msg.range || 7, msg.asVector)
        reply(null, result)
    })
}

function diagonalImpl(position, range, asVectors) {
    var vectors = [[], [], [], []];
    const cFile = position.file.charCodeAt()
    const cRank = position.rank.charCodeAt();

    for (var i = 1; i < range + 1; i++) {
        vectors[0].push({
            file: String.fromCharCode(cFile - i),
            rank: String.fromCharCode(cRank - i)
        });
        vectors[1].push({
            file: String.fromCharCode(cFile + i),
            rank: String.fromCharCode(cRank + i)
        });
        vectors[2].push({
            file: String.fromCharCode(cFile - i),
            rank: String.fromCharCode(cRank + i)
        });
        vectors[3].push({
            file: String.fromCharCode(cFile + i),
            rank: String.fromCharCode(cRank - i)
        });
    }

    if (asVectors) {
        return vectors;
    }

    const moves = Array.prototype.concat(...vectors)
    return moves;
}
