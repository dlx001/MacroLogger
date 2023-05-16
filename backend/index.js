const express = require('express');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');
const axios = require('axios');
require("dotenv").config();
const app = express();
const upload = multer();
const fs = require('fs');
app.use(cors());
app.post('/api/ocr', upload.single('file'), async (req, res) => {
    console.log("request made");

    fs.readFile("output.json", "utf-8", (err, data) => {
        if(err){
            console.log("error");
        }else{
            try{
                const jsonData=JSON.parse(data);
                console.log([jsonData]);
                res.send([jsonData]);
            }catch(error){
                console.log(error);
            }
        }
        
});

/*
  const file = req.file;
  
  if (!file) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  formData.append('apikey', process.env.API_KEY);
  formData.append('language', 'eng'); 

  try {
    const axiosConfig = {
      headers: formData.getHeaders(),
    };

    const response = await axios.post(
      'https://api.ocr.space/parse/image',
      formData,
      axiosConfig
    );

    if (response.status === 200) {
      const data = response.data;
      //res.send(data);
      //console.log(data);
      
      console.log(data.ParsedResults[0].ParsedText);
      let jsonStr = JSON.stringify(data.ParsedResults[0].ParsedText);
      const filePath ='output.json'
      fs.writeFile(filePath, jsonStr, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('JSON data saved successfully.');
        }
      });
      
    } else {
      console.log('OCR API request failed.');
      res.status(500).json({ error: 'OCR API request failed' });
    }
  } catch (error) {
    console.log('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
  */
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port${process.env.PORT} `);
});
