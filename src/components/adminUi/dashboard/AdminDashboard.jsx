import React from 'react';
import FileUpload from '../fileupload/FileUploads';
import FileStats from '../filestats/FileStats';
import FileList from '../filelists/FileLists'
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboard}>
      <FileUpload />
      {/* <FileStats /> */}
      <FileList />
    </div>
  );
}

export default AdminDashboard;
