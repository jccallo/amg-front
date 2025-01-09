// import { api } from "@/services/apiService";

// export const clientService = {
//     index : () => api.get(`/clients`),
//     create: (data) => api.post(`/clients`, data),
//     update: (id, data) => api.put(`/clients/${id}`, data),
//     show  : (id) => api.get(`/clients/${id}`),
//     delete: (id) => api.delete(`/clients/${id}`),
//     getTransactionsByClientId: (id) => api.get(`/transactions/getTransactionsByClientId/${id}`),
// }

import { api } from "@/services/apiService";

class ClientService {
  // Método para obtener todos los clientes
  async index() {
    try {
      const response = await api.get(`/clients`);
      return response.data;
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error; // Lanza el error para que pueda ser manejado fuera de la clase
    }
  }

  // Método para crear un nuevo cliente
  async create(data) {
    try {
      const response = await api.post(`/clients`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  }

  // Método para actualizar un cliente
  async update(id, data) {
    try {
      const response = await api.put(`/clients/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating client with ID ${id}:`, error);
      throw error;
    }
  }

  // Método para obtener un cliente por ID
  async show(id) {
    try {
      const response = await api.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching client with ID ${id}:`, error);
      throw error;
    }
  }

  // Método para eliminar un cliente
  async delete(id) {
    try {
      const response = await api.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting client with ID ${id}:`, error);
      throw error;
    }
  }

  // Método para obtener las transacciones de un cliente por ID
  async getTransactionsByClientId(id) {
    try {
      const response = await api.get(`/transactions/getTransactionsByClientId/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transactions for client with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new ClientService();
