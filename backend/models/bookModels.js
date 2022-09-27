const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  note: String

})


module.exports = mongoose.model("Book", bookSchema)
