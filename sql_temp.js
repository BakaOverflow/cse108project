const sqlite3 = require("sqlite3").verbose();
let sql;

const db = new sqlite3.Database("./checkers.db", sqlite3.OPEN_READWRITE, (err) =>{
    if (err) return console.error(err.message);
});

// //create tables
// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, user_name TEXT, user_pass TEXT)';
// db.run(sql);
// sql = 'CREATE TABLE games(id INTEGER PRIMARY KEY, player1_id INTEGER, player2_id INTEGER, game_state TEXT)';
// db.run(sql);
// sql = 'CREATE TABLE games_history(id INTEGER PRIMARY KEY, move_number INTEGER, player_number INTEGER, piece_start TEXT, piece_end TEXT)';
// db.run(sql);

// //insert data
// sql = 'INSERT INTO games(id, player1_id, player2_id, game_state) VALUES (?, ?, ?, ?)';
// db.run(
//     sql,
//     [1, 1, 2, "test"],
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// )

// //update data
// sql = 'UPDATE games SET game_state = ? WHERE id = ?';
// db.run(sql, ["testing", 1], (err) => {
//     if (err) return console.error(err.message);
// });

// //delete data
// sql = 'DELETE games WHERE WHERE id = ?';
// db.run(sql, [1], (err) => {
//     if (err) return console.error(err.message);
// });

//querying data, returns as dict
sql = 'SELECT * FROM games';
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
        console.log(row["id"]);
    });
});
