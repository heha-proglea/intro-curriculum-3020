'use strict';
const postsHandler = require('./posts-handler');

function route(req, res) {
  switch (req.url) {
    case '/posts':
      // /posts にアクセスがあった時の処理
      postsHandler.handle(req, res); // posts-handlerモジュールのhandle関数を呼び出し
      break;
    default:
      break;
  }
}

// 関数のモジュール化
module.exports = {
  route: route
};