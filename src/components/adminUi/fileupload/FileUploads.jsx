import React, { useState } from 'react';
import styles from './FileUploads.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const FileUploads = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('admintoken');
    if(!token){
      Swal.fire({
        icon: 'error',
        title: 'Login Required',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    try{
      formData.append('title', title)
      formData.append('description', description)
      formData.append('file',file)

      const upload = await axios.post('http://localhost:3001/upload/singlefile',formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(upload.data.message == 'success'){
        Swal.fire({
          icon: 'success',
          title: 'File Uploaded Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'File Upload Failed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <form className={styles.fileUploadForm} onSubmit={handleSubmit}>
      <h2>Upload a New File</h2>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">File Description</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="file">File</label>
        <input 
          type="file" 
          id="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          required 
        />
      </div>
      <button type="submit" className={styles.upbtn}>Upload</button>
    </form>
  );
};

export default FileUploads;
