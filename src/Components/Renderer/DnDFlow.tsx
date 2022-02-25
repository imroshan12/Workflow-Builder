import { useState, useRef, useEffect, DragEvent, MouseEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Connection,
  Edge,
  Elements,
  OnLoadParams,
  Node,
  FlowElement,
  ConnectionLineType,
} from 'react-flow-renderer';
import Sidebar from './Sidebar';

import './dndflow.css';
import './updatenode.css';
import Tojson from '../Tojson/Tojson';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <div className='card border-success mb-3' style={{ width: '8rem' }}>
          <p className='card-text align-middle'>
            <i className=''></i>
            <span>Start</span>
          </p>
        </div>
      ),
    },
    position: { x: 150, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);
  const [nodeBody, setNodeBody] = useState('');
  const [nodeData, setNodeData] = useState<FlowElement | null>(null);
  const [isCard, setIsCard] = useState(true);
  const [iconName, setIconName] = useState('');
  const [endFlowType, setEndFlowType] = useState('');
  const [color, setColor] = useState('');
  const [coordinate, setCoordinate] = useState({ x: 70, y: 5 });
  const onConnect = (params: Connection | Edge) => {
    const connections = elements.filter(
      (element: any) => element.source === params.source
    );
    if (connections.length < 2) {
      setElements((els) =>
        addEdge({ ...params, type: 'smoothstep', animated: true }, els)
      );
    }
  };
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  useEffect(() => {
    if (nodeData) {
      setElements((els) =>
        els.map((el) => {
          if (el.id === nodeData.id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              label: (
                <div
                  className='card border-success mb-3'
                  style={{ width: '18rem' }}
                  title='module'
                >
                  <p className='card-text'>
                    <i className='fa-solid fa-id-card text-primary'></i>
                    <span>{nodeBody}</span>
                  </p>
                </div>
              ),
            };
          }
          return el;
        })
      );
    }
  }, [nodeData, nodeBody, setElements]);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      let xPos = coordinate.x;
      let yPos = coordinate.y;
      if (
        elements.find(
          (element: any) =>
            element.position &&
            (element.position.x === xPos ||
              element.position.x === xPos + 132) &&
            element.position.y === yPos + 200
        )
      ) {
        xPos = xPos + 500;
        if (!isCard) {
          xPos = xPos - 280;
        }
      }
      if (!isCard) {
        xPos = xPos + 132;
      }
      const position = reactFlowInstance.project({
        x: xPos,
        y: yPos + 200,
      });
      // yPos = position.y;
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: isCard ? (
            <div
              className='card border-success mb-3 module'
              style={{ width: '18rem' }}
              title='module'
            >
              <p className='card-text'>
                <i className='fa-solid fa-id-card  text-primary'></i>
                <span>Verify</span>
              </p>
            </div>
          ) : (
            <div className='flowEnd' title={endFlowType}>
              <i
                className={`fa-solid ${iconName} fa-2x text-${color} flowEnd`}
              ></i>
            </div>
          ),
        },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  const onElementClick = (event: MouseEvent, node: Node) => {
    if (node.data.label.props.children.type !== 'i' && node.id !== '1') {
      setNodeData(node);
      // setNodeName(node.data.label.props.children[0].props.children);
      setNodeBody(
        node.data.label.props.children.props.children[1].props.children
      );
    }
    if (node.id === '1') {
      setCoordinate({ x: node.position.x - 80, y: node.position.y });
    } else {
      setCoordinate({ x: node.position.x, y: node.position.y });
    }
  };

  console.log(elements);

  return (
    <div className='dndflow'>
      <ReactFlowProvider>
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <Controls />
          <ReactFlow
            elements={elements}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            connectionLineType={ConnectionLineType.SmoothStep}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            paneMoveable={false}
            // nodesDraggable={false}
            // panOnScroll={true}
          >
            <div className='updatenode__controls'>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label'
                >
                  Body
                </label>
                <textarea
                  value={nodeBody}
                  onChange={(evt) => setNodeBody(evt.target.value)}
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows={4}
                ></textarea>
              </div>
            </div>
          </ReactFlow>
        </div>
        <Sidebar
          setColor={setColor}
          setIsCard={setIsCard}
          setIconName={setIconName}
          setEndFlowType={setEndFlowType}
        />
      </ReactFlowProvider>
      <Tojson elements={elements} />
    </div>
  );
};

export default DnDFlow;
