import React, { useState, useEffect } from 'react'
import { projectStorage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default function useStorage(file) {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {

        const storageRef = ref(projectStorage, '619b736a18785e6e70eb5d0c/'+file.name ); //location and file name
        // const storageRef = projectStorage.ref(file.name);

        // image upload that works
        // uploadBytes(storageRef, file).then((snap) => {
        //     getDownloadURL(snap.ref).then((downloadURL) => {
        //         console.log('File available at', downloadURL);
        //         setUrl(downloadURL);
        // }, (err) => {
        //     setError(err);
        // }, () => {
           
        //       });
        // })
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            setError(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setUrl(downloadURL);
            });
        }
        );

    }, [file]);

    useEffect(() => {
        if(!url) return;

        const addMedia = async () => {

            try {
                let postId = '619b736a18785e6e70eb5d0c';
        
             await fetch(`http://localhost:5000/api/media`,{
              method: 'POST',
              body: JSON.stringify({ postId: postId , url: url }),
              headers: {'Content-Type': 'application/json'}
            });
            
            } catch (err) {
                console.log(err.message);
            }
        }

        addMedia();

        
    },[url]);

    return { progress, url , error }
}
