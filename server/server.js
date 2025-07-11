require('dotenv').config();
const express = require('express'); //express is a powerful framework used to build the backend
const cors = require('cors'); //Cross-Origin Resource Sharing used for communication of two different domains working on different ports
const mongoose=require("mongoose"); //MongoDB
const app = express(); //storing express in app and creating our application

//session management
const session = require("express-session");
const MongoStore = require("connect-mongo");


// 👇 Place this line FIRST — BEFORE express.json and any routes
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook error:", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment completed:", session.id);
    // TODO: update DB, mark order paid if you store it
  }

  res.status(200).json({ received: true });
});

       
app.use(express.json({ limit: '50mb' })); // for JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  session({
    secret: "hello12", // change to a strong secret and store in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true               
})); 

// app.use(express.json()); //app.use( ) will make use of cors and express.json which takes the json formatted data from the req.body


//static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist'))); // Serve static files from the React app

// local db connection
// main()
//     .then(()=>{
//       console.log("Connection Successful");
//     })
//     .catch((err)=>{
//       console.log(err);
//     })

// async function main(){
//   await mongoose.connect("mongodb://localhost:27017/replato"); //connection string "mongodb://localhost:27017/DB_NAME"
// }
app.use("/api", require("./payment/stripe"));     // prefix all payment routes with /api


//Cloud DB connections
//for this run the command "npm install dotenv"
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

//models importing
// use seed.js to export data to cloud
const { User } = require("./models/user");
const { Donate } = require("./models/donate"); 
const {Inform} =require("./models/inform");


//Routes
//Landing Page
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // All GET requests that aren't handled by API routes return the React app
});

//Login verification

app.post("/login",async(req,res)=>{ 
  const {userName,password}=req.body;
  const user=await User.findOne({userName:userName,password:password});
  if(user){
      req.session.userId = user._id;
      console.log("success");
      res.json({"success":true});
  }
  else{
      console.log("failure");
      res.json({"success":false});
  }
});

//Registration

app.post("/register",async(req,res)=>{
  console.log(req.body);
  const {info}=req.body;
  if(info.password!==info.confirmPassword){
    return res.json({success:false,msg:"pwd"});
  }
  let user=await User.findOne({userName:info.userName});
  if(user){
    return res.json({success:false,msg:"user"});
  }
  const newUser=new User({
    userName: info.userName,
    fullName: info.fullName,
    gender: info.gender,
    email: info.email,
    contactNumber: info.contactNumber,
    password: info.password,
    address: info.address,
    type: info.type,
  });
  await newUser.save();
  return res.json({success:true,msg:"Registration Successfull!"});
});

//Profile page
app.get("/profile", async (req, res) => {
    if (!req.session.userId) {
    return res.status(401).json({ 
      success: false,
      message: "Login to view your profile" 
    });
  }
  try {
    const data = await User.findById(req.session.userId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching donation data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// donation
// server.js (excerpt)
app.post("/donate", async (req, res) => {
    if (!req.session.userId) {
    return res.status(401).json({ 
      success: false,
      message: "Login to Donate" 
    });
  }
  try {
    // req.body.info already matches the schema 1-to-1
    const doc = await Donate.create(req.body.info);
    res.json({ success: true, msg: "Donation saved!", id: doc._id });
  } catch (err) {
    console.error("Donation failed:", err);
    res.status(400).json({ success: false, msg: err.message });
  }
});

app.post("/inform",async(req,res)=>{
    if (!req.session.userId) {
    return res.status(401).json({ 
      success: false,
      message: "Login to Inform" 
    });
  }
  try{
    const doc = await Inform.create(req.body.info);
     res.json({ success: true, msg: "Inform saved!", id: doc._id });
  } catch (err) {
    console.error("Inform failed:", err);
    res.status(400).json({ success: false, msg: err.message });
  }
});

app.get("/logout", (req, res) => {
  console.log("/logout hit");
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true }); // ✅ Send just a success message
  });
});


// add after other routes in server/server.js
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;   // set via Stripe CLI

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook error:", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    Order.findOneAndUpdate({ ref: session.id }, { paid: true }).exec();
  }

  res.json({ received: true });
});



app.listen(5000, () => console.log('Server running on http://localhost:5000'));