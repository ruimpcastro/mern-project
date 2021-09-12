import http from "../http-common";

class EquipmentDataService {
  getAll() {
    return http.get();
  }

  get(id) {
    return http.get(`id/${id}`);
  }

  createEquipment(data) {
    return http.post(`/equipment`, data);
  }

  updateEquipment(data) {
    return http.put(`/equipment`, data);
  }

  deleteEquipment(id, userId) {
    return http.delete(`/equipment?id=${id}`);
  }
}

export default new EquipmentDataService();
