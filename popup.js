document.addEventListener("DOMContentLoaded", async () => {
  const loadingEl = document.getElementById("loading");
  const mainContentEl = document.getElementById("main-content");
  const statusIconEl = document.getElementById("status-icon");
  const statusTextEl = document.getElementById("status-text");
  const statusMessageEl = document.getElementById("status-message");
  const currentUrlEl = document.getElementById("current-url");
  const protocolIconEl = document.getElementById("protocol-icon");
  const protocolTextEl = document.getElementById("protocol-text");
  const refreshBtn = document.getElementById("refresh-btn");
  const settingsBtn = document.getElementById("settings-btn");

  // 獲取當前分頁資訊
  async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  }

  // 顯示檢查結果
  function displayResult(result, currentUrl) {
    loadingEl.style.display = "none";
    mainContentEl.style.display = "block";

    // 設定狀態圖示和文字
    let icon, statusText, statusClass;
    switch (result.status) {
      case "safe":
        icon = "✅";
        statusText = "安全";
        statusClass = "safe";
        break;
      case "warning":
        icon = "⚠️";
        statusText = "可疑";
        statusClass = "warning";
        break;
      case "danger":
        icon = "🚨";
        statusText = "高風險";
        statusClass = "danger";
        break;
      default:
        icon = "❓";
        statusText = "未知";
        statusClass = "unknown";
    }

    statusIconEl.textContent = icon;
    statusTextEl.textContent = statusText;
    statusMessageEl.textContent = result.message;

    // 設定網址資訊
    if (currentUrl) {
      currentUrlEl.textContent = currentUrl;

      // 設定協議資訊
      if (currentUrl.startsWith("https://")) {
        protocolIconEl.textContent = "🔒";
        protocolTextEl.textContent = "HTTPS 加密連線";
      } else if (currentUrl.startsWith("http://")) {
        protocolIconEl.textContent = "⚠️";
        protocolTextEl.textContent = "HTTP 未加密連線";
      } else {
        protocolIconEl.textContent = "🔍";
        protocolTextEl.textContent = "特殊協議";
      }
    }
  }

  // 重新檢查功能
  refreshBtn.addEventListener("click", async () => {
    loadingEl.style.display = "block";
    mainContentEl.style.display = "none";

    try {
      const tab = await getCurrentTab();
      if (tab && tab.url) {
        // 發送訊息給 background script 重新檢查
        chrome.runtime.sendMessage({ action: "recheck", url: tab.url });

        // 等待一下再顯示結果
        setTimeout(async () => {
          const data = await chrome.storage.local.get("lastCheck");
          if (data.lastCheck) {
            displayResult(data.lastCheck, tab.url);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("重新檢查失敗:", error);
    }
  });

  // 設定按鈕功能
  settingsBtn.addEventListener("click", () => {
    // 這裡可以開啟設定頁面或顯示設定選項
    alert("設定功能開發中...");
  });

  // 初始化顯示
  try {
    const tab = await getCurrentTab();
    const data = await chrome.storage.local.get("lastCheck");

    if (data.lastCheck && tab && tab.url) {
      displayResult(data.lastCheck, tab.url);
    } else if (tab && tab.url) {
      // 如果沒有檢查結果，顯示當前網址但沒有狀態
      loadingEl.style.display = "none";
      mainContentEl.style.display = "block";
      statusIconEl.textContent = "❓";
      statusTextEl.textContent = "尚未檢查";
      statusMessageEl.textContent = "點擊重新檢查按鈕進行安全檢查";
      currentUrlEl.textContent = tab.url;

      if (tab.url.startsWith("https://")) {
        protocolIconEl.textContent = "🔒";
        protocolTextEl.textContent = "HTTPS 加密連線";
      } else if (tab.url.startsWith("http://")) {
        protocolIconEl.textContent = "⚠️";
        protocolTextEl.textContent = "HTTP 未加密連線";
      } else {
        protocolIconEl.textContent = "🔍";
        protocolTextEl.textContent = "特殊協議";
      }
    } else {
      // 無法獲取分頁資訊
      loadingEl.style.display = "none";
      mainContentEl.style.display = "block";
      statusIconEl.textContent = "❌";
      statusTextEl.textContent = "無法檢查";
      statusMessageEl.textContent = "無法獲取當前網頁資訊";
    }
  } catch (error) {
    console.error("初始化失敗:", error);
    loadingEl.style.display = "none";
    mainContentEl.style.display = "block";
    statusIconEl.textContent = "❌";
    statusTextEl.textContent = "錯誤";
    statusMessageEl.textContent = "載入失敗，請重新開啟";
  }
});
