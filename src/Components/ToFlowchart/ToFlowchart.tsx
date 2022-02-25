import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import FlowchartOutput from './FlowchartOutput';

const ToFlowchart = () => {
  const [jsonData, setJsonData] = useState('');
  const [convertData, setConvertData] = useState(false);
  return convertData === false ? (
    <div className='justify-content-center mt-5'>
      <CodeEditor
        value={jsonData}
        language='js'
        placeholder='Please enter JS code.'
        onChange={(evt) => setJsonData(evt.target.value)}
        padding={15}
        style={{
          fontSize: 16,
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          width: '800px',
          maxHeight: '500px',
          overflowY: 'scroll',
        }}
      />
      <button
        className='btn btn-outline-success mt-3'
        onClick={(event) => {
          event.preventDefault();
          setConvertData(true);
        }}
      >
        Convert
      </button>
    </div>
  ) : (
    <div>
      <FlowchartOutput flowchartInJson={JSON.parse(jsonData)} />
      <button
        className='btn btn-outline-success mt-3'
        onClick={(event) => {
          event.preventDefault();
          setConvertData(false);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ToFlowchart;
