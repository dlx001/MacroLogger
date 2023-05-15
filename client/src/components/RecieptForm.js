import {useState} from 'react'



const RecieptForm = ()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFormChange =(event)=>{
        setSelectedFile(event.target.files[0])
    }

    const handleSubmit =async(event)=>{
        event.preventDefault();
        if (!selectedFile) {
            console.log('Please select an image file.');
            return;
          }

          const formData = new FormData();
          formData.append('file', selectedFile);
      
          try {
            const response = await fetch('http://localhost:8000/api/ocr', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data); // Handle the returned OCR data here
            } else {
              console.log('OCR API request failed.');
            }
          } catch (error) {
            console.log('An error occurred:', error);
          }
        };
      
    return(
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFormChange}></input>
            <button type="submit">Submit</button>
        </form>


    )

}

export default RecieptForm;