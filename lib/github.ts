import { rateLimiter } from "./rate-limiter";

export interface GitHubProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  repositories: number;
  stars: number;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  blog?: string;
  twitterUsername?: string;
  createdAt: string;
  hireable?: boolean;
}

async function fetchUserStars(username: string): Promise<number> {
  const cacheKey = `stars-${username}`;
  const cachedStars = rateLimiter.getCached(cacheKey);
  
  if (cachedStars !== null) {
    return cachedStars;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  
  if (!response.ok) {
    return 0;
  }

  const repos = await response.json();
  const stars = repos.reduce((total: number, repo: any) => total + repo.stargazers_count, 0);
  
  rateLimiter.setCache(cacheKey, stars);
  return stars;
}

export async function fetchGitHubProfile(
  username: string,
  clientIp: string = 'unknown'
): Promise<GitHubProfile> {
  // Check rate limit
  if (!rateLimiter.checkRateLimit(clientIp)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  // Check cache
  const cacheKey = `profile-${username}`;
  const cachedProfile = rateLimiter.getCached(cacheKey);
  if (cachedProfile) {
    return cachedProfile;
  }

  const [userResponse, starsCount] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetchUserStars(username),
  ]);

  if (!userResponse.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  const data = await userResponse.json();

  const profile = {
    username: data.login,
    name: data.name || data.login,
    avatar: data.avatar_url,
    bio: data.bio || "",
    repositories: data.public_repos,
    stars: starsCount,
    followers: data.followers,
    following: data.following,
    company: data.company,
    location: data.location,
    blog: data.blog,
    twitterUsername: data.twitter_username,
    createdAt: data.created_at,
    hireable: data.hireable,
  };

  // Cache the profile
  rateLimiter.setCache(cacheKey, profile);

  // Clean up old entries periodically
  rateLimiter.clearOldEntries();

  return profile;
}
