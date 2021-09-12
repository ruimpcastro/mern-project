import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let equipment;

export default class EquipmentDAO {
  static async injectDB(conn) {
    if (equipment) {
      return;
    }
    try {
      equipment = await conn.db(process.env.GREEN_NS).collection("equipment");
    } catch (err) {
      console.error(
        `Unable to establish connection handle in equipmentDAO: ${err}`
      );
    }
  }

  static async getEquipment() {
    let cursor;

    try {
      cursor = await equipment.find();
    } catch (err) {
      console.error(`Unable to issue find command: ${err}`);
      return { equipmentList: [], totalNumEquipment: 0 };
    }

    const displayCursor = cursor;

    try {
      const equipmentList = await displayCursor.toArray();
      const totalNumEquipment = await equipment.countDocuments();

      return { equipmentList, totalNumEquipment };
    } catch (err) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${err}`
      );
      return { equipmentList: [], totalNumEquipment: 0 };
    }
  }

  static async getEquipmentById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
      ];
      return await equipment.aggregate(pipeline).next();
    } catch (err) {
      console.error(`Something went wrong in getEquipmentById: ${err}`);
      throw err;
    }
  }

  static async addEquipment(user, equipment, date) {
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
