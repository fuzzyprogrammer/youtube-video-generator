# Quick Start Guide 🚀

## 5-Minute Setup

### Step 1: Clone & Install (2 min)
```bash
git clone https://github.com/fuzzyprogrammer/youtube-video-generator.git
cd youtube-video-generator
npm install
```

### Step 2: Start Server (1 min)
```bash
npm start
```

### Step 3: Open Dashboard (1 min)
Go to: http://localhost:3000

### Step 4: Configure & Generate (1 min)
1. Left panel: Select topic, audience, iterations
2. Click "Start Generation"
3. Watch progress in center panel
4. Review video in right panel
5. Approve or reject with feedback

## Understanding the Interface

### 📝 Left Panel (Configuration)
```
Topic: Productivity Tips
Audience: Busy Professionals
Duration: 600 seconds
Creativity: 0.7
Iterations: 3
```
→ Click "Start Generation"

### 📊 Center Panel (Monitoring)
```
Status: Running
Progress: 45%
Iteration: 2/3
Quality Score: 0.78
Best Score: 0.85
```
→ Watch real-time updates

### ✅ Right Panel (Approval)
```
[Video Preview]

Script Quality: 0.82
Video Quality: 0.76
Engagement: 0.79
Overall: 0.79

⭐⭐⭐⭐ (4/5 stars)

[Feedback textarea]

✅ Approve  ❌ Reject  🔄 Regenerate
```
→ Give feedback, approve/reject

## Self-Improvement in Action

**Session 1:**
- Generate video: Score 0.65
- Feedback: "Too fast paced"
- System learns: Add slower transitions

    ↓ LEARNING HAPPENS HERE

**Session 2:**
- Generate video: Score 0.78 ✨
- Improvement: +13% quality
- System learns: Keep this approach

    ↓ CONTINUOUS IMPROVEMENT

**Session 3:**
- Generate video: Score 0.82 ✨✨
- Better baseline from learning
- Continuous improvement!

## Customization

### Change Generation Topics
**File:** `config/generation-config.json`
```json
"content_topics": [
  "Your Topic 1",
  "Your Topic 2"
]
```

### Adjust Quality Standards
**File:** `config/quality-standards.json`
```json
"min_overall_score": 0.75  // Increase for stricter standards
```

### Modify AI Prompts
**File:** `config/prompts.json`
- Prompts auto-update based on feedback
- View version history in data/metadata/

## Automation (GitHub Actions)

### Enable 24/7 Automation
1. Make repo public (Settings → Visibility)
2. Push to GitHub
3. GitHub Actions runs daily at 2 AM UTC
4. Generated videos auto-commit to repo

### Change Schedule
**File:** `.github/workflows/ai-video-generator.yml`
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Change this
```

Cron format: `minute hour day month weekday`
- `0 2 * * *` = Daily at 2 AM
- `0 */6 * * *` = Every 6 hours
- `0 0 * * 0` = Weekly Sunday

## Monitoring & Logs

### Real-time Logs
→ Center panel shows live logs

### Download Full Logs
→ Right panel has "Download Logs" button

### View History
→ Right panel "History" tab shows all generations

### Quality Metrics
→ http://localhost:3000/metrics

## Troubleshooting

### Server won't start
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9
npm start
```

### Videos not generating
1. Check logs in center panel
2. Verify OpenCode Zen installed: `opencode --version`
3. Check FFmpeg: `ffmpeg -version`

### Quality score too low
1. Adjust generation-config.json
2. Update prompts.json with better instructions
3. Lower quality standards in quality-standards.json

## Next Steps

✅ Explore config files
✅ Try different topics
✅ Provide feedback to train AI
✅ Set up YouTube API (optional)
✅ Enable GitHub Actions automation
✅ Monitor improvements over time

## Key Files Reference

| File | Purpose | Edit For |
|------|---------|----------|
| generation-config.json | What to generate | Topics, audience, specs |
| quality-standards.json | Acceptance criteria | Quality thresholds |
| self-improvement.json | Learning parameters | Iteration count, learning rate |
| prompts.json | AI instructions | Generation prompt details |
| ai-video-generator.yml | Automation schedule | Run frequency |

## Getting Help

- 📖 Check `README.md` for details
- 📋 Read inline comments in config files
- 🐛 Check GitHub Issues
- 💬 Review real-time logs in dashboard

---

**You're ready! Start with "Step 4" above! 🎉**
