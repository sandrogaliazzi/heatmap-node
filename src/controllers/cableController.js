import { listCables } from "../scripts/fetchCables.js";

class CableController {
    static async ListCables(req, res) {
        try {
            const cables = await listCables();

            res.status(200).json(cables);
        } catch (error) {
            console.error("erro ao listar cabos " + error);
            res.status(500).json(error);
        }
    }
}

export default CableController;