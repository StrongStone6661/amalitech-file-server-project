/* eslint-disable no-unused-vars */
import React, { useEffect , useState} from 'react';
import styles from './FileLists.module.css';
import axios from 'axios'
import d_image from '../../../assets/download.png'
import d_email from '../../../assets/email.png'


const FileList = () => {
  const [files,setFiles] = useState([])

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
  useEffect(()=>{
    

    fetchFiles();

  },[])

  const handleDelete = async (id)=>{
    try{
      const response = await axios.get(`http://localhost:3001/manage/delete/${id}`)
      if(response){
        fetchFiles();
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={styles.fileList}>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} className={styles.fileItem}>
            <h3>{file.title}</h3>
            <span style={{display:'flex',justifyContent:'space-between'}}>
              <p>{file.description}</p>
              <span style={{display:'flex',gap:'30px'}}>
                <p><img src={d_email} width='15'/> {file.emailSent}</p>
                <p><img src={d_image} width='15'/> {file.downloads}</p>
                <p onClick={()=>handleDelete(file._id)} style={{paddingRight:'10px', cursor:'pointer'}}>🗑</p>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
