# Anti-Scam URL Checker 防詐騙網址檢查器

一個用於檢測釣魚詐騙網站的 Chrome 瀏覽器擴充套件，協助使用者識別可疑網址並保護個人資訊安全。

## 📋 功能特色

- **即時網址檢查**：自動檢測當前頁面網址的安全性
- **三級風險分類**：
  - 🟢 **安全**：已驗證的官方網站
  - 🟡 **可疑**：可能存在風險的網站
  - 🔴 **高風險**：已知的詐騙或危險網站
- **簡潔操作介面**：點擊擴充套件圖示即可查看檢查結果
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
antiscam/
├── manifest.json          # 擴充套件配置檔
├── background.js          # 背景腳本，處理網址檢查邏輯
├── popup.html            # 彈出視窗 HTML
├── popup.js              # 彈出視窗 JavaScript
├── icons/                # 圖示資源
│   ├── safe.png          # 安全狀態圖示
│   ├── warning.png       # 警告狀態圖示
│   └── danger.png        # 危險狀態圖示
└── README.md             # 專案說明文件
```

## 🔧 技術實作

### 檢查機制

擴充套件採用多層次檢查機制：

1. **白名單檢查**：驗證已知的安全官方網站
   - 包含：`t-cat.com.tw`、`post.gov.tw`、`shopee.tw`、`chatgpt.com` 等

2. **黑名單檢查**：識別已知的詐騙網站
   - 包含：`blackcat-delivery.xyz`、`post-tw-logistics.top` 等

3. **啟發式檢查**：基於網域名稱特徵判斷
   - 網域名稱過長（超過 30 字元）
   - 包含可疑字元組合

### 關鍵程式碼

```javascript
function checkUrl(url) {
  // 檢查邏輯實作於 background.js
  // 回傳 { status, message } 物件
}
```

## ⚠️ 注意事項

- 此工具僅作為輔助參考，無法涵蓋所有詐騙網站
- 建議搭配其他安全工具一同使用
- 遇到可疑網站時，請謹慎輸入個人資訊
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
- `scripting`：執行腳本

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
