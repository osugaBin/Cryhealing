// Coze 智能体集成配置
// 使用直接 API 调用方式，无需依赖外部 SDK

// Coze API 配置
const COZE_CONFIG = {
  botId: "7541398190961705023",
  token: "pat_2epjuhkDAZi6CXmOPziMsMC9EYUWrbJhhqzH82AGN9pZFMwMaAnMvFyKFRhSZHJ8",
  apiUrl: "https://api.coze.cn/open_api/v2/chat",
  conversationId: null,
};

// 等待页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  console.log("初始化 Coze 智能体集成...");

  // 重置会话状态 - 每次页面加载时清空对话
  COZE_CONFIG.conversationId = null;
  console.log("会话已重置，conversation_id:", COZE_CONFIG.conversationId);

  // 清空聊天界面的消息历史
  clearChatHistory();

  // 显示原有的聊天界面
  const chatContainer = document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.style.display = "flex";
  }

  // 初始化聊天功能
  initializeChatInterface();

  // 显示欢迎信息
  showWelcomeMessage();
});

// 清空聊天历史记录
function clearChatHistory() {
  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) {
    chatMessages.innerHTML = "";
    console.log("聊天历史已清空");
  }
}

// 初始化聊天界面功能
function initializeChatInterface() {
  // 重新启用原有的 script.js 中的聊天功能
  // 更新配置以使用 Coze API
  if (window.ChatInterface) {
    window.ChatInterface.updateConfig(COZE_CONFIG);
  }
}

// 显示欢迎消息
function showWelcomeMessage() {
  const body = document.body;
  const notice = document.createElement("div");
  notice.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 999;
            font-family: 'Arial', sans-serif;
        ">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">🔮 水晶疗愈智能助手</h2>
            <p style="margin: 0 0 20px 0; font-size: 16px; opacity: 0.9;">您的专属水晶疗愈顾问已准备就绪</p>
            <div style="font-size: 14px; opacity: 0.8;">
                ✨ 专业的水晶疗愈指导<br>
                🌟 个性化的能量建议<br>
                💎 丰富的水晶知识库
            </div>
        </div>
    `;
  body.appendChild(notice);

  // 5秒后自动隐藏提示
  setTimeout(() => {
    notice.style.opacity = "0";
    notice.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      if (notice.parentNode) {
        notice.parentNode.removeChild(notice);
      }
    }, 500);
  }, 5000);
}

// 发送消息到 Coze API
async function sendMessageToCoze(message) {
  try {
    const response = await fetch(COZE_CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COZE_CONFIG.token}`,
      },
      body: JSON.stringify({
        bot_id: COZE_CONFIG.botId,
        user: "user",
        query: message,
        chat_history: [],
        stream: false,
        ...(COZE_CONFIG.conversationId && {
          conversation_id: COZE_CONFIG.conversationId,
        }),
      }),
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 更新会话ID
    if (data.conversation_id) {
      COZE_CONFIG.conversationId = data.conversation_id;
    }

    // 解析响应数据 - 查找正确的回答内容
    if (data.messages && data.messages.length > 0) {
      // 遍历messages数组，寻找核心回答
      for (const msg of data.messages) {
        // 筛选条件：assistant角色、answer类型、text内容类型
        if (
          msg.role === "assistant" &&
          msg.type === "answer" &&
          msg.content_type === "text"
        ) {
          
          // 原始回答内容
          let rawContent = msg.content || "";
          
          // 移除参考文献标注（如[1]、[2]等）
          let contentWithoutRefs = rawContent.replace(/\[\d+\]/g, '');
          
          // 移除参考文献链接（markdown链接格式：[文本](链接)）
          let contentCleaned = contentWithoutRefs.replace(/\[.*?\]\(.*?\)/g, '');
          
          // 移除多余空行
          let finalContent = contentCleaned.replace(/\n+/g, '\n').trim();
          
          return finalContent;
        }
      }
      // 若未找到符合条件的消息，返回提示
      return "未找到有效回答内容";
    }

    return data.answer || "抱歉，我现在无法回复您的消息。";
  } catch (error) {
    console.error("发送消息失败:", error);
    throw error;
  }
}

// 暴露给全局使用
window.CozeIntegration = {
  sendMessage: sendMessageToCoze,
  config: COZE_CONFIG,
};

// 备用方案：当 SDK 加载失败时显示的界面
function showFallbackInterface() {
  // 显示原有的聊天界面
  const chatContainer = document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.style.display = "flex";
  }

  // 显示错误提示
  const body = document.body;
  const notice = document.createElement("div");
  notice.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 999;
            font-family: 'Arial', sans-serif;
        ">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">⚠️ 网络连接问题</h2>
            <p style="margin: 0 0 20px 0; font-size: 16px; opacity: 0.9;">Coze SDK 加载失败，已启用备用聊天界面</p>
            <div style="font-size: 14px; opacity: 0.8;">
                请检查网络连接或稍后重试<br>
                <button onclick="location.reload()" style="
                    margin-top: 15px;
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    border-radius: 5px;
                    color: white;
                    cursor: pointer;
                ">刷新页面</button>
            </div>
        </div>
    `;
  body.appendChild(notice);

  // 10秒后自动隐藏提示
  setTimeout(() => {
    notice.style.opacity = "0";
    notice.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      if (notice.parentNode) {
        notice.parentNode.removeChild(notice);
      }
    }, 500);
  }, 10000);
}

// 错误处理
window.addEventListener("error", function (event) {
  if (event.message.includes("CozeWebSDK")) {
    console.error("Coze Web SDK 加载错误:", event.error);
    showFallbackInterface();
  }
});
