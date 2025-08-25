# 水晶疗愈智能助手网页版

一个基于 Coze 智能体的水晶疗愈咨询网页应用，提供专业的水晶选择建议、疗愈方法指导和能量清洁技巧。

## 🌟 功能特点

- 🎨 现代化的聊天界面设计
- 💬 实时对话交互
- 📱 响应式设计，支持移动端
- ⚡ 快捷问题按钮
- 🔮 专业的水晶疗愈知识库
- 🌈 美观的渐变色彩主题

## 📁 项目结构

```
水晶疗愈/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript 逻辑
└── README.md           # 说明文档
```

## 🚀 快速开始

### 1. 配置 Coze Web SDK

本项目已集成 Coze 官方 Web SDK，提供更稳定和功能丰富的聊天体验。

**当前配置信息**（在 `coze-integration.js` 中）：
- **Bot ID**: `7541398190961705023`
- **PAT Token**: `pat_2epjuhkDAZi6CXmOPziMsMC9EYUWrbJhhqzH82AGN9pZFMwMaAnMvFyKFRhSZHJ8`

**如需修改配置**：
1. 打开 `coze-integration.js` 文件
2. 修改以下配置：
   ```javascript
   config: {
       type: 'bot',
       bot_id: 'YOUR_BOT_ID', // 替换为您的 Bot ID
       isIframe: false,
   },
   auth: {
       type: 'token',
       token: 'YOUR_PAT_TOKEN', // 替换为您的 PAT Token
   }
   ```

**获取 Coze 配置信息**：
1. 登录 [Coze 平台](https://www.coze.cn/)
2. 进入您的智能体页面
3. 获取 **Bot ID**（智能体 ID）
4. 在个人设置中生成 **PAT Token**（个人访问令牌）

### 2. 部署网页

#### 本地测试
1. 将所有文件放在同一个文件夹中
2. 双击打开 `index.html` 文件
3. 或使用本地服务器（推荐）：

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

#### 在线部署
您可以将文件上传到以下平台：
- GitHub Pages
- Netlify
- Vercel
- 阿里云/腾讯云等云服务器

## 🎯 使用说明

### 基本功能
1. **打开网页**：在浏览器中访问 `index.html`
2. **启动聊天**：点击右下角的悬浮聊天按钮
3. **开始对话**：在聊天窗口中输入您的问题
4. **专业指导**：智能体会根据水晶疗愈知识为您提供专业建议
5. **文件上传**：支持上传图片等文件进行更详细的咨询

### 功能特色
- 🔮 **专业水晶知识**：基于丰富的水晶疗愈资料库
- 🌟 **个性化建议**：根据您的需求提供定制化指导
- 💎 **多媒体支持**：支持图片上传和多种交互方式
- 🎯 **智能对话**：保持上下文连贯的多轮对话
- 📱 **响应式设计**：适配PC和移动设备

## 🛠️ 自定义配置

### 修改 Coze 智能体配置
编辑 `coze-integration.js` 文件中的配置：

```javascript
config: {
    type: 'bot',
    bot_id: 'YOUR_BOT_ID', // 您的智能体 ID
    isIframe: false,
},
auth: {
    type: 'token',
    token: 'YOUR_PAT_TOKEN', // 您的 PAT Token
}
```

### 自定义聊天界面
在 `coze-integration.js` 中修改 UI 配置：

```javascript
ui: {
    base: {
        lang: 'zh-CN', // 语言设置
        layout: 'pc',  // 布局模式
    },
    chatBot: {
        title: '您的智能助手名称',
        width: 390, // 聊天窗口宽度
        uploadable: true, // 是否支持文件上传
    }
}
```

### 自定义页面样式
编辑 `styles.css` 文件来修改：
- 背景颜色和渐变
- 字体样式
- 提示信息样式
- 响应式布局

### 修改主题颜色
在 `styles.css` 中修改 CSS 变量：

```css
/* 主要渐变色 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 按钮颜色 */
background: linear-gradient(135deg, #8B5CF6, #A855F7);
```

### 添加新的快捷问题
在 `index.html` 中的 `.quick-actions` 部分添加：

```html
<button class="quick-btn" data-text="您的问题文本">
    <i class="fas fa-icon-name"></i> 按钮文字
</button>
```

### 修改页面标题和描述
在 `index.html` 的 `<head>` 部分修改：

```html
<title>您的标题</title>
```

在 `.chat-header` 部分修改：

```html
<h1>您的智能助手名称</h1>
<p>您的描述文字</p>
```

## 🔧 故障排除

### 常见问题

**Q: 点击发送后没有回复？**
A: 请检查：
- Coze API 配置是否正确
- 网络连接是否正常
- 浏览器控制台是否有错误信息

**Q: 显示配置提示信息？**
A: 说明您还没有配置 Coze API 信息，请按照上述步骤进行配置。

**Q: API 调用失败？**
A: 可能的原因：
- API 密钥错误或过期
- Bot ID 不正确
- API URL 地址错误
- 网络连接问题

### 调试技巧
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页的错误信息
3. 查看 Network 标签页的网络请求
4. 在控制台输入 `APIConfigHelper.showConfigModal()` 查看配置帮助

## 📱 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 🎨 界面预览

### 桌面端
- 现代化的聊天界面
- 渐变色背景
- 圆角设计元素
- 平滑动画效果

### 移动端
- 响应式布局
- 触摸友好的按钮
- 优化的输入体验

## 📄 许可证

本项目采用 MIT 许可证，您可以自由使用、修改和分发。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📞 支持

如果您在使用过程中遇到问题，可以：
1. 查看本 README 文档
2. 检查浏览器控制台的错误信息
3. 确认 Coze API 配置是否正确

---

**享受与您的水晶疗愈智能助手的对话吧！** 🔮✨