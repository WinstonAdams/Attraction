# 台灣旅遊平台

![Index page about Attraction](https://github.com/WinstonAdams/Attraction/blob/2dbf6cee4f592aa1baff18d493367f77b42bd85b/public/images/attraction%20%E9%A6%96%E9%A0%81.jpg)

## 介紹

收藏屬於自己的台灣景點清單，可以瀏覽景點、查看詳細資訊、搜尋景點，利用 Google Map 查看景點街景或周圍的特色地點，需要旅遊建議時也可以直接向 ChatGPT 詢問，若遇到網站上的問題時，能夠向客服人員即時連線對話。

## 功能

- 使用者可以用 email 或 Facebok 註冊與登入
- 瀏覽所有景點或特定縣市的景點
- 搜尋特定景點
- 查看景點的詳細資訊
- 使用者可以建立並管理專屬的景點願望清單
- 以 Google Map 搜尋特定景點，查看街景與周圍的特色地點
- 向 ChatGPT 詢問旅遊建議
- 向客服人員即時連線對話
- 查看與客服人員對話的紀錄

## 開始使用

1. 請先確認有安裝 Node.js 、 npm 、 MySQL 與 MySQL Workbench
2. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   git clone https://github.com/WinstonAdams/Attraction.git
   ```
   
3. 安裝相關套件，輸入：

   ```bash
   npm install
   ```
   
4. 安裝 nodemon 

   ```bash
   npm i -g nodemon
   ```

5. 新增 .env 檔案，設定環境變數，可參考 .env.example 檔案：

   ```bash
   PORT = 3000
   SESSION_SECRET = <自定義>
   FACEBOOK_ID = <Facebook 應用程式編號>
   FACEBOOK_SECRET = <Facebook 應用程式密鑰>
   FACEBOOK_CALLBACK = "http://localhost:3000/auth/facebook/callback"
   OPENAI_API_KEY = <Your own OpenAI API key>
   ```
   
6. 開啟 MySQL Workbench，建立資料庫，輸入：

   ```SQL
   create database attraction;
   ```

7. 開啟終端機，建立資料表，輸入：

   ```bash
   npm run migrate
   ```
   
8. 建立種子資料，輸入：

   ```bash
   npm run seed
   ```
   
9. 執行專案，輸入：

   ```bash
   npm run dev
   ```

10. 在終端機看見以下訊息代表順利執行

    ```bash
    📢 App is listening on http://localhost:3000
    ```
   
11. 打開瀏覽器輸入以下網址

    ```bash
    http://localhost:3000
    ```

12. 終止伺服器
    
    ```bash
    ctrl + c
    ```

    
### 測試帳號

   使用者：
   >- account: user1
   >- email: user1@example.com
   >- password: 123456

   管理員(客服)：
   >- account: admin
   >- email: admin@example.com
   >- password: 123456


## 開發工具

- Node.js - 執行環境
- Express - Web 應用程式後端框架
- Express-Handlebars - 前端樣板引擎
- Bootstrap - 前端框架
- Font-awesome - 字體和圖標工具套件
- Passport - 驗證機制套件
- express-session - 發送憑證套件
- bcrypt.js - 密碼加密套件
- Sequelize - 非同步 ORM 框架
- Dotenv - 設定環境變數套件
- ESLint - 定義程式碼風格套件
- socket.io - 即時通訊套件
- openai - 連接 ChatGPT 套件
