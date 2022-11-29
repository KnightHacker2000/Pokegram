const express = require('express');
const cors = require('cors');
const dbop = require('./db');
const API = require('./endpoints');
const actRouter = require('./routes/activityRouter');

// Create express app
const app = express();
app.use(cors());
const port = 8080;
app.use(express.urlencoded({
  extended: true,
}));

let db;

app.listen(port, async () => {
  db = await dbop.connect();
  console.log(`Server running on port:${port}`);
  await dbop.addDummyData(db).then(
    (res) => { console.log(res); },
  ).catch((err) => { console.log(`error: ${err.message}`); });
});

app.use(API.ACT, actRouter);
app.use(API.USER, actRouter);

module.exports = app;
