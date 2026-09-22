@echo off
chcp 65001 >nul
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"
title Ben's Wiki 一键更新发布工具
cd /d D:\ben_wiki

echo ======================================================
echo           Ben's Wiki 一键自动同步与发布
echo ======================================================
echo.

echo [1/3] 正在检查并暂存本地所有修改...
git add .

echo.
echo [2/3] 提交更新...
set /p commit_msg="请输入本次更新说明(直接按回车默认为自动更新): "
if "%commit_msg%"=="" (
    set commit_msg=Wiki update %date% %time%
)

git commit -m "%commit_msg%"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 提示: 本地没有检测到新的修改，无需更新。
    goto END
)

echo.
echo [3/3] 正在推送到 GitHub 并触发线上自动更新...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================
    echo  [成功] 代码已成功推送到云端！
    echo  Cloudflare 将在 1 分钟内自动刷新线上网站。
    echo.
    echo  访问地址:
    echo  - 维基主页: https://ben-wiki.pages.dev/
    echo  - ETF 页面: https://ben-wiki.pages.dev/finance/etf.html
    echo ======================================================
) else (
    echo.
    echo ======================================================
    echo  [失败] 推送遇到问题，请检查网络或是否已开启代理。
    echo ======================================================
)

:END
echo.
pause
