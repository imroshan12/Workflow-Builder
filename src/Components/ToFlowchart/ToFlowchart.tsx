import { Fragment, useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import FlowchartOutput from './FlowchartOutput';
import OutlineButton from '../Buttons/OutlineButton';
import { isJSON } from '../../utils/functions';

const ToFlowchart = () => {
  const [jsonData, setJsonData] = useState('');
  const [convertData, setConvertData] = useState(false);
  useEffect(() => {
    if (!convertData) {
      setJsonData('');
    }
  }, [setJsonData, convertData]);
  return convertData === false ? (
    <div className='justify-content-center mt-5'>
      <CodeEditor
        value={jsonData}
        language='js'
        placeholder='Please enter JS code.'
        onChange={(evt) => setJsonData(evt.target.value)}
        padding={15}
        className='mt-4 mx-4'
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
      <OutlineButton
        color='success'
        setConvertData={setConvertData}
        value={true}
        data='Convert'
      />
    </div>
  ) : (
    <Fragment>
      {isJSON(jsonData) ? (
        <div>
          <OutlineButton
            color='success'
            setConvertData={setConvertData}
            value={false}
            data='Try Again'
          />
          <FlowchartOutput flowchartInJson={JSON.parse(jsonData)} />
        </div>
      ) : (
        <Fragment>
          <div className='alert alert-danger w-50 mx-4 mt-4' role='alert'>
            <h4 className='alert-heading'>Oops!</h4>
            <hr />
            <p>Not a valid JSON</p>
          </div>
          <OutlineButton
            color='success'
            setConvertData={setConvertData}
            value={false}
            data='Try Again'
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ToFlowchart;
