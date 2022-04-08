const quizData = {
  eng: [
    {
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
  ],
  math: [
    {
      id: 1,
      question: '2 + 2',
      a: '22',
      b: '4',
      c: '2',
      d: '-',
      correct: 'b'
    },
    {
      id: 2,
      question: 'корень 64',
      a: '8',
      b: '16',
      c: '5',
      d: '20',
      correct: 'a'
    },
    {
      id: 3,
      question: 'sin30deg?',
      a: '1',
      b: '0',
      c: '1/2',
      d: '-1',
      correct: 'c'
    },
  ],
  bio: [
    {
      id: 1,
      question: 'How many kingdoms are there in the world?',
      a: '1',
      b: '2',
      c: '3',
      d: '5',
      correct: 'd'
    },
    {
      id: 2,
      question: 'Which blat cell curl up the blood at the wound?',
      a: 'trombocite',
      b: 'leikocite',
      c: 'Eritrocite',
      d: 'Fagocite',
      correct: 'a'
    },
    {
      id: 3,
      question: 'Who is a human',
      a: 'Ruslan',
      b: 'Aziz',
      c: 'Timur',
      d: 'Abdull',
      correct: 'd'
    },
  ]
}


const $container = document.querySelector('.d_flex')
const $admin = document.querySelector('.adminPage')
const themes = ['math', 'bio', 'eng']

window.addEventListener('load', () => {
  if (!JSON.parse(localStorage.getItem('questions'))){
    localStorage.setItem('questions', JSON.stringify(quizData))
  }
})

window.addEventListener('load', () => {
  let auth = localStorage.getItem('auth')
  if (auth === 'false') {
    window.open('./index.html', '_self')
  }
})

window.addEventListener('load', () => {
  const allThemes = JSON.parse(localStorage.getItem('themes'))
  if (allThemes) {
    themeTemplate(allThemes)
  } else {
    localStorage.setItem('themes', JSON.stringify(themes))
  }
})

function themeTemplate(database) {
  const themes = database.map(elem => {
    return `
      <div class="block " id="${elem}" onclick="chooseTheme('${elem}')">
        <p class="title">
          ${elem}
        </p> 
      </div>
    `
  }).join('')
  $container.innerHTML = themes
  $container.insertAdjacentHTML('beforeend', `
    <div class="block add" id="addTheme" onclick="newTheme()")>
        <p class="title">
          +
        </p>
      </div>
  `)
}

function chooseTheme(item) {
  localStorage.setItem('theme', item)
  window.open('./main.html', '_self')
}



function newTheme() {
  const allThemes = JSON.parse(localStorage.getItem('themes'))
  const newTheme = prompt('new theme')
  if (newTheme.length >= 1) {
    const themes = [...allThemes, newTheme]
    localStorage.setItem('themes', JSON.stringify(themes))

    location.reload()
  }
}

$admin.addEventListener('click', e => {
  e.preventDefault()
  window.open('./admin.html', '_self')
})


// $themes.forEach(item => {
//   item.onclick = () => {
//     localStorage.setItem('theme', item.id)
//     window.open('./main.html', '_self')
//   }
// })




// function chooseTheme(theme){
//   localStorage.setItem('theme', theme)

//   window.open('./main.html', '_self')
// }

// $math.addEventListener('click', e => {
//   e.preventDefault()

//   chooseTheme('math')
// })
// $bio.addEventListener('click', e => {
//   e.preventDefault()

//   chooseTheme('bio')
// })
// $english.addEventListener('click', e => {
//   e.preventDefault()

//   chooseTheme('eng')
// })