import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from "socket.io-client";

import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
import * as appActions from "./AppActions";
import Settings from "./Settings";
//import Home from './Home';
import Login from './Login';
import Game from './Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      table: [],
      blackStarts: true,
      whoPlay: "black",
      tileSelected: null,
      blackPieces: 12,
      whitePieces: 12,
      nexMoveInAnyDirection: false,
      showMenu: false,
      isAuthenticated: false // Assume authentication state can be derived from somewhere
    };
  }

  componentDidMount() {
    this.initSocket();
    appActions.init(this);
  }

  initSocket = () => {
    const socket = io('http://localhost:3000');
    socket.on('game update', (move) => {
      console.log("Received game update", move);
      // Here you would handle updating the game state based on the move received
    });
    this.setState({ socket });
  };

  renderGame = () => {
    const { blackPieces, whitePieces, table, whoPlay } = this.state;
    return (
      <div className="app">
        <PiecesCounterBar blackPieces={blackPieces} whitePieces={whitePieces} />
        <div className="bar">
          <button onClick={() => appActions.showMenu(this, true)}>
            Menu
          </button>
          <div className="whoPlay">{whoPlay} plays</div>
        </div>
        <Table table={table} onClick={(evt) => appActions.onClick(this, evt)} />
        <div className="buttons">
          <button onClick={() => appActions.restart(this)}>
            Restart Game
          </button>
        </div>
        {this.state.showMenu && <Settings component={this} />}
      </div>
    );
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={this.renderGame()} />
        </Routes>
      </Router>
    );
  }
}

export default App;




/*
Old App.jsx code kept in case things break:
import React from "react";
import { List } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
import * as appActions from "./AppActions";
import Settings from "./Settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      blackStarts: true,
      whoPlay: "black",
      tileSelected: null,
      blackPieces: 12,
      whitePieces: 12,
      nexMoveInAnyDirection: false,
      showMenu: false,
    };
  }

  componentDidMount() {
    appActions.init(this);
  }

  render() {
    const { blackPieces, whitePieces, table, whoPlay } = this.state;
    return (
      <div className="app">
        <PiecesCounterBar blackPieces={blackPieces} whitePieces={whitePieces} />
        <div className="bar">
          <Button
            variant="primary"
            onClick={() => appActions.showMenu(this, true)}
          >
            <List size="50" />
          </Button>
          <div className="whoPlay">{whoPlay} plays</div>
        </div>
        <Table table={table} onClick={(evt) => appActions.onClick(this, evt)} />
        <div className="buttons">
          <Button variant="primary" onClick={() => appActions.restart(this)}>
            Restart Game
          </Button>
        </div>
        {this.state.showMenu && <Settings component={this} />}
      </div>
    );
  }
}

export default App;
*/