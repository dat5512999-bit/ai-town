# AI Town V0 Windows 操作與安裝手冊

本文件記錄 `V0.0-original-ai-town-working` 的可重現環境。V0 保持官方遊戲內容、美術、NPC 人格、世界觀、UI 與玩法不變。

## 已驗證基準

- 上游：`a16z-infra/ai-town`，基準 commit `8e05997f2409275669c8344b84a51692e83f3f33`
- Fork：`https://github.com/dat5512999-bit/ai-town`
- Windows 10 Pro、PowerShell 7.6.5
- Git 2.53、Node.js 24.15.0、npm 11.12.1
- Convex 1.41 本機匿名部署：`http://127.0.0.1:3210`
- Ollama 0.34.2：`llama3`（聊天）與 `mxbai-embed-large`（1024 維記憶向量）

官方仍建議遇到伺服器啟動問題時使用 Node.js 18。Node.js 24 可執行遊戲，但 Windows 上一次性 Convex CLI 命令結束時可能顯示 libuv assertion；此訊息不影響已完成的 mutation/query。長期開發建議在重開機完成 WSL2 後改用 Ubuntu + Node.js 18 LTS。

## 首次安裝

1. 安裝 Git、Node.js/npm 與 Ollama。
2. Clone 自己的 Fork，不要直接在官方 repository 工作：

   ```powershell
   git clone https://github.com/dat5512999-bit/ai-town.git
   cd ai-town
   git remote add upstream https://github.com/a16z-infra/ai-town.git
   npm ci
   ```

3. 下載官方預設模型：

   ```powershell
   ollama pull llama3
   ollama pull mxbai-embed-large
   ollama list
   ```

4. 建立本機 Convex deployment：

   ```powershell
   $env:CONVEX_AGENT_MODE='anonymous'
   npm run predev
   ```

   第一次詢問是否建立 Convex AI 輔助檔時選 `No`，以保持上游原始碼乾淨。命令會建立 git-ignored 的 `.env.local`。

## 啟動

先確認 Ollama 正在執行：

```powershell
Invoke-RestMethod http://127.0.0.1:11434/api/tags
```

開兩個 PowerShell 視窗，且都切換到專案根目錄。

視窗一（後端與 Convex log）：

```powershell
$env:CONVEX_AGENT_MODE='anonymous'
npm run dev:backend
```

視窗二（前端）：

```powershell
npm run dev:frontend -- --host 127.0.0.1
```

瀏覽 `http://127.0.0.1:5173/ai-town`，按 `Interact` 進入世界。也可在已完成初始設定後以 `$env:CONVEX_AGENT_MODE='anonymous'; npm run dev` 同時啟動。

## 關閉與重新啟動

- 關閉：分別在兩個 PowerShell 視窗按 `Ctrl+C`。需要時從系統匣結束 Ollama。
- 重新啟動：先啟動 Ollama，再依「啟動」章節開後端與前端；不要重跑 wipe/init。
- 世界、對話與記憶保存在本機 Convex storage，正常停止與重啟不會清除。

## 備份與還原

本機資料由 Convex backend 管理。變更 NPC、地圖或 embedding model 前，先停止前後端並備份 Convex 本機資料目錄；實際目錄可由 `.env.local` 的 deployment 與 Convex CLI 輸出確認。不要把 `.env.local`、模型檔或本機資料庫提交到 Git。

V0 是可回復基線：

```powershell
git switch --detach V0.0-original-ai-town-working
npm ci
```

若要清空本機世界（不可逆）：

```powershell
$env:CONVEX_AGENT_MODE='anonymous'
npx convex run testing:wipeAllTables
npx convex run init
```

只有確定不需要現有 NPC 對話與記憶時才執行。

## FAQ

### NPC 不聊天

確認 `ollama list` 同時有 `llama3` 與 `mxbai-embed-large`、Ollama API 可存取，且後端 log 沒有 `model not found`。模型名稱須與 `convex/util/llm.ts` 的預設值一致。

### npm test 在 PowerShell 失敗

上游 script 使用 Unix 環境變數語法。Windows 可執行等價命令：

```powershell
$env:NODE_OPTIONS='--experimental-vm-modules'
npx jest --verbose
```

### Convex CLI 結束時出現 UV_HANDLE_CLOSING

這是目前 Node.js 24 + Windows 的一次性 CLI 結束相容性問題；先檢查命令輸出與後端狀態，mutation 通常已完成。若要消除它，依官方建議改用 Node.js 18 LTS 或完成 WSL2 Ubuntu 設定。

### WSL2 尚未可用

執行 `wsl --install -d Ubuntu` 後需重新啟動 Windows，再完成 Ubuntu 初始帳號設定。V0 已以官方目前支援的 Windows 原生流程驗證，不必為本次驗證中斷工作。
