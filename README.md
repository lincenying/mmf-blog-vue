# mmf-blog

安装nodejs, MongoDB, 并启动
```
// 安装依赖
npm install

// 第一次生成静态文件, 以免api服务器找不到模版文件
npm run build

// 启动 api 服务器
npm run server

// 启动 开发模式
npm run dev
```

添加管理员
http://localhost:3000/admin

登录
http://localhost:3000/login


# 注意: 
如果打开上面的页面出现找不到jquery的情况, 请把build/build.js文件中的

`cp('-R', 'static/', assetsPath)`

改成

`cp('-R', 'static/*', assetsPath)`

然后重新运行`npm run build`
