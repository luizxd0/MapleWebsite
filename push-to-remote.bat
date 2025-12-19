@echo off
@title Push Website to Remote Repository
cd /d "%~dp0"

echo ========================================
echo Pushing website to remote repository
echo ========================================
echo.

echo Current status:
git status
echo.

echo Current remote:
git remote -v
echo.

echo.
echo Staging all changes...
git add .

echo.
echo Committing changes...
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Update website for v83 compatibility"

git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to remote...
git push -u origin main

echo.
echo Done!
pause

