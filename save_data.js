const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// データベース接続を設定
const db = new sqlite3.Database('./database/my_database.db');

// ユーザーデータを取得し、データベースに保存する関数
async function fetchAndSaveData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    // users テーブルを削除して再作成
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS users`);
      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          name TEXT,
          email TEXT,
          phone TEXT
        )
      `);

      // データを挿入
      const insertStmt = db.prepare('INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)');
      users.forEach(user => {
        insertStmt.run(user.id, user.name, user.email, user.phone);
      });
      insertStmt.finalize();

      console.log('ユーザーデータがデータベースに保存されました。');
    });
  } catch (error) {
    console.error('データの取得または保存中にエラーが発生しました:', error);
  } finally {
    db.close();
  }
}

// 関数を実行
fetchAndSaveData();
