import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { Container, Button } from "react-bootstrap";

export default function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <Container>
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h1>{post.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <Button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      &#128465;
                    </Button>
                  )}
                </div>
              </div>
              <div className="postTextContainer">{post.postText}</div>
              <h3>@{post.author.name}</h3>
            </div>
          </Container>
        );
      })}
    </div>
  );
}
