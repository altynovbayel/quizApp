const $email = document.querySelector('.email')
const $pass = document.querySelector('.pass')
const $key = document.querySelector('.key')
const $btn = document.querySelector('.auth_btn')

window.addEventListener('load', () => {
  if(!localStorage.getItem('auth')){
    localStorage.setItem('auth', 'false')
  }else{
    let auth = localStorage.getItem('auth')
    if(auth === 'true'){
      window.open('./themes.html', '_self')
    }
  }
})

function checkedAuth(){
  if($email.value === 'admin' && $pass.value === '123'){
    localStorage.setItem('auth', 'true')
    location.reload()
  }else{
    $email.classList.add('active')
    $pass.classList.add('active')
    $key.classList.add('active')
  }
}

$btn.addEventListener('click', e => {
  e.preventDefault()

  checkedAuth()
})

window.addEventListener('keyup', e => {
  if(e.key === 'Enter'){
    checkedAuth()
  }
})