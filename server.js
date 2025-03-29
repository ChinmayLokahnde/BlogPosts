const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const userRoutes = require("./routes/userroutes"); 
const blogRoutes = require("./routes/blogroutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes); 
app.use("/api/blogs", blogRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(" MongoDB Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
