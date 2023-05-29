require('dotenv').config()

const PORT = process.env.PORT || 5000;

const express = require('express')

const authRoutes = require('./routes/auth')
const pokemonsRoutes = require('./routes/pokemon')
const usersRoutes = require('./routes/userRoute')


const MiddlewarelogRequest = require('./middleware/logs.js')


const app = express()
//Default Pattern routing express
// app.method(path, handler);
//example
// app.use --> mecakup umum seperti post,pull, get dll dan  biasanya sbg Middleware 

// app.use("/", (req, res, next) => {
//   res.send("Hello World");
// })

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//middleware
app.use(MiddlewarelogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));

app.use('/login', authRoutes );
app.use('/pokemons', pokemonsRoutes);
app.use('/users', usersRoutes );





// //spesifik Method get
// app.get("/", (req, res) => {
//   //Default respon dg send
//   // res.send("GET Ni boss");
//   // menalpikan data json
//    res.json({
//      message: "Hello World"
//   })
// })

// //spesifik Method post
// app.post("/", (req, res) => {
//   res.send("POST Ni boss");
// })


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}) 