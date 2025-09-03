document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("lastCheck", (data) => {
      if (data.lastCheck) {
        const { status, message } = data.lastCheck;
        const statusEl = document.getElementById("status");
        const msgEl = document.getElementById("message");
  
        if (status === "safe") {
          statusEl.textContent = "🟢 安全";
        } else if (status === "warning") {
          statusEl.textContent = "🟡 可疑";
        } else {
          statusEl.textContent = "🔴 高風險";
        }
  
        msgEl.textContent = message;
      } else {
        document.getElementById("status").textContent = "尚未檢查";
      }
    });
  });
  