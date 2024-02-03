import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

import './ArticleLandingPage.css'
import Footer from '../Footer';

const ArticleLandingPage = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const articleDocRef = doc(db, 'posts', id);
        const articleSnapshot = await getDoc(articleDocRef);
        if (articleSnapshot.exists()) {
          setArticleData(articleSnapshot.data());
          console.log(articleSnapshot);
        } else {
          console.error('Article not found.');
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };
    fetchArticleData();
  }, [id]);

  useEffect(() => {
    if (articleData) {
      // Split the article text into two parts based on a certain number of words (e.g., 50 words)
      const words = articleData.postText.split(' ');
      const splitIndex = 120;
      setFirstPart(words.slice(0, splitIndex).join(' '));
      setSecondPart(words.slice(splitIndex).join(' '));
    }
  }, [articleData]);



  if (!articleData) {
    return <div>Loading...</div>;
  }

  return (
   
    // <div style={styles.container}>
    //   <h1 style={styles.title}>{articleData.title}</h1>
    //   <div style={styles.postText}>{articleData.postText}</div>
    //   <h3 style={styles.author}>@{articleData.author.name}</h3>
    // </div>
    // <>

    <>
    <div className="blog-container">
      <div className="blog-heading">
        <h1>{articleData.title}</h1>
        <span>{articleData.author.name}</span>
    
      </div>
      <div className="date" style={{marginLeft:'15rem',marginTop:'1rem',fontSize:'13px',color:'grey'}}>
      <span>{articleData.articleDate}</span>
      </div> 

      <div className="blog-article">
        <p>{firstPart}</p>
        <img className="blog-img" src={articleData.articleImage} alt="" />
        <p>{secondPart}</p>
      </div>
    </div>
    <Footer/>
   </>
  );
};



export default ArticleLandingPage;











// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '0 auto',
//     padding: '20px',
//   },
//   title: {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   postText: {
//     fontSize: '16px',
//     lineHeight: '1.6',
//     marginBottom: '20px',
//   },
//   author: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//   },
// };