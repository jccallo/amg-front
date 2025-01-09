<template>
  <b-container>
    <div class="d-flex justify-content-between mt-4 mb-2">
      <h3>Transactions</h3>
    </div>
    <b-table hover :items="formattedTransactions" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="outline-primary" class="mr-1" @click="editItem(row.item)"><b-icon icon="pencil"></b-icon></b-button>
        <b-button size="sm" variant="outline-danger" @click="editItem(row.item)"><b-icon icon="trash-fill"></b-icon></b-button>
      </template>
    </b-table>
    <EditTransactionView ref="editTransactionView" />
  </b-container>
</template>

<script>
import transactionService from './services/transactionService';
import EditTransactionView from './views/EditTransactionView.vue';

export default {
  data() {
    return {
      fields: [
        { key: 'id', label: '#  ' },
        { key: 'client_name', label: 'Client' },
        { key: 'amount', label: 'Amount' },
        { key: 'date', label: 'Date' },
        { key: 'actions', label: 'Acciones' },
      ],
      transactions: [],
    };
  },
  components: {
    EditTransactionView,
  },
  computed: {
    formattedTransactions() {
      return this.transactions.map(transaction => ({
        ...transaction,
        amount: this.formatCurrency(transaction.amount)
      }));
    }
  },
  mounted() {
    this.getTransactions()
  },
  methods: {
    editItem(item) {
      this.$refs.editTransactionView.showModal(item.id);
    },
    async getTransactions() {
      const { data } = await transactionService.index()
      this.transactions = data
    },
    formatCurrency(value, locale = 'en-US', currency = 'USD') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    }
  }
};
</script>

<style scoped></style>
