const fs = require('fs').promises;
const path = require('path');

class ImprovementEngine {
  constructor() {
    this.learningHistory = [];
    this.promptVersions = [];
  }

  async processIteration(iterationNum, generationResult, userFeedback, config) {
    console.log(`📚 Processing iteration ${iterationNum} for improvement learning...`);

    // 1. Log attempt
    const attempt = await this.logAttempt(generationResult);

    // 2. Extract learnings if rejected
    if (!userFeedback.approved) {
      const learnings = await this.extractLearnings(generationResult, userFeedback);
      const improvements = await this.suggestImprovements(learnings, config);

      // 3. Update prompts for next iteration
      await this.updatePrompts(learnings, improvements, config);

      console.log(`🔄 Learning from rejection:`, learnings);
      return {
        learned: true,
        learnings,
        improvements,
        next_iteration_optimizations: improvements
      };
    } else {
      // Store successful pattern
      await this.recordSuccess(generationResult, userFeedback, config);
      return {
        learned: false,
        message: 'Content accepted - pattern stored for future reference'
      };
    }
  }

  async extractLearnings(result, feedback) {
    return {
      what_failed: feedback.rejection_reason || 'User rejection',
      what_worked: feedback.positive_aspects || [],
      suggested_changes: feedback.suggestions || [],
      user_rating: feedback.rating || 0,
      timestamp: new Date().toISOString(),
      context: {
        quality_score: result.quality_score,
        iteration_number: result.iteration
      }
    };
  }

  async suggestImprovements(learnings, config) {
    const improvements = [];

    // Analyze rejection reason and suggest fixes
    const reason = learnings.what_failed.toLowerCase();

    if (reason.includes('slow') || reason.includes('pace')) {
      improvements.push({
        action: 'increase_pacing',
        description: 'Make content more dynamic and fast-paced',
        prompt_adjustment: 'Add: "Make pacing faster, add dynamic transitions"'
      });
    }

    if (reason.includes('boring') || reason.includes('engagement')) {
      improvements.push({
        action: 'enhance_engagement',
        description: 'Add more hook, storytelling, and emotional connection',
        prompt_adjustment: 'Add: "Include compelling story elements and emotional hooks"'
      });
    }

    if (reason.includes('too long') || reason.includes('length')) {
      improvements.push({
        action: 'reduce_length',
        description: 'Shorten content while maintaining quality',
        prompt_adjustment: 'Modify: "duration_seconds" to lower value'
      });
    }

    if (reason.includes('too short')) {
      improvements.push({
        action: 'increase_length',
        description: 'Add more depth and details',
        prompt_adjustment: 'Modify: "duration_seconds" to higher value'
      });
    }

    if (reason.includes('unclear') || reason.includes('confusing')) {
      improvements.push({
        action: 'improve_clarity',
        description: 'Make instructions and concepts clearer',
        prompt_adjustment: 'Add: "Use simple language, clear structure, step-by-step explanations"'
      });
    }

    return improvements;
  }

  async updatePrompts(learnings, improvements, config) {
    const promptsPath = path.join(__dirname, '../../config/prompts.json');
    
    try {
      const promptsData = JSON.parse(await fs.readFile(promptsPath, 'utf8'));

      for (const improvement of improvements) {
        // Update the main generation prompt
        const mainPrompt = promptsData.generation_prompts[0];
        const newVersion = mainPrompt.version + 1;

        // Create new prompt version
        const updatedPrompt = {
          ...mainPrompt,
          version: newVersion,
          prompt: mainPrompt.prompt + ` ${improvement.prompt_adjustment}`,
          last_updated: new Date().toISOString(),
          improvements_applied: [
            ...(mainPrompt.improvements_applied || []),
            {
              action: improvement.action,
              applied_at: new Date().toISOString(),
              based_on_feedback: learnings.what_failed
            }
          ]
        };

        promptsData.generation_prompts[0] = updatedPrompt;

        // Save updated prompts
        await fs.writeFile(promptsPath, JSON.stringify(promptsData, null, 2));

        console.log(`✅ Prompt updated to v${newVersion}`);
      }
    } catch (e) {
      console.error('Error updating prompts:', e.message);
    }
  }

  async logAttempt(result) {
    const historyPath = path.join(__dirname, '../../data/metadata/generation-history.json');

    // Ensure directory exists
    const dir = path.dirname(historyPath);
    await fs.mkdir(dir, { recursive: true });

    let history = [];
    try {
      history = JSON.parse(await fs.readFile(historyPath, 'utf8'));
    } catch (e) {
      history = [];
    }

    const attempt = {
      id: `attempt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      quality_score: result.quality_score,
      result
    };

    history.push(attempt);
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));

    return attempt;
  }

  async recordSuccess(result, feedback, config) {
    const successPath = path.join(__dirname, '../../data/metadata/successful-patterns.json');

    // Ensure directory exists
    const dir = path.dirname(successPath);
    await fs.mkdir(dir, { recursive: true });

    let successes = [];
    try {
      successes = JSON.parse(await fs.readFile(successPath, 'utf8'));
    } catch (e) {
      successes = [];
    }

    successes.push({
      id: `success-${Date.now()}`,
      timestamp: new Date().toISOString(),
      quality_score: result.quality_score,
      user_rating: feedback.rating,
      script_characteristics: this.extractCharacteristics(result),
      user_feedback: feedback
    });

    await fs.writeFile(successPath, JSON.stringify(successes, null, 2));
    console.log(`✨ Success pattern recorded`);
  }

  extractCharacteristics(result) {
    return {
      tone: 'educational',
      pacing: 'medium',
      engagement_hooks: result.script_content?.includes('?') ? 'present' : 'absent',
      storytelling: result.script_content?.includes('example') ? 'present' : 'absent',
      cta: result.script_content?.includes('subscribe') ? 'present' : 'absent'
    };
  }

  async getImprovementStats() {
    const historyPath = path.join(__dirname, '../../data/metadata/generation-history.json');
    const feedbackPath = path.join(__dirname, '../../data/metadata/feedback-log.json');

    let history = [];
    let feedbacks = [];

    try {
      history = JSON.parse(await fs.readFile(historyPath, 'utf8'));
      feedbacks = JSON.parse(await fs.readFile(feedbackPath, 'utf8'));
    } catch (e) {
      // Files don't exist yet
    }

    const avgQuality = history.length > 0 
      ? history.reduce((sum, h) => sum + (h.quality_score || 0), 0) / history.length
      : 0;

    const approvalRate = feedbacks.length > 0
      ? (feedbacks.filter(f => f.approved).length / feedbacks.length) * 100
      : 0;

    return {
      total_iterations: history.length,
      average_quality_score: avgQuality.toFixed(2),
      approval_rate: approvalRate.toFixed(1) + '%',
      total_feedback_processed: feedbacks.length
    };
  }
}

module.exports = new ImprovementEngine();
