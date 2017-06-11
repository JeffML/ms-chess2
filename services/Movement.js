const rankAndFileMoves = require("./helpers/rankAndFileMoves")
const diagonal = require("./helpers/diagonalMoves")

module.exports = function movement() {
    this.use(rankAndFileMoves);

    this.add({
        role: "movement",
        cmd: "rawMoves",
    }, (msg, reply) => {
        var err = null;
        var rawMoves = [];

        var pos = msg.piece.position;

        switch (msg.piece.piece) {
        case 'R':
            this.act({
                role: "movement",
                cmd: "rankAndFileMoves",
                position: pos
            }, reply);
            return;
        case 'B':
            rawMoves = diagonal(pos);
            break;
        case 'Q':
            this.act({
                role: "movement",
                cmd: "rankAndFileMoves",
                position: pos
            }, (err, results) => {
                reply(results.concat(diagonal(pos)))
            });
            return;
        case 'K':
            this.act({
                role: "movement",
                cmd: "rankAndFileMoves",
                position: pos,
                range: 1
            }, (err, results) => {
                reply(results.concat(diagonal(pos, 1)))
            });
            return;
        default:
            err = "unhandled " + msg.piece;
            break;
        };

        reply(err, rawMoves);
    });

    this.add({
        role: "movement",
        cmd: "legalSquares",
    }, (msg, reply) => {
        const isPawn = msg.piece.piece === 'P';
        const isKnight = msg.piece.piece === 'N';

        this.act({
            role: "movement",
            cmd: "rawMoves",
            piece: msg.piece,
            isPawn: isPawn,
            isKnight: isKnight
        }, (err, msg) => {
            const squared = [];

            msg.forEach((move) => {
                if (move.file >= 'a' && move.file <= 'h') {
                    if (move.rank >= 1 && move.rank <= 8) {
                        squared.push(move)
                    }
                }
            })

            reply(null, squared);
        });
    })
};
