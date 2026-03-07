const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/courseAPI')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, required: true, min: 18 },
  role: { type: String, enum: ['Student', 'Mentor', 'Admin'], default: 'Student' },
  course: { type: String, enum: ['MERN', 'Java', 'Python', 'Data Science'] },
  isActive: { type: Boolean, default: true }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/students/bulk', async (req, res) => {
  try {
    const students = await Student.insertMany(req.body);
    res.status(201).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/students/course/:courseName', async (req, res) => {
  console.log(req.body)
  try {
    const students = await Student.find({ course: req.params.courseName });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
