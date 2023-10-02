import { useState, useEffect } from 'react';
import axios from 'axios';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';

function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const [editor] = useState(() => withReact(createEditor()));
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

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: `${documentContent}` }],
    },
  ];

  // Render Slate editor only when documentContent is available
  return (
    <div>
      <Layout>
        <div className='pt-5'>
        <p className='text-center text-2xl font-bold'>{documentTitle}</p>
        </div>
        <div className='pt-5'>
        {documentContent && (
          <Slate editor={editor} initialValue={initialValue}>
            <Editable className='border-2 border-black' />
          </Slate>
          )}
          </div>
      </Layout>
    </div>
  );
}

export default DocumentPage;
