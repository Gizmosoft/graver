import React from "react";
import { Star, GitFork, Eye } from "lucide-react";

export default function GitHubRepoCard({ username, repoName }) {
  const repoUrl = `https://github.com/${username}/${repoName}`;

  return (
    <div className="github-card">
      {/* <h2>GitHub Repository Viewer</h2> */}

      <div className="repo-links">
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          {username}
        </a>
        <span> / </span>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
          {repoName}
        </a>
      </div>

      <div className="repo-buttons">
        <RepoButton href={`${repoUrl}/stargazers`} icon={<Star size={14} />} label="Star" />
        <RepoButton href={`${repoUrl}/network/members`} icon={<GitFork size={14} />} label="Fork" />
        <RepoButton href={`${repoUrl}/watchers`} icon={<Eye size={14} />} label="Watch" />
      </div>
    </div>
  );
}

// Reusable Button Component
const RepoButton = ({ href, icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {icon} <span>{label}</span>
  </a>
);
