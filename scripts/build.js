const ejs = require("ejs");
const siteData = require("../src/site-data.json");

const config = {
  entry: "src/index.html.ejs",
  out: "./.dist/",
};

ejs.renderFile(entry, siteData, {}, function (err, str) {
  console.log(err);
  console.log(str);
});
