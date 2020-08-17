const toggleOutline = document.getElementById('outline')
const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement')
const colorInput = document.querySelector('input[type="color"]')
const width = document.getElementById('outline-width')

chrome.storage.sync.get(['outlineColor', 'outlineWidth'], data => {
  setColorProperty(data.outlineColor)
  setWidthProperty(data.outlineWidth)
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
  chrome.storage.sync.set({ outlineColor }, () => setColorProperty(outlineColor))
})

function setColorProperty(outlineColor) {
  const cssCode = `document.documentElement.style.setProperty('--ext-oc', '${outlineColor}')`
  colorInput.value = outlineColor

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, { code: cssCode })
  })
}

function setWidthProperty(outlineWidth) {
  const cssCode = `document.documentElement.style.setProperty('--ext-ow', '${outlineWidth}px')`
  width.innerText = `${outlineWidth}px`

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(tabs[0].id, { code: cssCode })
  })
}

function modifyOutlineWidth(amount) {
  chrome.storage.sync.get('outlineWidth', ({ outlineWidth }) => {
    const newWidth = outlineWidth + amount
    if (newWidth > 0 && newWidth <= 10) {
      chrome.storage.sync.set({ outlineWidth: newWidth })
      setWidthProperty(newWidth)
    }
  })
}
