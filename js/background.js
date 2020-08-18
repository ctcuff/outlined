chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    outlineColor: '#ff0000',
    outlineWidth: 1
  })

  // Only enables the extension popup on pages that don't start with
  // http or https
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              schemes: ['http', 'https']
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })

  chrome.commands.onCommand.addListener(command => {
    if (command === 'toggle-outline') {
      const opts = {
        // Prevents the command from running on
        // chrome://* pages and new tab pages
        url: ['*://*/*'],
        active: true,
        currentWindow: true
      }

      chrome.tabs.query(opts, tabs => {
        if (tabs.length > 0) {
          chrome.tabs.executeScript(tabs[0].id, { file: './js/content-script.js' })
        }
      })
    }
  })
})
