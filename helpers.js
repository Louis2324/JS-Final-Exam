const fs = require("fs");
const path = require("path");
const FILE_PATH = path.join(__dirname, "students.txt");


function validateStudentData(name, grade) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Name is required and must be a non-empty string";
  }
  if (!grade || typeof grade !== "string" || grade.trim() === "") {
    return "Grade is required and must be a non-empty string";
  }
  return null; 
}

// Save data to file
function saveData(data) {
  try {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(FILE_PATH, json, "utf8");
    console.log("Data saved to file");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Load data from file
function loadData() {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const content = fs.readFileSync(FILE_PATH, "utf8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    console.error("Error:", err.message);
    return [];
  }
}

module.exports = {
  validateStudentData,
  saveData,
  loadData,
};
