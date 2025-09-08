<div align="center">
  <img src="images/logo_128x128.png" alt="Anti-Scam Logo" width="128" height="128">
  <h1>Anti-Scam URL Checker 防詐騙網址檢查器</h1>
  <p>一個用於檢測釣魚詐騙網站的 Chrome 瀏覽器擴充套件，協助使用者識別可疑網址並保護個人資訊安全。</p>
</div>

## 📋 功能特色

- **主動安全提醒**：進入網頁時自動顯示 overlay 通知，無需手動點擊
- **即時網址檢查**：自動檢測當前頁面網址的安全性
- **四級風險分類**：
  - 🟢 **安全**：已驗證的官方網站（白名單）
  - 🟡 **可疑**：HTTP 未加密連線或可疑域名
  - 🔴 **高風險**：已知的詐騙或危險網站（黑名單）
  - ❓ **未知**：尚未分類的網站
- **現代化介面**：美觀的 popup 介面，顯示詳細檢查資訊
- **協議安全檢測**：特別提醒 HTTP 網站的資料傳輸風險
- **輕量化設計**：不影響瀏覽器效能

## 🚀 安裝方式

### 開發者模式安裝

1. 下載或複製此專案至本機
2. 開啟 Chrome 瀏覽器，進入擴充功能管理頁面 (`chrome://extensions/`)
3. 開啟右上角的「開發人員模式」
4. 點擊「載入未封裝項目」
5. 選擇專案資料夾
6. 擴充套件將出現在工具列中

## 📂 專案結構

```
Anti-Scam/
├── manifest.json          # 擴充套件配置檔
├── background.js          # 背景腳本，處理網址檢查邏輯
├── content-script.js      # 內容腳本，處理 overlay 顯示
├── popup.html            # 彈出視窗 HTML
├── popup.js              # 彈出視窗 JavaScript
├── whitelist.js          # 白名單 - 安全網站清單
├── blacklist.js          # 黑名單 - 詐騙網站清單
├── icons/                # 圖示資料夾
│   ├── safe.png          # 安全狀態圖示
│   ├── warning.png       # 警告狀態圖示
│   └── danger.png        # 危險狀態圖示
├── images/               # 圖片資料夾
│   ├── logo_16x16.png    # 16x16 logo
│   ├── logo_48x48.png    # 48x48 logo
│   └── logo_128x128.png  # 128x128 logo
├── LICENSE               # 授權條款
└── README.md             # 專案說明文件
```

## 🔧 技術實作

### 檢查機制

擴充套件採用多層次檢查機制：

1. **HTTP 協議檢查**：優先檢測未加密連線
   - 警告 HTTP 網站的資料傳輸風險
   - 提醒避免輸入敏感資訊

2. **白名單檢查**：驗證已知的安全官方網站
   - 包含政府機關、銀行、電信、電商等知名網站
   - 白名單網站不會顯示 overlay 通知
   - 清單維護在 `whitelist.js` 檔案中

3. **黑名單檢查**：識別已知的詐騙網站
   - 包含假冒物流、銀行、電商、政府機關等詐騙網站
   - 立即顯示高風險警告
   - 清單維護在 `blacklist.js` 檔案中

4. **啟發式檢查**：基於網域名稱特徵判斷
   - 網域名稱過長（超過 30 字元）
   - 包含可疑字元組合（數字、連字號等）

### 架構設計

- **Background Script**：監聽分頁更新，執行網址檢查邏輯
- **Content Script**：注入到網頁中，顯示 overlay 通知
- **Popup Interface**：提供詳細的檢查結果和操作選項
- **Message Passing**：各腳本間透過 Chrome API 進行通訊

## 🎯 使用方式

1. **自動提醒**：進入任何網頁時，系統會自動檢查並顯示結果
2. **手動檢查**：點擊擴充功能圖示查看詳細資訊
3. **重新檢查**：在 popup 中點擊「重新檢查」按鈕
4. **關閉通知**：點擊 overlay 右上角的 × 按鈕或等待 5 秒自動消失

## ⚠️ 注意事項

- 此工具僅作為輔助參考，無法涵蓋所有詐騙網站
- 建議搭配其他安全工具一同使用
- 遇到可疑網站時，請謹慎輸入個人資訊
- HTTP 網站特別注意：避免輸入密碼、信用卡等敏感資訊
- 定期更新黑名單以提升防護效果

## 🛠️ 開發相關

### 版本資訊
- **版本**：0.0.1
- **Manifest 版本**：3
- **相容瀏覽器**：Chrome、Edge（Chromium 核心）

### 所需權限
- `tabs`：讀取分頁資訊
- `storage`：儲存檢查結果
- `activeTab`：存取當前分頁
- `scripting`：執行腳本和注入 content script

### 技術特色
- **Manifest V3**：使用最新的 Chrome 擴充功能標準
- **Content Script 注入**：動態注入到網頁中顯示通知
- **Message Passing**：高效的腳本間通訊機制
- **Responsive Design**：適配不同螢幕尺寸的現代化 UI

## 🤝 貢獻指南

歡迎協助改善此專案：

1. Fork 此 Repository
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📞 問題回報

如發現問題或有建議，請透過 GitHub Issues 回報。

## 📄 授權條款

MIT License - 詳情請參閱 LICENSE 檔案。

---

**免責聲明**：此工具僅供參考使用，開發者不對因使用此工具而造成的任何損失負責。使用者應自行判斷網站安全性並承擔相關風險。
