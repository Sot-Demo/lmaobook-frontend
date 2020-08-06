import React, {useState, useEffect} from 'react';
import './App.css';

const API_URL = "https://lmaobook-backend.herokuapp.com";

function App() {

  const [name, setName] = useState();
  const [message, setMessage] = useState();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();

  }, []);

  const getComments = () => {
    fetch(API_URL + '/comments')
      .then((response) => response.json())
      .then((data) => setComments(data))
  }

  const saveComment = () => {
    const comment = {
      name: name,
      message: message
    }

    fetch(API_URL + "/createComment", {
      method: "POST",
      headers : { "content-type": "application/json"},
      body: JSON.stringify(comment)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setName("");
          setMessage("");
          getComments();
        }
      })

  }


  return (
    <>
      <p>Message</p>
      <input onChange={(e) => setMessage(e.target.value)}></input>
      <p>Name</p>
      <input onChange={(e) => setName(e.target.value)}></input>
      <button onClick={saveComment}>Submit</button>
      {comments.map((comment) => {

      return (
        <>
          <h1>{comment.name}</h1>
          <p>{comment.message}</p>
        </>
      )

    })}
    </>
  );
}

export default App;
