import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar';
import useStorage from '../Hooks/useStorage';

export default function ImageUpload() {
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const [error, setError] = useState();
    const [isValid, setIsValid] = useState(false);

    const changeHandler = (e) =>{
        let pickedFile;

        if(e.target.files.length>2){
            setError('You can upload a maximum of 2 files');
            setIsValid(false);
            return;
        }
        if( e.target.files && (e.target.files.length ===1 || e.target.files.length ===2) ){ 
            pickedFile = e.target.files[0];
            console.log(pickedFile);
            setFile(pickedFile);
            setIsValid(true);
        }
        else{
            setIsValid(false);
            
        }
    }

    // const uploadHandler = () => {
    //     if(!file) return ;
    //     // const { url } = useStorage(file);
    //     setUrl(url);
    //     setFile(null);   
    // }


    
    return (
        <div style={{margin: '5em auto', textAlign: 'center', width: '80%'}}>
            <h1>Image Upload</h1>

            <input 
                type='file' 
                accept='video/*,image/*' 
                onChange={changeHandler}
                multiple
            />

            {/* <button onClick={uploadHandler}>Upload</button> */}

            <br/>
                    {/* {previewUrl && <img src={previewUrl} alt='Preview' /> }
                    {!previewUrl && <p>Please pick an image.</p>} */}

                    {error && <p>{error || 'Please upload an image or video'}</p>}
                    { file && <div> {file.name} </div> }
                    { file && <ProgressBar file={file} setFile={setFile}/> }

                    {file && url && 
                        <div style={{textAlign: 'center'}}> 
                            File uploaded successfully. 
                        </div>
                    }
            
        </div>
    )
}
