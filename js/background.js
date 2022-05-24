chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    fetch(request.url, { method: 'HEAD' })
      .then((response) => {
        if (response.status !== 200) {
          return sendResponse({ exist: false });
        }

        return sendResponse({ exist: true });
      });
    return true;
  });
