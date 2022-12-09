const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const dbop = require('./db');
const { API } = require('./config');
const actRouter = require('./routes/activityRouter');
const postRouter = require('./routes/postRouter');
const usrRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const commentRouter = require('./routes/commentRouter');

// Create express app
const app = express();
app.use(cors());
// const port = 8080;
app.use(express.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

/*
app.listen(port, async () => {
  // db = await dbop.connect();
  const dbcon = await dbop.connect();
  db = dbcon.db();
  console.log(`Server running on port:${port}`);
  await dbop.addDummyData(db).then(
    (res) => { console.log(res); },
  ).catch((err) => { console.log(`error: ${err.message}`); });
});
*/

app.use(API.ACT, actRouter);
app.use(API.POSTS, postRouter);
app.use(API.USER, usrRouter);
app.use(API.LOGIN, loginRouter);
app.use(API.COMMENTS, commentRouter);

module.exports = app;
