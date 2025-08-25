// Coze API 配置示例文件
// 请复制此文件内容到 script.js 中的 cozeConfig 对象

// 示例配置 - 请替换为您的实际配置
const exampleCozeConfig = {
    // Coze API 地址
    // 通常格式为: https://api.coze.com/v1/chat
    // 或者您的自定义域名
    apiUrl: 'https://api.coze.com/v1/chat',
    
    // 您的机器人 ID
    // 在 Coze 平台创建智能体后获得
    // 格式通常为: 7234567890123456789
    botId: '7234567890123456789',
    
    // 您的 API 密钥
    // 在 Coze 平台的 API 设置中获得
    // 格式通常为: pat_xxxxxxxxxxxxxxxxxxxxxx
    apiKey: 'pat_xxxxxxxxxxxxxxxxxxxxxx',
    
    // 会话 ID - 保持为 null，系统会自动管理
    conversationId: null
};

// 配置步骤说明：
// 1. 登录 Coze 平台 (https://www.coze.com/)
// 2. 找到您创建的水晶疗愈智能体
// 3. 进入智能体设置 -> API 配置
// 4. 复制 API URL、Bot ID 和 API Key
// 5. 将上述信息替换到 script.js 文件中的 cozeConfig 对象
// 6. 保存文件并刷新网页

// 注意事项：
// - 请妥善保管您的 API 密钥，不要泄露给他人
// - 如果是公开部署，建议使用环境变量或服务器端代理
// - API 密钥有使用限制，请合理使用

// 测试配置是否正确：
// 1. 打开网页
// 2. 发送一条测试消息
// 3. 如果收到回复，说明配置成功
// 4. 如果出现错误，请检查控制台错误信息