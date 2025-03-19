module.exports = {
  extends: ["@commitlint/config-conventional"], // 使用 Angular 提交规范
  rules: {
    "type-enum": [
      2, // 错误级别：2 表示必须遵守
      "always", // 总是需要匹配规则
      [
        "feat", // 新功能
        "fix", // 修复问题
        "docs", // 文档更新
        "style", // 代码格式修改（不影响代码运行）
        "refactor", // 重构代码
        "test", // 添加或修改测试
        "chore", // 构建或工具变更
        "perf", // 性能优化
        "ci", // CI/CD 相关更改
        "build", // 构建系统或外部依赖的更改
        "revert", // 回滚提交
      ],
    ],
    "subject-case": [0], // 不限制提交信息的主题大小写
  },
};
