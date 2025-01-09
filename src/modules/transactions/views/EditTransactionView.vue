<template>
    <div>
        <b-modal ref="edit-transaction-modal" title="Edit Transaction">
            <b-form>
                <b-form-group label="Amount:" class="mb-3">
                    <b-form-input id="amount" type="number" v-model="transaction.amount"></b-form-input>
                </b-form-group>
                <b-form-group label="Date:" class="mb-3">
                    <b-form-input id="amount" type="date" v-model="transaction.date"></b-form-input>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="hideModal">Cancel</b-button> 
                <b-button variant="primary" @click="save">Save</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import transactionService from '../services/transactionService';


export default {
    data() {
        return {
            client: {
                name: "",
                email: "",
                phone: "",
            },
            transaction: {
                amount: "",
                date: "",
            },
            error: {},
        };
    },
    methods: {
        async showModal(id) {
            await this.getTransaction(id)
            this.$refs["edit-transaction-modal"].show();
        },
        hideModal() {
            this.$refs["edit-transaction-modal"].hide();
        },
        async save() {
            console.log('edut transaction modal')
        },
        async getTransaction(id) {
            const { data } = await transactionService.show(id);
            this.transaction = data;
        }
    },
};
</script>