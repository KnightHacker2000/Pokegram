const dbop = require('./db');
const webapp = require('./server');

 // (5) define the port
 const port = 8080;
 let db;
 /*
 // start the server and connect to the DB
 webapp.listen(port, async () => {
   console.log(`Server running on port: ${port}`);
 });
 */

 webapp.listen(port, async () => {
  // db = await dbop.connect();
  const dbcon = await dbop.connect();
  db = dbcon.db();
  console.log(`Server running on port:${port}`);
  await dbop.addDummyData(db).then(
    (res) => { console.log(res); },
  ).catch((err) => { console.log(`error: ${err.message}`); });
});
