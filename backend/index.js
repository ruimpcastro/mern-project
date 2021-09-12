import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import EquipmentDAO from "./dao/equipmentDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.GREEN_DB_URI, {
  useUnifiedTopology: true,
  maxPoolSize: 50,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(async (client) => {
    await EquipmentDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port: ${port}`);
    });
  });
