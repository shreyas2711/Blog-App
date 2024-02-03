import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Createpost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [articleImage, setArticleImage] = useState(''); // New state for article image URL
  const [articleDate, setArticleDate] = useState(''); // New state for article image URL

  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      articleImage, // Add the article image URL to the Firestore document
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      articleDate
    });

    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  },);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input placeholder="Title..." onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(event) => setPostText(event.target.value)}
          ></textarea>
        </div>
        <div className="inputGp">
          <label>Article Image URL:</label> {/* New input for article image URL */}
          <input
            placeholder="Image URL..."
            onChange={(event) => setArticleImage(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Date:</label> {/* New input for article image URL */}
          <input
            placeholder="Date..."
            onChange={(event) => setArticleDate(event.target.value)}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default Createpost;
