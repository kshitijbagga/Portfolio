# Deployment Guide - Vercel

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio ready for deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite + React
   - Click "Deploy"

3. **Automatic Deployments:**
   - Every push to `main` branch will auto-deploy
   - Preview deployments for pull requests

## Build Configuration

Vercel auto-detects Vite. No additional configuration needed, but you can add `vercel.json` for custom settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

## Environment Variables

No environment variables are currently required for this portfolio.

## Custom Domain

After deployment:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Performance Optimization

The build is currently **1.29 MB** (gzipped: **360 KB**). To optimize further:

### Immediate Actions:
- ✅ Code splitting (already enabled in Vite)
- ✅ Tree shaking (automatic)
- ⚠️ Consider lazy loading 3D components
- ⚠️ Optimize Three.js bundle size

### Future Improvements:
```javascript
// Lazy load heavy components
const DendriticStructure = lazy(() => import('./components/Scene/DendriticStructure'));
```

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Verify audio works (HTTPS required)
- [ ] Check all modals and interactions
- [ ] Test fullscreen functionality
- [ ] Verify responsive design
- [ ] Run Lighthouse audit (target 90+)
- [ ] Set up custom domain (optional)
- [ ] Add analytics (optional)

## URLs After Deployment

- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch.vercel.app`

## Troubleshooting

### Audio Not Playing
- Ensure site is served over HTTPS (Vercel provides this automatically)
- Browser autoplay policies require user interaction first

### 3D Scene Not Loading
- Check browser console for WebGL errors
- Verify all assets are in `/public` folder

### Build Fails
- Run `npm run build` locally first
- Check Node.js version (should be 18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Monitoring

Vercel provides:
- Real-time analytics
- Performance monitoring
- Error tracking
- Automatic SSL certificates

## Next Steps

1. Deploy to Vercel using one of the methods above
2. Share the live URL
3. Continue with remaining optimizations (lazy loading, bundle size reduction)

---

**Estimated Deployment Time:** 2-3 minutes
**Cost:** FREE (Vercel Hobby Plan includes unlimited deployments)
