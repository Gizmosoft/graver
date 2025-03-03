import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Star, GitFork, Eye, AlertCircle } from "lucide-react";

export default function GitHubRepoViewer({ username = "vercel", repoName = "next.js" }) {
  const [repo, setRepo] = useState(null);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepoData() {
      try {
        const repoRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!repoRes.ok) throw new Error("Failed to fetch repo");
        const repoData = await repoRes.json();
        setRepo(repoData);

        const readmeRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`);
        if (readmeRes.ok) {
          const readmeData = await readmeRes.json();
          setReadme(atob(readmeData.content));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRepoData();
  }, [username, repoName]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="github-card">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>

      <div className="repo-stats">
        <RepoStat icon={<Star />} value={repo.stargazers_count} />
        <RepoStat icon={<GitFork />} value={repo.forks_count} />
        <RepoStat icon={<Eye />} value={repo.watchers_count} />
      </div>

      {readme && (
        <div>
          <h3>README</h3>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

// Components for UI elements
const RepoStat = ({ icon, value }) => (
  <span>
    {icon} {value.toLocaleString()}
  </span>
);

const ErrorAlert = ({ message }) => (
  <div className="error-alert">
    <AlertCircle size={14} /> {message}
  </div>
);
