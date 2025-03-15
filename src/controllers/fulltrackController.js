import { getLastVehiclePosition, getAllVehiclePosition } from "../scripts/fullTrackApi.js";

class FullTrackController {
    static async getVehicleById(req, res) {
        const id = req.params.id;
        try {
            const vehicleData = await getLastVehiclePosition(id);

            res.status(200).json(vehicleData);
        } catch (error) {
            console.error("erro ao buscar veículo " + error);
            res.status(500).json(error);
        }
    }

    static async getVehicleList(req, res) {
        try {
            const vehiclesData = await getAllVehiclePosition();

            res.status(200).json(vehiclesData);
        } catch (error) {
            console.error("erro ao buscar lista de veículos " + error);
            res.status(500).json(error);
        }
    }
}

export default FullTrackController;