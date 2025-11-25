import axios from 'axios';
import Constants from 'expo-constants';
import { Octokit } from '@octokit/rest';

/**
 * AI Service using Hugging Face models for announcement verification
 * and autonomous repository actions
 * 
 * Uses TOKEN_HF_BULLETIN1 (primary) and TOKEN_HF_BULLETIN2 (fallback)
 * Requires models with:
 * - Large context window
 * - Token-free or high token limits
 * - Good training on text classification
 */

// Get AI tokens from environment
const PRIMARY_TOKEN = process.env.TOKEN_HF_BULLETIN1 || Constants.expoConfig?.extra?.tokenHFBulletin1;
const FALLBACK_TOKEN = process.env.TOKEN_HF_BULLETIN2 || Constants.expoConfig?.extra?.tokenHFBulletin2;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || Constants.expoConfig?.extra?.githubToken;

if (!PRIMARY_TOKEN || !FALLBACK_TOKEN) {
  console.warn('⚠️ AI tokens not configured. Set TOKEN_HF_BULLETIN1 and TOKEN_HF_BULLETIN2');
}

// Initialize GitHub Octokit for repository write access
const octokit = GITHUB_TOKEN ? new Octokit({ auth: GITHUB_TOKEN }) : null;

class AIService {
  constructor() {
    this.currentToken = PRIMARY_TOKEN;
    this.usingFallback = false;
    // TODO: Configure specific HuggingFace model once chosen
    // Requirements: Large context, token-free, text classification
    this.apiUrl = 'https://api-inference.huggingface.co/models/';
    this.modelName = 'YOUR_MODEL_NAME'; // To be configured
  }

  /**
   * Switch to fallback token if primary fails
   */
  switchToFallback() {
    if (!this.usingFallback) {
      console.log('⚠️ Primary AI token failed, switching to fallback (TOKEN_HF_BULLETIN2)');
      this.currentToken = FALLBACK_TOKEN;
      this.usingFallback = true;
      return true;
    }
    return false;
  }

  /**
   * Make AI API call with automatic fallback
   */
  async callAI(prompt, retryWithFallback = true) {
    try {
      const response = await axios.post(
        `${this.apiUrl}${this.modelName}`,
        { inputs: prompt },
        {
          headers: {
            'Authorization': `Bearer ${this.currentToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('AI API call failed:', error.message);
      
      if (retryWithFallback && this.switchToFallback()) {
        // Retry with fallback token
        return this.callAI(prompt, false);
      }
      
      throw error;
    }
  }

  /**
   * Verify announcement authenticity and content
   */
  async verifyAnnouncement(announcement) {
    const prompt = `
Analyze this announcement for authenticity, relevance, and safety.

Title: ${announcement.title}
Content: ${announcement.content}
Type: ${announcement.type}
Source: ${announcement.source || 'unknown'}

Provide:
1. Authenticity score (0-100)
2. Safety assessment
3. Relevance rating
4. Recommended action (approve/reject/flag)
5. Reasoning
`;

    try {
      const result = await this.callAI(prompt);
      
      // Parse AI response (format depends on model)
      // This is a placeholder - adjust based on actual model output
      return {
        verified: true,
        score: 85,
        assessment: result,
        action: 'approve',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Announcement verification failed:', error);
      return {
        verified: false,
        error: error.message,
        action: 'manual_review',
      };
    }
  }

  /**
   * Autonomous GitHub repository actions
   * AI can create issues, update files, manage content
   */
  async performRepoAction(action) {
    if (!octokit) {
      throw new Error('GitHub token not configured');
    }

    const { owner, repo } = {
      owner: process.env.GITHUB_REPO_OWNER || 'ThePhoenixAgency',
      repo: process.env.GITHUB_REPO_NAME || 'Bulletin',
    };

    try {
      switch (action.type) {
        case 'create_issue':
          return await octokit.issues.create({
            owner,
            repo,
            title: action.title,
            body: action.body,
            labels: action.labels || ['ai-generated'],
          });

        case 'update_file':
          // Get current file content first
          const { data: currentFile } = await octokit.repos.getContent({
            owner,
            repo,
            path: action.path,
          });

          return await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: action.path,
            message: `[AI] ${action.commitMessage}`,
            content: Buffer.from(action.content).toString('base64'),
            sha: currentFile.sha,
          });

        case 'create_announcement':
          // Create announcement file in repo
          const filename = `announcements/${Date.now()}.json`;
          return await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filename,
            message: '[AI] Create new announcement',
            content: Buffer.from(JSON.stringify(action.announcement, null, 2)).toString('base64'),
          });

        default:
          throw new Error(`Unknown action type: ${action.type}`);
      }
    } catch (error) {
      console.error('GitHub action failed:', error);
      throw error;
    }
  }

  /**
   * Analyze content trends and generate insights
   */
  async analyzeContent(content) {
    const prompt = `
Analyze the following content and provide insights:

${JSON.stringify(content, null, 2)}

Provide:
1. Key themes
2. Sentiment analysis
3. Trending topics
4. Recommendations
`;

    try {
      const result = await this.callAI(prompt);
      return result;
    } catch (error) {
      console.error('Content analysis failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new AIService();

// Export class for testing
export { AIService };
