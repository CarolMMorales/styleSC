<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ edit ? $t('contacts.edit') : $t('contacts.add') }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="row p-2">
              <div class="mb-3 col-12">
                <label for="phone" class="form-label">{{ $t('contacts.phone') }}</label>
                <input
                  type="text"
                  v-model="con_phone"
                  class="form-control"
                  id="phone"
                />
              </div>
              <div class="mb-3 col-12">
                <label for="email" class="form-label">{{ $t('contacts.emailPer') }}</label>
                <input
                  type="email"
                  v-model="con_email"
                  class="form-control"
                  id="email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button
                  :disabled="!isFormValid"
                  type="submit"
                  class="btn btn-custom fw-semibold"
                >
                  <span v-if="!loading">{{ $t('buttons.save') }}</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">{{ $t('errors.loading') }}</span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContactsStore } from '../../stores/contactStore'

const props = defineProps({
  con_id: Number,
  con_phone: String,
  con_email: String,
  edit: Boolean
})

const emit = defineEmits(['close'])
const loading = ref(false)
const contactStore = useContactsStore()

const con_phone = ref(props.con_phone)
const con_email = ref(props.con_email)

const isFormValid = computed(() => con_phone.value && con_email.value)

const handleSubmit = async () => {
  if (loading.value) return
  loading.value = true
  try {
    if (props.edit) {
      // Lógica para actualizar el contacto
      await contactStore.updateContact(props.con_id, con_phone.value, con_email.value)
    } else {
      // Lógica para agregar un nuevo contacto
      await contactStore.registerContact(con_phone.value, con_email.value)
    }
    emit('close')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
