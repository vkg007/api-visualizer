import React, { useState, useCallback, memo, useEffect } from 'react';

// --- Helper Components ---

const Icon = memo(({ path, style = {} }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '1.25rem', height: '1.25rem', ...style}}>
    <path d={path} />
  </svg>
));

const ICONS = {
  downArrow: "M12 2a1 1 0 011 1v12.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L11 15.586V3a1 1 0 011-1z",
  share: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
  upload: "M9 16h6v-6h4l-8-8-8 8h4v6zm-4 2h14v2H5v-2z",
  download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  addChild: "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  chevronRight: "M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z",
  chevronDown: "M7.41,8.59L12,13.17L16.59,8.59L18,10L12,16L6,10L7.41,8.59Z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1-3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
  description: "M4 6h16v2H4zm0 4h16v2H4zm0 4h12v2H4z",
  sitemap: "M12.75 3.5a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0V6.5h1.5a.75.75 0 000-1.5H12.75V3.5zM6 11.25a.75.75 0 000 1.5h12a.75.75 0 000-1.5H6zM12.75 16.25a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5H12.75v-1.5z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z",
  expand: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
  collapse: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
  beautify: "M12,2.5L14.32,4.82L17,2L17.5,5.5L21,6L18.68,8.32L21.5,11.5L18,11L18.5,14.5L15.68,12.18L13,15L12,11.5L11,15L8.32,12.18L5.5,14.5L6,11L2.5,11.5L5.32,8.32L2,6L5.5,5.5L7,2L9.68,4.82L12,2.5Z"
};


// --- Tool 1: JSON Beautifier ---
const JsonBeautifier = () => {
    const [jsonInput, setJsonInput] = useState('{"key":"value","nested":{"id":1}}');
    const [error, setError] = useState('');

    const handleBeautify = () => {
        try {
            if (jsonInput.trim() === '') {
                setError('Input is empty.');
                return;
            }
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e) {
            setError('Invalid JSON format.');
        }
    };

    return (
        <div className="tool-container">
            <h2 className="tool-title">JSON Beautifier & Formatter</h2>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="tool-textarea"
                placeholder="Paste your JSON here..."
            />
            <button onClick={handleBeautify} className="action-button" style={{backgroundColor: '#16a34a', marginTop: '1rem'}}>
                <Icon path={ICONS.beautify} /> Beautify JSON
            </button>
            {error && <p className="tool-error">{error}</p>}
        </div>
    );
};

