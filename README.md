# AI YouTube Video Generator 🎬

> Automated 24/7 YouTube video generation with OpenCode Zen, Hygen, and Hyperframes featuring self-improving AI agents

## ✨ Features

- 🤖 **OpenCode Zen Agent** - Free-tier AI-powered content generation
- 🎬 **Hygen + Hyperframes** - Professional video rendering and effects
- 📊 **Real-time Control Panel** - Monitor, configure, and approve content
- 🧠 **Self-Improvement Engine** - AI learns from feedback and improves over time
- ⚙️ **Automatic GitHub Actions** - 24/7 automation on public repos (zero-cost)
- 📈 **Quality Metrics** - Track performance and improvements
- 💾 **Complete History** - All generations, feedback, and learning tracked

## 🚀 Quick Start

### Prerequisites
```bash
- Node.js 18+
- Python 3.11+
- FFmpeg
- Git
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fuzzyprogrammer/youtube-video-generator.git
   cd youtube-video-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt 2>/dev/null || echo "Python deps optional"
   ```

3. **Start the Control Panel**
   ```bash
   npm start
   ```
   Then open: `http://localhost:3000`

## 📋 How It Works

### 1. **Configuration** (You specify what to generate)
```json
{
  "topic": "Productivity Tips",
  "audience": "Busy Professionals",
  "duration": 600,
  "iterations": 3
}
```

### 2. **Generation** (Agent creates content)
- OpenCode Zen generates script
- Hygen renders video
- Quality metrics evaluated

### 3. **Approval** (You review & provide feedback)
- Review generated content
- Rate and provide feedback
- Accept or reject with suggestions

### 4. **Learning** (AI automatically improves)
- Extract learnings from feedback
- Update prompts automatically
- Next iteration is better!

## 🧠 Self-Improvement Logic

```
Iteration 1: Generate → Evaluate → User Rejects (0.65 score)
                ↓
            Learn Why → Update Prompts
                ↓
Iteration 2: Generate → Evaluate → Better (0.78 score) ✨
                ↓
            Success! Store Pattern
                ↓
Next Session: Start with Better Baseline → Even Better Results
```

## 🎮 Control Panel Interface

### Left Panel: Configuration
- Choose topics and audience
- Set quality standards
- Configure iterations

### Center Panel: Monitoring
- Real-time agent status
- Generation progress
- Quality metrics
- Live logs

### Right Panel: Approval
- Video preview
- Quality scores
- Rating system (⭐⭐⭐⭐⭐)
- Feedback form

## ⚙️ Configuration Files

Edit these files to customize:

| File | Purpose | Edit For |
|------|---------|----------|
| `config/generation-config.json` | What to generate | Topics, audience, specs |
| `config/quality-standards.json` | Acceptance criteria | Quality thresholds |
| `config/self-improvement.json` | Learning parameters | Iteration count, learning rate |
| `config/prompts.json` | AI instructions | Generation prompt details |

## 📊 Continuous Improvements

The system learns from:
- ✅ User approvals
- ❌ Rejections with feedback
- ⭐ Ratings and comments
- 📈 Quality metrics

Prompts are automatically:
1. Updated based on feedback
2. Versioned for rollback
3. Optimized for engagement
4. Cross-referenced with successes

## 📅 Automation with GitHub Actions

Public repo = **Unlimited free GitHub Actions minutes**

### Default Schedule
- Daily at 2 AM UTC (customize in `.github/workflows/ai-video-generator.yml`)
- Auto-commits generated content
- Stores artifacts for 90 days
- YouTube upload ready (manual or API)

### Manual Trigger
```bash
# Trigger from GitHub UI
# Or use GitHub CLI:
gh workflow run ai-video-generator.yml
```

## 📁 Project Structure

```
.
├── config/                 # Configuration files
│   ├── generation-config.json
│   ├── quality-standards.json
│   ├── self-improvement.json
│   └── prompts.json
├── server/                 # Express backend
│   ├── app.js
│   ├── routes/
│   └── services/
│       ├── quality-evaluator.js
│       └── improvement-engine.js
├── ui/                     # Control panel (HTML/JS)
│   ├── dashboard.html
│   └── js/
├── scripts/               # Agent & processing
│   ├── agent-executor.js
│   └── quality-checker.js
├── data/                  # Generated content & metadata
│   ├── generated-videos/
│   └── metadata/
└── .github/workflows/     # GitHub Actions
    └── ai-video-generator.yml
```

## 🔧 Commands

```bash
# Start control panel
npm start

# Generate video (manual)
npm run generate:video

# Check quality
npm run check:quality

# Process user feedback
npm run process:feedback

# Update improvements
npm run update:improvement

# Run tests
npm test
```

## 📊 Metrics & Analytics

Track:
- Average quality score per iteration
- Approval rate
- Improvement velocity
- Successful content patterns
- Rejection reasons
- Prompt effectiveness

Access at: `http://localhost:3000/metrics`

## 🎯 Use Cases

1. **YouTube Channel Automation** - Daily videos without manual creation
2. **Content Testing** - A/B test different content approaches
3. **Learning Through Feedback** - AI improves based on performance
4. **Batch Processing** - Generate multiple video variations
5. **Backup Content** - Always have fresh content ready

## 🐛 Troubleshooting

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

## 📚 Documentation

- 📖 **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- 🏗️ **[COMPLETE_ARCHITECTURE.md](./COMPLETE_ARCHITECTURE.md)** - Detailed architecture
- ⚙️ **Config files** - Inline comments for detailed explanations

## 🤝 Contributing

Contributions welcome! Areas:
- YouTube API integration
- Advanced quality metrics
- ML-based improvement suggestions
- UI/UX enhancements
- Performance optimizations

## 📝 License

MIT - Use freely for personal and commercial projects

## 🙏 Acknowledgments

- [OpenCode](https://github.com/opencode-ai/opencode) - Agentic framework
- [Hygen](https://www.hygen.io/) - Template generation
- [Hyperframes](https://hyperframes.ai/) - Video rendering
- GitHub Actions - Free automation infrastructure

## 💬 Support

Questions? Issues?
- 🐛 Open a GitHub issue
- 📖 Check the [Wiki](https://github.com/fuzzyprogrammer/youtube-video-generator/wiki)
- 📋 Review [COMPLETE_ARCHITECTURE.md](./COMPLETE_ARCHITECTURE.md)
- 💬 Read inline comments in config files

---

**Made with ❤️ for content creators and AI enthusiasts**

**Ready to generate amazing videos? Start with the [QUICK_START.md](./QUICK_START.md)! 🚀**
