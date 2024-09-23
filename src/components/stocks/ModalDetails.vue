<template>
    <div class="container p-5">
        <!-- Modal -->
        <div class="modal fade border-primary" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-primary shadow-lg">
                    <div class="modal-header">
                        <h5 class="modal-title blue-color-text" id="detailsModalLabel">{{ $t('stocks.details') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row p-2">
                                <div class="mb-3 col-12">
                                    <label for="productSelect" class="form-label">{{ $t('products.produc_name')
                                        }}</label>
                                    <select class="form-select" id="productSelect" v-model="produc_id" disabled>
                                        <option v-for="(item, index) in filteredProduc" :key="index"
                                            :value="item.produc_id">
                                            {{ item.produc_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="produc_code" class="form-label">{{ $t('products.produc_code') }}</label>
                                    <input type="text" v-model="produc_code" class="form-control" id="produc_code" readonly />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="produc_description" class="form-label">{{$t('products.produc_description') }}</label>
                                    <input type="text" v-model="produc_description" class="form-control" id="produc_description" readonly />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="produc_size" class="form-label">{{ $t('products.produc_size') }}</label>
                                    <input type="text" v-model="produc_size" class="form-control" id="produc_size" readonly />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="proveSelect" class="form-label">{{ $t('proveedores.prove_name')
                                        }}</label>
                                    <select class="form-select" id="proveSelect" v-model="prove_id" disabled>
                                        <option v-for="(item, index) in filteredProve" :key="index"
                                            :value="item.prove_id">
                                            {{ item.prove_name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="mb-3 col-12">
                                    <label for="stockCosto" class="form-label">{{ $t('stocks.stock_costo') }}</label>
                                    <input type="text" v-model="stock_costo" class="form-control" readonly />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="stockPrecioVenta" class="form-label">{{ $t('stocks.stock_precioVenta')
                                        }}</label>
                                    <input type="text" v-model="stock_precioVenta" class="form-control" readonly />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="stockCantidad" class="form-label">{{ $t('stocks.stock_cantidad')
                                        }}</label>
                                    <input type="text" v-model="stock_cantidad" class="form-control" readonly />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, watchEffect, onMounted } from 'vue'
import { useProductsStore } from '../../stores/productsStores'
import { useProveedorStore } from '../../stores/proveedoresStores'

const productStore = useProductsStore()
const proveStore = useProveedorStore()

const props = defineProps({
    stock_id: Number,
    stock_costo: Number,
    stock_precioVenta: Number,
    stock_cantidad: Number,
    produc_id: Number,
    produc_code: String,
    produc_description: String,
    produc_size: String,
    prove_id: Number
})

const stock_costo = ref(props.stock_costo)
const stock_precioVenta = ref(props.stock_precioVenta)
const stock_cantidad = ref(props.stock_cantidad)
const produc_id = ref(props.produc_id)
const produc_code = ref(props.produc_code)
const produc_description = ref(props.produc_description)
const produc_size = ref(props.produc_size)
const prove_id = ref(props.prove_id)

const filteredProduc = computed(() => {
    return productStore.produc.filter(item => item.produc_name !== '')
})

const filteredProve = computed(() => {
    return proveStore.prove.filter(item => item.prove_name !== '')
})

watchEffect(() => {
    stock_costo.value = props.stock_costo
    stock_precioVenta.value = props.stock_precioVenta
    stock_cantidad.value = props.stock_cantidad
    produc_id.value = props.produc_id
    produc_code.value = props.produc_code
    produc_description.value = props.produc_description
    produc_size.value = props.produc_size
    prove_id.value = props.prove_id
})

onMounted(async () => {
    await productStore.readProduct()
    await proveStore.readProveedor()
})

</script>

<style lang="scss" scoped>
.btn-custom {
    background-color: var(--purple-color);
    color: #ffffff;
}

.btn-custom:hover {
    background-color: var(--color-background);
    color: var(--purple-color);
}
</style>