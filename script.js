const modal = document.querySelector('.modal')
const openBtn = document.querySelector('.header__buttom')
const closeBtn = document.querySelector('.close__button')
const tankText = document.querySelector('.tanck')

function openModal() {
  modal.showModal()
  localStorage.setItem('modalOpen', 'true')
}

function closeModal() {
  modal.close()
  localStorage.setItem('modalOpen', 'false')
}

openBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModal()
  }
})

modal.addEventListener('cancel', function() {
  localStorage.setItem('modalOpen', 'false')
})

const isModalOpen = localStorage.getItem('modalOpen')
if (isModalOpen === 'true') {
  modal.showModal()
}

const inputGroups = document.querySelectorAll('.input__groups')

inputGroups.forEach(function(group, index) {
  const input = group.querySelector('input')
  if (!input) return

  const savedValue = localStorage.getItem('form_input_' + index)
  if (savedValue) {
    input.value = savedValue
  }

  input.addEventListener('input', function() {
    localStorage.setItem('form_input_' + index, input.value)
    input.classList.remove('error')
    if (tankText.textContent !== '') {
      tankText.textContent = ''
    }
  })
})

const submitButton = document.querySelector('.modal__button')

submitButton.addEventListener('click', function() {
  const nameInput = inputGroups[0].querySelector('input')
  const emailInput = inputGroups[1].querySelector('input')
  const quoteInput = inputGroups[2].querySelector('input')

  const nameValue = nameInput.value.trim()
  const emailValue = emailInput.value.trim()
  const quoteValue = quoteInput.value.trim()

  let isValid = true
  let errorMessages = []

  inputGroups.forEach(function(group) {
    const input = group.querySelector('input')
    if (input) {
      input.classList.remove('error')
    }
  })
  
  tankText.textContent = ''
  tankText.style.color = ''

  if (nameValue === '') {
    nameInput.classList.add('error')
    errorMessages.push('Имя не должно быть пустым')
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (emailValue === '') {
    emailInput.classList.add('error')
    errorMessages.push('Email не должен быть пустым')
    isValid = false
  } else if (emailRegex.test(emailValue) === false) {
    emailInput.classList.add('error')
    errorMessages.push('Некорректный формат Email')
    isValid = false
  }

  if (quoteValue === '') {
    quoteInput.classList.add('error')
    errorMessages.push('Сообщение не должно быть пустым')
    isValid = false
  }

  if (isValid === false) {
    tankText.style.color = '#ff4d4d'
    tankText.innerHTML = errorMessages.join('<br>')
    return
  }

  console.log({ 
    Name: nameValue, 
    Email: emailValue, 
    Quote: quoteValue 
  })

  nameInput.value = ''
  emailInput.value = ''
  quoteInput.value = ''

  inputGroups.forEach(function(_, index) {
    localStorage.removeItem('form_input_' + index)
  })

  tankText.style.color = '#2ed573'
  tankText.textContent = 'Thank you! Your quote request has been sent.'

  setTimeout(function() {
    tankText.textContent = ''
    closeModal()
  }, 2500) //porno
})
