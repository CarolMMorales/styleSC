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
  export const handleErrorLog = (error) => {
    if (error.response) {
      // Error de respuesta (por ejemplo, error HTTP)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${error.response.status} - ${error.response.data.message}`,
        confirmButtonColor: '#dd0034'
      })
      console.error(error.response.data)
    }
    if (error.request) {
      const messageToShow = error.response.data.message.message
  
      if (messageToShow.includes('passw')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          confirmButtonColor: '#dd0034',
          text: `${error.response.data.message.message}`
        })
        showSwalAlert(null, messageToShow, 'error')
      }
  
      console.error('Error de solicitud:', error.response.data)
    } else {
      // Otros tipos de errores
      Swal.fire({
        icon: 'error',
        title: 'Error',
        confirmButtonColor: '#dd0034',
        text: 'Error: Se produjo un error inesperado'
      })
      console.error('Error inesperado:', error.message)
    }
  }

  export const handleResponse = (res, 
    name, 
    successMessage,
     duplicateAlert,
      invalidFormat,
      validateCharacter,
       quotasMinor,
        studentAlrRegistered, 
        notStudent, 
        maxCapacity, 
        quotasZero,
        hourErrorMsg1,
        InvalidCSV,
         Iqual) => {
    if (res.data && res.data.status === false && res.data.message) {
      let messageToShows = res.data.message[0];
      let messageToShow = res.data.message;
      if (messageToShow.includes('Password does not match')) {
        messageToShow = invalidFormat;
        showSwalAlert(name, messageToShow, 'error');
      }
      if (messageToShow.includes('The old password does not match')) {
        messageToShow = invalidFormat;
        showSwalAlert(name, messageToShow, 'error');
      }
      if (messageToShow.includes('New password cannot be the same as the old password')) {
        messageToShow = Iqual;
        showSwalAlert(name, messageToShow, 'error');
      }
      if (messageToShows.includes('format is invalid')) {
        messageToShow = invalidFormat;
        showSwalAlert(null, messageToShow, 'error');
    } 
    if (messageToShow.includes('Cannot update to full quotas. There are currently')) {
      messageToShow = quotasMinor;
      showSwalAlert(null, messageToShow, 'error');
    } if (messageToShows.includes('must not be greater than')) {
      messageToShow = validateCharacter;
      showSwalAlert(null, messageToShow, 'error');
  
  }else if (messageToShows.includes('has already been taken')) {
        messageToShows = duplicateAlert;
        showSwalAlert(name, messageToShows, 'error');
    } else if (messageToShow.includes('value tried to register')) {
        messageToShow = duplicateAlert;
        showSwalAlert(name, messageToShow, 'error');
    } else if (messageToShow.includes('with the same characteristics already exists.')) {
      messageToShow = duplicateAlert
      showSwalAlert(name, messageToShow, 'error')
    } else if (messageToShow.includes('An activity with the same name and type already exists')) {
      messageToShow = duplicateAlert
      showSwalAlert(name, messageToShow, 'error')
    }else if (messageToShow.includes('student is already registered for this activity')) {
      messageToShows = studentAlrRegistered;
      showSwalAlert(name, messageToShows, 'error');
    } else if (messageToShow.includes('The requested solicitude does not exist.')) {
      messageToShow = notStudent;
      showSwalAlert(name, messageToShow, 'error');
  } else if (messageToShow.includes('The user who is registering is not a student')) {
    messageToShow = notStudent;
    showSwalAlert(name, messageToShow, 'error');
  } 
  else if (messageToShow.includes('The activity has reached its maximum capacity')) {
    messageToShow = maxCapacity;
    showSwalAlert(name, messageToShow, 'error');
  }
   else if (messageToShows.includes('The bie act quotas must be at least 1.')) {
    messageToShows = quotasZero;
    showSwalAlert(null, messageToShows, 'error');
  
  } else if (messageToShow.includes('the time and date of the activity are not allowed')) {
    messageToShows = hourErrorMsg1;
    showSwalAlert(null, messageToShows, 'error');
  }else if (messageToShow.includes('El archivo tiene datos invalidos.')) {
    messageToShows = InvalidCSV;
    showSwalAlert(null, messageToShows, 'error');
  } 
    } else if (res.data && res.data.status === true) {
      let messageToShow = successMessage;
      showSwalAlert(name, messageToShow, 'success');
    }
  
  };

  export const handleResponseauth = (res, name, successMessage, duplicateAlert, invalidFormat) => {
    const array_errors = ['name has already been taken']
  
  
    if (res.data && res.data.status === false && res.data.message) {
      let messageToShow = res.data.message[0]
      for (let i = 0; i < array_errors.length; i++) {
        if (array_errors.includes(array_errors[i])) {
          messageToShow = duplicateAlert
          showSwalAlert('', messageToShow, 'error')
        }
      }
  
      let password = res.data.message
      //let messageToShows = res.data.message;
  
      /*if (messageToShow.includes('name has already been taken')) {
        messageToShow = duplicateAlert;
        showSwalAlert(name, messageToShow, 'error');
      }
      else*/ if (messageToShow.includes('format invalidate')) {
        messageToShow = invalidFormat
        showSwalAlert(null, messageToShow, 'error')
      } else if (password.includes('No reservation made')) {
        password = invalidFormat
        showSwalAlert(null, password, 'error')
      } else if (messageToShow.includes('No users registered')) {
        messageToShow = invalidFormat
        showSwalAlert(null, messageToShow, 'error')
      } else if (messageToShow.includes('Access denied')) {
        messageToShow = invalidFormat
        showSwalAlert(null, messageToShow, 'error')
      }
    }
    if (res.data && res.data.status === true) {
      let messageToShow = successMessage
      showSwalAlert(name, messageToShow, 'success')
    }
  }