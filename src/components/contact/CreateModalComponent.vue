<template>
  <div
    class="modal fade border-primary"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    id="Create"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('contacts.create') }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="cancelChanges()"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="row p-2">
              <div class="mb-3 col-12">
                <label for="" class="form-label">{{ $t('contacts.phone') }}</label>
                <input type="text" v-model="con_phone" class="form-control" id="" />
              </div>
              <div class="mb-3 col-12">
                <label for="" class="form-label">{{ $t('contacts.emailPer') }}</label>
                <input type="email" v-model="con_email" class="form-control" id="" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button data-bs-dismiss="modal" :disabled="!isFormValid" type="submit" class="btn btn-custom fw-semibold">
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

const closeModal = ref(false)
const loading = ref(false)
const contactStore = useContactsStore()
const props = defineProps({
    per_id: Number
  })
const con_phone = ref('')
const con_email = ref('')

const isFormValid = computed(() => con_phone.value || con_email.value)

const handleSubmit = async () => {
  try {
    await contactStore.registerContact(con_phone.value, con_email.value, props.per_id)
    con_phone.value, con_email.value, props.per_id
    clearForm();
    closeModal.value = true;
    //console.log(con_phone.value, con_email.value, props.per_id)
  } catch {
    console.log('error')
    //console.log(con_phone.value, con_email.value, props.per_id)
  }
  closeModal.value = true;
}

const cancelChanges = () => {
  clearForm()
  closeModal.value = true
}

const clearForm = () => {
  con_phone.value = ''
  con_email.value = ''
}
</script>
