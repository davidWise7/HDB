import React, { useState } from 'react';
import { Brain, MessageCircle, Mic, BarChart3, History, Heart, TrendingUp, Shield, Eye } from 'lucide-react';
import './Dashboard.css';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

const analyzeText = async () => {
  if (!textInput.trim()) return;
  
  setIsAnalyzing(true);
  try {
    console.log('Sending request:', { text: textInput, analysis_type: 'full' });
    
    const response = await fetch('http://localhost:8000/analyze/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: textInput,
        analysis_type: 'full'
      })
    });
    
    console.log('Response status:', response.status);
    

if (response.ok) {
  const apiResponse = await response.json();
  console.log('API Response:', apiResponse);
  
  // Extract the actual analysis data from the results field
  const result = apiResponse.results;
  setAnalysis(result);
}
  } catch (error) {
    console.error('Error:', error);
    setAnalysis({ error: 'Failed to analyze text. Make sure your API is running.' });
  }
  setIsAnalyzing(false);

  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            <div className="sidebar-icon">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="sidebar-title">Behavior Decoder</h1>
              <p className="sidebar-subtitle">AI Analysis Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="nav">
          <button 
            className={`menu-item ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            <MessageCircle size={20} />
            <span>Text Analysis</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            <Mic size={20} />
            <span>Voice Analysis</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <h2 className="header-title">
  {activeTab === 'text' ? 'Text Analysis' : 'Voice Analysis'}
</h2>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="status-text">API Connected</span>
            </div>
          </div>
        </header>

	<main className="main">
  {activeTab === 'text' && (
    <>
      <div className="card">
        <h3 className="card-title">Analyze Text</h3>
        <textarea
          className="textarea"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text to analyze emotions, stress levels, confidence, and truthfulness..."
        />
        <div className="input-footer">
          <span className="char-count">{textInput.length} characters</span>
          <button
            className="button"
            onClick={analyzeText}
            disabled={!textInput.trim() || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="card">
          <h3 className="card-title">Results</h3>
          {analysis.error ? (
            <div className="error-card">
              <p>{analysis.error}</p>
            </div>
          ) : (
            <div className="grid">
              {analysis.sentiment && (
                <div className="analysis-card">
                  <div className="analysis-card-header">
                    <div className="analysis-icon blue">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h4 className="analysis-title">Sentiment</h4>
                      <p className="analysis-value">{analysis.sentiment.emotion || 'neutral'}</p>
                      <p className="analysis-description">Polarity: {(analysis.sentiment.polarity || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {analysis.stress_level && (
                <div className="analysis-card">
                  <div className="analysis-card-header">
                    <div className="analysis-icon orange">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h4 className="analysis-title">Stress Level</h4>
                      <p className="analysis-value">{((analysis.stress_level.stress_score || 0) * 100).toFixed(0)}%</p>
                      <p className="analysis-description">Detected stress indicators</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )}

  {activeTab === 'voice' && (
    <div className="card">
      <h3 className="card-title">Voice Analysis</h3>
      <div className="empty-state">
        <Mic size={48} className="empty-state-icon" />
        <p className="empty-state-text">Voice analysis feature coming soon!</p>
        <p className="empty-state-text" style={{fontSize: '12px'}}>
          This will integrate with your audio recorder for real-time voice emotion detection.
        </p>
        <button className="button" style={{marginTop: '16px'}}>
          Start Recording
        </button>
      </div>
    </div>
  )}

        </main>
      </div>
    </div>
  );
}

export default App;