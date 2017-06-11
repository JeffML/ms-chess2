const rankAndFileMoves = require("./helpers/rankAndFileMoves")
const diagonalMoves = require("./helpers/diagonalMoves")

module.exports = function movement() {
    this.use(rankAndFileMoves)
    this.use(diagonalMoves)

    this.add({
        role: "movement",
        cmd: "rawMoves",
    }, (msg, reply) => {
        var err = null;
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
            this.act({
                role: "movement",
                cmd: "diagonalMoves",
                position: pos
            }, reply);
            return;
        case 'Q':
            this.act({
                role: "movement",
                cmd: "rankAndFileMoves",
                position: pos
            }, (err, results) => {
                this.act({
                    role: "movement",
                    cmd: "diagonalMoves",
                    position: pos
                }, (err, results2) => {
                    reply(null, results.concat(results2));
                });
            });
            return;
        case 'K':
            this.act({
                role: "movement",
                cmd: "rankAndFileMoves",
                position: pos,
                range: 1
            }, (err, results) => {
                this.act({
                    role: "movement",
                    cmd: "diagonalMoves",
                    position: pos,
                    range: 1
                }, (err, results2) => {
                    reply(null, results.concat(results2));
                });
            });
            return;
        default:
            err = "unhandled " + msg.piece;
            break;
        };

        reply(err);
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
