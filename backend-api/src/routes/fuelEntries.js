import express from 'express';
const router = express.Router();


import {
  getAllFuelEntries,
  getFuelEntryById,
  createFuelEntry,
  updateFuelEntry,
  deleteFuelEntry
} from '../controllers/fuelEntriesController.js';

router.get('/', getAllFuelEntries);
router.get('/:id', getFuelEntryById);
router.post('/', createFuelEntry);
router.put('/:id', updateFuelEntry);
router.delete('/:id', deleteFuelEntry);

export default router;