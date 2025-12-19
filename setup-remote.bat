@echo off
@title Setup Website Remote Repository
cd /d "%~dp0"

echo ========================================
echo Setting up remote repository for website
echo ========================================
echo.

echo Current git status:
git status
echo.

echo Current remotes:
git remote -v
echo.

echo.
echo To create a new remote repository:
echo 1. Go to GitHub/GitLab/Bitbucket and create a new repository
echo 2. Copy the repository URL (e.g., https://github.com/username/repo.git)
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.

echo Or if you already have a remote URL, enter it now:
set /p REMOTE_URL="Enter remote repository URL (or press Enter to skip): "

if not "%REMOTE_URL%"=="" (
    echo.
    echo Adding remote repository...
    git remote add origin "%REMOTE_URL%" 2>nul
    if errorlevel 1 (
        echo Remote 'origin' already exists. Updating...
        git remote set-url origin "%REMOTE_URL%"
    )
    
    echo.
    echo Setting branch to main...
    git branch -M main
    
    echo.
    echo Current remotes:
    git remote -v
    
    echo.
    echo Ready to push! Run: git push -u origin main
) else (
    echo Skipped adding remote.
)

echo.
pause

