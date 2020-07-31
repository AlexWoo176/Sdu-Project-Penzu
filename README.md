“ng serve” thành “start”: “node.server.js” và sửa “build”: “ng build” thành “build”: “ng build — aot — prod”
==================================
"engines": {
  "node": "12.0.0",
  "npm": "6.9.0"
}
==================================
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/{{your-app-name}}'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/{{your-app-name}}/index.html'));
});
app.use(forceSSL());
app.listen(process.env.PORT || 8080);
===================================
Và cuối cùng các bạn vào file .gitignore và xóa bỏ dòng /dist
==================================
npm install: lệnh này dùngđể đọc file package.json
node server.js : lệnh này để chạy dự án.
