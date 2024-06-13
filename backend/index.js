/* eslint-disable no-undef */

const express = require('express');
const app = express();
const users = require('./apiroutes/Users')
const fileUpload = require('./apiroutes/FileUpload')
const data = require('./apiroutes/Data')
const downloadfile = require('./apiroutes/Download')
const sendFileEmail = require('./apiroutes/SendFileEmail')
const manageFiles = require('./apiroutes/ManageFiles')
const admin = require('./apiroutes/AuthAdmin')

require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(cors());
app.use('/api',users)
app.use('/upload',fileUpload)
app.use('/api/data',data)
app.use('/api',downloadfile)
app.use('/email',sendFileEmail)
app.use('/manage',manageFiles)
app.use('/admin',admin)






const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})