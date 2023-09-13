import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <Card.Body>
        <div className="createPostPage">
          <div className="cpContainer">
            <h1>Create A Post</h1>
            <div className="inputGp">
              <label>Topic:</label>
              <input
                placeholder="What's pissing you off..."
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <Form>
              <Form.Group className="inputGp">
                <Form.Label>Post:</Form.Label>
                <textarea
                  placeholder="Explain..."
                  onChange={(event) => {
                    setPostText(event.target.value);
                  }}
                />
              </Form.Group>
            </Form>

            <Button className="submitPost" onClick={createPost}>
              Submit Post
            </Button>
          </div>
        </div>
      </Card.Body>
    </Container>
  );
}
