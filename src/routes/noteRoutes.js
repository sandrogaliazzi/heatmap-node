import express from 'express';
import NotesController from '../controllers/notesController.js';

const router = express.Router();

router.post('/notes', NotesController.createNote);
router.get('/notes', NotesController.getNotes);
router.get('/notes/:id', NotesController.getNoteById);
router.get('/notes/access-point/:access_point_id', NotesController.getNotesByAccessPointId);
router.put('/notes/:id', NotesController.updateNote);
router.delete('/notes/:id', NotesController.deleteNote);

export default router;