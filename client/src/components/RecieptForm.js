import {useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'


const RecieptForm = ()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [data,setData] = useState("");
    const [macros,setMacros]= useState(new Map());
    const [formData,setFormData]=useState({name:"",calories:"",servingSize:"",fat:"",carbohydrate:"",protein:""})
    const handleFormChange =(event)=>{
        setSelectedFile(event.target.files[0])
    }
    useEffect(()=>{
      const updatedFormData = {
        calories: macros.get("calories"),
        servingSize: macros.get("servingSize"),
        fat: macros.get("fat"),
        carbohydrate: macros.get("carbohydrate"),
        protein: macros.get("protein")
      };
      setFormData(updatedFormData);
    },[macros])
    const processText = (data) => {
      let strArr = data.split(/\r?\n/);
      let mapping = new Map();
      let calValue = 0;
      let keyWords = new Set(['protein', 'carbohydrate', 'fat']);
      let keyWordMap = new Map();
      let servingSize = false;
      keyWords.forEach(keyWord=>{
        keyWordMap.set(keyWord,false);
      })
      console.log(keyWordMap);
      
      strArr.forEach(line => {
        const intVal = Number(line);
        if(Number.isInteger(intVal)&&intVal>calValue){
          calValue=intVal;
        }
        if (line.includes("(")&&servingSize==false) {
          let servIndex=line.indexOf("(")+1;
          if(!isNaN(line[servIndex])){
            mapping.set("servingSize", String(line));
            servingSize=true;
          }
        } else {
          let lineLowercase = line.toLowerCase();
          keyWords.forEach(keyword=>{
            if (lineLowercase.includes(keyword)&&keyWordMap.get(keyword)==false) {
              console.log(keyWordMap.get(keyword));
              let index = line.search(/\d/);
              let value = line.slice(index, line.length).trim();
              mapping.set(keyword, String(value));
              keyWordMap.set(keyword,true);
            }
          })
        }
      });
      mapping.set("calories",String(calValue));
      return mapping;
    };
    const handleTextChange = (event)=>{
      const {name,value}=event.target;
      setFormData({...formData,[name]:value});
      console.log(formData);
  }
  const onSubmit = async(event)=>{
    event.preventDefault();
    try {
      console.log(formData);
      const response = await fetch('http://localhost:8000/pantry', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      console.log(response);
     
  }catch(err){
    console.log(err);
  }
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
              //console.log(data); 
              setData(data[0]);
              //console.log(processText(data[0]));
              setMacros(processText(data[0]));
            } else {
              console.log('OCR API request failed.');
            }
          } catch (error) {
            console.log('An error occurred:', error);
          }
        };
        
        const checkGet = async () => {
          try {
            const response = await fetch('http://localhost:8000/pantry', {
              method: 'GET'
            });
            
            const data = await response.json();
            console.log(data);
          } catch (err) {
            console.log(err);
          }
        };
        
      
    return(
      <div>
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nutrition Label</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="name"
                onChange={handleFormChange}
                required="true"
              />
            </Form.Group>
            <Button type="submit">
              Submit
            </Button>
          </Form>
            <Form onSubmit={onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Form.Group controlId="calories">
              <Form.Label>calories</Form.Label>
              <Form.Control
                type="text"
                name="calories"
                value={formData.calories}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Form.Group controlId="servingSize">
              <Form.Label>Serving Size</Form.Label>
              <Form.Control
                type="text"
                name="servingSize"
                value={formData.servingSize}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Form.Group controlId="fat">
              <Form.Label>fat</Form.Label>
              <Form.Control
                type="text"
                name="fat"
                value={formData.fat}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Form.Group controlId="carbohydrate">
              <Form.Label>carbohydrates</Form.Label>
              <Form.Control
                type="text"
                name="carbohydrate"
                value={formData.carbohydrate}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Form.Group controlId="protein">
              <Form.Label>protein</Form.Label>
              <Form.Control
                type="text"
                name="protein"
                value={formData.protein}
                onChange={handleTextChange}
                required="true"
              />
            </Form.Group>
            <Button type="submit">
              Submit
            </Button>
          </Form>
          {Array.from(macros).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
            ))}
            <button onClick={()=>checkGet()}>Test Get</button>

      </div>
       

    )

}

export default RecieptForm;