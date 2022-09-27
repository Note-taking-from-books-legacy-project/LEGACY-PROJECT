const express = require("express")
const app = express()
const cors=require("cors")
const PORT = 8000
const connectDB = require("./config/db")
const Book = require("./models/bookModels")

connectDB()

//middleware is a function which chronically runs between request and response (req-middleware-res)
app.use(express.json())
app.use(cors());
//This middleware used to take data from form
app.use(express.urlencoded({
  extended: false
}));

app.route("/api/books").get(async (req, res) => {
  const books = await Book.find()
  res.json(books)
}).post(async (req, res) => {
  const {
    title,
    author,
    note
  } = req.body
  const book = await Book.create({
    title,
    author,
    note
  })
  res.json(book)
})


app.route("/api/books/:id").delete(async (req, res) => {
  const book = await Book.findById(req.params.id)
  await book.remove()
  res.json({
    message: "book deleted"
  })
}).put(async (req, res) => {
  console.log("update book id: " + req.params.id)
  const {
    note
  } = req.body
  let book = await Book.findById(req.params.id)
  book.note = req.body.note
  await book.save()
  res.json(book)
})





app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
})