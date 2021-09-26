import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange , onButtonSubmit}) => {
    return ( 
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 center form">
                    <input className="f4 pa2 w-70 center" type="text" onChange={ onInputChange}/>
                    <button onClick={onButtonSubmit} className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    );
}
 
export default ImageLinkForm;