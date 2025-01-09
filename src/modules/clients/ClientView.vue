<template>
  <b-container>
    <div class="d-flex justify-content-between mt-4 mb-2">
      <h3>Clients</h3>
      <b-button @click="showModal">Add New</b-button>
    </div>
    <b-table hover :items="formattedClients" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="outline-primary" @click="editItem(row.item)" class="mr-1"><b-icon
            icon="pencil"></b-icon></b-button>
        <b-button size="sm" variant="outline-danger" @click="deleteItem(row.item)"><b-icon
            icon="trash-fill"></b-icon></b-button>
      </template>
    </b-table>
    <NewClientModal ref="newClientModal" @processed="handleProcessed" />
    <EditClientModal ref="editClientModal" @processed="handleProcessed" />
  </b-container>
</template>

<script>
import Swal from "sweetalert2";
import clientService from "./services/clientService";
import NewClientModal from "./views/NewClientModal.vue";
import EditClientModal from "./views/EditClientModal.vue";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { formatCurrency } from "@/helpers/formatCurrency";

export default {
  components: {
    NewClientModal,
    EditClientModal,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: '#' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electrónico' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'total_amount', label: 'Total' },
        { key: 'actions', label: 'Acciones' },
      ],
      clients: [],
    };
  },
  computed: {
    formattedClients() {
      return this.clients.map(client => ({
        ...client,
        phone: formatPhoneNumber(client.phone),
        total_amount: formatCurrency(client.total_amount)
      }));
    }
  },
  mounted() {
    this.getClients();
  },
  methods: {
    async getClients() {
      const { data } = await clientService.index();
      this.clients = data;
    },
    showModal() {
      this.$refs.newClientModal.showModal();
    },
    handleProcessed(isProcessed) {
      if (isProcessed) {
        this.getClients()
      }
    },
    editItem(item) {
      this.$refs.editClientModal.showModal(item.id);
    },
    // Método para eliminar un ítem
    deleteItem(item) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to revert this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await clientService.delete(item.id);
          await this.getClients()
          Swal.fire('Deleted', 'Deleted successfully.', 'success');
        }
      });
    },
  },
};
</script>
