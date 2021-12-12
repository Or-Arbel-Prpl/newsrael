import React, {useEffect} from 'react'
import useStorage from '../Hooks/useStorage'
import './ProgressBar.css'


export default function ProgressBar({file, setFile}) {
    const { url , progress } = useStorage(file);

    useEffect(() => {
        if(url){
            setFile(null)
        }
    }, [url])
    console.log(progress, url);
    return (
        <div className='progress-bar' style={{width: progress+'%'}}></div>
    )
}
