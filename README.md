# Gemini 4 Neon · Remotion 手绘动效工程

基于 **Remotion v4（React + TypeScript）** 完整重构的 **1080×1080、30fps、14.0 秒（420 帧）** 奶油纸感手绘剪辑工坊风格宣传短片工程，100% 逐帧驱动（`useCurrentFrame` / `useVideoConfig` / `interpolate` / `Easing`），内嵌霞鹜文楷字体与 128 BPM 立体声配乐及卡点拟音。

---

## ✨ 升级版：手绘风 AI 宣传短片一键生成 Skill（支付宝 SkillPay Pro 版 · 早鸟买断 ¥19.9）

本仓库 `main` 分支为 **开源免费体验版**（单画幅 1:1、固定文案演示）。如果你想直接把这套手绘剪辑工坊风格用在**自己的 AI 产品 / SaaS / 开源项目发版**上，并让 **Cursor / Claude Code / Codex / Antigravity** 一句话自动改稿、抽帧预览并批量出片，可直接获取已上线 **支付宝 SkillPay** 的完整 Pro 版 Skill（交付全部明文源码，全本地无限次渲染，早鸟买断仅 **¥19.9**）。

### 开源免费体验版 vs 支付宝 SkillPay Pro 版功能对比

| 能力维度 | GitHub 开源免费体验版（本分支） | 支付宝 SkillPay Pro 版（买断制早鸟 ¥19.9） |
| --- | --- | --- |
| **画幅适配** | 仅 1:1 方屏（`1080×1080`） | **原生响应式三画幅**：1:1 方屏 + 9:16 竖屏（含上下安全区）+ 16:9 横屏 |
| **配置与改稿方式** | 手动修改 React / TS 源码常量 | **Zod 强类型 `promo-config.json` 驱动** + Remotion Studio 可视化面板 |
| **AI Agent 一句话出片** | 无内置 Agent 工作流 | 内置标准 `SKILL.md` 四步工作流（自动读 README → 写配置 → 抽帧确认 → 出片） |
| **视觉主题** | 单一奶油手绘主题 | **3 套手绘预设主题**（`cream-paper` / `dark-neon` / `minimal-white`）+ 自定义配色覆写 |
| **自定义 Logo 与截图** | 固定内置吉祥物与 SVG 插画 | 支持自定义 **品牌 Logo 与 4 张产品截图**自动套手绘墨线画框（留空优雅回退） |
| **排版防溢出保护** | 固定长度演示文案 | 内置中英混排字宽估算、自适应字号与防溢出多行折行保护 |
| **极速预览与批量渲染** | 单条完整渲染 | `preview:stills` 秒级导出 9 张三画幅关键帧确认 + `render:square/vertical/landscape/all` |
| **音频与字体方案** | 本地大体积 WAV + 静态字体 | 轻量化 128 BPM MP3 配乐（支持自定义 BGM）+ 霞鹜文楷按需拉取与系统字体离线兜底 |
| **交付形式与价格** | 开源学习参考（免费） | **完整明文源码买断制 ¥19.9**（纯本地运行，零云端上传，无限次渲染） |

### 🚀 复制给你的 AI Agent 一键购买并安装（支付宝 SkillPay）

点击下方代码块右上角**复制**，直接发送给 **Cursor / Claude Code / Codex / Antigravity** 等 AI 助手，即可按支付宝 SkillPay 官方指引自动完成购买、安装与验证（授权与付款环节均由你本人通过官方链接或二维码确认）：

```text
请通过 SkillPay 购买并安装 Skill「手绘风AI宣传短片一键生成」。 
官方安装与购买说明： https://skillpay.alipay.com/userguide.md 请先阅读官方说明、核验来源，并完成指南中的skillpay-onboarding安装：npx -y @alipay/agent-payment@latest install-skill --skill-name skillpay-onboarding
安装成功后，读取新安装的 skillpay-onboarding 的 SKILL.md，再按其说明购买并安装商户 2088712131920015的P0806000214879019。 
我已授权安装依赖和发起购买；需要登录授权或付款时，请提供官方链接或二维码，由我本人确认，不要替我确认。确认成功后，请继续完成商品安装和验证。
```

> **备用获取方式**：也可直接在支付宝 SkillPay 公开货架搜索 **「手绘风AI宣传短片一键生成」**（商品编号：`P0806000214879019`，商户号：`2088712131920015`，买断制早鸟 ¥19.9）。

