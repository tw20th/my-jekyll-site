// database_test.js
const sqlite3 = require('sqlite3').verbose();

// データベース接続
const db = new sqlite3.Database('./database/my_database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('SQLiteデータベースに接続されました。');
});

// データの挿入
db.run(`INSERT INTO users(name, email) VALUES(?, ?)`, ['Tomoki', 'tomoki@example.com'], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`ユーザーが追加されました。ID: ${this.lastID}`);
});

// データの取得
db.all(`SELECT * FROM users`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log('データベースから取得したユーザー情報:');
  rows.forEach((row) => {
    console.log(`${row.id}: ${row.name} - ${row.email}`);
  });
});

// データベース接続を閉じる
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('SQLiteデータベース接続が終了しました。');
});
