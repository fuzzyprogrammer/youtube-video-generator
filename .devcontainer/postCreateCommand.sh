#!/bin/bash

echo "🚀 Setting up GitHub Codespaces environment..."

# Update system packages
echo "📦 Updating system packages..."
apt-get update && apt-get upgrade -y

# Install system dependencies
echo "🔧 Installing system dependencies..."
apt-get install -y \
  ffmpeg \
  imagemagick \
  build-essential \
  python3-dev \
  curl \
  wget \
  git

# Install Node.js dependencies
echo "📚 Installing Node.js dependencies..."
npm install

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt 2>/dev/null || echo "✓ Python dependencies optional"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p data/generated-videos
mkdir -p data/metadata
mkdir -p config
mkdir -p generated-videos
mkdir -p logs

# Initialize metadata files if they don't exist
if [ ! -f "data/metadata/generation-history.json" ]; then
  echo "[]" > data/metadata/generation-history.json
fi

if [ ! -f "data/metadata/successful-patterns.json" ]; then
  echo "[]" > data/metadata/successful-patterns.json
fi

if [ ! -f "data/metadata/feedback-log.json" ]; then
  echo "[]" > data/metadata/feedback-log.json
fi

# Display setup completion message
echo ""
echo "✅ Codespaces environment setup complete!"
echo ""
echo "🎮 Next steps:"
echo "  1. Run: npm start"
echo "  2. Open: http://localhost:3000"
echo "  3. Start generating videos!"
echo ""
echo "📊 Access control panel at: http://localhost:3000"
echo "📡 API server running on: http://localhost:8000"
echo ""
