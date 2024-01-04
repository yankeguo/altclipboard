(function () {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.value) {
      document.execCommand("insertText", false, request.value);
    }
    sendResponse({});
  });
})();
