const fs = require('fs').promises;
const path = require('path');

class QualityEvaluator {
  constructor() {
    this.qualityCache = {};
  }

  async evaluateVideo(videoPath, scriptContent, config) {
    const scores = {
      script_quality: await this.evaluateScript(scriptContent, config),
      video_quality: await this.evaluateVideoFile(videoPath, config),
      content_quality: await this.evaluateContent(scriptContent, config),
      engagement_score: await this.estimateEngagement(scriptContent, config)
    };

    const overall = this.calculateOverallScore(scores);
    const isAcceptable = overall >= (config.acceptance_criteria?.min_overall_score || 0.75);

    return {
      scores,
      overall,
      isAcceptable,
      feedback: this.generateFeedback(scores, config),
      timestamp: new Date().toISOString()
    };
  }

  async evaluateScript(scriptContent, config) {
    const factors = {
      coherence: this.checkCoherence(scriptContent),
      originality: this.checkOriginality(scriptContent),
      engagement: this.checkEngagementLevel(scriptContent),
      clarity: this.checkClarity(scriptContent),
      structure: this.checkStructure(scriptContent)
    };

    const average = Object.values(factors).reduce((a, b) => a + b, 0) / Object.keys(factors).length;
    return Math.min(1, average);
  }

  async evaluateVideoFile(videoPath, config) {
    try {
      const stats = await fs.stat(videoPath);
      const fileSizeMB = stats.size / (1024 * 1024);
      const expectedSize = 100;
      const sizeQuality = Math.min(1, fileSizeMB / expectedSize);
      return sizeQuality;
    } catch (e) {
      return 0;
    }
  }

  async evaluateContent(scriptContent, config) {
    const lengthCheck = this.checkLength(scriptContent);
    const formatCheck = this.checkFormat(scriptContent);
    return (lengthCheck + formatCheck) / 2;
  }

  async estimateEngagement(scriptContent, config) {
    const hookStrength = this.detectHook(scriptContent);
    const ctaPresence = this.detectCTA(scriptContent);
    const storytellingPresence = this.detectStorytelling(scriptContent);
    return (hookStrength + ctaPresence + storytellingPresence) / 3;
  }

  calculateOverallScore(scores) {
    return (
      scores.script_quality * 0.35 +
      scores.video_quality * 0.25 +
      scores.content_quality * 0.20 +
      scores.engagement_score * 0.20
    );
  }

  generateFeedback(scores, config) {
    const feedback = [];

    if (scores.script_quality < 0.7) {
      feedback.push('📝 Script needs improvement in coherence and engagement');
    }
    if (scores.video_quality < 0.7) {
      feedback.push('🎬 Video technical quality needs enhancement');
    }
    if (scores.engagement_score < 0.6) {
      feedback.push('⚡ Consider strengthening the hook and call-to-action');
    }

    if (feedback.length === 0) {
      feedback.push('✨ Strong content! Ready for publication.');
    }

    return feedback;
  }

  checkCoherence(content) {
    return content.length > 0 && content.includes('conclusion') ? 0.8 : 0.5;
  }

  checkOriginality(content) {
    return Math.random() * 0.3 + 0.6;
  }

  checkEngagementLevel(content) {
    const hasQuestion = content.includes('?');
    const hasExclamation = content.includes('!');
    return (hasQuestion ? 0.5 : 0) + (hasExclamation ? 0.3 : 0) + 0.2;
  }

  checkClarity(content) {
    const avgLineLength = content.split('\n').reduce((sum, line) => sum + line.length, 0) / Math.max(1, content.split('\n').length);
    return avgLineLength < 150 ? 0.8 : 0.6;
  }

  checkStructure(content) {
    const hasIntro = content.toLowerCase().includes('intro');
    const hasBody = content.length > 500;
    const hasConclusion = content.toLowerCase().includes('conclusion');
    return ((hasIntro ? 1 : 0) + (hasBody ? 1 : 0) + (hasConclusion ? 1 : 0)) / 3;
  }

  checkLength(content) {
    const wordCount = content.split(' ').length;
    return wordCount > 200 && wordCount < 2000 ? 0.9 : 0.5;
  }

  checkFormat(content) {
    return content.includes('[') && content.includes(']') ? 0.8 : 0.6;
  }

  detectHook(content) {
    return content.split('\n')[0].length > 20 ? 0.7 : 0.3;
  }

  detectCTA(content) {
    const ctaKeywords = ['subscribe', 'click', 'follow', 'like', 'share'];
    return ctaKeywords.some(kw => content.toLowerCase().includes(kw)) ? 0.8 : 0.2;
  }

  detectStorytelling(content) {
    const storyKeywords = ['story', 'example', 'once', 'imagine', 'picture'];
    return storyKeywords.some(kw => content.toLowerCase().includes(kw)) ? 0.7 : 0.3;
  }
}

module.exports = new QualityEvaluator();
