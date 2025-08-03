import React,{useState} from 'react'


export default function TextForm(props) {
    var count = 0;
    const handleUpClick = ()=>{
        setText(text.toUpperCase());
    }
    const handleLoClick = ()=>{
        setText(text.toLowerCase());
    }
    const handleCountClick = function(){
        setCountSummary({
            display:'flex'
        })
        setWord('Word')
    }
    const handleClearClick = ()=>{
        setText("");
    }
    const handleCopyClick = ()=>{
        var copyText = document.getElementById("mybox")
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the text: " + copyText.value);
    }
    const handleOnChange = (event)=>{
        setText(event.target.value);
    }
    const handleOnWordChange = (event)=>{
        setWord(event.target.value);
    };
    const handleCountSum = ()=>{
        count = 0;
        const arr = text.split(" ");
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]===word) {
                count += 1;
            }      
        }
        return count;
    }
    const handleClearCount = ()=>{
        setCountSummary({
            display:'none'
        })
    }
    const [text, setText] = useState('Enter text here');
    const [word, setWord] = useState('Word');
    const [countSummary, setCountSummary] = useState({
        display:'none'
    });
    return (
        <>
        <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
            <div className="mb-3 my-3">
                <h1>{props.Heading}</h1>
                <textarea className="form-control" value={text} onChange={handleOnChange} id="mybox" rows="6" style={{backgroundColor: props.mode==='dark'?'transparent':'white',color: props.mode==='dark'?'white':'black'}}></textarea>
            </div>
            <div className='d-flex justify-content-center'>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCountClick}>Word Count</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopyClick}>Copy Text</button>
            </div>
        </div>
        <div className="container my-3 mx-2" style={countSummary}>
            <input type="text" style={{width:"75px",display:"inline", backgroundColor: props.mode==='dark'?'transparent':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" value={word} onChange={handleOnWordChange} id='mybox'/>
            <button className="btn btn-primary mx-2" onClick={handleClearCount}>Clear</button>
            <p className='my-2' style={{color: props.mode==='dark'?'white':'black'}}>Word "{word}" appears {handleCountSum()} times</p>        
        </div>
        <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
            <h1 className='my-3'>Text Summary</h1>
            <p>Word Count : {text.replace('\n',' ').split(" ").filter((element)=>{return element.length!==0}).length} Char Count : {text.length}<br/>Minutes to Read : {text.replace("\n"," ").split(" ").filter((element)=>{return element.length!==0}).length*0.008} mins</p>        
        </div>
        </>
    )
}
