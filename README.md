# [SHOKUNIN 2019] April Challenge: Game of Pawns

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![CircleCI](https://circleci.com/gh/schalela/game-of-pawns.svg?style=svg)](https://circleci.com/gh/schalela/game-of-pawns)

The April TW Shokunin challenge: generate a semi-realistic random chess board according to some rules:

* there is one and only one king of each color;
* the kings must not be placed on adjacent squares;
* there can not be any pawn in the promotion square (no white pawn in the eighth rank, and no black pawn in the first rank);
* including the kings, up to 32 pieces of either color can be placed. There is no requirement for material balance between sides, but the picking of pieces should comply with what is found in a regular chess set (e.g., 8 pawns/colour, 1 queen/colour, etc)
* (FEN requirement only) it is white's turn, both sides have lost castling rights and there is no possibility for en passant (the FEN should thus end in w - - 0 1).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This application requires Node.js 10+.

### Run the application

For a FEN-formatted chess board, run `./go.sh --fen`. This produces output like:

```
2q5/3r1p2/p3P1B1/2P1n1k1/5b2/1p2P3/b2r4/K7 w - - 0 1
```

For a plain text chess board, run `./go.sh --grid`. This produces output like:

```
........
.p.pP...
...Bp..Q
.P....r.
.pP.....
....qpk.
.......P
KNn....b
```

For the web view run `yarn web`. This will start a server in localhost:3000 with a SSR react application displaying the chess board and updating the pieces every 10 seconds. A deployed version of this application can be found at: https://game-of-pawns-git-master.schalela.now.sh/

![Web Screenshot](webscreenshot.png)


## Running the tests

```
yarn test
```

## Built With

* [Next.js](https://nextjs.org/) - The React Framework
* [Jest](https://jestjs.io/) - Delightful JavaScript Testing

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
