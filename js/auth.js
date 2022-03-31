const $email = document.querySelector('.email')
const $pass = document.querySelector('.pass')
const $btn = document.querySelector('.auth_btn')

window.addEventListener('load', () => {
  if(!localStorage.getItem('auth')){
    localStorage.setItem('auth', false)
  }else{
    let auth = localStorage.getItem('auth')
    if(auth === 'true'){
      window.open('./main.html', '_self')
    }
  }
})

$btn.addEventListener('click', e => {
  e.preventDefault()

  if($email.value === 'admin' && $pass.value === '123'){
    localStorage.setItem('auth', true)
    location.reload()
  }else{
    $email.classList.add('active')
    $pass.classList.add('active')
  }
})

