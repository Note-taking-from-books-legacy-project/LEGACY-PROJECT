const mongoose = require("mongoose")

async function connectDB() {
  const conn = await mongoose.connect("mongodb+srv://dimitris:Dimitris1@cluster0.6w9rzwk.mongodb.net/Note-taking-from-books?retryWrites=true&w=majority")
  console.log(`MongoDB Connected: ${conn.connection.host}`);
}



module.exports = connectDB