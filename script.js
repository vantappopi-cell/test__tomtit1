const reviewsData = [
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    name: "John Smith",
    company: "John Smith Marketing Director at XYZ Corp"
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    name: "John Smith",
    company: "John Smith Marketing Director at XYZ Corp"
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    name: "John Smith",
    company: "John Smith Marketing Director at XYZ Corp"
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    name: "Jane Doe",
    company: "CEO at Acme Industrial"
  },
  {
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    name: "Alex Johnson",
    company: "Product Manager at TechStart"
  }
]

const modal = document.querySelector('.modal')
const openBtn = document.querySelector('.header__buttom')
const closeBtn = document.querySelector('.close__button')
const tankText = document.querySelector('.tanck')

if (openBtn) {
  openBtn.addEventListener('click', function() {
    modal.showModal()
  })
}

if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeModal()
  })
}

if (modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal()
    }
  })
}

function closeModal() {
  modal.close()
  if (tankText) {
    tankText.textContent = ''
    tankText.style.color = ''
  }
  const inputGroups = document.querySelectorAll('.input__groups')
  inputGroups.forEach(function(group) {
    const input = group.querySelector('input')
    if (input) {
      input.classList.remove('error')
      input.value = ''
    }
  })
}

const submitButton = document.querySelector('.modal__button')

if (submitButton) {
  submitButton.addEventListener('click', function() {
    const inputGroups = document.querySelectorAll('.input__groups')
    if (inputGroups.length < 3) return

    const nameInput = inputGroups[0].querySelector('input')
    const emailInput = inputGroups[1].querySelector('input')
    const quoteInput = inputGroups[2].querySelector('input')

    if (!nameInput || !emailInput || !quoteInput) return

    const nameValue = nameInput.value.trim()
    const emailValue = emailInput.value.trim()
    const quoteValue = quoteInput.value.trim()
    
    let isValid = true
    let errorMessages = []

    nameInput.classList.remove('error')
    emailInput.classList.remove('error')
    quoteInput.classList.remove('error')

    if (nameValue === '') {
      nameInput.classList.add('error')
      errorMessages.push('Имя не должно быть пустым')
      isValid = false
    }

    if (emailValue === '') {
      emailInput.classList.add('error')
      errorMessages.push('Email не должен быть пустым')
      isValid = false
    }

    if (quoteValue === '') {
      quoteInput.classList.add('error')
      errorMessages.push('Сообщение не должно быть пустым')
      isValid = false
    }

    if (isValid === false) {
      if (tankText) {
        tankText.style.color = '#ff4d4d'
        tankText.innerHTML = errorMessages.join('<br>')
      }
      return
    }

    console.log({
      Name: nameValue,
      Email: emailValue,
      Quote: quoteValue
    })

    if (tankText) {
      tankText.style.color = '#2ed573'
      tankText.textContent = 'спасибо'
    }

    setTimeout(function() {
      closeModal()
    }, 2500)
  })
}

const workingItems = document.querySelectorAll('.working__info-item')
workingItems.forEach(function(item) {
  const content = item.querySelector('.working__info-content')
  item.addEventListener('click', function() {
    if (content) {
      content.classList.toggle('active')
    }
    item.classList.toggle('active')
  })
})

const container = document.getElementById('reviews-container')
const paginationContainer = document.getElementById('pagination-container')

function renderReviews() {
  if (!container || !paginationContainer) return

  let reviewsHtml = ''
  let dotsHtml = ''

  for (let i = 0; i < reviewsData.length; i++) {
    const review = reviewsData[i]
    reviewsHtml += '<li class="reviews__slider-item">' +
      '<blockquote class="reviews__card">' +
        '<div class="reviews__card-body">' +
          '<p>"' + review.text + '"</p>' +
        '</div>' +
        '<footer class="reviews__card-footer">' +
          '<cite class="reviews__card-name">' + review.name + '</cite>' +
          '<cite class="reviews__card-companny">' + review.company + '</cite>' +
        '</footer>' +
      '</blockquote>' +
    '</li>'

    let activeClass = ''
    if (i === 0) {
      activeClass = 'is__current'
    }
    dotsHtml += '<li class="pagination__item">' +
      '<button class="pagination__button ' + activeClass + '" data-index="' + i + '">' +
        '<img src="img/Vector.png" alt="">' +
      '</button>--' +
    '</li>'
  }

  container.innerHTML = reviewsHtml
  paginationContainer.innerHTML = dotsHtml
}

renderReviews()

document.addEventListener("DOMContentLoaded", function() {
  const list = document.querySelector(".reviews__slider-list")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  if (!list || !prevBtn || !nextBtn) return

  function updateSliderState() {
    const dots = document.querySelectorAll(".pagination__button")
    const scrollLeft = list.scrollLeft
    const item = list.querySelector(".reviews__slider-item")
    if (!item) return
    
    const cardWidth = item.offsetWidth + 50 
    const activeIndex = Math.round(scrollLeft / cardWidth)

    dots.forEach(function(dot, idx) {
      if (idx === activeIndex) {
        dot.classList.add("is__current")
      } else {
        dot.classList.remove("is__current")
      }
    })

    if (scrollLeft <= 10) {
      prevBtn.classList.add("disabled")
    } else {
      prevBtn.classList.remove("disabled")
    }

    if (scrollLeft + list.clientWidth >= list.scrollWidth - 10) {
      nextBtn.classList.add("disabled")
    } else {
      nextBtn.classList.remove("disabled")
    }
  }

  nextBtn.addEventListener("click", function() {
    const item = list.querySelector(".reviews__slider-item")
    if (item) {
      list.scrollBy({ left: item.offsetWidth + 50, behavior: "smooth" })
    }
  })

  prevBtn.addEventListener("click", function() {
    const item = list.querySelector(".reviews__slider-item")
    if (item) {
      list.scrollBy({ left: -(item.offsetWidth + 50), behavior: "smooth" })
    }
  })

  if (paginationContainer) {
    paginationContainer.addEventListener("click", function(e) {
      const btn = e.target.closest(".pagination__button")
      if (!btn) return
      
      const idx = parseInt(btn.getAttribute("data-index"))
      const item = list.querySelector(".reviews__slider-item")
      if (item) {
        list.scrollTo({ left: (item.offsetWidth + 50) * idx, behavior: "smooth" })
      }
    })
  }

  list.addEventListener("scroll", updateSliderState)
  setTimeout(updateSliderState, 100)
})

document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.getElementById('burger-btn');
    const headerNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__item a');
    const body = document.body;

    burgerButton.addEventListener('click', function() {
        burgerButton.classList.toggle('active');
        headerNav.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            burgerButton.classList.remove('active');
            headerNav.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});
