@echo off
chcp 65001 >nul
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%PATH%"
title Ben's Wiki 一键更新发布工具
cd /d D:\ben_wiki

echo ======================================================
echo           Ben's Wiki 一键自动同步与发布
echo ======================================================
echo.

echo [1/3] 正在检查本地修改...
git status -s
echo.
git add -A

echo [2/3] 准备提交版本...
set "commit_msg="
set /p commit_msg="请输入更新说明 (直接按回车默认为自动时间戳): "
if not defined commit_msg (
    set commit_msg=Wiki update %date% %time%
)

git commit -m "%commit_msg%"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 提示: 本地没有检测到新的改动，无需重复提交。
    echo 正在检查是否有未推送的历史记录...
)

echo.
echo [3/3] 正在推送到 GitHub（请耐心等待约 30~60 秒，不要关闭窗口）...
git push --progress origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================
    echo  [成功] 代码已成功推送到 GitHub！
    echo  Cloudflare Pages 正在自动构建，预计 1~2 分钟刷新。
    echo.
    echo  访问地址:
    echo  - 维基主页: https://ben-wiki.pages.dev/
    echo  - 投资主页: https://ben-wiki.pages.dev/finance/
    echo ======================================================
) else (
    echo.
    echo ======================================================
    echo  [失败] 推送到 GitHub 遇到网络波动或被阻断。
    echo  建议: 开启科学上网工具（VPN/代理），或稍后重试。
    echo ======================================================
)

:END
echo.
echo 按任意键关闭窗口...
pause >nul
