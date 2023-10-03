import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import {io} from "socket.io-client"

function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const [documentContent, setDocumentContent] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  useEffect(() => {
    const getDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/document/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDocumentContent(res.data.document.content);
        setDocumentTitle(res.data.document.title);
      } catch (error) {
        console.log(error);
      }
    };

    getDocument();
  }, [id]); 

  useEffect(() => {
    const quillContainer = document.getElementById("#container");
    if (quillContainer) {
      new Quill(quillContainer, { theme: "snow" });
    }
  }, []);
  
  useEffect(() => {
    const socket = io("http://localhost:3001")
    return () => {
      socket.disconnect()
    }
  })

  return (
    <div>
      <Layout>
        <div className='pt-5'>
        <p className='text-center text-2xl font-bold'>{documentTitle}</p>
        </div>
        <div className='pt-5'>
      <div id='#container' className=''></div>
          </div>
      </Layout>
    </div>
  );
}

export default DocumentPage;
