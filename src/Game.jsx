import { List } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
import * as appActions from "./AppActions";
import Settings from "./Settings";

export default function Game() {
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

    if (!isAuthenticated) {
        useNavigate("/login") //change to proper route
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
