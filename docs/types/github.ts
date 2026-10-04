export interface GitHubTechnology {
  name: string;
  repositories: number;
}

export interface GitHubStack {
  username: string;
  technologies: GitHubTechnology[];
  repositoryCount: number;
  detailedCount: number;
  notices: string[];
}
