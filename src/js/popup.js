const toggleOutline = document.getElementById('outline')
const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement')
const colorInput = document.querySelector('input[type="color"]')
const width = document.getElementById('outline-width')

// Change the keyboard shortcut text from ctrl to cmd
// on mac systems
if (navigator.platform.toLocaleLowerCase().includes('mac')) {
  document.getElementById('keyboard-key').innerHTML = '&#8984;'
}

chrome.storage.sync.get(['outlineColor', 'outlineWidth'], data => {
  setColorOption(data.outlineColor)
  setWidthOption(data.outlineWidth)
})

increment.addEventListener('click', () => modifyOutlineWidth(1))
decrement.addEventListener('click', () => modifyOutlineWidth(-1))

toggleOutline.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, { file: './js/content-script.js' })
  })
})

colorInput.addEventListener('change', event => {
  const outlineColor = event.target.value
  chrome.storage.sync.set({ outlineColor }, () => setColorOption(outlineColor))
})

function setColorOption(outlineColor) {
  const cssCode = `document.documentElement.style.setProperty('--ext-oc', '${outlineColor}')`
  colorInput.value = outlineColor

  executeCSS(cssCode)
}

function setWidthOption(outlineWidth) {
  const cssCode = `document.documentElement.style.setProperty('--ext-ow', '${outlineWidth}px')`
  width.innerText = `${outlineWidth}px`

  executeCSS(cssCode)
}

function modifyOutlineWidth(amount) {
  chrome.storage.sync.get('outlineWidth', ({ outlineWidth }) => {
    const newWidth = outlineWidth + amount
    if (newWidth > 0 && newWidth <= 10) {
      chrome.storage.sync.set({ outlineWidth: newWidth })
      setWidthOption(newWidth)
    }
  })
}

function executeCSS(code) {
  // Changing the width and CSS property settings
  // updates those settings across all tabs
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      // Excludes all chrome://* pages
      if (tab.url && !tab.url.includes('chrome://')) {
        chrome.tabs.executeScript(tab.id, { code })
      }
    })
  })
}
