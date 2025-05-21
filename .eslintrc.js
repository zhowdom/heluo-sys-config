module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // 启用JSX支持
    },
  },
  extends: [
    "eslint:recommended", // 基本ESLint推荐配置
  ],
  rules: {
    'vue/no-multiple-template-root': 'off' // 关闭单根检测
  }
};
