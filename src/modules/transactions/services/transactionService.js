// import { api } from "@/services/apiService";

// export const transactionService = {
//     getTransactionsByClientId   : (id) => api.get(`/transactions/getTransactionsByClientId/${id}`),
// }

import { api } from "@/services/apiService";

class TransactionService {
  async index() {
    try {
      const response = await api.get(`/transactions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  async show(id) {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction with ID ${id}:`, error);
      throw error;
    }
  }

  // Método para obtener las transacciones de un cliente por ID
  async getTransactionsByClientId(id) {
    try {
      const response = await api.get(
        `/transactions/getTransactionsByClientId/${id}`
      );
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error(
        `Error fetching transactions for client with ID ${id}:`,
        error
      );
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
}

// Exporta una instancia de la clase
export default new TransactionService();
