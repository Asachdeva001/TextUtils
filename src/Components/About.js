import React from 'react'

export default function About(props) {
    const myStyle = {
        backgroundColor: props.mode==='dark'?'rgb(33, 37, 50)':'white',
        color: props.mode==='dark'?'white':'black',
        border: '1px solid',
        borderColor: props.mode==='dark'?'white':'black'
    }
    return (
        <div>
            <div className="accordion my-3" id="accordionExample">
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            About the App
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" style={myStyle} data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            TextUtils is a versatile word and character counting utility that lets you manipulate text in various ways. You can convert to uppercase or lowercase, remove extra spaces, copy text, and even perform find and replace operations.
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Easy to Use
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            Users can navigate the app effortlessly, discover features intuitively, and perform tasks without specialized training. Whether you’re converting text to uppercase, removing extra spaces, or finding and replacing content, Text Utilities streamlines the process. Try it out and experience the simplicity firsthand!
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={myStyle}>
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={myStyle} data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Browser Compatibility
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                            Our application ensures seamless functionality across various browsers and their different versions, so users can enjoy a consistent experience. Whether they’re using Internet Explorer 11, Safari 17, or any other browser, Text Utilities delivers reliable performance.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
