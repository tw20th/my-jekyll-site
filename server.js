const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// データベースの設定
const db = new sqlite3.Database('./database/my_database.db', (err) => {
  if (err) {
    console.error('データベースに接続できませんでした:', err);
  } else {
    console.log('データベースに接続しました');
  }
});

// フォームデータを解析するためのミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 送信されたデータをデータベースに保存するエンドポイント
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // データベースにデータを挿入
  const query = `INSERT INTO users (name, email, message) VALUES (?, ?, ?)`;
  db.run(query, [name, email, message], (err) => {
    if (err) {
      console.error('データを保存中にエラーが発生しました:', err);
      res.status(500).send('データの保存に失敗しました');
    } else {
      console.log('データが正常に保存されました');
      res.status(200).send('データが正常に保存されました');
    }
  });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
