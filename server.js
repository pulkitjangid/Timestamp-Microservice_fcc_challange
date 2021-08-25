var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:stamp?", function (req, res) {
  let par = req.params.stamp;
  var date = new Date(parseInt(par));
  date.setTime(par);
  let p = date.toUTCString()
  let q = date.getTime()

  if (!par) {
    let mili = new Date();
    res.json({ unix: mili.getTime(), utc: mili.toUTCString()})
  }
  else if (!par == '') {
    let string = par;
    if (string[4] == '-' && string[7] == '-') {
      let arr = string.split("-")
      if (arr[0] >= 1000 && arr[0] <= 3000) {
        if (arr[1] >= 1 && arr[1] <= 12) {
          if (arr[2] >= 1 && arr[2] <= 31) {
            let d = new Date(string);
            res.json({ unix: d.getTime(), utc: d.toUTCString() })
          }
          else {
            res.json({ error: "Invalid Date" })
          }
        }
      }
    }
  }
  //if invalid date is passed
  if (date.toString() == "Invalid Date") {
    res.json({ error: "Invalid Date" })
  }
  //if milliseconds passed
  else if (par.toString().length == 13) {
    date.setTime(par)
    res.json({ unix: q, utc: p })
  }

});

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port 3000...');
});
