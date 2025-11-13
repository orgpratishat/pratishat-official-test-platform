const express = require('express');
const router = express.Router();
const RankRange = require('../models/RankRange');

// GET all rank ranges with optional year filter
router.get('/', async (req, res) => {
  try {
    const { year } = req.query;
    const filter = year ? { year: parseInt(year) } : {};
    const rankRanges = await RankRange.find(filter).sort({ year: -1 });
    res.json(rankRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single rank range by year
router.get('/:year', async (req, res) => {
  try {
    const rankRange = await RankRange.findOne({ year: parseInt(req.params.year) });
    if (!rankRange) {
      return res.status(404).json({ message: 'Rank range not found for the specified year' });
    }
    res.json(rankRange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new rank range
router.post('/', async (req, res) => {
  try {
    const { year, categories } = req.body;

    // Check if rank range already exists for this year
    const existingRankRange = await RankRange.findOne({ year });
    if (existingRankRange) {
      return res.status(400).json({ message: 'Rank range already exists for this year' });
    }

    const rankRange = new RankRange({
      year,
      categories
    });

    const newRankRange = await rankRange.save();
    res.status(201).json(newRankRange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE rank range
router.put('/:year', async (req, res) => {
  try {
    const { categories } = req.body;
    
    const updatedRankRange = await RankRange.findOneAndUpdate(
      { year: parseInt(req.params.year) },
      { 
        categories,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRankRange) {
      return res.status(404).json({ message: 'Rank range not found' });
    }

    res.json(updatedRankRange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE rank range
router.delete('/:year', async (req, res) => {
  try {
    const deletedRankRange = await RankRange.findOneAndDelete({ 
      year: parseInt(req.params.year) 
    });
    
    if (!deletedRankRange) {
      return res.status(404).json({ message: 'Rank range not found' });
    }

    res.json({ message: 'Rank range deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD new category to existing rank range
router.post('/:year/categories', async (req, res) => {
  try {
    const { name, rankEntries } = req.body;
    
    const rankRange = await RankRange.findOne({ year: parseInt(req.params.year) });
    if (!rankRange) {
      return res.status(404).json({ message: 'Rank range not found' });
    }

    // Check if category already exists
    const existingCategory = rankRange.categories.find(cat => cat.name === name);
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    rankRange.categories.push({ name, rankEntries });
    const updatedRankRange = await rankRange.save();
    
    res.json(updatedRankRange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE specific category in rank range
router.put('/:year/categories/:categoryName', async (req, res) => {
  try {
    const { rankEntries } = req.body;
    
    const rankRange = await RankRange.findOne({ year: parseInt(req.params.year) });
    if (!rankRange) {
      return res.status(404).json({ message: 'Rank range not found' });
    }

    const categoryIndex = rankRange.categories.findIndex(
      cat => cat.name === req.params.categoryName
    );

    if (categoryIndex === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }

    rankRange.categories[categoryIndex].rankEntries = rankEntries;
    rankRange.updatedAt = Date.now();
    
    const updatedRankRange = await rankRange.save();
    res.json(updatedRankRange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE category from rank range
router.delete('/:year/categories/:categoryName', async (req, res) => {
  try {
    const rankRange = await RankRange.findOne({ year: parseInt(req.params.year) });
    if (!rankRange) {
      return res.status(404).json({ message: 'Rank range not found' });
    }

    rankRange.categories = rankRange.categories.filter(
      cat => cat.name !== req.params.categoryName
    );
    
    const updatedRankRange = await rankRange.save();
    res.json(updatedRankRange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;