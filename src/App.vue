<template>
  <div id="app">
    <nav>
      <RouterLink  to="/products">Productos</RouterLink >
      <RouterLink  to="/orders">Ordenes</RouterLink >
      <RouterLink  to="/create-order">Crear orden</RouterLink >
    </nav><br>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
   nav a {
    margin: 5px;
   }
</style>