<template>
    <div class="container">
        <h2>Productos</h2>
        <button class="btn btn-success" @click="showProductForm = true">Crear nuevo producto</button>
        <table class="table table-bordered mt-2">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{  product.data().name  }}</td>
                    <td>{{  product.data().price }}</td>
                    <td>{{  product.data().description }}</td>
                    <td>
                        <button class="btn btn-info text-white" @click="editProduct(product.id)">Editar</button>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showProductForm">
            <input v-model="productForm.name" type="text" class="form-control" placeholder="Nombre">
            <input v-model="productForm.price" type="number" class="form-control" placeholder="Precio">
            <textarea v-model="productForm.description" type="text" class="form-control" placeholder="Descripcion"></textarea>

            <button @click="submitProduct" class="btn btn-primary">Aceptar</button>
            <button @click="cancelSubmitProd" class="btn btn-danger">Cancelar</button>
        </div>
    </div>
</template>

<script>
    import { ref, reactive, onMounted } from "vue";
    import { db } from "../config/firebase";
    import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
    
    export default {
        setup() {
            var products = ref([]);
            var showProductForm = ref(false);
            var selectedProduct = ref(null);
            var productForm = reactive({
                name: '',
                price: 0,
                description: ''
            });
            var isEdit = ref(false)

            const fetchProducts = async () => {
                var result = await getDocs(collection(db, "products"));
                products.value = result.docs;
            };

            onMounted(() => {
                fetchProducts();
            });

            const editProduct = (productId) => {
                var product = products.value.find(p => p.id == productId);
                if (product) {
                    productForm.name = product[0].data().name;
                    productForm.price = product[0].data().price;
                    productForm.description = product[0].data().description;
                    
                    showProductForm.value = true;
                    selectedProduct.value = product[0];
                    isEdit.value = true;
                }
            };
            
            const deleteProduct = async (productId) => {
                await deleteDoc(doc(db, "products", productId));
                await fetchProducts();
            };

            const submitProduct = async () => {
                if (isEdit.value){
                    if (selectedProduct.value) {
                        await updateDoc(doc(db, "products", selectedProduct.value.id), productForm);
                        cancelSubmitProd();
                        fetchProducts();
                    }
                } else {
                    await addDoc(collection(db, "products"), productForm);
                    fetchProducts();
                }
                cancelSubmitProd();
            };

            const cancelSubmitProd = () => {
                isEdit.value = false;
                selectedProduct.value = null;
                showProductForm.value = false;

                productForm.name = '';
                productForm.price = '';
                productForm.description = '';
            }

            return {
                products,
                showProductForm,
                selectedProduct,
                productForm,
                isEdit,
                fetchProducts,
                editProduct,
                deleteProduct,
                submitProduct,
                cancelSubmitProd
            }
        }
    }
</script>