# ChessMaster - A React Chess Game
Chessmaster is a 2-player chess game that works using Rails' Action Cable.


The game logic is vanilla Javascript, while the board, pieces, and the rest of the user interface are React components.


#### To Get Started
1. Clone down this repo to your computer
2. Clone down the backend repo ([here](https://github.com/jrgreiner115/react-chess-api))
3. Cd into the front-end file (this one).
4. In the terminal, run `npm install` to install any dependencies for the front end
5. Start the front-end local server with `npm start`.
6. Open another instance of the terminal and open the back-end file
7. Install any depenencies by running `bundle install`
8. Start the API server by running `rails s -p 3001`


#### Key Features
This React Chess Game uses a Rails API to run & serve moves via websocket, as well as persist piece locations. You can find that socket [here](https://github.com/jrgreiner115/react-chess-api).

Further plans include completing the web socket configuration to allow for multiple users & games to occur at the same time.

#### Demo
[![watch this video](https://i.imgur.com/Z8CTjL1.png)](https://www.youtube.com/watch?v=kVhWSXrkN5k&feature=youtu.be)
[Link to Youtube Demo](https://www.youtube.com/watch?v=kVhWSXrkN5k&feature=youtu.be)
