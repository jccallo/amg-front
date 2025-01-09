<template>
    <div>
        <b-modal ref="add-client-modal" title="Edit Client">
            <b-form>
                <b-form-group label="Name:" label-for="name" class="mb-3">
                    <b-form-input id="name" type="text" v-model="client.name"></b-form-input>
                    <span v-if="error.name" class="text-danger" style="font-size: 12px;">{{ error.name[0] }}</span>
                </b-form-group>
                <b-form-group label="Email:" label-for="email" class="mb-3">
                    <b-form-input id="email" type="text" v-model="client.email"></b-form-input>
                    <span v-if="error.email" class="text-danger" style="font-size: 12px;">{{ error.email[0] }}</span>
                </b-form-group>
                <b-form-group label="Phone:" label-for="phone" class="mb-3">
                    <b-form-input id="phone" type="text" v-model="client.phone"></b-form-input>
                    <span v-if="error.phone" class="text-danger" style="font-size: 12px;">{{ error.phone[0] }}</span>
                </b-form-group>
                <h5>Transactions</h5>
                <b-row class="mb-3">
                    <b-col md="5">
                        <b-form-group label="Amount:" label-for="amount" class="mb-3">
                            <b-form-input id="amount" type="number" v-model="transaction.amount"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="5">
                        <b-form-group label="Date:" label-for="date" class="mb-3">
                            <b-form-input id="date" type="date" v-model="transaction.date"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="2">
                        <label>&nbsp;</label>
                        <b-button block @click="addTranscription">Add</b-button>
                    </b-col>
                </b-row>
                <!-- listado -->
                <b-row v-for="(t, index) in transactions" :key="index">
                    <b-col md="5">
                        <b-form-group class="mb-3">
                            <b-form-input id="amount" type="number" v-model="t.amount"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="5">
                        <b-form-group class="mb-3">
                            <b-form-input id="date" type="date" v-model="t.date"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="2">
                        <b-button block variant="danger" @click="removeTransaction(t.id)"><b-icon icon="trash"></b-icon></b-button>
                    </b-col>
                </b-row>
            </b-form>
            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="hideModal">Cancel</b-button> 
                <b-button variant="primary" @click="save">Save</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import clientService from '../services/clientService';
import Swal from 'sweetalert2';

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
            transactions: [],
            error: {},
        };
    },
    methods: {
        async showModal(id) {
            this.resetForm()
            await this.getClient(id)
            await this.getTransactionsByClientId(id)
            this.$refs["add-client-modal"].show();
        },
        hideModal() {
            this.$refs["add-client-modal"].hide();
        },
        toggleModal() {
            this.$refs["add-client-modal"].toggle("#toggle-btn");
        },
        resetForm() {
            this.client = {
                name: "",
                email: "",
                phone: "",
            };
            this.transaction = {
                amount: "",
                date: "",
            };
            this.transactions = [];
            this.error = {};
        },
        addTranscription() {
            if (this.transaction.amount && this.transaction.date) {
                this.transactions.push({ ...this.transaction });
                this.transaction = {
                    amount: "",
                    date: "",
                };
            }
        },
        removeTransaction(id) {
            let index = this.transactions.findIndex(item => item.id === id);

            if (index !== -1) {
                this.transactions.splice(index, 1);
            }
        },
        async save() {
            try {
                await clientService.update(this.client.id, { ...this.client, transactions: [...this.transactions] });
                this.$emit("processed", true);
                this.hideModal()
                this.resetForm()
                Swal.fire('Saved', 'Saved successfully.', 'success');
            } catch (error) {
                this.$emit("processed", false);
                if (error.response?.data?.error) {
                    this.error = error.response?.data?.error
                }
            }
        },
        async getClient(id) {
            const { data } = await clientService.show(id);
            this.client = data;
        },
        async getTransactionsByClientId(id) {
            const {data} = await clientService.getTransactionsByClientId(id);
            this.transactions = data
        },
    },
};
</script>