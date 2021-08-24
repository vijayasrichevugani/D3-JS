import express from 'express';
import * as fs from "fs";
import * as d3 from "d3";

const app = express()

app.set('view engine', 'ejs');

app.use(express.static('public'));

var data = fs.readFileSync("data.csv", "utf8")

data = d3.csvParse(data, function(d) { 
  if(d["globalUltimate.duns"] == d["domesticUltimate.duns"]) {
    d["globalUltimate.duns"] = "1";
  }
  return {
    parentId: d["globalUltimate.duns"],
    id: d["domesticUltimate.duns"],
    name: d.du_primaryName
  };
});

app.get('/', function (req, res) {
  res.render('index', {
    data: JSON.stringify(data),
  });
})
 
app.listen(1337)