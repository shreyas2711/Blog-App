import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import AboutMe from './AboutMe'
import { format } from 'date-fns';


const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState([]);
  const [Desc,setDesc]=useState('');
  // const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, 'posts'));
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    // Text to be displayed
    const text = "Weelcome to My Blog!";
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      } else {
        setShowText((prevText) => [...prevText, text[currentIndex]]);
        currentIndex++;
      }
    }, 100); // Adjust the speed of animation by changing the interval time (in milliseconds)
    return () => clearInterval(intervalId);
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const postDoc = doc(db, 'posts', id);
      await deleteDoc(postDoc);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return text;
    }
  };


  // useEffect(() => {
  //   if (articleData) {
  //     // Split the article text into two parts based on a certain number of words (e.g., 50 words)
  //     const words = articleData.postText.split(' ');
  //     const splitIndex = 30;
  //     setDesc(words.slice(0, splitIndex).join(' '));
  //     // setSecondPart(words.slice(splitIndex).join(' '));
  //   }
  // }, [articleData]);

  const renderDeleteButton = (post) => {
    if (isAuth && post.author.id === auth.currentUser?.uid) {
      return (
        <div className="deletePost">
          <button onClick={() => handleDeletePost(post.id)}>&#128465;</button>
        </div>
      );
    }
    return null;
  };

  
  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JavaScript Date
      return format(date, 'MMM dd, yyyy'); // You can adjust the date format as needed
    }
    return '';
  };

  const selectedPostIds = ['CPq0GUixxMfgEgFAaOUe','Zgwskn5CpbMnTfzbxHLn','vHKO8OSbfyXKPEQ2hHTu'];
  const selectedPosts = postList.filter((post) => selectedPostIds.includes(post.id));


  return (
    // <>
    // <div>
    //   {/* Top portion with a different background image */}
    //   <div
    //     style={{
    //       background: `url('https://free4kwallpapers.com/uploads/originals/2020/08/21/abstract-purple-wallpaper.png')`,
    //       backgroundSize: 'cover',
    //       height: '500px', // Adjust the height as needed
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //   >
    //     <h1 style={{ color: 'white', fontSize: '60px', fontFamily:"cursive", fontWeight:"500",}}>{showText.join('')}</h1>
    //   </div>

    //   {/* Second portion with articles and a different background image */}
    //   <div
    //     style={{
    //       background: `url('https://thefulldomeblog.files.wordpress.com/2013/06/cropped-starglobe-maya-render.jpg')`,
    //       // backgroundSize: 'cover',
    //       paddingTop: '30px', // Add padding as needed
    //       paddingBottom: '30px', // Add padding as needed
    //     }}
    //   >   

    //     <div className="homePage">
    //     <h1 className='heading' style={{ textAlign: "center", color: 'white',marginRight:"0rem",fontSize:"40px", fontWeight:"500"}}>Latest articles</h1>
    //       {isLoading ? (
    //         <div>Loading...</div>
    //       ) : postList.length === 0 ? (
    //         <div>No posts available.</div>
    //       ) : (
    //         postList.map((post) => (
              
    //           <div className="post" key={post.id}>
    //           <Link to={`/article/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    //           {/* <Link to='/articlelandingpage'> */}
    //             <div className="articleImage">
    //               <img src={post.articleImage} alt="Article" />
    //             </div>
    //             <div className="postContent">
    //               <div className="postHeader">
    //                 <div className="title">{post.title}</div>
    //                 {renderDeleteButton(post)}
    //               </div>
    //               {/* <div className="postTextContainer">{post.postText}</div> */}
    //               <h3>@{post.author.name}</h3>
    //             </div>
    //             </Link>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>
    // </div>



    
    <div>

    
      {/* Top portion with a different background image */}
      <div className='top-portion'
  style={{
    background: `url('https://t3.ftcdn.net/jpg/03/95/37/18/360_F_395371896_s1iRJw4cDzYvMC5750sYzcyxpVvl97Lr.jpg')`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', // Adjust the position as needed
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
        {/* <h1 style={{ color: 'white', fontSize: '60px', fontFamily: "cursive", fontWeight: "500" }}>{showText.join('')}</h1> */}
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Welcome to my Blog!',
        1000,
        '',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        
      ]}
      wrapper="span"
      speed={10}
      style={{ fontSize: '60px', display: 'inline-block',color:"white",fontFamily: "cursive",fontWeight: "500",marginLeft:"50px" }}
      repeat={Infinity}
    />
      </div>

      


        {/* {isLoading?(
          <div>Loading...</div>
        )} */}
        {/* <div className="upper-heading"> */}
          <h2 className='upperpost-heading'>FEATURED ARTICLES</h2>
        {/* </div> */}
        <div className="upper-posts-container">
      {selectedPosts.map((post) => (
        <Link key={post.id} to={`/article/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="post-link">
          <div className="upper-posts" key={post.id}>
            <div className="upper-article">
              <img className='upper-img' src={post.articleImage} alt="" />
              <div className="post-heading-overlay">
                <h2 className='heading-overlay'>{post.title}</h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  


 


    

      {/* Second portion with articles and a different background image */}
      <div
        // style={{
        //   background: `url('https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg?w=360')`,
        //   backgroundSize: 'cover',
        //   paddingTop: '30px', // Add padding as needed
        //   paddingBottom: '30px', // Add padding as needed
        // }}
      >
      
        <div className="homePage">
        <div className="heading-area">
        <h1 style={{ color: 'black',marginBottom:"-13rem",fontFamily:"Roboto",fontSize:"23px",fontWeight:"500" ,marginLeft:"2px" }}>LATEST ARTICLES</h1>
          <hr style={{ borderTop: '1px solid #000', width: '55rem',marginLeft:"3px",marginTop:"211px" }} /> {/* Add the horizontal line */}


         

          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : postList.length === 0 ? (
            <div>No posts available.</div>
          ) : (
            postList.map((post) => (
              
              <div className="container">
              {/* <Link to={`/article/${post.id}`}> */}
              <Link to={`/article/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="article-section" key={post.id}>
                  <div>
                    <img className='article-img' src={post.articleImage} alt="" />
                  </div>
                  
                  <div className="article-content">
                    <h1>{post.title}</h1>
                    <div className="article-author">
                      <span>@{post.author.name}</span>
                      {post.timestamp?.toDate && (
                        <span>{format(post.timestamp.toDate(), 'MMMM dd, yyyy')}</span>
                      )}
                     
                    </div>
                    <div className="article-desc">
                        {/* Display only a limited number of words from the article text */}
                        <span>{truncateText(post.postText, 25)}</span>
                      </div>
                    <div className="read-more">
                      {/* <Link to={`/article/${post.id}`}> */}
                        <button className='btn'>Read more..</button>
                      {/* </Link> */}
                    
                    </div>
                    {renderDeleteButton(post)}
                  </div>
                </div>
                </Link>
              </div>
              
            ))
          )}
         
      {/* </div> */}
        </div>
      </div>
      
    </div>

              
    

   



  );
};

export default Home;
