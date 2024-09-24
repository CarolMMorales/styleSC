<template>
  <div
    class="modal fade border-primary"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    id="Editar"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('contacts.edit') }}
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
                <label for="phone" class="form-label">{{ $t('contacts.phone') }}</label>
                <input type="text" v-model="con_phone" class="form-control" id="phone" />
              </div>
              <div class="mb-3 col-12">
                <label for="email" class="form-label">{{ $t('contacts.emailPer') }}</label>
                <input type="email" v-model="con_email" class="form-control" id="email" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button  type="submit" data-bs-dismiss="modal" class="btn btn-custom fw-semibold">
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
import { ref, watchEffect } from 'vue'
import { useContactsStore } from '../../stores/contactStore'

const closeModal = ref(false)
const loading = ref(false)
const contactStore = useContactsStore()
const props = defineProps({
    con_id: Number,
    con_email: String,
    con_phone: String,
    edit:Boolean
  })
//const con_id = ref(props.con_id)
const con_phone = ref(props.con_phone)
const con_email = ref(props.con_email)
const editing = ref(props.edit)
// const isFormValid = computed(() => con_phone.value || con_email.value)

const handleSubmit = async () => {
  try {
    if (editing.value) {
      const success = await contactStore.updateContact(
        props.con_id,
        con_phone.value,
        con_email.value,
    )
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    }
  } catch {
    console.log('error')
    //console.log(con_phone.value, con_email.value, props.per_id)
  }finally{
    closeModal.value = true;
  }
  
}

watchEffect(() => {
  con_phone.value = props.con_phone
  con_email.value = props.con_email
  editing.value = props.edit
  
})

const cancelChanges = () => {
  clearForm()
  closeModal.value = true
}

const clearForm = () => {
  con_phone.value = ''
  con_email.value = ''
}
</script>
<style lang="scss" scoped>
.btn-custom {
  background-color: var(--purple-color);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--purple-color);
  border: 2px solid var(--purple-color);
}
</style>