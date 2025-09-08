// 簡單的白名單 & 黑名單
const whitelist = ["t-cat.com.tw", "post.gov.tw", "shopee.tw", "chatgpt.com"];
const blacklist = ["blackcat-delivery.xyz", "post-tw-logistics.top"];

function checkUrl(url) {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname;

    // 檢查是否為 HTTP（非 HTTPS）
    if (parsed.protocol === "http:") {
      return {
        status: "warning",
        message:
          "⚠️ 此網站使用 HTTP 連線，資料傳輸未加密！請避免在此網站輸入個人資料、密碼或信用卡資訊。建議使用 HTTPS 版本。",
      };
    }

    if (whitelist.some((w) => domain.includes(w))) {
      return { status: "safe", message: "這是官方網站 ✅" };
    }

    if (blacklist.some((b) => domain.includes(b))) {
      return { status: "danger", message: "⚠ 高風險網站，可能是假冒詐騙！" };
    }

    // 簡單規則：域名過長、包含可疑字元
    if (domain.length > 30 || /[0-9\-]/.test(domain)) {
      return { status: "warning", message: "可疑網站，請再次確認網址來源" };
    }

    return { status: "safe", message: "未發現問題，但請保持警覺。" };
  } catch (e) {
    return { status: "danger", message: "網址無效" };
  }
}

// 監聽 Tab 更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const result = checkUrl(tab.url);
    chrome.storage.local.set({ lastCheck: result });

    // 只有非安全狀態才顯示 overlay 通知
    if (result.status !== "safe") {
      showOverlayNotification(tabId, result);
    }
  }
});

// 顯示 overlay 通知
async function showOverlayNotification(tabId, result) {
  try {
    // 檢查是否為 HTTP/HTTPS 網頁
    const tab = await chrome.tabs.get(tabId);
    if (
      !tab.url ||
      (!tab.url.startsWith("http://") && !tab.url.startsWith("https://"))
    ) {
      return;
    }

    // 注入 content script 並顯示通知
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content-script.js"],
    });

    // 發送訊息給 content script
    chrome.tabs.sendMessage(tabId, {
      action: "showOverlay",
      data: result,
    });
  } catch (error) {
    // 忽略錯誤（例如無法注入到某些頁面）
    console.log("無法顯示 overlay:", error.message);
  }
}

// 監聽來自 popup 的重新檢查請求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "recheck" && request.url) {
    const result = checkUrl(request.url);
    chrome.storage.local.set({ lastCheck: result });
    sendResponse({ success: true, result: result });
  }
});
