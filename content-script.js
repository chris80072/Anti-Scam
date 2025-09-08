// Content Script - 注入到網頁中顯示 overlay
// 檢查是否已經存在，避免重複宣告
if (typeof window.AntiScamOverlay === "undefined") {
  window.AntiScamOverlay = class AntiScamOverlay {
    constructor() {
      this.overlay = null;
      this.isVisible = false;
      this.init();
    }

    init() {
      // 監聽來自 background script 的訊息
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "showOverlay") {
          this.showOverlay(request.data);
        }
      });
    }

    createOverlay(status, message) {
      // 移除現有的 overlay
      this.removeOverlay();

      // 創建 overlay 元素
      const overlay = document.createElement("div");
      overlay.id = "anti-scam-overlay";
      overlay.className = `anti-scam-overlay anti-scam-${status}`;

      // 根據狀態設定樣式和圖示
      let icon, bgColor, borderColor;
      switch (status) {
        case "safe":
          icon = "✅";
          bgColor = "#f0f9ff";
          borderColor = "#10b981";
          break;
        case "warning":
          icon = "⚠️";
          bgColor = "#fffbeb";
          borderColor = "#f59e0b";
          break;
        case "danger":
          icon = "🚨";
          bgColor = "#fef2f2";
          borderColor = "#ef4444";
          break;
      }

      overlay.innerHTML = `
      <div class="anti-scam-content">
        <div class="anti-scam-header">
          <span class="anti-scam-icon">${icon}</span>
          <span class="anti-scam-title">Anti-Scam 檢查結果</span>
          <button class="anti-scam-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="anti-scam-message">${message}</div>
        <div class="anti-scam-footer">
          <small>此通知將在 5 秒後自動消失</small>
        </div>
      </div>
    `;

      // 設定樣式
      overlay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2147483647;
      background: ${bgColor};
      border: 2px solid ${borderColor};
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      max-width: 400px;
      min-width: 320px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      word-wrap: break-word;
    `;

      // 添加內部樣式
      const style = document.createElement("style");
      style.textContent = `
      .anti-scam-content {
        padding: 16px;
      }
      .anti-scam-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .anti-scam-icon {
        font-size: 18px;
        margin-right: 8px;
      }
      .anti-scam-title {
        flex: 1;
        color: #1f2937;
      }
      .anti-scam-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background-color 0.2s;
      }
      .anti-scam-close:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .anti-scam-message {
        color: #374151;
        margin-bottom: 8px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .anti-scam-footer {
        color: #6b7280;
        font-size: 12px;
      }
    `;

      document.head.appendChild(style);
      document.body.appendChild(overlay);

      return overlay;
    }

    showOverlay(data) {
      const { status, message } = data;

      // 避免重複顯示
      if (this.isVisible) {
        this.removeOverlay();
      }

      this.overlay = this.createOverlay(status, message);
      this.isVisible = true;

      // 動畫顯示
      requestAnimationFrame(() => {
        this.overlay.style.opacity = "1";
        this.overlay.style.transform = "translateX(0)";
      });

      // 5 秒後自動隱藏
      setTimeout(() => {
        this.hideOverlay();
      }, 5000);
    }

    hideOverlay() {
      if (this.overlay && this.isVisible) {
        this.overlay.style.opacity = "0";
        this.overlay.style.transform = "translateX(100%)";

        setTimeout(() => {
          this.removeOverlay();
        }, 300);
      }
    }

    removeOverlay() {
      if (this.overlay) {
        this.overlay.remove();
        this.overlay = null;
        this.isVisible = false;
      }
    }
  };
}

// 初始化 overlay（如果尚未初始化）
if (!window.antiScamOverlayInstance) {
  window.antiScamOverlayInstance = new window.AntiScamOverlay();
}
