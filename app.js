
const session = require("express-session");
const flash = require("connect-flash");
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static("public"));

mongoose.connect("mongodb+srv://samymahmoud2060_db_user:<db_password>@cluster0.d0ryxgg.mongodb.net/?appName=Cluster0");

app.get("/", async (req, res) => {
  const data = await Student.find();
  res.render("index", { data });
});

app.get("/add", (req, res) => {
  res.render("user/add");
});

app.post("/add", async (req, res) => {
  try {
    await Student.create(req.body);
    req.flash("success", "Student added successfully");
    res.redirect("/");
  } catch (err) {
    req.flash("error", "Error adding student");
    res.redirect("/");
  }
});


app.get("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  req.flash("success", "Student deleted successfully");
  res.redirect("/");
});


app.get("/edit/:id", async (req, res) => {
  const user = await Student.findById(req.params.id);
  res.render("user/edit", { user });
});

app.post("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.post("/search", async (req, res) => {
  const data = await Student.find({ name: req.body.name });
  res.render("index", { data });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

