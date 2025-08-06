import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import './TextForm.css';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isRegex, setIsRegex] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const [matches, setMatches] = useState([]);
  const fileInputRef = useRef(null);

  // Undo/Redo Stack
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Auto Save Draft in LocalStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('textutils-draft');
    if (savedDraft) setText(savedDraft);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('textutils-draft', text);
  }, [text]);

  // Update History Stack
  const updateText = (newText) => {
    setHistory(prev => [...prev, text]);
    setRedoStack([]);
    setText(newText);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [text, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setText(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, text]);
    setRedoStack(prev => prev.slice(1));
    setText(next);
  };

  // Text Operations (Modified to use updateText)
  const handleUpperCase = () => updateText(text.toUpperCase());
  const handleLowerCase = () => updateText(text.toLowerCase());
  const handleCapitalizeWords = () => updateText(text.replace(/\b\w/g, char => char.toUpperCase()));
  const handleRemoveSpaces = () => updateText(text.replace(/\s+/g, ' ').trim());
  const handleClear = () => updateText('');
  const handleReverseText = () => updateText(text.split('').reverse().join(''));
  const handleSortLines = () => updateText(text.split('\n').sort().join('\n'));
  const handleToggleCase = () => updateText(text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join(''));
  const handleRemoveDuplicates = () => updateText([...new Set(text.split('\n'))].join('\n'));
  const handleSentenceCase = () => {
    const sentences = text.split(/([.!?]+)\s*/);
    const processedText = sentences.map((sentence, i) => {
      if (i % 2 === 0) {
        sentence = sentence.trim().toLowerCase();
        if (sentence.length > 0) {
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
      }
      return sentence;
    }).join('');
    updateText(processedText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      props.showAlert("Text copied to clipboard!", "success");
    } catch {
      props.showAlert("Failed to copy text!", "error");
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'textutils.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    props.showAlert("File downloaded!", "success");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save('textutils.pdf');
    props.showAlert("Exported as PDF!", "success");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => updateText(e.target.result);
      reader.readAsText(file);
      props.showAlert("File uploaded successfully!", "success");
    }
  };

  const getStats = () => ({
    words: text.trim().split(/\s+/).filter(Boolean).length,
    chars: text.length,
    sentences: text.split(/[.!?]+/).filter(sent => sent.trim().length > 0).length,
    readingTime: (text.trim().split(/\s+/).filter(Boolean).length * 0.3).toFixed(1)
  });

  // Find & Replace Logic with Regex Toggle
  useEffect(() => {
    if (!searchText) {
      setMatches([]);
      setCurrentMatchIndex(-1);
      return;
    }

    try {
      const regex = isRegex ? new RegExp(searchText, 'gi') : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const foundMatches = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        foundMatches.push({ start: match.index, end: match.index + match[0].length });
      }

      setMatches(foundMatches);
      setCurrentMatchIndex(foundMatches.length > 0 ? 0 : -1);
    } catch (error) {
      setMatches([]);
      setCurrentMatchIndex(-1);
      props.showAlert("Invalid Regex Pattern!", "error");
    }
    // eslint-disable-next-line
  }, [searchText, text, isRegex]);

  const handleNext = () => {
    if (currentMatchIndex < matches.length - 1) setCurrentMatchIndex(currentMatchIndex + 1);
    else setCurrentMatchIndex(0);
  };

  const handlePrevious = () => {
    if (currentMatchIndex > 0) setCurrentMatchIndex(currentMatchIndex - 1);
    else setCurrentMatchIndex(matches.length - 1);
  };

  const handleReplace = () => {
    if (!searchText) return;
    const regex = isRegex ? new RegExp(searchText, 'g') : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    updateText(text.replace(regex, replaceText));
    props.showAlert("Text replaced!", "success");
  };

  const handleReplaceCurrent = () => {
    if (currentMatchIndex === -1 || !matches.length) return;
    const match = matches[currentMatchIndex];
    const newText = text.substring(0, match.start) + replaceText + text.substring(match.end);
    updateText(newText);
    props.showAlert("Replaced current match!", "success");
  };

  // Text-to-Speech
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    props.showAlert("Speaking...", "info");
  };

  const renderHighlightedText = () => {
    if (!searchText || matches.length === 0) return text.replace(/ /g, '\u00a0');
    let lastIndex = 0;
    const elements = [];

    matches.forEach((match, index) => {
      elements.push(text.substring(lastIndex, match.start).replace(/ /g, '\u00a0'));
      elements.push(
        `<mark class="${index === currentMatchIndex ? 'highlight-current' : 'highlight'}">` +
        text.substring(match.start, match.end).replace(/ /g, '\u00a0') +
        "</mark>"
      );
      lastIndex = match.end;
    });

    elements.push(text.substring(lastIndex).replace(/ /g, '\u00a0'));
    return elements.join('');
  };

  // Keyboard Shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      handleUndo();
    }
    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      handleRedo();
    }
    // eslint-disable-next-line
  }, [history, redoStack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="container box-shadow">
      {/* Toolbar Buttons */}
      <div className="toolbar mb-3">
        <div className="btn-group mb-2">
          <button className="btn btn-sm btn-primary mx-1" onClick={handleUpperCase}>UPPERCASE</button>
          <button className="btn btn-sm btn-primary mx-1" onClick={handleLowerCase}>lowercase</button>
          <button className="btn btn-sm btn-primary mx-1" onClick={handleCapitalizeWords}>Capitalize Words</button>
          <button className="btn btn-sm btn-primary mx-1" onClick={handleSentenceCase}>Sentence case</button>
          <button className="btn btn-sm btn-primary mx-1" onClick={handleRemoveSpaces}>Remove Spaces</button>
        </div>

        <div className="btn-group mb-2">
          <button className="btn btn-sm btn-secondary mx-1" onClick={handleReverseText}>Reverse</button>
          <button className="btn btn-sm btn-secondary mx-1" onClick={handleSortLines}>Sort Lines</button>
          <button className="btn btn-sm btn-secondary mx-1" onClick={handleToggleCase}>tOGGLE cASE</button>
          <button className="btn btn-sm btn-secondary mx-1" onClick={handleRemoveDuplicates}>Remove Duplicates</button>
        </div>

        <div className="btn-group mb-2">
          <button className="btn btn-sm btn-success mx-1" onClick={handleCopy}>Copy</button>
          <button className="btn btn-sm btn-success mx-1" onClick={handleDownload}>Download</button>
          <button className="btn btn-sm btn-success mx-1" onClick={handleExportPDF}>Export PDF</button>
          <button className="btn btn-sm btn-info mx-1" onClick={handleSpeak}>Speak</button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} accept=".txt" />
          <button className="btn btn-sm btn-success mx-1" onClick={() => fileInputRef.current.click()}>Upload</button>
          <button className="btn btn-sm btn-danger mx-1" onClick={handleClear}>Clear</button>
        </div>

        <div className="btn-group mb-2">
          <button className="btn btn-sm btn-warning mx-1" onClick={handleUndo}>Undo</button>
          <button className="btn btn-sm btn-warning mx-1" onClick={handleRedo}>Redo</button>
        </div>
      </div>

      {/* Search & Replace */}
      <div className="search-replace mb-3">
        <div className="input-group mb-2">
          <input type="text" className="form-control" placeholder="Search text..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button className="btn btn-outline-secondary" onClick={handlePrevious} disabled={matches.length === 0}>Previous</button>
          <button className="btn btn-outline-secondary" onClick={handleNext} disabled={matches.length === 0}>Next</button>
          <span className="input-group-text">{matches.length > 0 ? `${currentMatchIndex + 1}/${matches.length}` : '0/0'}</span>
        </div>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Replace with..." value={replaceText} onChange={(e) => setReplaceText(e.target.value)} />
          <button className="btn btn-outline-primary" onClick={handleReplaceCurrent} disabled={currentMatchIndex === -1}>Replace</button>
          <button className="btn btn-outline-primary" onClick={handleReplace} disabled={matches.length === 0}>Replace All</button>
          <div className="form-check ms-2">
            <input className="form-check-input" type="checkbox" checked={isRegex} onChange={() => setIsRegex(!isRegex)} />
            <label className="form-check-label">Regex</label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats mb-3">
        <span className="badge bg-secondary mx-1">Words: {getStats().words}</span>
        <span className="badge bg-secondary mx-1">Characters: {getStats().chars}</span>
        <span className="badge bg-secondary mx-1">Sentences: {getStats().sentences}</span>
        <span className="badge bg-secondary mx-1">Reading Time: {getStats().readingTime} sec</span>
      </div>

      {/* Text Area with Highlight Overlay */}
      <div className="text-container" style={{ position: 'relative' }}>
        <pre className="highlight-layer" dangerouslySetInnerHTML={{ __html: renderHighlightedText() }} />
        <textarea 
          className="form-control" 
          value={text} 
          onChange={(e) => updateText(e.target.value)} 
          style={{ 
            position: 'relative', 
            background: 'transparent', 
            color: props.mode === 'dark' ? '#e0e0e0' : '#333', 
            zIndex: 2, 
            resize: 'vertical', 
            minHeight: '200px', // Reduced from 300px
            maxHeight: '400px', // Added max height
            whiteSpace: 'pre-wrap',
            fontSize: '0.9rem' // Added smaller font size
          }} 
        />
      </div>
    </div>
  );
}
