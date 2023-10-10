import {useState, useEffect} from "react"
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import Layout from "../components/Layout"
import axios from "axios";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { documentState } from "../store/atoms/document";

function Document() {
  
  const setDocument = useSetRecoilState(documentState)

  type Document = {
    title: string, 
    content: string,
    _id: string
  }

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const userEmail = useRecoilValue(userEmailState);

  const handleNewDocument = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/document", {
        title,
        content,
        userEmail
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDocument({
        title: title,
        content: content
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/documents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setDocuments(response.data.documents)
        console.log(response.data.documents);
        
      } catch (error) {
        console.log(error);
      }
    }
    getDocuments();
  }, [])
  
  
    return (
      <div>
        <Layout>
          <div className="flex items-center justify-center mt-5">
          <button className="bg-gray-300 p-1" onClick={()=> setShowForm(true)}>New Doc+</button>
          </div>
          {
            showForm && (
              <div className="bg-gray-300 mt-8 w-80 flex items-center justify-center py-5">
                <form className="flex flex-col">
                  <div className="flex gap-36 mb-1">
                  <label htmlFor="">Title</label>
                  <button onClick={()=>setShowForm(false)}>❌</button>
                  </div> 
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="">Content</label>
              <input type="text" onChange={(e) => setContent(e.target.value)} />
              <button type="submit" onClick={handleNewDocument} className="mt-5 p-1 bg-gray-500 rounded-full">Create +</button>
            </form> 
              </div>
            )
          }
          <div className="flex justify-center items-center">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {documents.map((document: Document) => (
            <Link to={`/document/${document._id}`} key={document.title} className="bg-gray-200 p-12 rounded-lg text-center"> 
              <h1 className="">{document.title}</h1>
              <p>{document.content}</p>
            </Link>
          ))}
            </div>
            </div>
        </Layout>
    </div>
    )
  }

  export default Document;