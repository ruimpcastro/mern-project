import EquipmentDAO from "../dao/equipmentDAO.js";

export default class EquipmentController {
  static async apiGetEquipment(req, res, next) {
    const { equipmentList, totalNumEquipment } =
      await EquipmentDAO.getEquipment();

    let response = {
      equipment: equipmentList,
      total_results: totalNumEquipment,
    };
    res.json(response);
  }

  static async apiGetEquipmentById(req, res, next) {
    try {
      let id = req.params.id || {};
      let equipment = await EquipmentDAO.getEquipmentById(id);
      if (!equipment) {
        res.status(404).json({ error: "Not Found" });
        return;
      }
      res.json(equipment);
    } catch (err) {
      console.log(`API: ${err}`);
      res.status(500).json({ error: err });
    }
  }
}
