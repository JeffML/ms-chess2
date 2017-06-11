module.exports = function rankAndFile() {
    this.add({
        role: "movement",
        cmd: "rankAndFileMoves"
    }, (msg, reply) => {
        const result = rankAndFileImpl(msg.position, msg.range || 7, msg.asVectors)
        reply(null, result);
    })
}

function rankAndFileImpl(position, range, asVectors) {
    var vectors = [[], [], [], []];

    const cFile = position.file.charCodeAt()
    const cRank = position.rank.charCodeAt();

    for (var i = 1; i < range + 1; i++) {
        vectors[0].push({
            file: String.fromCharCode(cFile - i),
            rank: String.fromCharCode(cRank)
        });
        vectors[1].push({
            file: String.fromCharCode(cFile),
            rank: String.fromCharCode(cRank + i)
        });
        vectors[2].push({
            file: String.fromCharCode(cFile + i),
            rank: String.fromCharCode(cRank)
        });
        vectors[3].push({
            file: String.fromCharCode(cFile),
            rank: String.fromCharCode(cRank - i)
        });
    }

    if (asVectors) {
        return vectors;
    }

    const moves = Array.prototype.concat(...vectors);
    return moves;
}
