import Vue from 'vue';
import Router from 'vue-router';
import ClientView from '@/modules/clients/ClientView.vue';
import TransactionView from '@/modules/transactions/TransactionView.vue';

Vue.use(Router);  // Usamos Vue Router

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientView  // Componente para la ruta '/'
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionView // Componente para la ruta '/about'
    }
  ]
});
