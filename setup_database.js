// 必要なモジュールを読み込み
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// データベースファイルのパスを指定
const dbDir = path.join(__dirname, 'database');
const dbPath = path.join(dbDir, 'my_database.db');

// データベースフォルダが存在しない場合は作成
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
    console.log(`フォルダ 'database' を作成しました。`);
}

// データベースファイルを作成し、接続
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error('データベース接続エラー:', err.message);
    }
    console.log('SQLiteデータベースに接続されました。');
});

// テーブルを作成
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            return console.error('テーブル作成エラー:', err.message);
        }
        console.log('usersテーブルが正常に作成されました。');
    });
});

// データベース接続を閉じる
db.close((err) => {
    if (err) {
        return console.error('データベース切断エラー:', err.message);
    }
    console.log('SQLiteデータベース接続が終了しました。');
});
