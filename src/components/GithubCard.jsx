import React from "react";
import GitHubRepoCard from "./GitHubRepoCard";
import './GithubCard.css';

export default function GithubCard({ username, repoName }) {
  return (
    <main className="container mx-auto py-8 px-4">
      <GitHubRepoCard username={username} repoName={repoName} />
    </main>
  );
}
