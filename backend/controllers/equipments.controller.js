import { ObjectId } from "mongodb";
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

  static async apiPostEquipment(req, res, next) {
    try {
      const equipmentId = req.body.equipment_id;
      const equipment = req.body.name;
      userInfo = {
        user_name: req.body.user_name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const EquipmentResponse = await EquipmentDAO.addEquipment(
        userInfo,
        equipment,
        date
      );
      res.json({ Status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUpdateEquipment(req, res, next) {
    try {
      const equipmentId = req.body.equipment_id;
      const name = req.body.name;
      const date = new Date();

      const equipmentResponse = await EquipmentDAO.updateEquipment(
        equipmentId,
        name,
        date
      );

      var { error } = equipmentResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (equipmentResponse.modifiedCount === 0) {
        throw new Error("unable to update equipment");
      }

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteEquipment(req, res, next) {
    try {
      const equipmentId = req.query.id;
      const userId = req.body.user_id;
      console.log(equipmentId);
      const equipmentResponse = await EquipmentDAO.deleteEquipment(
        equipmentId,
        userId
      );
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
