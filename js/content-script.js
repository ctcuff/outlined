;(function () {
  let hasOutline = document.body.dataset.hasOutline === 'true'

  if (!hasOutline) {
    document.body.classList.add('___outline')
  } else {
    document.body.classList.remove('___outline')
  }

  document.body.dataset.hasOutline = !hasOutline ? 'true' : 'false'
})()
