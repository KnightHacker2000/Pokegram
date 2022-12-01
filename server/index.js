const express = require('express');
const cors = require('cors');
const dbop = require('./db');
const API = require('./endpoints');
const actRouter = require('./routes/activityRouter');
const postRouter = require('./routes/postRouter');
const usrRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');

// Create express app
const app = express();
app.use(cors());
const port = 8080;
app.use(express.urlencoded({
  extended: true,
}));

let db;

app.listen(port, async () => {
  // db = await dbop.connect();
  const dbcon = await dbop.connect();
  db = dbcon.db();
  console.log(`Server running on port:${port}`);
  await dbop.addDummyData(db).then(
    (res) => { console.log(res); },
  ).catch((err) => { console.log(`error: ${err.message}`); });
});

app.use(API.ACT, actRouter);
app.use(API.USER, actRouter);
app.use(API.POSTS, postRouter);
app.use(API.USER, usrRouter);
app.use(API.LOGIN, loginRouter);

module.exports = app;
