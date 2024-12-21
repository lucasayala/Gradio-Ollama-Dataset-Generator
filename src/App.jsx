import React, { useState } from 'react';
    import gradio from '@gradio/client';

    function App() {
      const [model, setModel] = useState('');
      const [numRecords, setNumRecords] = useState(10);
      const [keyword, setKeyword] = useState('');
      const [dataset, setDataset] = useState([]);

      const handleGenerate = async () => {
        // Placeholder for dataset generation logic
        const generatedData = [];
        for (let i = 0; i < numRecords; i++) {
          const record = { text: `Generated record ${i + 1}` };
          if (keyword) {
            record.text += ` with keyword: ${keyword}`;
          }
          generatedData.push(record);
        }
        setDataset(generatedData);
      };

      const handleSave = () => {
        // Convert dataset to JSONL format
        const jsonlContent = dataset.map(item => JSON.stringify(item)).join('\n');
        const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dataset.jsonl`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      return (
        <div>
          <h1>Gradio Ollama Dataset Generator</h1>
          <label>
            Model:
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">Select a model</option>
              {/* Placeholder for model options */}
              <option value="model1">Model 1</option>
              <option value="model2">Model 2</option>
            </select>
          </label>
          <br />
          <label>
            Number of Records:
            <input
              type="number"
              value={numRecords}
              onChange={(e) => setNumRecords(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Keyword (optional):
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleGenerate}>Generate Dataset</button>
          {dataset.length > 0 && (
            <>
              <h2>Generated Dataset:</h2>
              <pre>{JSON.stringify(dataset, null, 2)}</pre>
              <button onClick={handleSave}>Save Dataset</button>
            </>
          )}
        </div>
      );
    }

    export default App;
