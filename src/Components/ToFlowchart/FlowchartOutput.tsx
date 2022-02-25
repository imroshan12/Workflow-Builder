import { useState, DragEvent } from 'react';
import ReactFlow, {
  Elements,
  OnLoadParams,
  ConnectionLineType,
} from 'react-flow-renderer';
import Card from '../Cards/Card';

interface Props {
  flowchartInJson: any;
}

let id = 0;
const getId = () => `node_${id++}`;

const FlowchartOutput = ({ flowchartInJson }: Props) => {
  console.log(typeof flowchartInJson);
  const elements: Elements = [];
  const position = {
    x: 150,
    y: 5,
  };
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  let i = 1;
  const modules = flowchartInJson.modules;
  const conditions = flowchartInJson.conditions;
  let thisModule = modules.find((module: any) => module.id === '1');

  // const isCard = thisModule.nextStep ? true : false;
  let newNode = {
    id: thisModule.id,
    type: thisModule.id === '1' ? 'input' : 'default',
    data: {
      label: <Card isCard={true} moduleName={thisModule.type} endFlowType='' />,
    },
    position: {
      x: position.x,
      y: position.y + i * 100,
    },
  };
  i++;
  elements.push(newNode);

  const buildFlow = (thisModule: any) => {
    let elementWithThisModule: any = elements.find(
      (element) => element.id === thisModule.id
    );
    if (thisModule.nextStep.includes('condition')) {
      // console.log(thisModule.nextStep);
      let condition = conditions.find(
        (condition: any) => condition.id === thisModule.nextStep
      );
      // console.log(condition);
      if (
        condition.if !== 'autoSuccess' &&
        condition.if !== 'autoDecline' &&
        condition.if !== 'manualReview'
      ) {
        const nextModule = modules.find(
          (module: any) => module.type === condition.if
        );
        let newNode = {
          id: nextModule.id,
          type: nextModule.id === '1' ? 'input' : 'default',
          data: {
            label: (
              <Card isCard={true} moduleName={nextModule.type} endFlowType='' />
            ),
          },
          position: {
            x: elementWithThisModule.position.x,
            y: elementWithThisModule.position.y + 200,
          },
        };
        i++;
        elements.push(newNode);
        // thisModule = modules.find((module) => module.type === condition.if);
        // buildFlow(thisModule);
      } else {
        let newNode = {
          id: getId(),
          type: 'output',
          data: {
            label: (
              <Card isCard={false} endFlowType={condition.if} moduleName='' />
            ),
          },
          position: {
            x: elementWithThisModule.position.x + 132,
            y: elementWithThisModule.position.y + 200,
          },
        };
        i++;
        elements.push(newNode);
      }

      if (
        condition.else !== 'autoSuccess' &&
        condition.else !== 'autoDecline' &&
        condition.else !== 'manualReview'
      ) {
        const nextModule = modules.find(
          (module: any) => module.type === condition.else
        );
        let newNode = {
          id: nextModule.id,
          type: nextModule.id === '1' ? 'input' : 'default',
          data: {
            label: (
              <Card isCard={true} moduleName={nextModule.type} endFlowType='' />
            ),
          },
          position: {
            x: elementWithThisModule.position.x + 500,
            y: elementWithThisModule.position.y + 200,
          },
        };
        i++;
        elements.push(newNode);
        // thisModule = modules.find((module) => module.type === condition.else);
        // buildFlow(thisModule);
      } else {
        let newNode = {
          id: getId(),
          type: 'output',
          data: {
            label: (
              <Card isCard={false} endFlowType={condition.else} moduleName='' />
            ),
          },
          position: {
            x: elementWithThisModule.position.x + 500 - 170,
            y: elementWithThisModule.position.y + 200,
          },
        };
        i++;
        elements.push(newNode);
      }

      let n = elements.length;
      for (let ele = n - 2; ele < n; ele++) {
        let newEdge = {
          source: thisModule.id,
          sourceHandle: null,
          target: elements[ele].id,
          targetHandle: null,
          type: 'smoothstep',
          animated: true,
          id: `reactflow__edge-${thisModule.id}null-${elements[ele].id}null`,
        };
        elements.push(newEdge);
      }

      if (
        condition.if !== 'autoSuccess' &&
        condition.if !== 'autoDecline' &&
        condition.if !== 'manualReview'
      ) {
        thisModule = modules.find(
          (module: any) => module.type === condition.if
        );
        buildFlow(thisModule);
      }
      if (
        condition.else !== 'autoSuccess' &&
        condition.else !== 'autoDecline' &&
        condition.else !== 'manualReview'
      ) {
        thisModule = modules.find(
          (module: any) => module.type === condition.else
        );
        buildFlow(thisModule);
      }
    } else if (
      thisModule.nextStep === 'autoSuccess' ||
      thisModule.nextStep === 'autodecline' ||
      thisModule.nextStep === 'manualReview'
    ) {
      let newNode = {
        id: getId(),
        type: 'output',
        data: {
          label: (
            <Card
              isCard={false}
              endFlowType={thisModule.nextStep}
              moduleName=''
            />
          ),
        },
        position: {
          x: elementWithThisModule.position.x + 132,
          y: elementWithThisModule.position.y + 200,
        },
      };
      i++;
      elements.push(newNode);
      let newEdge = {
        source: thisModule.id,
        sourceHandle: null,
        target: newNode.id,
        targetHandle: null,
        type: 'smoothstep',
        animated: true,
        id: `reactflow__edge-${thisModule.id}null-${newNode.id}null`,
      };
      elements.push(newEdge);
    } else {
      const nextModule = modules.find(
        (module: any) => module.type === thisModule.nextStep
      );
      let newNode = {
        id: nextModule.id,
        type: nextModule.id === '1' ? 'input' : 'default',
        data: {
          label: (
            <Card isCard={true} moduleName={nextModule.type} endFlowType='' />
          ),
        },
        position: {
          x: elementWithThisModule.position.x,
          y: elementWithThisModule.position.y + 200,
        },
      };
      i++;
      elements.push(newNode);
      let newEdge = {
        source: thisModule.id,
        sourceHandle: null,
        target: newNode.id,
        targetHandle: null,
        type: 'smoothstep',
        animated: true,
        id: `reactflow__edge-${thisModule.id}null-${newNode.id}null`,
      };
      elements.push(newEdge);
      thisModule = modules.find(
        (module: any) => module.type === thisModule.nextStep
      );
      buildFlow(thisModule);
    }
  };

  buildFlow(thisModule);
  console.log(elements);

  return (
    <div className='reactflow-wrapper' style={{ height: '200vh' }}>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.SmoothStep}
        zoomOnScroll={false}
        paneMoveable={false}
        nodesDraggable={false}
        zoomOnDoubleClick={false}
      ></ReactFlow>
    </div>
  );
};

export default FlowchartOutput;
