import React from "react";
import { List } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
import * as appActions from "./AppActions";
import Settings from "./Settings";
import Login from "./Login"; // Import the Login component
import Registration from "./Registration"; // Import the Registration component

const API_URL = "http://localhost:3000/";
const LOGIN_ENDPOINT = "api/users/";

// login function (should probably move to a better place)

function userLogin(inputUser, inputPass) {
  const sendLogin = {
    username: inputUser,
    password: inputPass,
  };
  fetch(API_URL + LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
        'Content-Type': "application/json",
    },
    body: JSON.stringify(sendLogin),
  })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()
    })
    .then(data => {
        setAlertMessage("Logging in");
        setOpen(true);
        localStorage.setItem('username', inputUser);
        navigate("/");
    })
    .catch(error => {
        console.error('Error', error);
        setAlertMessage("Failed to login");
        setOpen(true);
    });
}

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
      showLogin: true, // State to control login display
      isAuthenticated: false // State to check if user is authenticated
    };
  }

  componentDidMount() {
    appActions.init(this);
  }

  render() {
    const { blackPieces, whitePieces, table, whoPlay, isAuthenticated, showLogin } = this.state;
    if (!isAuthenticated) {
      return (
        <div className="authentication">
          {showLogin ? (
            <Login />
          ) : (
            <Registration />
          )}
          <button onClick={() => this.setState({ showLogin: !showLogin })}>
            {showLogin ? "Register" : "Login"}
          </button>
        </div>
      );
    }

    return (
      <div className="app">
        <PiecesCounterBar blackPieces={blackPieces} whitePieces={whitePieces} />
        <div className="bar">
          <Button variant="primary" onClick={() => appActions.showMenu(this, true)}>
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