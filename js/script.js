const $container = document.querySelector('.container')
const $card = document.querySelector('.card')
const $answerRadio = document.querySelectorAll('.answer')
const $question = document.querySelector('.question')
const $a_answer = document.querySelector('.a_answer')
const $b_answer = document.querySelector('.b_answer')
const $c_answer = document.querySelector('.c_answer')
const $d_answer = document.querySelector('.d_answer')
const $submitBtn = document.querySelector('.answer_btn')
const $error = document.querySelector('.errorText')
const $logout = document.querySelector('.logout')
const $current = document.querySelector('.current')
const $theme = document.querySelector('.choose_theme')

window.addEventListener('load', () => {
  let auth = localStorage.getItem('auth')
  if (auth === 'false') {
    window.open('./index.html', '_self')
  }
})


window.addEventListener('load', () => {
  const chosenTheme = localStorage.getItem('theme')
  if (chosenTheme) {
    const theme = localStorage.getItem('theme')
    const database = JSON.parse(localStorage.getItem('questions'))
    const dbLocalData = database[theme]
    console.log(dbLocalData)

    localStorage.setItem('chosenTheme', JSON.stringify(dbLocalData))
  } else {
    window.open('./themes.html', '_self')
  }

})


let current = 0
let score = 0

function loadQuiz() {
  deselectedRadio()
  const data = JSON.parse(localStorage.getItem('chosenTheme'))
  const currentQuizData = data[current]
  const {
    a,
    b,
    c,
    d,
    question
  } = currentQuizData
  $question.innerHTML = question
  $a_answer.innerHTML = a
  $b_answer.innerHTML = b
  $c_answer.innerHTML = c
  $d_answer.innerHTML = d
  $current.innerHTML = `${current + 1}/${data.length}`
}

loadQuiz()

function selectedAnswer() {
  let answer = null
  $answerRadio.forEach(item => {
    if (item.checked) {
      answer = item.id
    }
  })
  return answer
}

function deselectedRadio() {
  $answerRadio.forEach(item => item.checked = false)
}

let myAnswer = []

$submitBtn.addEventListener('click', e => {
  e.preventDefault()
  let answer = selectedAnswer()
  if (answer) {
    $error.classList.remove('active')
    const data = JSON.parse(localStorage.getItem('chosenTheme'))
    if (answer === data[current].correct) {
      score++
    }
    myAnswer.push(answer)
    current++
    if (current < data.length) {
      loadQuiz()
    } else {
      $card.innerHTML = `
        <h2>Вы ответили правильно на ${score}/${data.length} вопросов</h2>
        <button onclick="trueAnswer()">показать правильные ответы</button>
      `
      $submitBtn.style.display = 'none'
    }
  } else {
    $error.classList.add('active')
  }
})

function trueAnswer() {
  const data = JSON.parse(localStorage.getItem('chosenTheme'))
  const template = data.map((item, index) => {
    return card(item, index)
  }).join('')
  $container.innerHTML = template
  $container.insertAdjacentHTML('beforeend', `
    <div class="card_btn">
      <button class="reload_btn" onclick="location.reload()">начать заново</button>
    </div>
  `)
}

function card(item, index) {
  return `
      <div class="card_true">
        <div class="answerList">
          <h3>${item.question}</h3>
          <ol type="1" class="true_list">
            <li>${item.a}</li>
            <li>${item.b}</li>
            <li>${item.c}</li>
            <li>${item.d}</li>
          </ol>
          <h5 class="">
            Правильный ответ: <span class="correct">${item.correct}</span>
          </h5>
          <h5 class="">ваш вариант ответа: <span class="myAnswer">${myAnswer[index]}</span></h5>
        </div>
      </div>
    `
}

$logout.addEventListener('click', () => {
  localStorage.removeItem('theme')
  localStorage.setItem('auth', false)
  location.reload()
})



$theme.addEventListener('click', e => {
  e.preventDefault()

  localStorage.removeItem('theme')
  window.open('./themes.html', '_self')
})