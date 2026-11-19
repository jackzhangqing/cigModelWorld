# cigModelWorld

Zhangqing 维护的 AI 模型信息站。使用真实模型品牌和厂商图标，集中查看模型评测、价格、上下文、发布时间与厂商信息；不使用人物或角色精灵图。

基于 [liyupi/ai-model-world](https://github.com/liyupi/ai-model-world)（MIT）修改，保留原项目许可和数据署名。

## 本地运行

使用 Node.js 22 或更新的兼容版本：

```sh
npm ci
npm run dev
```

## GitHub Pages

仓库：[jackzhangqing/cigModelWorld](https://github.com/jackzhangqing/cigModelWorld)。
站点：[cigModelWorld](https://jackzhangqing.github.io/cigModelWorld/)，路径 `/cigModelWorld/`。

```sh
npm run build:pages
```

产物在 `out/`。仓库 Settings → Pages → Source 选择 GitHub Actions。
`.github/workflows/pages.yml` 会在 main 提交、手动运行、以及数据同步成功后构建发布。

## 自动更新

`.github/workflows/sync.yml` 每天北京时间 09:40、21:40 抓取公开上游并校验。
成功时提交快照，Pages 工作流随后重新发布；失败时保留上一次有效快照。
新模型要先被上游收录才会同步。模型名称、排名和缺失数据按原项目规则处理，不编造评测成绩。

## B站 Toy

```sh
npm run toy:build
npm run toy:verify
```

产物在 `.toy-pkg/`。首次发布须使用自己的B站账号创建新的Toy，不能使用原作者的ID。
取得自己的Toy ID后，在GitHub仓库配置变量 `TOY_ID`、`TOY_PUBLISH_ENABLED=true`，
并在Secrets中配置 `TOY_CLI_SESSION_TOKEN`。每日北京时间10:30按内容变化提交更新，审核通过后上线。
在上述配置完成前，Toy自动发布工作流保持跳过状态；GitHub Pages不受影响。

## 本地目录

源码、模型数据、图标、构建产物与本地工具均放在 `D:\cigModelWorld`。
`.tools/`、`.cache/`、`.local/`、`.qa/`不进入Git仓库，密码或授权令牌不得写入源码。

## 来源

公开数据来自 Epoch AI、models.dev、LiveBench、LMArena 官方数据集等，页面页脚及致谢页保留来源。
图标来自Lobe Icons的真实品牌标识整理；有独立模型标识时优先使用，否则显示厂商图标，未知项显示名称缩写。
商标归各自权利人，逐文件来源与许可证保存在 `public/model-logos/`。
