const $modalContainer = document.querySelector('.modal_container')
const $add_questions = document.querySelector('.add_questions')
const $allOptions = document.querySelectorAll('.option')
const $themes = document.querySelector('#themes')
const $rightAnswer = document.querySelector('#right_answer')
const $add = document.querySelector('.accept')
const $modalError = document.querySelector('.modalError')
const $back = document.querySelector('.back')


window.addEventListener('load', () => {
  const themes = JSON.parse(localStorage.getItem('themes'))

  const allThemes = themes.map(item => {
    return `
      <option value="${item}">${item}</option>
    `
  })

  $themes.innerHTML = allThemes
})

let chosenTheme = 'math'
let rightAns = 'a'

$themes.addEventListener('change', e => {
  chosenTheme = e.target.value
})

$rightAnswer.addEventListener('change', e => {
  const value = e.target.value
  rightAns = value
})


$add.addEventListener('click', e => {
  e.preventDefault()

  const database = JSON.parse(localStorage.getItem('questions'))
  const newQuestion = newQues()
  
  if(newQuestion){
    if(!database[chosenTheme]){
      database[chosenTheme] = []
      database[chosenTheme].push(newQuestion)
    }else{
      database[chosenTheme].push(newQuestion)
    }
    localStorage.setItem('questions', JSON.stringify(database))
    location.reload()
  }else{
    $modalError.innerHTML = 'заполните поля '
  }
})

function newQues() {
  const obj = {}

  let allInputsFilledUp = true

  $allOptions.forEach(({id, value}) => {
    if (value) {
      obj[id] = value
    } else {
      allInputsFilledUp = false
    }
  })

  if (allInputsFilledUp && $add_questions.value) {
    obj.question = $add_questions.value,
    obj.correct = $rightAnswer.value

    return obj
  }
  else {
    console.error('error');
  }

}


$back.addEventListener('click', e => {
  e.preventDefault()
  window.open('./themes.html', '_self')
})