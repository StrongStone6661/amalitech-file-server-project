import React from 'react';
import styles from './FileStats.module.css';

const FileStats = () => {
  // Placeholder data
  const stats = [
    { title: 'File 1', downloads: 150, emailsSent: 30 },
    { title: 'File 2', downloads: 200, emailsSent: 50 },
  ];

  return (
    <div className={styles.fileStats}>
      <h2>File Statistics</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index} className={styles.statItem}>
            <h3>{stat.title}</h3>
            <p>Downloads: {stat.downloads}</p>
            <p>Emails Sent: {stat.emailsSent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileStats;
