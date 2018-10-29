'use strict';
const pug = require('pug');
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        // 「dataという名のデータを受け取る」イベント発生時に呼び出されるコールバック関数
        body.push(chunk);
      }).on('end', () => {
        // 「endという名のデータを受け取る」イベント発生時に呼び出されるコールバック関数
        // Buffer.concat関数で複数のバッファを結合後、文字列に変換
        body = Buffer.concat(body).toString();
         // URIエンコードされたデータのデコード
        const decoded = decodeURIComponent(body);
        // htmlフォームのtextareaで設定したキーcontentを用いて、その値を取得(データはkey=valueの形)
        const content = decoded.split('content=')[1];
        // 投稿内容を保存
        contents.push(content);
        console.info('投稿されました: ' + content);
        console.info('現在の投稿内容一覧: ' + contents);
        // 定義した関数を用いて、リダイレクトをハンドリング
        handleRedirectPosts(req, res);
      });
      break;
    default:
      break;
  }
}

// リダイレクトをハンドリングする関数
function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    // ステータスコード303:「POSTでアクセスしましたね。処理が終わり次第、GETでまたここへ来て下さい」
    'Location': '/posts'
  });
  res.end();
}

// 関数のモジュール化
module.exports = {
  handle: handle
};