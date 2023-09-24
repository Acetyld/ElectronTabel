<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue'
import { Supplier } from '../../main/entities/Supplier.entity'

//get api from context bridge
const allSuppliers: Ref<Supplier[]> = ref([])
const searchInput: Ref<string> = ref('')

//get the suppliers at the start
onMounted(async () => {
  allSuppliers.value = await window.api.getSuppliers('')
})

//get found suppliers when the input changes
watch(searchInput, async (newValue) => {
  allSuppliers.value = await window.api.getSuppliers(newValue)
})
</script>

<template>
  <h1>Our suppliers:</h1>
  <br />
  Search: <input v-model="searchInput" type="text" />
  <br />
  <ul>
    <li v-for="(supplier, index) in allSuppliers" :key="index">
      {{ supplier.name }}
    </li>
  </ul>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
