chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    outlineColor: '#ff0000',
    outlineWidth: 1
  })
})
