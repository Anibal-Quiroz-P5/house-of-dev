/* const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./db");
const routes = require("./routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Server listening at port 3001 ");
  });
}); */


const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})