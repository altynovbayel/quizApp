const quizData = [{
    id: 1,
    question: 'This is … orange ball.',
    a: 'a',
    b: 'an',
    c: 'the',
    d: '-',
    correct: 'b'
  },
  {
    id: 2,
    question: 'I will be back … 7 o’clock in the evening.',
    a: 'in',
    b: 'on',
    c: 'at',
    d: 'buy',
    correct: 'c'
  },
  {
    id: 3,
    question: '… Pacific ocean is the most dangerous.',
    a: 'a',
    b: 'an',
    c: 'the',
    d: '-',
    correct: 'c'
  },
  {
    id: 4,
    question: 'What is … address? – I don’t know.',
    a: 'they',
    b: 'the',
    c: 'them',
    d: 'their',
    correct: 'd'
  },
  {
    id: 5,
    question: 'This apple is … than a candy!',
    a: 'sweet',
    b: 'the sweeter',
    c: 'sweeter',
    d: 'the sweetest ',
    correct: 'c'
  },
  // {
  //   id: 6,
  //   question: 'I like him … I don’t want to go to the cinema with him.',
  //   a: 'and ',
  //   b: 'but',
  //   c: 'so',
  //   d: 'as ',
  //   correct: 'b'
  // },
  // {
  //   id: 7,
  //   question: 'Tom often … to his office by car.',
  //   a: 'goes',
  //   b: 'go',
  //   c: 'is going',
  //   d: 'had done  ',
  //   correct: 'a'
  // },
  // {
  //   id: 8,
  //   question: 'Don’t worry. We … your dog. Look here!',
  //   a: 'found ',
  //   b: 'have found ',
  //   c: 'had found',
  //   d: 'were finding',
  //   correct: 'b'
  // },
  // {
  //   id: 9,
  //   question: 'I promise, I … back next Saturday.',
  //   a: 'will come ',
  //   b: 'had come ',
  //   c: 'am coming ',
  //   d: 'have been coming  ',
  //   correct: 'a'
  // },
  // {
  //   id: 10,
  //   question: 'What’s going on? – We … for the concert. Join us!',
  //   a: 'practice',
  //   b: 'have been practicing',
  //   c: 'are practicing',
  //   d: 'had practiced',
  //   correct: 'c'
  // },
]
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
const $btn = document.querySelector('.add')
const $modalContainer = document.querySelector('.modal_container')
const $close = document.querySelector('.close')


const $add_questions = document.querySelector('.add_questions')
const $add_a = document.querySelector('.add_a')
const $add_b = document.querySelector('.add_b')
const $add_c = document.querySelector('.add_c')
const $add_d = document.querySelector('.add_d')
const $add_correct = document.querySelector('.add_correct')
const $add = document.querySelector('.accept')

window.addEventListener('load', () => {
  let auth = localStorage.getItem('auth')
  if (auth === 'false') {
    window.open('./index.html', '_self')
  }
})

window.addEventListener('load', () => {
  if (!localStorage.getItem('questions')) {
    localStorage.setItem('questions', JSON.stringify(quizData))
  } else {
    const questions = JSON.parse(localStorage.getItem('questions'))
    const questionsWithId = questions.map((item, index) => {
      return {
        ...item,
        id: index
      }
    })
    localStorage.setItem('questions', JSON.stringify(questionsWithId))
  }
})



let current = 0
let score = 0

function loadQuiz(){
  deselectedRadio()
  const data = JSON.parse(localStorage.getItem('questions'))
  const currentQuizData = data[current]
  const { a, b, c, d, question} = currentQuizData
  $question.innerHTML = question
  $a_answer.innerHTML = a
  $b_answer.innerHTML = b
  $c_answer.innerHTML = c
  $d_answer.innerHTML = d
}

loadQuiz()

function selectedAnswer(){
  let answer = null
  $answerRadio.forEach(item => {
    if(item.checked){
      answer = item.id
    }
  })
  return answer
}

function deselectedRadio(){
  $answerRadio.forEach(item => item.checked = false)
}

let myAnswer = []

$submitBtn.addEventListener('click', e => {
  e.preventDefault()
  let answer = selectedAnswer()
  if(answer){
    $error.classList.remove('active')
    const data = JSON.parse(localStorage.getItem('questions'))
    if(answer === data[current].correct){
      score++
    }
    myAnswer.push(answer)
    current++
    if (current < data.length){
      loadQuiz()
    }else{
      $card.innerHTML = `
        <h2>Вы ответили правильно на ${score}/${data.length} вопросов</h2>
        <button onclick="trueAnswer()">показать правильные ответы</button>
      `
      $submitBtn.style.display = 'none'
    }
  }else{
    $error.classList.add('active')
  }
})

function trueAnswer(){
  const data = JSON.parse(localStorage.getItem('questions'))
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

function card(item, index){
  return `
      <div class="card_true">
        <ol type="a" class="answerList">
          <h3 class="">${item.question}</h3>
          <li>${item.a}</li>
          <li>${item.b}</li>
          <li>${item.c}</li>
          <li>${item.d}</li>
          <h5 class="">
            Правильный ответ: <span class="correct">${item.correct}</span>
          </h5>
          <h5 class="">ваш вариант ответа: <span class="myAnswer">${myAnswer[index]}</span></h5>
        </ol>
      </div>
    `
}

$logout.addEventListener('click' , () => {
  localStorage.setItem('auth', false)
  location.reload()
})

function closeModal() {
  $modalContainer.classList.remove('show')
}

function openModal() {
  $modalContainer.classList.add('show')
}

$btn.addEventListener('click', () => {
  openModal()
})

$close.addEventListener('click', () => {
  closeModal()
})

$modalContainer.addEventListener('click', e => {
  if (e.target.classList.contains('container')) {
    closeModal()
  }
})

window.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    closeModal()
  }
})

$add.addEventListener('click', e => {
  const data = JSON.parse(localStorage.getItem('questions'))
  const addNewQuestions = {
    id: 0,
    question: $add_questions.value,
    a: $add_a.value,
    b: $add_b.value,
    c: $add_c.value,
    d: $add_d.value,
    correct: $add_correct.value
  }
  data.push(addNewQuestions)
  localStorage.setItem('questions', JSON.stringify(data))
  location.reload()
})