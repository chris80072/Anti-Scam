// 簡單的白名單 & 黑名單
const whitelist = ["t-cat.com.tw", "post.gov.tw", "shopee.tw", "chatgpt.com"];
const blacklist = ["blackcat-delivery.xyz", "post-tw-logistics.top"];

function checkUrl(url) {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname;

    if (whitelist.some(w => domain.includes(w))) {
      return { status: "safe", message: "這是官方網站 ✅" };
    }

    if (blacklist.some(b => domain.includes(b))) {
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
  }
});
