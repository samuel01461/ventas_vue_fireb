<template>
    <div class="container">
        <h2>Ordenes</h2>
        <router-link class="btn btn-success text-white" to="/create-order">Crear nueva orden</router-link>
        <table>
            <thead>
                <tr>
                    <th>Nro de orden</th>
                    <th>Total</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{  order.number  }}</td>
                    <td>{{  order.amount }}</td>
                    <td>
                        <button class="btn btn-danger" @click="deleteOrder(order.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { db } from "../config/firebase";
    import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
    
    export default {
        data() {
            return {
                orders: [],
            }
        },
        async created(){
            await this.fetchOrders();
        },
        methods: {
            async fetchOrders() {
                var result = await getDocs(collection(db, "orders"));
                this.orders = result.docs;
            },
            editOrder(orderId) {
            },
            async deleteOrder(orderId) {
                await deleteDoc(doc(db, "orders", orderId));
                await this.fetchOrders();
            },
            async submitOrder() {
            },
            cancelSubmitProd() {
            }
        }
    }
</script>