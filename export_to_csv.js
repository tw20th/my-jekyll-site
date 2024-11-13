// 必要なモジュールをインポート
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// データベースに接続
const dbPath = path.join(__dirname, 'database', 'my_database.db');
const db = new sqlite3.Database(dbPath);

// CSVファイルのパス
const csvPath = path.join(__dirname, 'exported_data.csv');

// ヘッダー行の内容
const headers = 'ID, Name, Email, Phone\n';

// CSVにデータを書き込む関数
function exportToCSV() {
    // ヘッダーをファイルに書き込み
    fs.writeFileSync(csvPath, headers);

    // データベースからデータを取得
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error("エクスポート時にエラーが発生しました:", err.message);
            return;
        }

        // データ行を書き込む
        rows.forEach(row => {
            const dataLine = `${row.id}, ${row.name}, ${row.email}, ${row.phone}\n`;
            fs.appendFileSync(csvPath, dataLine);
        });

        console.log("データがCSVファイルにエクスポートされました:", csvPath);
    });

    // データベース接続を閉じる
    db.close((err) => {
        if (err) {
            console.error("データベース切断時にエラーが発生しました:", err.message);
        }
        console.log("データベース接続が閉じられました。");
    });
}

// 関数を実行
exportToCSV();
