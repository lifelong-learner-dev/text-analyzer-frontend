import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [conversation, setConversation] = useState([]);
  const [analysisResult, setAnalysisResult] = useState('');
  const [userText, setUserText] = useState('');
  const [analysisInput, setAnalysisInput] = useState('');
  const [showAnalysisBar, setShowAnalysisBar] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getCsrfToken = () => {
      const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
      return csrfToken ? csrfToken.split('=')[1] : '';
    };

    setCsrfToken(getCsrfToken());
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/continue_conversation/',
        { text: userText },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      const newConversation = response.data.conversation.response || response.data.conversation;
      setConversation(prev => [...prev, `You: ${userText}`, `AI: ${newConversation}`]);
      setUserText('');
    } catch (error) {
      console.error('대화 중 오류 발생:', error);
    }
  };

  const handleAnalysis = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/analyze/',
        { analysis_input: analysisInput },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      setAnalysisResult(response.data.result);
    } catch (error) {
      console.error('텍스트 분석 중 오류 발생:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="main-title">대화형 텍스트 분석기</h1>
      <div className="input-container">
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          className="input-textarea"
        />
        <button onClick={handleSend} className="primary-button">전송</button>
      </div>
      <div className="conversation-container">
        <h2 className="section-title">대화 내용</h2>
        <div className="conversation-box">
          {conversation.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
      <button onClick={() => setShowAnalysisBar(true)} className="secondary-button">분석</button>
      {showAnalysisBar && (
        <div className="analysis-bar">
          <h2 className="section-title">어떤 내용을 분석하시겠습니까?</h2>
          <textarea
            value={analysisInput}
            onChange={(e) => setAnalysisInput(e.target.value)}
            placeholder="분석 요청을 입력하세요"
            className="input-textarea"
          />
          <button onClick={handleAnalysis} className="primary-button">분석 요청</button>
        </div>
      )}
      {analysisResult && (
        <div className="analysis-result">
          <h2 className="section-title">분석 결과</h2>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
}

export default App;
