class CrystalHealingChat {
  constructor() {
    this.chatMessages = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendButton = document.getElementById("sendButton");
    this.loadingOverlay = document.getElementById("loadingOverlay");
    this.charCount = document.querySelector(".char-count");

    // Coze API 配置 - 从 coze-integration.js 中获取
    console.log("检查 window.CozeIntegration:", window.CozeIntegration);
    this.cozeConfig = window.CozeIntegration
      ? window.CozeIntegration.config
      : null;
    console.log("this.cozeConfig:", this.cozeConfig);

    this.initializeEventListeners();
    this.showConfigurationTips();

    // 确保输入框和按钮是启用状态
    this.setInputState(true);
  }

  initializeEventListeners() {
    // 发送按钮点击事件
    this.sendButton.addEventListener("click", () => this.sendMessage());

    // 输入框回车事件
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // 字符计数
    this.messageInput.addEventListener("input", () => {
      const length = this.messageInput.value.length;
      this.charCount.textContent = `${length}/500`;

      // 字符数接近限制时改变颜色
      if (length > 450) {
        this.charCount.style.color = "#ef4444";
      } else if (length > 400) {
        this.charCount.style.color = "#f59e0b";
      } else {
        this.charCount.style.color = "#6b7280";
      }
    });

    // 快捷按钮事件
    document.querySelectorAll(".quick-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-text");
        this.messageInput.value = text;
        this.messageInput.focus();
      });
    });
  }

  showConfigurationTips() {
    // 检查Coze集成是否正确加载
    try {
      if (!this.cozeConfig) {
        console.log("Coze配置未加载，显示配置提示");
        this.addBotMessage(
          "⚠️ 配置提示：\n\n" +
            "Coze API 集成未正确加载。请确保：\n\n" +
            "1. coze-integration.js 文件正确加载\n" +
            "2. API 配置信息正确\n" +
            "3. 网络连接正常\n\n" +
            "如果问题持续，请刷新页面重试。"
        );
      } else {
        console.log("Coze配置已加载:", this.cozeConfig);
      }
    } catch (error) {
      console.error("showConfigurationTips 错误:", error);
    }
  }

  async sendMessage() {
    const message = this.messageInput.value.trim();

    if (!message) return;

    // 禁用输入和发送按钮
    this.setInputState(false);

    // 添加用户消息到界面
    this.addUserMessage(message);

    // 清空输入框
    this.messageInput.value = "";
    this.charCount.textContent = "0/500";

    // 显示加载状态
    this.showLoading(true);

    try {
      // 使用新的 Coze 集成方式
      if (window.CozeIntegration && window.CozeIntegration.sendMessage) {
        const response = await window.CozeIntegration.sendMessage(message);
        this.addBotMessage(response);
      } else {
        // 备用方案
        this.addBotMessage("Coze 集成未正确加载，请刷新页面重试。");
      }
    } catch (error) {
      console.error("API调用失败:", error);
      this.addBotMessage(
        "抱歉，我现在无法回复您的消息。请检查网络连接或稍后再试。\n\n" +
          "错误信息：" +
          error.message
      );
    } finally {
      // 隐藏加载状态并重新启用输入
      this.showLoading(false);
      this.setInputState(true);
      this.messageInput.focus();
    }
  }

  addUserMessage(message) {
    const messageElement = this.createMessageElement(message, "user");
    this.chatMessages.appendChild(messageElement);
    this.scrollToBottom();
  }

  addBotMessage(message) {
    const messageElement = this.createMessageElement(message, "bot");
    this.chatMessages.appendChild(messageElement);
    this.scrollToBottom();
  }

  createMessageElement(content, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}-message`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.innerHTML =
      type === "user"
        ? '<i class="fas fa-user"></i>'
        : '<i class="fas fa-gem"></i>';

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    // 使用Marked解析markdown格式
    let formattedContent;
    if (type === "bot" && window.marked) {
      // 对于机器人消息，使用markdown解析
      try {
        formattedContent = marked.parse(content);
      } catch (error) {
        console.warn("Markdown解析失败，使用原始文本:", error);
        formattedContent = `<p>${content.replace(/\n/g, "<br>")}</p>`;
      }
    } else {
      // 对于用户消息，只处理换行符
      formattedContent = `<p>${content.replace(/\n/g, "<br>")}</p>`;
    }
    
    contentDiv.innerHTML = formattedContent;

    if (type === "user") {
      messageDiv.appendChild(contentDiv);
      messageDiv.appendChild(avatar);
    } else {
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(contentDiv);
    }

    return messageDiv;
  }

  setInputState(enabled) {
    this.messageInput.disabled = !enabled;
    this.sendButton.disabled = !enabled;

    if (enabled) {
      this.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
    } else {
      this.sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
  }

  showLoading(show) {
    this.loadingOverlay.style.display = show ? "flex" : "none";
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// 初始化聊天界面
document.addEventListener("DOMContentLoaded", () => {
  new CrystalHealingChat();
});

// API配置助手类
class APIConfigHelper {
  static showConfigModal() {
    const modal = document.createElement("div");
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

    modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h2 style="
                    color: #8B5CF6;
                    margin-bottom: 20px;
                    text-align: center;
                ">🔮 Coze API 配置指南</h2>
                
                <div style="
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    border-left: 4px solid #8B5CF6;
                ">
                    <h3 style="color: #374151; margin-bottom: 15px;">📋 配置步骤</h3>
                    <ol style="color: #6b7280; line-height: 1.6;">
                        <li>访问 <a href="https://www.coze.cn" target="_blank" style="color: #8B5CF6;">Coze 官网</a> 并登录</li>
                        <li>创建或选择您的智能体</li>
                        <li>获取 Bot ID 和 API Token</li>
                        <li>在下方代码中替换配置信息</li>
                    </ol>
                </div>
                
                <div style="
                    background: #1f2937;
                    color: #e5e7eb;
                    padding: 15px;
                    border-radius: 8px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    overflow-x: auto;
                    margin: 10px 0;
                ">this.cozeConfig = {
    apiUrl: 'https://api.coze.com/v1/chat',
    botId: 'your_bot_id_here',
    apiKey: 'your_api_key_here',
    conversationId: null
};</pre>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #8B5CF6;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    width: 100%;
                ">我知道了</button>
            </div>
        `;

    document.body.appendChild(modal);
  }
}

// 控制台提示
console.log(
  "%c🔮 水晶疗愈智能助手",
  "color: #8B5CF6; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c要配置 Coze API，请调用: APIConfigHelper.showConfigModal()",
  "color: #64748b;"
);
