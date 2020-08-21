;(function () {
  const hasOutline = document.documentElement.dataset.hasOutline === 'true'
  const root = document.documentElement

  if (!hasOutline) {
    root.classList.add('___outline')
  } else {
    root.classList.remove('___outline')
  }

  root.dataset.hasOutline = !hasOutline ? 'true' : 'false'
})()
