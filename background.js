(function () {
  const _clipboard = {
    value: "",
  };

  chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
      id: "copy",
      contexts: ["selection"],
      title: "Copy",
    });
    chrome.contextMenus.create({
      id: "paste",
      contexts: ["all"],
      title: "Paste and Clear",
    });
    chrome.contextMenus.create({
      id: "clear",
      contexts: ["all"],
      title: "Clear",
    });
  });

  chrome.contextMenus.onClicked.addListener(async function (data, tab) {
    switch (data.menuItemId) {
      case "copy":
        _clipboard.value = data.selectionText || "";
        break;
      case "paste":
        const clipboard = { value: _clipboard.value };
        _clipboard.value = "";
        const [tab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });
        if (tab) {
          await chrome.tabs.sendMessage(tab.id, clipboard);
        }
        break;
      case "clear":
        _clipboard.value = "";
        break;
    }
  });
})();
