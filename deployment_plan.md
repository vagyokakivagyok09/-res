# Deployment Plan - 0-24 Availability

To make your application run 24/7, we need two things:
1.  **GitHub**: To store your code safely in the cloud.
2.  **Hosting Service**: A server that runs your Node.js application (the `proxy.js` and scraper) continuously.

> [!NOTE]
> GitHub itself only stores the code. It does not run the backend server (Puppeteer). We will use a service like **Render.com** or **Railway.app** for that, which connects to your GitHub.

## Step 1: Prepare for GitHub

I have created a `.gitignore` file to keep your repository clean (ignoring `node_modules`, etc.).

### Commands to Run locally:
```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: TT.League Analyzer Complete"

# 4. Link to GitHub (You need to create a NEW repository on GitHub first!)
# Replace URL with your actual repository URL
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. Push
git push -u origin master
```

## Step 2: 0-24 Hosting (The Server)

Since we use **Puppeteer** (a browser automation tool), we need a hosting provider that supports it.

### Recommended: Render.com (Free Tier available)
1.  Sign up at [render.com](https://render.com).
2.  Click "New +" -> "Web Service".
3.  Connect your GitHub repository.
4.  **Settings**:
    -   **Runtime**: Node
    -   **Build Command**: `npm install`
    -   **Start Command**: `node proxy.js`
5.  **Environment Variables** (Advanced):
    -   Puppeteer needs special arguments on the cloud. We might need to update `odds_scraper.js` slightly to add `--no-sandbox` (already done) and potentially use a specific Puppeteer buildpack if it fails.

### Alternative: Railway.app
-   Easier setup for Puppeteer but might have limited free hours.

## Next Steps
1.  Create a repository on GitHub.com.
2.  Run the git commands above.
3.  Let me know if you want help configuring Render.com!
