import Swal from 'sweetalert2'

export const validateEmails = (email, errorMessage) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    if (email === '') {
      return { message: errorMessage, isEmpty: false }
    } else {
      if (!emailRegex.test(email)) {
        return { message: errorMessage, isEmpty: true }
      }
    }
  
    return ''
  }

  export const showPassword = (inputId) => {
    const passwordInput = document.getElementById(inputId)
    const iconSpan = document.querySelector(`#${inputId} + .btn .icon`)
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      iconSpan.classList.remove('fa-eye-slash')
      iconSpan.classList.add('fa-eye')
    } else {
      passwordInput.type = 'password'
      iconSpan.classList.remove('fa-eye')
      iconSpan.classList.add('fa-eye-slash')
    }
  }
  
  export const handleResponsePassword = (res, name, sameNewAsOld, successMessage, passwordWrong) => {
    if (res.data && res.data.status === false && res.data.message) {
      let messageToShow = res.data.message
  
      if (messageToShow.includes('New password cannot be the same as the old password')) {
        messageToShow = sameNewAsOld
        showSwalAlert(name, messageToShow, 'error')
      } else if (messageToShow.includes('Password does not match')) {
        messageToShow = passwordWrong
        showSwalAlert(name, messageToShow, 'error')
      } else if (messageToShow.includes('The old password does not match')) {
        messageToShow = passwordWrong
        showSwalAlert(name, messageToShow, 'error')
      }
    } else {
      let messageToShow = res.data.message
      if (messageToShow.includes('Password was successfully changed')) {
        messageToShow = successMessage
        showSwalAlert(name, messageToShow, 'success')
      }
    }
  }

  export const validatePassword = (password, invalidFormat) => {
    let mensaje = ''
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_$@$!%*?&+[\].-])[A-Za-z\d _$@$!%*?&+[\].-]{8,50}$/
  
    if (password === '') {
      mensaje = ''
    } else {
      if (!passwordRegex.test(password)) {
        mensaje = invalidFormat
      }
      return mensaje
    }
  }
  
  export const validateSame = (newPassword, confirmPassword, notSame, Same) => {
    let mensaje = ''
  
    if (confirmPassword === '') {
      return { message: '', isValid: '' }
    } else {
      if (newPassword === confirmPassword) {
        return { message: Same, isValid: true }
      } else if (newPassword !== confirmPassword) {
        return { message: notSame, isValid: false }
      }
      return mensaje
    }
  }

  export const showSwalAlert = (
    title,
    message,
    icon = 'error',
    confirmButtonColor = '#dd0034',
    cancelButtonColor = '#d33'
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: 'OK'
    })
  }

  export const handleError = (error) => {
    if (error.response) {
      // Error de respuesta (por ejemplo, error HTTP)
      showSwalAlert(null, error.response.data.message, 'error')
      console.error('Error de respuesta:', error.response.data)
    } else if (error.request) {
      // Error de solicitud (por ejemplo, problema de red)
      showSwalAlert('Error de solicitud:', error.request, 'error')
      console.error('Error de solicitud:', error.request)
    } else {
      // Otros tipos de errores
      showSwalAlert('Error inesperado:', error.message, 'error')
    }
  }

  export const validateNewPassword = (password, invalidFormat) => {
    let mensaje = ''
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$.!%*?&_-])[A-Za-z\d$@.$!%*?&_-]{8,15}/
  
    if (password === '') {
      mensaje = ''
    } else {
      if (!passwordRegex.test(password)) {
        mensaje = invalidFormat
      }
      return mensaje
    }
  }