// --- Tool 2: JSON Compare ---
const JsonCompare = () => {
    const [jsonA, setJsonA] = useState('{\n  "id": 1,\n  "name": "A",\n  "status": "active"\n}');
    const [jsonB, setJsonB] = useState('{\n  "id": 2,\n  "name": "B",\n  "status": "active"\n}');
    const [result, setResult] = useState(null);
    const [diff, setDiff] = useState(null);

    const handleBeautify = (json, setter) => {
        try {
            const parsed = JSON.parse(json);
            setter(JSON.stringify(parsed, null, 2));
        } catch (e) {
            // ignore error
        }
    };
    
    const getJsonDiff = (jsonStrA, jsonStrB) => {
        const linesA = jsonStrA.split('\n');
        const linesB = jsonStrB.split('\n');
        const maxLines = Math.max(linesA.length, linesB.length);
        let htmlA = '';
        let htmlB = '';

        for (let i = 0; i < maxLines; i++) {
            const lineA = linesA[i] || '';
            const lineB = linesB[i] || '';
            if (lineA !== lineB) {
                htmlA += `<span class="highlight">${lineA}</span>\n`;
                htmlB += `<span class="highlight">${lineB}</span>\n`;
            } else {
                htmlA += `${lineA}\n`;
                htmlB += `${lineB}\n`;
            }
        }
        return { htmlA, htmlB };
    };


    const handleCompare = () => {
        try {
            const parsedA = JSON.parse(jsonA);
            const parsedB = JSON.parse(jsonB);
            const stringA = JSON.stringify(parsedA, Object.keys(parsedA).sort());
            const stringB = JSON.stringify(parsedB, Object.keys(parsedB).sort());
            
            if (stringA === stringB) {
                setResult({ identical: true, message: "JSON objects are identical." });
                setDiff(null);
            } else {
                setResult({ identical: false, message: "JSON objects are different." });
                const beautifiedA = JSON.stringify(parsedA, null, 2);
                const beautifiedB = JSON.stringify(parsedB, null, 2);
                setDiff(getJsonDiff(beautifiedA, beautifiedB));
            }
        } catch (e) {
            setResult({ identical: false, message: "Invalid JSON in one or both inputs." });
            setDiff(null);
        }
    };

    return (
        <div className="tool-container">
            <h2 className="tool-title">JSON Compare</h2>
            <div className="json-compare-grid">
                <div>
                    <div className="json-editor-header">
                        <h3>JSON A</h3>
                        <button onClick={() => handleBeautify(jsonA, setJsonA)} className="icon-button"><Icon path={ICONS.beautify}/></button>
                    </div>
                    <textarea
                        value={jsonA}
                        onChange={(e) => setJsonA(e.target.value)}
                        className="tool-textarea"
                        placeholder="Paste first JSON here..."
                    />
                </div>
                 <div>
                    <div className="json-editor-header">
                        <h3>JSON B</h3>
                        <button onClick={() => handleBeautify(jsonB, setJsonB)} className="icon-button"><Icon path={ICONS.beautify}/></button>
                    </div>
                    <textarea
                        value={jsonB}
                        onChange={(e) => setJsonB(e.target.value)}
                        className="tool-textarea"
                        placeholder="Paste second JSON here..."
                    />
                </div>
            </div>
            <button onClick={handleCompare} className="action-button" style={{backgroundColor: '#2563eb', marginTop: '1rem'}}>
                Compare
            </button>
            {result && (
                <div className="tool-result" style={{backgroundColor: result.identical ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)', borderColor: result.identical ? '#16a34a' : '#dc2626' }}>
                    {result.message}
                </div>
            )}
            {diff && (
                 <div className="json-compare-grid" style={{marginTop: '1.5rem'}}>
                    <pre className="diff-view" dangerouslySetInnerHTML={{__html: diff.htmlA}} />
                    <pre className="diff-view" dangerouslySetInnerHTML={{__html: diff.htmlB}} />
                </div>
            )}
        </div>
    );
};

// --- Tool 3: API Flow Visualizer ---
const ApiFlowVisualizer = () => {

    const JsonEditor = memo(({ title, json, setJson, isRequest, isExpanded, onToggleExpand }) => {
      const [isValid, setIsValid] = useState(true);

      const handleChange = (e) => {
        const textValue = e.target.value;
        try {
          if(textValue.trim() === '') {
              JSON.parse('{}');
          } else {
            JSON.parse(textValue);
          }
          setIsValid(true);
        } catch (error) {
          setIsValid(false);
        }
        setJson(textValue);
      };
      
      const handleBeautify = () => {
          try {
              if (json.trim() === '') {
                  setJson('{}');
                  return;
              }
              const parsed = JSON.parse(json);
              setJson(JSON.stringify(parsed, null, 2));
          } catch (error) {
              // Handle invalid JSON, maybe flash border red
          }
      };

      const headerStyle = {
          fontSize: '1.125rem',
          fontWeight: '600',
          color: isRequest ? '#93c5fd' : '#86efac'
      };
      
      const textareaBaseStyle = {
          width: '100%',
          height: '16rem',
          padding: '0.75rem',
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.875rem',
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          color: '#e5e7eb',
          borderRadius: '0.375rem',
          border: '2px solid',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.3s, box-shadow 0.3s'
      };
      
      const textareaStyle = {
          ...textareaBaseStyle,
          borderColor: isValid ? '#374151' : '#ef4444'
      };

      return (
        <div style={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <div onClick={onToggleExpand} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <Icon path={isExpanded ? ICONS.chevronDown : ICONS.chevronRight} style={{ marginRight: '0.5rem' }} />
                    <h3 style={headerStyle}>{title}</h3>
                </div>
                <button onClick={handleBeautify} title="Beautify JSON" className="icon-button">
                    <Icon path={ICONS.beautify} />
                </button>
            </div>
            <div className="collapsible-content" style={{ maxHeight: isExpanded ? '500px' : '0' }}>
                <textarea
                    value={json}
                    onChange={handleChange}
                    style={textareaStyle}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = isValid ? '#374151' : '#ef4444';
                        e.target.style.boxShadow = 'none';
                    }}
                    spellCheck="false"
                />
                {!isValid && <p style={{color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem'}}>Invalid JSON format.</p>}
            </div>
        </div>
      );
    });

    // CORRECTED ApiFlowNode with local state management
    const ApiFlowNode = memo(({ step, updateStep, addChildStep, deleteStep, level = 0 }) => {
        const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

        // Local state for all input fields
        const [localStep, setLocalStep] = useState(step);

        // Sync local state if the prop changes from above
        useEffect(() => {
            setLocalStep(step);
        }, [step]);

        // Update local state on every change
        const handleLocalChange = (field, value) => {
            setLocalStep(prevState => ({ ...prevState, [field]: value }));
        };

        // Update the global state only on blur (when user is done editing)
        const handleBlur = (field) => {
            if (step[field] !== localStep[field]) {
                updateStep(step.id, field, localStep[field]);
            }
        };

        const handleUrlChange = (e) => {
            const urlString = e.target.value;
            handleLocalChange('url', urlString);
            try {
                const url = new URL(urlString, 'http://dummybase.com');
                const params = Object.fromEntries(url.searchParams.entries());
                const paramsString = Object.keys(params).length > 0 ? JSON.stringify(params, null, 2) : '{}';
                handleLocalChange('queryParams', paramsString);
            } catch (error) { /* ignore */ }
        };

        const handleUrlBlur = () => {
            if (step.url !== localStep.url) {
                updateStep(step.id, 'url', localStep.url);
            }
            if (step.queryParams !== localStep.queryParams) {
                updateStep(step.id, 'queryParams', localStep.queryParams);
            }
        };
        
        const handleJsonChange = (field, value) => {
             setLocalStep(prevState => ({...prevState, [field]: value}));
        };
        
        const handleJsonBlur = (field) => {
            if (step[field] !== localStep[field]) {
                 updateStep(step.id, field, localStep[field]);
            }
        };

        return (
            <div className="api-flow-node" style={{ position: 'relative', paddingTop: '2rem' }}>
                {level > 0 && <span style={{ position: 'absolute', top: '2rem', left: '-1.5rem', width: '1.5rem', height: 'calc(50% + 2rem)', borderBottom: '2px solid #4b5563', borderLeft: '2px solid #4b5563', borderRadius: '0 0 0 0.75rem' }}></span>}
                
                <div className="api-node-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: localStep.isExpanded ? '1rem' : '0' }}>
                         <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <button title={localStep.isExpanded ? "Collapse" : "Expand"} className="icon-button transparent" onClick={() => updateStep(step.id, 'isExpanded', !localStep.isExpanded)}>
                                <Icon path={localStep.isExpanded ? ICONS.chevronDown : ICONS.chevronRight} />
                            </button>
                            <select
                                value={localStep.method}
                                onChange={(e) => handleLocalChange('method', e.target.value)}
                                onBlur={() => handleBlur('method')}
                                onClick={(e) => e.stopPropagation()}
                                className="http-method-select"
                            >
                                {httpMethods.map(method => <option key={method} value={method}>{method}</option>)}
                            </select>
                            <input
                                type="text"
                                value={localStep.title}
                                onChange={(e) => handleLocalChange('title', e.target.value)}
                                onBlur={() => handleBlur('title')}
                                className="api-node-title"
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                            <button onClick={() => addChildStep(step.id)} title="Add Child Step" className="icon-button blue">
                                <Icon path={ICONS.addChild} />
                            </button>
                            <button onClick={() => deleteStep(step.id)} title="Delete Step" className="icon-button red">
                                <Icon path={ICONS.trash} />
                            </button>
                        </div>
                    </div>
                    <div className="collapsible-content" style={{ maxHeight: localStep.isExpanded ? '1000px' : '0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
                             <div className="api-node-details-grid">
                                <div className="detail-item">
                                    <Icon path={ICONS.link} />
                                    <input
                                        type="text"
                                        value={localStep.url}
                                        onChange={handleUrlChange}
                                        onBlur={handleUrlBlur}
                                        placeholder="API Endpoint URL"
                                        className="detail-input"
                                    />
                                </div>
                                <div className="detail-item">
                                    <Icon path={ICONS.link} />
                                    <input
                                        type="text"
                                        value={localStep.repoLink}
                                        onChange={(e) => handleLocalChange('repoLink', e.target.value)}
                                        onBlur={() => handleBlur('repoLink')}
                                        placeholder="Bitbucket Repo Link"
                                        className="detail-input"
                                    />
                                </div>
                                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                                     <Icon path={ICONS.description} style={{alignSelf: 'flex-start', marginTop: '0.5rem'}}/>
                                     <textarea
                                        value={localStep.description}
                                        onChange={(e) => handleLocalChange('description', e.target.value)}
                                        onBlur={() => handleBlur('description')}
                                        placeholder="API Description..."
                                        className="detail-textarea"
                                        rows="3"
                                    />
                                </div>
                            </div>
                            
                            <JsonEditor title="Headers" json={localStep.headers} setJson={(val) => handleJsonChange('headers', val)} onBlur={() => handleJsonBlur('headers')} isRequest={true} isExpanded={localStep.isHeadersExpanded} onToggleExpand={() => updateStep(step.id, 'isHeadersExpanded', !localStep.isHeadersExpanded)} />
                            
                            <JsonEditor title="Query Params" json={localStep.queryParams} setJson={(val) => handleJsonChange('queryParams', val)} onBlur={() => handleJsonBlur('queryParams')} isRequest={true} isExpanded={localStep.isParamsExpanded} onToggleExpand={() => updateStep(step.id, 'isParamsExpanded', !localStep.isParamsExpanded)} />

                            {localStep.method !== 'GET' && (
                                <JsonEditor title="Request Body" json={localStep.request} setJson={(val) => handleJsonChange('request', val)} onBlur={() => handleJsonBlur('request')} isRequest={true} isExpanded={localStep.isRequestExpanded} onToggleExpand={() => updateStep(step.id, 'isRequestExpanded', !localStep.isRequestExpanded)} />
                            )}

                            <JsonEditor title="Response" json={localStep.response} setJson={(val) => handleJsonChange('response', val)} onBlur={() => handleJsonBlur('response')} isRequest={false} isExpanded={localStep.isResponseExpanded} onToggleExpand={() => updateStep(step.id, 'isResponseExpanded', !localStep.isResponseExpanded)} />
                        </div>
                    </div>
                </div>
                
                <div className="collapsible-content" style={{ maxHeight: localStep.isExpanded ? '9999px' : '0' }}>
                    {localStep.children && localStep.children.length > 0 && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '1rem 0', marginLeft: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Icon path={ICONS.downArrow} style={{width: '2rem', height: '2rem', color: '#9ca3af'}}/>
                                     <input
                                        type="text"
                                        value={localStep.outputDescription}
                                        onChange={(e) => handleLocalChange('outputDescription', e.target.value)}
                                        onBlur={() => handleBlur('outputDescription')}
                                        className="output-description-input"
                                        placeholder="Describe data flow..."
                                    />
                                </div>
                            </div>

                            <div style={{ paddingLeft: '3rem', position: 'relative' }}>
                                <span style={{ position: 'absolute', top: 0, left: 'calc(1.5rem)', width: '2px', height: '100%', background: '#4b5563' }}></span>
                                {localStep.children.map(child => (
                                    <ApiFlowNode key={child.id} step={child} updateStep={updateStep} addChildStep={addChildStep} deleteStep={deleteStep} level={level + 1} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    });

    const QuickViewNode = memo(({ node }) => (
        <div className="quick-view-node-container">
            <div className="quick-view-node">{node.title}</div>
            {node.children && node.children.length > 0 && (
                <>
                    <div className="quick-view-connector"></div>
                    <div className="quick-view-children">
                        {node.children.map(child => <QuickViewNode key={child.id} node={child} />)}
                    </div>
                </>
            )}
        </div>
    ));

    const QuickView = ({ flows, onClose }) => {
        return (
            <div className="quick-view-overlay" onClick={onClose}>
                <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
                    <div className="quick-view-header">
                        <h2>API Quick View</h2>
                        <button onClick={onClose} className="icon-button close-button">
                            <Icon path={ICONS.close} />
                        </button>
                    </div>
                    <div className="quick-view-content">
                        {flows.map(flow => <QuickViewNode key={flow.id} node={flow} />)}
                    </div>
                </div>
            </div>
        );
    };

    const addExpansionState = (nodes) => {
        return nodes.map(node => ({
            ...node,
            method: node.method || 'POST',
            url: node.url || '',
            description: node.description || '',
            repoLink: node.repoLink || '',
            headers: node.headers || '{\n  "Authorization": "Bearer YOUR_TOKEN",\n  "Content-Type": "application/json"\n}',
            queryParams: node.queryParams || '{}',
            isExpanded: node.isExpanded !== undefined ? node.isExpanded : true,
            isRequestExpanded: node.isRequestExpanded !== undefined ? node.isRequestExpanded : true,
            isResponseExpanded: node.isResponseExpanded !== undefined ? node.isResponseExpanded : true,
            isHeadersExpanded: node.isHeadersExpanded !== undefined ? node.isHeadersExpanded : true,
            isParamsExpanded: node.isParamsExpanded !== undefined ? node.isParamsExpanded : true,
            children: node.children ? addExpansionState(node.children) : []
        }));
      };
        
      const initialFlows = [
        {
          "id": 1,
          "title": "1. Get Order Details",
          "url": "https://api.ecommerce.com/orders/ord_123",
          "description": "Fetches the line items for a specific customer order.",
          "repoLink": "https://bitbucket.org/ecommerce/order-service",
          "method": "GET",
          "request": "{}",
          "response": "{\n  \"orderId\": \"ord_123\",\n  \"lineItems\": [\n    {\n      \"lineId\": 1,\n      \"productId\": \"prod_abc\",\n      \"ESN\": \"111222333444\"\n    },\n    {\n      \"lineId\": 2,\n      \"productId\": \"prod_def\",\n      \"ESN\": \"555666777888\"\n    }\n  ]\n}",
          "outputDescription": "Use ESN from line items for device lookups",
          "children": [
            {
              "id": 2,
              "title": "1a. Get Device Details for ESN 1",
              "url": "https://api.devices.com/details/111222333444",
              "method": "GET",
              "description": "Gets details for the first device in the order.",
              "response": "{\n  \"serialNumber\": \"SN-AABBCC1122\",\n  \"model\": \"SuperPhone XI\"\n}",
              "outputDescription": "Use serialNumber to check warranty",
              "children": [
                {
                  "id": 3,
                  "title": "1a-i. Check Warranty for SN-AABBCC1122",
                  "url": "https://api.warranty.com/check/SN-AABBCC1122",
                  "method": "GET",
                  "description": "Checks warranty status.",
                  "response": "{\n  \"status\": \"Active\",\n  \"expiresOn\": \"2026-09-01\"\n}",
                  "children": []
                }
              ]
            },
            {
              "id": 4,
              "title": "1b. Get Device Details for ESN 2",
              "url": "https://api.devices.com/details/555666777888",
              "method": "GET",
              "description": "Gets details for the second device in the order.",
              "response": "{\n  \"serialNumber\": \"SN-DDEEFF3344\",\n  \"model\": \"MegaTablet 5\"\n}",
              "children": []
            }
          ]
        }
      ];

      const [flows, setFlows] = useState(() => addExpansionState(initialFlows));
      const [notification, setNotification] = useState('');
      const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

      const showNotification = useCallback((message) => { setNotification(message); setTimeout(() => setNotification(''), 3000); }, []);
      
      const updateStep = useCallback((id, field, value) => {
          setFlows(currentFlows => {
              const updateNodeRecursively = (nodes) => {
                  return nodes.map(node => {
                      if (node.id === id) {
                          return { ...node, [field]: value };
                      }
                      if (node.children) {
                          const newChildren = updateNodeRecursively(node.children);
                          if (newChildren !== node.children) {
                              return { ...node, children: newChildren };
                          }
                      }
                      return node;
                  });
              };
              return updateNodeRecursively(currentFlows);
          });
      }, []);

      const getIds = useCallback((steps) => steps.reduce((acc, step) => [...acc, step.id, ...getIds(step.children || [])], []), []);
      
      const addStep = useCallback(() => {
        setFlows(currentFlows => {
            const allIds = getIds(currentFlows);
            const newId = (allIds.length > 0 ? Math.max(...allIds) : 0) + 1;
            const newStep = { id: newId, title: `API ${newId}: New Root Step`, url: '', description: '', repoLink: '', request: JSON.stringify({ "data": "value" }, null, 2), response: JSON.stringify({ "result": "success" }, null, 2), outputDescription: "", isExpanded: true, isRequestExpanded: true, children: [] };
            return [...currentFlows, addExpansionState([newStep])[0]];
        });
      }, [getIds]);
      
      const addChildStep = useCallback((parentId) => {
        setFlows(currentFlows => {
            const addChildRecursively = (nodes, newStep) => {
                return nodes.map(node => {
                    if (node.id === parentId) {
                        return { ...node, isExpanded: true, children: [...(node.children || []), newStep] };
                    }
                    if (node.children) {
                         const newChildren = addChildRecursively(node.children, newStep);
                         if (newChildren !== node.children) {
                             return { ...node, children: newChildren };
                         }
                    }
                    return node;
                });
            };
            
            const allIds = getIds(currentFlows);
            const newId = (allIds.length > 0 ? Math.max(...allIds) : 0) + 1;
            const newStep = { id: newId, title: `API Child: New Step`, url: '', description: '', repoLink: '', request: JSON.stringify({ "fromParent": "value" }, null, 2), response: JSON.stringify({ "result": "pending" }, null, 2), outputDescription: "", isExpanded: true, isRequestExpanded: true, children: [] };
            const processedNewStep = addExpansionState([newStep])[0];
            return addChildRecursively(currentFlows, processedNewStep);
        });
      }, [getIds]);

      const deleteStep = useCallback((targetId) => {
        const filterSteps = (steps) => steps.filter(step => step.id !== targetId).map(step => ({ ...step, children: step.children ? filterSteps(step.children) : [] }));
        setFlows(currentFlows => filterSteps(currentFlows));
        showNotification("API Step deleted.");
      }, [showNotification]);

      const handleExport = useCallback(() => {
          try {
            const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(flows, null, 2))}`;
            const link = document.createElement("a");
            link.href = jsonString; link.download = "api-flow.json"; link.click();
            showNotification("Flow exported successfully!");
          } catch (error) { showNotification("Error exporting flow."); }
      }, [flows, showNotification]);

      const handleImport = useCallback((event) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            try {
                const result = JSON.parse(e.target.result);
                if (Array.isArray(result) && result.length > 0 && 'id' in result[0] && 'title' in result[0] && 'children' in result[0]) {
                    setFlows(addExpansionState(result));
                    showNotification("Flow imported successfully!");
                } else { showNotification("Invalid flow file format."); }
            } catch (error) { showNotification("Error reading or parsing the file."); }
        };
        if(event.target.files[0]) { fileReader.readAsText(event.target.files[0]); }
      }, [showNotification]);

      const handleCopyToClipboard = useCallback(() => {
        try {
            const jsonString = JSON.stringify(flows, null, 2);
            const textArea = document.createElement("textarea");
            textArea.value = jsonString; textArea.style.position = "fixed"; document.body.appendChild(textArea);
            textArea.focus(); textArea.select();
            try { document.execCommand('copy'); showNotification("JSON copied to clipboard!"); } 
            catch (err) { showNotification("Failed to copy JSON."); }
            document.body.removeChild(textArea);
        } catch(e) { showNotification("Failed to copy JSON."); }
      }, [flows, showNotification]);

      const toggleAll = useCallback((expand) => {
          const toggleNode = (nodes) => nodes.map(node => ({
              ...node,
              isExpanded: expand,
              isRequestExpanded: expand,
              isResponseExpanded: expand,
              isHeadersExpanded: expand,
              isParamsExpanded: expand,
              children: node.children ? toggleNode(node.children) : []
          }));
          setFlows(currentFlows => toggleNode(currentFlows));
      }, []);

    return (
        <div>
            <div className="actions-bar">
               <button onClick={addStep} className="action-button" style={{backgroundColor: '#9333ea'}}>
                    <Icon path={ICONS.share}/> Add Root API
                </button>
                <button onClick={() => toggleAll(true)} className="action-button" style={{backgroundColor: '#059669'}}>
                    <Icon path={ICONS.expand}/> Expand All
                </button>
                <button onClick={() => toggleAll(false)} className="action-button" style={{backgroundColor: '#78716c'}}>
                    <Icon path={ICONS.collapse}/> Collapse All
                </button>
                <button onClick={handleExport} className="action-button" style={{backgroundColor: '#16a34a'}}>
                    <Icon path={ICONS.download}/> Export Flow
                </button>
                 <label className="action-label" style={{backgroundColor: '#2563eb'}}>
                    <Icon path={ICONS.upload}/> Import Flow
                    <input type="file" accept=".json" onChange={handleImport} style={{display: 'none'}} />
                </label>
                <button onClick={handleCopyToClipboard} className="action-button" style={{backgroundColor: '#4b5563'}}>
                    <Icon path={ICONS.copy}/> Copy as JSON
                </button>
                <button onClick={() => setIsQuickViewOpen(true)} className="action-button" style={{backgroundColor: '#ca8a04'}}>
                    <Icon path={ICONS.sitemap}/> Quick View
                </button>
            </div>

            <main>
              {flows.map((step) => (
                <ApiFlowNode key={step.id} step={step} updateStep={updateStep} addChildStep={addChildStep} deleteStep={deleteStep} />
              ))}
            </main>

            {isQuickViewOpen && <QuickView flows={flows} onClose={() => setIsQuickViewOpen(false)} />}
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

// --- Main App Shell ---
export default function App() {
  const [activeTool, setActiveTool] = useState('api_flow');

  const navButtonStyle = (tool) => ({
      padding: '0.75rem 1.5rem',
      fontWeight: '600',
      border: 'none',
      background: 'transparent',
      color: activeTool === tool ? 'white' : '#9ca3af',
      borderBottom: activeTool === tool ? '3px solid #a78bfa' : '3px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
  });
    
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fira+Code&display=swap');
    
    body { 
        font-family: 'Inter', sans-serif; 
        color: #e5e7eb; 
        margin: 0;
        background-color: #030712;
        overflow-x: hidden;
    }

    .aurora-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        background: radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, rgba(3, 7, 18, 0) 100%),
                    radial-gradient(ellipse at 80% 70%, rgba(59, 130, 246, 0.15) 0%, rgba(3, 7, 18, 0) 100%);
        animation: aurora 20s infinite alternate;
    }

    @keyframes aurora {
        0% { transform: rotate(0deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1.5); }
    }

    .container { max-width: 80rem; margin: 0 auto; padding: 2rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(to right, #a78bfa, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .header p { color: #9ca3af; margin-top: 0.5rem; }
    
    .actions-bar { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem; margin: 2rem 0; padding: 1rem; background-color: rgba(17, 24, 39, 0.6); border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
    .action-button, .action-label { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; padding: 0.6rem 1.2rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: all 0.2s ease-in-out; color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    .action-button:hover, .action-label:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.1); }
    
    .api-flow-node { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    .api-node-card {
        background: linear-gradient(145deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.75rem;
        padding: 1.5rem;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }
    .api-node-title { font-size: 1.25rem; font-weight: bold; color: white; background-color: transparent; border: none; border-bottom: 2px solid transparent; outline: none; width: 100%; padding-bottom: 0.25rem; transition: border-color 0.3s; }
    .api-node-title:focus { border-color: #a78bfa; }

    .http-method-select {
        background-color: transparent;
        color: #e5e7eb;
        border: 1px solid #4b5563;
        border-radius: 0.375rem;
        padding: 0.25rem 0.5rem;
        font-weight: 600;
        margin-right: 0.75rem;
        cursor: pointer;
    }
    .http-method-select:focus { outline: none; border-color: #a78bfa; }

    .icon-button { padding: 0.5rem; border-radius: 9999px; border: none; cursor: pointer; transition: all 0.2s; background-color: transparent; color: #9ca3af; }
    .icon-button:hover { background-color: rgba(255,255,255,0.1); color: white; }
    .icon-button.blue { background-color: #2563eb; color: white; } .icon-button.blue:hover { background-color: #3b82f6; transform: scale(1.1); }
    .icon-button.red { background-color: #dc2626; color: white; } .icon-button.red:hover { background-color: #ef4444; transform: scale(1.1); }
    
    .output-description-input { color: #d8b4fe; font-size: 0.875rem; font-weight: 600; margin-top: 0.5rem; background-color: rgba(17, 24, 39, 0.8); padding: 0.5rem 0.75rem; border-radius: 0.375rem; text-align: center; border: 1px solid #4b5563; outline: none; max-width: 20rem; transition: all 0.3s; }
    .output-description-input:focus { border-color: #a78bfa; box-shadow: 0 0 15px rgba(167, 139, 250, 0.3); }

    .collapsible-content { overflow: hidden; transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, padding 0.5s ease-in-out; opacity: 1; }
    .collapsible-content[style*="max-height: 0px"] { opacity: 0; padding-top: 0 !important; }

    .notification { position: fixed; bottom: 1.25rem; right: 1.25rem; background-color: #1f2937; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); animation: fade-in-out 3s ease-in-out forwards; backdrop-filter: blur(10px); z-index: 100; }
    @keyframes fade-in-out {
        0% { opacity: 0; transform: translateY(10px); } 10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(10px); }
    }
    
    .api-node-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 1.5rem;
    }
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .detail-input, .detail-textarea {
        width: 100%;
        color: #d1d5db; 
        font-size: 0.875rem; 
        font-family: 'Inter', sans-serif;
        background-color: rgba(17, 24, 39, 0.8); 
        padding: 0.5rem 0.75rem; 
        border-radius: 0.375rem; 
        border: 1px solid #4b5563; 
        outline: none; 
        transition: all 0.3s;
    }
    .detail-input:focus, .detail-textarea:focus {
        border-color: #a78bfa; 
        box-shadow: 0 0 15px rgba(167, 139, 250, 0.3); 
    }
    .detail-textarea {
        resize: vertical;
    }
    .detail-item > svg {
        color: #9ca3af;
        flex-shrink: 0;
    }
    
    .quick-view-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(3, 7, 18, 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    .quick-view-modal {
        background: linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        width: 90vw;
        height: 80vh;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        display: flex;
        flex-direction: column;
    }
    .quick-view-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .quick-view-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .close-button {
      color: white;
    }
    .quick-view-content {
        padding: 2rem;
        overflow: auto;
        flex-grow: 1;
    }
    .quick-view-node-container {
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }
    .quick-view-node {
        background-color: #4b5563;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    }
    .quick-view-connector {
        width: 3rem;
        height: 2px;
        background-color: #6b7280;
    }
    .quick-view-children {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        padding-left: 3rem;
    }
    .quick-view-children::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3rem;
        height: 2px;
        background-color: #6b7280;
    }
    .quick-view-children > .quick-view-node-container:not(:last-child) {
        margin-bottom: 1rem;
    }

    .tool-container {
        background: linear-gradient(145deg, rgba(31, 41, 55, 0.4), rgba(17, 24, 39, 0.4));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        animation: fadeIn 0.5s ease-out forwards;
    }
    .tool-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .tool-textarea {
        width: 100%;
        height: 20rem;
        background-color: rgba(17, 24, 39, 0.8);
        border: 1px solid #4b5563;
        color: #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        font-family: 'Fira Code', monospace;
        resize: vertical;
    }
    .tool-error {
        color: #f87171;
        margin-top: 1rem;
        text-align: center;
    }
    .json-compare-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    .tool-result {
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 2px solid;
        text-align: center;
        font-weight: 600;
    }
    .json-editor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        color: #d1d5db;
    }
    .diff-view {
        background-color: rgba(17, 24, 39, 0.8);
        border: 1px solid #4b5563;
        color: #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        font-family: 'Fira Code', monospace;
        white-space: pre-wrap;
        height: 20rem;
        overflow-y: auto;
    }
    .highlight {
        background-color: rgba(250, 204, 21, 0.3);
        border-radius: 0.2rem;
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div className="aurora-background"></div>
      <div className="container">
        <header className="header">
          <h1>Dev Toolkit</h1>
          <p>A suite of tools for developers.</p>
        </header>

        <nav style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #374151', marginBottom: '2rem' }}>
            <button style={navButtonStyle('beautifier')} onClick={() => setActiveTool('beautifier')}>JSON Beautifier</button>
            <button style={navButtonStyle('compare')} onClick={() => setActiveTool('compare')}>JSON Compare</button>
            <button style={navButtonStyle('api_flow')} onClick={() => setActiveTool('api_flow')}>API Flow Visualizer</button>
        </nav>

        {activeTool === 'beautifier' && <JsonBeautifier />}
        {activeTool === 'compare' && <JsonCompare />}
        {activeTool === 'api_flow' && <ApiFlowVisualizer />}
        
      </div>
    </div>
  );
}