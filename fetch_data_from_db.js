// fetch_data_from_db.js
const sqlite3 = require('sqlite3').verbose();

// データベースに接続
const db = new sqlite3.Database('/Users/tw20th/web_development/my-jekyll-site/database/my_database.db');

// データベースからデータを取得
db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Users data:");
    rows.forEach((row) => {
        console.log(row);
    });
});

// データベース接続を閉じる
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Database connection closed.");
});
