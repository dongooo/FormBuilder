const path = require("path")
const express = require("express")
const webpack = require("webpack")


const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-Hot-middleware")
const webpackConfig = require('./webpack.config.js')

const app = express(),
            STATIC_DIR = path.join(__dirname, "examples"), // 设置静态访问文件路径
            PORT = 7777, // 设置启动端口
            complier = webpack(webpackConfig)


let devMiddleware = webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true //向控制台显示任何内容 
})

let hotMiddleware = webpackHotMiddleware(complier,{
   log: false,
   heartbeat: 2000,
})
app.use(devMiddleware)

app.use(hotMiddleware);


// 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use(express.static(STATIC_DIR))

app.listen(PORT,function(){
    console.log("成功启动：localhost:"+ PORT)
})