import React from 'react';
import ReactDOM  from 'react-dom';
import { CSSTransition } from 'react-transition-group';


//create backdrop

const ModalOverlay = props =>{
    const content=(
        <div>
            <h2>Welcome to Newsrael!</h2>
            <p>Please sign in</p>
        </div>
    );

    return ReactDOM.createPortal( content , document.getElementById('modal-hook'));
}

export default function AuthModal() {
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
