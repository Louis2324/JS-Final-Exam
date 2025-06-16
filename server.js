const express = require("express");
const crypto = require("crypto");
const { validateStudentData, saveData, loadData } = require("./helpers.js");
const app = express();

app.use(express.json());

let students = [];
//student class
class Student {
  constructor(name, grade) {
    this.name = name.trim();
    this.grade = grade.trim();
    this.createdAt = new Date();
    this.id = crypto.randomUUID();
  }

  getDetails() {
    return `Name: ${this.name}, Grade: ${
      this.grade
    }, Created: ${this.createdAt.toLocaleDateString()}`;
  }
}

app.post("/api/students/", (req, res) => {
  const { name, grade } = req.body;
  const error = validateStudentData(name, grade);
  if (error) return res.status(400).json({ error });
  const newStudent = new Student(name, grade);
  students.push(newStudent);
  saveData(students);
  return res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

app.get("/api/students/", (req, res) => {
  return res.status(200).json(students);
});


app.use();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  students = loadData(); //get the data from the students file when starting server
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
