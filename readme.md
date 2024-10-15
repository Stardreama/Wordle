# Wordle

这是一个简单的 **Wordle** 字谜游戏克隆版本，玩家需要在有限的尝试次数内猜出隐藏的单词。该项目使用 JavaScript 实现，提供了一个简洁而功能齐全的游戏体验。

## 功能

- 在 6 次尝试内猜出隐藏的单词。
- 每次猜测后会提供反馈：
  - 绿色：字母和位置都正确。
  - 黄色：字母正确但位置错误。
  - 灰色：字母不在单词中。
- 响应式设计，支持不同屏幕大小的设备。

## 使用技术

- **HTML5**：构建游戏结构。
- **CSS3**：用于游戏的样式和布局。
- **JavaScript**：实现游戏的逻辑和交互功能。

## 快速开始

按照以下步骤，在本地运行该项目：

### 先决条件

请确保您已安装现代的 Web 浏览器（如 Chrome、Firefox）。

### 安装步骤

1. 克隆此仓库：

   ```bash
   git clone https://github.com/Stardreama/Wordle.git
   ```

2. 进入项目目录：

   ```bash
   cd Wordle
   ```

3. 使用浏览器打开 `index.html` 文件即可开始游戏。

   您可以直接双击该文件，或者在 macOS/Linux 上使用以下命令：

   ```bash
   open index.html
   ```

   在 Windows 上，可以使用：

   ```bash
   start index.html
   ```

## 游戏规则

1. 开始游戏后，输入一个 5 个字母的单词作为猜测。
2. 每次猜测后，游戏会根据颜色反馈结果：
   - 绿色表示字母和位置都正确。
   - 黄色表示字母正确但位置错误。
   - 灰色表示字母不在单词中。
3. 你有 6 次机会猜出正确的单词。

## 项目结构

Wordle/
│
├── index.html # 主要的 HTML 文件
├── style.css # 样式文件
└── script.js # 游戏逻辑的 JavaScript 文件

## 贡献

欢迎贡献！如果您有改进建议或想要参与开发，请 fork 此仓库并提交 Pull Request。

## 许可证

本项目基于 MIT 许可证，详细信息请参阅 [LICENSE](LICENSE) 文件。

## 致谢

- 本项目灵感来源于原版 [Wordle](https://www.nytimes.com/games/wordle/index.html) 游戏。
