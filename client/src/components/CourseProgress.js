// client/src/components/CourseProgress.js
import React, { useEffect, useState } from 'react';

const CourseProgress = () => {
  const [courseProgress, setCourseProgress] = useState([]);
  const [newProgress, setNewProgress] = useState({
    course_name: '',
    videos_watched: 0,
    total_videos: 0,
  });

  useEffect(() => {
    // Fetch course progress data from the server
    fetch('http://localhost:3001/course-progress')
      .then(response => response.json())
      .then(data => setCourseProgress(data))
      .catch(error => console.error('Error fetching course progress:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add new course progress data
    fetch('http://localhost:3001/course-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProgress),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Fetch updated course progress data after adding a new entry
      fetch('http://localhost:3001/course-progress')
        .then(response => response.json())
        .then(data => setCourseProgress(data))
        .catch(error => console.error('Error fetching course progress:', error));
    })
    .catch(error => console.error('Error adding course progress:', error));
  };

  const handleUpdate = (id) => {
    // Get the current progress data for the selected id
    const currentProgress = courseProgress.find(progress => progress.id === id);

    // Send a PUT request to update course progress data
    fetch(`http://localhost:3001/course-progress/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videos_watched: currentProgress.videos_watched + 1,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Fetch updated course progress data after updating the entry
      fetch('http://localhost:3001/course-progress')
        .then(response => response.json())
        .then(data => setCourseProgress(data))
        .catch(error => console.error('Error fetching course progress:', error));
    })
    .catch(error => console.error('Error updating course progress:', error));
  };

  const handleDelete = (id) => {
    // Send a DELETE request to delete course progress data
    fetch(`http://localhost:3001/course-progress/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Fetch updated course progress data after deleting the entry
      fetch('http://localhost:3001/course-progress')
        .then(response => response.json())
        .then(data => setCourseProgress(data))
        .catch(error => console.error('Error fetching course progress:', error));
    })
    .catch(error => console.error('Error deleting course progress:', error));
  };

  return (
    <div>
      <h2>Course Progress</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input type="text" name="course_name" value={newProgress.course_name} onChange={handleInputChange} required />
        </label>
        <label>
          Videos Watched:
          <input type="number" name="videos_watched" value={newProgress.videos_watched} onChange={handleInputChange} required />
        </label>
        <label>
          Total Videos:
          <input type="number" name="total_videos" value={newProgress.total_videos} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Course Progress</button>
      </form>
      <ul>
        {courseProgress.map(progress => (
          <li key={progress.id}>
            <strong>{progress.course_name}</strong>
            <p>Videos Watched: {progress.videos_watched}/{progress.total_videos}</p>
            <button onClick={() => handleUpdate(progress.id)}>Update</button>
            <button onClick={() => handleDelete(progress.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseProgress;
