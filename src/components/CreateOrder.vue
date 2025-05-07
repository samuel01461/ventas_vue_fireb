<template>
    <div class="container">
        <h1>Crear orden nueva</h1>

        <form @submit.prevent="createOrder">
            <input class="form-control" type="text" placeholder="Numero de orden" v-model="newOrder.number" required><br>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.data().name }}</td>
                        <td>{{ product.data().price }}</td>
                        <td>{{ product.data().description }}</td>
                        <td>
                            <input type="number" name="quantity" v-model="product.quantity" value=0 class="form-control">
                            <button @click="addProduct(product.id, product.quantity)" class="btn btn-danger">Agregar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-info text-white">Crear</button>
        </form>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
    setup(){
        var products = ref([]);
        var newOrder = reactive({
            number: null,
            products: []
        });

        const fetchProducts = async () => {
            var result = await getDocs(collection(db, "products"));
            products.value = result.docs;
        };

        onMounted(() => {
            fetchProducts();
        });

        const addProduct = (product, quantity) => {
            var new_product = { id: product, quantity: quantity };
            newOrder.products.push(new_product);
        };

        const getPrice = (productId) => {
            var product = products.value.find(p => p.id == productId);
            return product.price;
        };

        const createOrder = async () => {
            var total = 0;
            newOrder.products.map(p => {
                total = total += getPrice(p.id)
            });
            await addDoc(collection(db, "orders"), newOrder);
        }

        return {
            products,
            newOrder,
            fetchProducts,
            addProduct,
            getPrice,
            createOrder
        }
    }
}
</script>