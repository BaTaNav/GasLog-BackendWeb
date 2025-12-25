import express from 'express';
const router = express.Router();

import express from 'express';
import {
  getAllFuelEntries,
  getFuelEntryById,
  createFuelEntry,
  updateFuelEntry,
  deleteFuelEntry
} from '../controllers/fuelEntriesController.js';

// Voorbeeld: lijst van tankbeurten
router.get('/', (req, res) => {
  res.json({ message: 'list fuel entries' });
});

// Voorbeeld: nieuwe tankbeurt aanmaken
router.post('/', (req, res) => {
  res.json({ message: 'create fuel entry' });
});

export default router;