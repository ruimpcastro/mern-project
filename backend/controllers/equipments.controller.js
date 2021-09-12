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

  static async addEquipment(user, review, date) {
    try {
      const reviewDoc = {
        name: equipment,
        user_name: user.name,
        user_id: user._id,
        date: date,
      };
      return await equipment.insertOne(reviewDoc);
    } catch (err) {
      console.error(`Unable to post review: ${err}`);
      return { error: err };
    }
  }

  static async updateEquipment(equipmentId, userId, name, date) {
    try {
      const updateResponse = await equipment.updateOne(
        { user_id: userId, _id: ObjectId(equipmentId) },
        { $set: { name: name, date: date } }
      );
      return updateResponse;
    } catch (err) {
      console.error(`Unable to update equipment: ${err}`);
    }
  }

  static async deleteEquipment(equipmentId, userId) {
    try {
      const deleteResponse = await equipment.deleteOne({
        _id: ObjectId(equipmentId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (err) {
      console.error(`Unable to delete equipment: ${err}`);
      return { error: err };
    }
  }
}
