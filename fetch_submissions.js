const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/my_database.db');

// データベースから全てのユーザーデータを取得
db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('User Submissions:');
    rows.forEach((row) => {
        console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}, Message: ${row.message}`);
    });
});

// データベース接続を終了
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Database connection closed.');
});
