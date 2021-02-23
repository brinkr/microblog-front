const context = require.context('./', false, /\.js$/);
const obj = {};
context.keys().filter(item => item !== './index.js').forEach(key => {
  Object.keys(context(key).default).forEach(method => {
    if (obj[method]) {
      throw new Error(`请求方法 ${method} 命名有冲突`);
    }
    obj[method] = context(key).default[method];
  });
});
export default obj;