import React from 'react'

export default function About(props) {
    const myStyle = {
        backgroundColor: props.mode==='dark'?'rgb(33, 37, 50)':'white',
        color: props.mode==='dark'?'white':'black',
        border: '1px solid',
        borderColor: props.mode==='dark'?'white':'black'
    }
    return (
        <div className="container">
            <h2 className="text-center my-4" style={{color: props.mode==='dark'?'white':'black'}}>About TextUtils</h2>
            <div className="accordion my-3" id="accordionExample">
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Features & Functionality
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" style={myStyle} data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>TextUtils</strong> is a powerful text manipulation tool offering:
                            <ul>
                                <li>Text case conversions (UPPERCASE, lowercase, Sentence case)</li>
                                <li>Smart text operations (Remove spaces, Sort lines, Remove duplicates)</li>
                                <li>Advanced search and replace with regex support</li>
                                <li>Document features (Copy, Download, Export to PDF)</li>
                                <li>Reading time estimation and text statistics</li>
                                <li>Undo/Redo functionality for all operations</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            User Experience
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>Designed for efficiency:</strong>
                            <ul>
                                <li>Clean, intuitive interface with dark/light mode support</li>
                                <li>Real-time text analysis and instant feedback</li>
                                <li>Keyboard shortcuts for common operations</li>
                                <li>Auto-save feature to prevent work loss</li>
                                <li>Responsive design that works on all devices</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Technical Details
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            <strong>Built with modern web technologies:</strong>
                            <ul>
                                <li>React.js for dynamic UI updates</li>
                                <li>Bootstrap for responsive design</li>
                                <li>Local storage for auto-save functionality</li>
                                <li>Compatible with all modern browsers</li>
                                <li>Lightweight and fast performance</li>
                                <li>No server-side dependencies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
