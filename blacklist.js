// 黑名單 - 已知的詐騙或危險網站
// 這些網站會立即顯示高風險警告
const blacklist = [
  // 假冒物流公司
  "blackcat-delivery.xyz", // 假冒黑貓宅急便
  "post-tw-logistics.top", // 假冒中華郵政

  // 假冒銀行
  "ctbc-security.com", // 假冒中信銀行
  "cathay-security.net", // 假冒國泰世華
  "esun-security.org", // 假冒玉山銀行

  // 假冒電商
  "shopee-payment.com", // 假冒 Shopee
  "momo-payment.net", // 假冒 momo
  "pchome-payment.org", // 假冒 PChome

  // 假冒政府機關
  "post-gov-tw.com", // 假冒中華郵政
  "tax-gov-tw.net", // 假冒國稅局
  "moea-gov-tw.org", // 假冒經濟部

  // 假冒科技公司
  "openai-chatgpt.com", // 假冒 OpenAI
  "microsoft-office.net", // 假冒 Microsoft
  "google-drive.org", // 假冒 Google Drive

  // 常見詐騙域名模式
  "security-verification.com", // 安全驗證詐騙
  "account-suspended.net", // 帳戶暫停詐騙
  "payment-failed.org", // 付款失敗詐騙
];

// 黑名單已定義為全域變數，可直接在 background.js 中使用
