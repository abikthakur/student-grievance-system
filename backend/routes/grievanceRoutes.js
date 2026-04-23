const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's grievances or search by title
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { title } = req.query;
    let query = { user: req.user.id };

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const grievances = await Grievance.find(query).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new grievance
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newGrievance = new Grievance({
      title,
      description,
      category,
      user: req.user.id,
    });

    const grievance = await newGrievance.save();
    res.status(201).json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific grievance by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    if (grievance.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update a grievance
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    let grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    if (grievance.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    grievance.title = title || grievance.title;
    grievance.description = description || grievance.description;
    grievance.category = category || grievance.category;
    grievance.status = status || grievance.status;

    await grievance.save();

    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a grievance
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    if (grievance.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await grievance.deleteOne();

    res.json({ message: 'Grievance removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
