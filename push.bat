@echo off
echo ========================================================
echo Pushing Portfolio to https://github.com/kartikmewada7/portfolio
echo ========================================================
git branch -M main
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo SUCCESS: Portfolio pushed to GitHub successfully!
    echo View it at: https://github.com/kartikmewada7/portfolio
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo Note: If you have not created the repository on GitHub yet,
    echo please create an empty repository named "portfolio" at:
    echo https://github.com/new
    echo Then run this script again!
    echo ========================================================
)
pause
