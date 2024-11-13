const sqlite3 = require('sqlite3').verbose();

// データベース接続
const db = new sqlite3.Database('./database/my_database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('SQLiteデータベースに接続されました。');
});

// データの挿入 (Create)
const insertUser = (name, email) => {
  db.run(`INSERT INTO users(name, email) VALUES(?, ?)`, [name, email], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`ユーザーが追加されました。ID: ${this.lastID}`);
  });
};

// データの取得 (Read)
const getAllUsers = () => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('データベースから取得したユーザー情報:');
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.name} - ${row.email}`);
    });
  });
};

// データの更新 (Update)
const updateUser = (id, newName, newEmail) => {
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [newName, newEmail, id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`ユーザーID ${id} の情報が更新されました。`);
  });
};

// データの削除 (Delete)
const deleteUser = (id) => {
  db.run(`DELETE FROM users WHERE id = ?`, id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`ユーザーID ${id} が削除されました。`);
  });
};

// 実行例
insertUser('John Doe', 'john@example.com'); // 新しいユーザーを追加
getAllUsers();                              // すべてのユーザーを取得
updateUser(1, 'Jane Doe', 'jane@example.com'); // ID 1 のユーザーを更新
deleteUser(1);                               // ID 1 のユーザーを削除

// データベース接続を閉じる
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('SQLiteデータベース接続が終了しました。');
});
