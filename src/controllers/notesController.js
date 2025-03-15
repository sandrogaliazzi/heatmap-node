import NotesModel from "../models/notesModel.js";

class NotesController {
  async createNote(req, res) {
    try {
      const { id, ...rest } = req.body;

      if (!id) {
        // Generate a random ID without using a library
        const newId = Math.random().toString(36).substring(2, 10);
        req.body = { ...rest, id: newId };
      }

      const existingNote = await NotesModel.findOne({ id });
      if (existingNote) {
        return res.status(200).json({message: "Essa nota já existe"});
      }

      const newNote = new NotesModel(req.body);
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      res.status(500).json({ error: "Ocorreu um erro ao criar a nota." });
    }
  }

  async getNotes(req, res) {
    try {
      const notes = await NotesModel.find();
      res.status(200).json(notes);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar as notas." });
    }
  }

  async getNoteById(req, res) {
    try {
      const note = await NotesModel.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada." });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error("Erro ao buscar nota por ID:", error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar a nota." });
    }
  }

  async getNotesByAccessPointId(req, res) {
    try {
      const access_point_id = req.params.access_point_id;
      const notes = await NotesModel.find({ access_point_id });

      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching notes by access point ID:', error);
      res.status(500).json({ error: 'Failed to fetch notes by access point ID' });
    }
  }

  async updateNote(req, res) {
    try {
      const note = await NotesModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada." });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      res.status(500).json({ error: "Ocorreu um erro ao atualizar a nota." });
    }
  }

  async deleteNote(req, res) {
    try {
      const note = await NotesModel.findByIdAndDelete(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada." });
      }
      res.status(200).json({ message: "Nota deletada com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      res.status(500).json({ error: "Ocorreu um erro ao deletar a nota." });
    }
  }
}

export default new NotesController();
