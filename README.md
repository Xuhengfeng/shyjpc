# 前端代码规范

## 目的

1. 为了统一项目开发设计过程的编码规范.

2. 为了使前端开发人员能很方便的理解每个目录丶变量丶类丶方法的意义.

3. 改善代码可读性,利用代码的管理.

4. 为了保证编写出的程序都符合相同的规范,保证一致性丶统一性而建立的程序编码规范.

## css规范

1. 元素样式定义使用class, 把id留个js使用.

2. id 写在 class 之前.

## html规范

1. 能用html5给出的标签,最好使用html5的标签,一提高代码可读性,二便于爬虫抓取.

2. 减少代码不必要的嵌套, 嵌套超过5层, 应当考虑当前代码是否重构(例如:采取代码平行结构化).

## js规范

1. 变量声明最好采取es5语法 var 目的便于代码兼容浏览器.

2. 命名规则: 避免单字母命名, 命名应具备描述性, 驼峰式命名.

3. 别保存this的引用, 使用function的bind()方法,  bind(指向, 参数)改变指向创建新函数.

### 项目结构
index                   //入口文件
├─css                   //所有的css(含其他插件css)
├─fonts                 //字体文件
├─imgs                  //所有的图片
├─js                    //所有的js(含其他插件js)
└─pages                 //其他子页面
    ├─estate.html           //小区页
    ├─estatedetail.html     //小区详情页
    ├─newhouse.html         //新房页
    ├─renthouse.html        //租房页
    ├─renthousedetail.html  //租房详情页
    ├─twohouse.html         //二手房页
    └─twohousedetail.html   //二手房详情页

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```