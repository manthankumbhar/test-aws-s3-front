import { useState } from "react";
import axios from "axios";

import "./App.css";

async function postSong({ song }) {
  const formData = new FormData();
  formData.append("song", song);

  const result = await axios
    .post("http://localhost:3000/songs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      alert(res.data);
    });
  return result.data;
}

function App() {
  const [file, setFile] = useState();
  const [songs, setSongs] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postSong({ song: file });
    setSongs([result.songs, ...songs]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App">
      <h1>test-aws-s3</h1>
      <br />
      <br />
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
