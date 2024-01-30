// client/src/components/CourseProgress.js
import React, { useEffect, useState } from 'react';

const CourseProgress = () => {
  const [courseProgress, setCourseProgress] = useState([]);

  useEffect(() => {
    // Fetch course progress data from the server
    fetch('http://localhost:3001/course-progress')
      .then(response => response.json())
      .then(data => setCourseProgress(data))
      .catch(error => console.error('Error fetching course progress:', error));
  }, []);

  return (
    <div>
      <h2>Course Progress</h2>
      <ul>
        {courseProgress.map(progress => (
          <li key={progress.id}>
            <strong>{progress.course_name}</strong>
            <p>Videos Watched: {progress.videos_watched}/{progress.total_videos}</p>
            <p>Time Watched: {progress.time_watched}/{progress.total_time} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseProgress;
