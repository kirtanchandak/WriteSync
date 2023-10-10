import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

const onError = (error) => {
  console.error(error);
};

function DocumentPage() {
  useEffect(() => {
    socket.on("new-opreation", (data) => {
      setEditorState(data);
    });
  }, []);

  const [editorState, setEditorState] = useState();

  function onChange(e) {
    setEditorState(e.target.value);
    socket.emit("listen-text", e.target.value);
  }

  const { id } = useParams();
  useEffect(() => {
    const getDocument = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/document/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDocument();
  }, [id]);

  return (
    <>
      <Layout>
        <div>
          <input type="text" value={editorState} onChange={onChange} />
        </div>
      </Layout>
    </>
  );
}

export default DocumentPage;
