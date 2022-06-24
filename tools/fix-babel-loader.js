const fs = require("fs");

const files = [
  "./node_modules/@veramo/selective-disclosure/node_modules/did-jwt/lib/index.module.js",
  "./node_modules/@veramo/kms-local/node_modules/did-jwt/lib/index.module.js",
  "./node_modules/@veramo/key-manager/node_modules/did-jwt/lib/index.module.js",
  "./node_modules/did-jwt/lib/index.module.js",
];

for (const file of files) {
  fs.readFile(file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace("??", "||");

    fs.writeFile(file, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}

console.log('Done!');