---

![结尾画面预览](docs/preview.png)

## 规格参数

| 参数 | 数值 |
| --- | --- |
| Composition ID | `GeminiNeonPromo` |
| 分辨率 | `1080 × 1080` |
| 帧率 | `30 fps` |
| 总帧数 / 时长 | `420 frames`（`14.0s`） |
| 编码输出 | H.264（`yuv420p`，CRF 16）+ 立体声 AAC |
| 字体 | 霞鹜文楷 `LXGWWenKai-Regular.ttf` / `Medium.ttf`（SIL OFL 1.1） |
| 音频 | `public/audio/soundtrack.wav`（48kHz 立体声，128 BPM 原创配乐 + CC0 拟音） |

## 快速开始

### 1. 安装依赖

需要 **Node.js 20+**（推荐 Node 22）：

```bash
npm install
```

### 2. 启动 Remotion Studio 实时预览

```bash
npm run dev
```

启动后在浏览器中即可交互式预览每一帧、拖动时间轴、实时查看音频波形与画面卡点。

### 3. 渲染输出 MP4

```bash
npm run render
```

渲染完成后将在 `out/gemini-neon-promo.mp4` 生成 `1080×1080`、`30fps`、`14.0s` 的带音频成品 MP4。

### 4. 其他脚本

```bash
# TypeScript 静态类型检查
npm run typecheck

# 打包 Remotion Bundle
npm run build
```

## 目录结构

```text
.
├── docs/
│   └── preview.png                   # Remotion 渲染生成的结尾定格预览图（第 408 帧）
├── public/
│   ├── audio/
│   │   └── soundtrack.wav            # 14.0s 48kHz 立体声配乐与卡点音效
│   └── fonts/
│       ├── LXGWWenKai-Regular.ttf    # 霞鹜文楷常规体（weight 400）
│       └── LXGWWenKai-Medium.ttf     # 霞鹜文楷中等体（weight 700）
├── src/
│   ├── index.ts                      # Remotion 入口（registerRoot）
│   ├── Root.tsx                      # Composition 注册（1080×1080 / 30fps / 420 帧）
│   ├── GeminiNeonPromo.tsx           # 主合成组件（字体加载、音轨接入、虚拟镜头与图层编排）
│   ├── constants.ts                  # 配色方案、视频参数与卡片元数据
│   ├── fonts.ts                      # 基于 staticFile() + delayRender() 的字体加载器
│   ├── timeline.ts                   # 纯函数帧驱动状态机与虚拟镜头轨迹（stateAt / cameraAt）
│   └── components/
│       ├── SvgDefs.tsx               # SVG 渐变、斜线纹理、纸张颗粒与缩略图缓存
│       ├── Primitives.tsx            # 手绘风基础图元（Box / Label / Star / Heart / Sticker / Arm）
│       ├── NeonBot.tsx               # 原创手绘吉祥物「小霓 · Neon Bot」
│       ├── Artworks.tsx              # 4 组核心能力动态插画（代码重构 / 深度推理 / 1M 上下文 / Neon 舞台）
│       ├── Toolbar.tsx               # 顶部窗口栏、时间码与导出进度按钮
│       ├── Sidebar.tsx               # 左侧素材 / 特效 / 字幕切换面板
│       ├── SettingsPanel.tsx         # 右侧调参滑块与规格卡片
│       ├── PhonePreview.tsx          # 中央 / 结尾放大手机预览与特效滤镜
│       ├── TimelinePanel.tsx         # 底部三轨时间轴、剪辑切缝、音频波形与卡点标记
│       ├── EditorMascot.tsx          # 穿梭剪辑台的「小霓」拖拽、剪刀咔嚓、盖章与卡点热舞
│       ├── PencilIntro.tsx           # 开场铅笔手绘描边动效
│       └── EndingScene.tsx           # 11.65s–14.00s 结尾大特写、便利贴与彩带雨
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## 字体说明

项目已在 `public/fonts/` 内置霞鹜文楷（[LxgwWenKai v1.520](https://github.com/lxgw/LxgwWenKai/releases/tag/v1.520)，遵循 SIL Open Font License 1.1），通过 Remotion `staticFile()` 与 `delayRender()` 保证首帧渲染前完成加载，无字体闪烁或回退。
