// FeedPage.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import styles from './styles/FeedPage.module.css';
import styles2 from './styles/FileCard.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'

const FeedPage = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theemail,setEmail] = useState('')

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/data/allfiles');
      if (response.data) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredFiles = files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendEmail = async (filename,id) => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address"
    });
    if (email) {
           /*Swal.fire(`Entered email: ${email}`); */
      try{
        const response = await axios.post(`http://localhost:3001/email/sendemail/${filename}?id=${id}`,{email:email})
        if(response){
          Swal.fire('File sent to your email')
        }
      }catch(err){
        console.log(err)
      }
    }
  };

  const handleDownload = (filename,id) => {
    axios({
      url: `http://localhost:3001/api/download/${filename}?id=${id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // or any other extension
      document.body.appendChild(link);
      link.click();

    }).catch(error => console.error('Error downloading file:', error));
  };

  return (
    <div className={styles.feedPage}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.fileList}>
        {filteredFiles.map(file => (
          <div key={file.id} className={styles2.fileCard}>
            <h2 className={styles.title}>{file.title}</h2>
            <p className={styles2.description}>{file.description}</p>
            <button
              className={styles2.downloadButton}
              onClick={() => handleDownload(file.filePath,file._id)}
            >
              Download
            </button>
            <button
              className={styles2.emailButton}
              onClick={()=>handleSendEmail(file.filePath,file._id)}
            >
              Send to Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
