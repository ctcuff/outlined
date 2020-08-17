chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    outlineColor: '#ff0000',
    outlineWidth: 1
  })
})

chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-outline') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(tabs[0].id, { file: './js/content-script.js' })
    })
  }
})
