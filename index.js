'use strict';
// モジュールの読み込み
const http = require('http');
// 自家製モジュールの読み込み
const router = require('./lib/router');

// サーバーオブジェクトの作成
const server = http.createServer((req, res) => {
  // router関数によって、リクエストの振り分け処理を行う
  router.route(req, res);
}).on('error', (e) => {
  // errorイベント発生時に呼び出されるコールバック関数
  console.error('Server Error', e);
}).on('clientError', (e) => {
  // clientErrorイベント発生時に呼び出されるコールバック関数
  console.error('Client Error', e);
});

// サーバーの起動
const port = 8000;
server.listen(port, () => {
  // サーバーを起動時に実行されるコールバック関数
  console.info('Listening on ' + port);
});