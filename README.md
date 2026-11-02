# 服飾商品資料庫連結應用｜作業起始專案

## 專案內容
- `sql/01_schema.sql`：建立 clothing_store 與六張資料表（clothing 含 image_url）
- `sql/02_seed_data.sql`：由提供的 Excel 匯出的資料 INSERT 語法
- `sql/03_assignment_queries.sql`：A1～C2 題目查詢參考
- `notebooks/clothing_database_colab.ipynb`：Colab 連線、建表、匯入、測試流程
- `images/products/`：60 張商品照片
- `docs/product_image_mapping.csv`：商品 ID、圖片檔名及 GitHub Pages URL 對照

## 商品圖片命名規則
P0001 → product-001.jpg，依序至 P0060 → product-060.jpg。
上傳本專案的 `images` 資料夾至 GitHub repository，啟用 GitHub Pages 後，將 Notebook 與 SQL 中的 `YOUR_GITHUB_USERNAME`、`YOUR_REPOSITORY` 改成自己的帳號與 repo 名稱。

## 建議執行順序
1. 建立 TiDB Cloud Serverless Cluster，取得連線資訊與 CA 憑證。
2. 執行 `sql/01_schema.sql`。
3. 執行 `sql/02_seed_data.sql`（先替換圖片 URL 的 GitHub 使用者名稱及 repo）。
4. 或直接在 Colab 執行 Notebook，完成連線及資料匯入。
5. 將 `images/` 部署至 GitHub Pages，檢查圖片 URL 能否開啟。
6. 再部署 API / Dashboard。不要把 TiDB 密碼放進前端或公開 GitHub。

## 重要相容性提醒
TiDB 與 MySQL 語法高度相容，但不是所有 MySQL 功能都支援。作業 C2 的 stored function 若在 TiDB 執行失敗，請依老師要求改在 MySQL 環境示範，或先向老師確認可接受的等價查詢方式。`CHECK` constraint 也請以目前 Cluster 版本實測。

## 安全
請勿將資料庫密碼、私鑰或連線憑證上傳到公開 GitHub。


## Dashboard
- `index.html`, `styles.css`, `app.js`, `config.js`：GitHub Pages 靜態前端
- `data/products.json`：展示資料模式商品資料
- `api/products.js`：Vercel Serverless API，伺服器端讀取 TiDB
- `docs/DEPLOY_GUIDE.md`：GitHub Pages 與 Vercel 部署步驟
