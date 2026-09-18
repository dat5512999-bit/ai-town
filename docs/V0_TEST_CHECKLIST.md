# V0 QA 測試清單與驗證紀錄

驗證日期：2026-09-18（Asia/Taipei）

## 台灣都市地圖

- [ ] 地圖完整顯示，沒有空白圖磚或破圖。
- [ ] 五位 NPC 名字可見，且初始位置位於公寓內。
- [ ] NPC 能在公寓內尋路、碰面並開始對話。
- [ ] NPC 能沿中央入口移動到樓下街區。
- [ ] 玩家點擊可通行區域時能正常移動。
- [ ] 外框與建築外牆無法穿越。
- [ ] 切換地圖後，舊聊天與記憶仍可查看。

## 自動化與靜態檢查

- [x] `npm ci`：748 packages，安裝成功
- [x] TypeScript + Vite production build 成功
- [x] Jest：7 suites / 53 tests 全部通過
- [x] ESLint：0 errors；96 個上游既有 warnings
- [x] `.env.local` 與本機工具未納入 Git
- [x] Fork 的 `origin` 與官方 `upstream` 分離

## 執行環境

- [x] Ollama API 可達
- [x] `llama3` 實際回覆 `AI Town ready`
- [x] `mxbai-embed-large` 實際產生 1024 維 embedding
- [x] Convex schema、function 與本機 deployment 啟動成功
- [x] Vite 前端可載入 `/ai-town`
- [x] 使用者可按 `Interact` 進入世界

## 遊戲端到端

- [x] 預設世界狀態為 `running`
- [x] NPC position/path 隨時間更新，確認自主移動
- [x] NPC 自主建立對話；實測 Stella/Bob、Alice/Lucky 等多輪對話
- [x] 前端可點擊 NPC，右側角色/聊天面板由 Convex 訊息 subscription 顯示
- [x] 未選取居民時，右側全鎮對話可即時顯示最近 50 則訊息並標示進行中的聊天
- [x] 全鎮對話訊息可點擊並開啟目前仍在世界中的相關居民
- [x] 對話結束後保存 8 筆 `memories` 與 8 筆 `memoryEmbeddings`
- [x] 重啟前後端後，1 個世界、40 則訊息、8 筆記憶與 8 筆 embedding 全數仍存在
- [x] Browser console、Convex log、server log 無未解重大 error
- [x] 對話輸出可偵測並處理英文、常見簡體字、說話者標籤與表情符號
- [x] 含舊宗教／太空背景或大量英文的污染記憶不再注入新對話
- [x] 對話 prompt 包含時段、所在區域與當下活動線索
- [x] 實際 Convex Log 確認含英文的模型輸出會觸發繁中改寫後再寫入聊天

成功標準已達成，可建立 `V0.0-original-ai-town-working` tag。

## 已知例外與風險

- 原生 Windows Node.js 24 的一次性 Convex CLI 結束時可能輸出 libuv assertion；長駐 dev server 正常。官方建議的 Node 18 LTS / WSL2 是後續穩定化方向。
- LLM 第一次回覆受硬體與模型冷啟動影響，可能需要數十秒。
- V0 採本機匿名 deployment，不能視為正式環境的權限驗證。
- Browser console 有 Pixi 重複 texture cache key warnings；畫面、移動與對話不受影響，屬上游非阻斷 warning。
- Vite 顯示 `caniuse-lite` 資料較舊；不影響執行，V0 為保持 dependency lock 不更新。
