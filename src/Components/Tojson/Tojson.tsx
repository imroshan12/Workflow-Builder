import { Elements, FlowElement } from 'react-flow-renderer';

interface Props {
  elements: Elements;
}

interface IJsonData {
  modules: {
    id: string;
    type: string;
    nextStep: string;
  }[];
  conditions: {
    id: string;
    rules: [];
    if: string;
    else: string;
  }[];
}

const Tojson = ({ elements }: Props) => {
  let jsonData: IJsonData = {
    modules: [],
    conditions: [],
  };

  let thisId = '1';
  let thisElement = elements[0];
  function abc(thisId: string, thisElement: FlowElement) {
    const sourceEdges = elements.filter(
      (element: any) => element.source === thisId
    );
    if (sourceEdges.length === 0) {
      return;
    }
    const targets: any = elements.filter((element: any) => {
      return sourceEdges.some((edge: any) => edge.target === element.id);
    });
    //   console.log(typeof targets[0].data.label.props.title);
    if (targets.length === 1) {
      jsonData.modules.push({
        id: thisElement.id,
        type: thisElement.data.label.props.children.props.children[1].props
          .children,
        nextStep:
          targets[0].data.label.props.title === 'module'
            ? targets[0].data.label.props.children.props.children[1].props
                .children
            : targets[0].data.label.props.title,
      });
      abc(targets[0].id, targets[0]);
    } else {
      const targetIndex1 =
        targets[0].position.x < targets[1].position.x ? 0 : 1;
      const targetIndex2 = 1 - targetIndex1;
      const target1 = targets[targetIndex1];
      const target2 = targets[targetIndex2];
      jsonData.modules.push({
        id: thisElement.id,
        type: thisElement.data.label.props.children.props.children[1].props
          .children,
        nextStep: thisElement.id + '_condition',
      });
      jsonData.conditions.push({
        id: thisElement.id + '_condition',
        rules: [],
        if:
          target1.data.label.props.title === 'module'
            ? target1.data.label.props.children.props.children[1].props.children
            : target1.data.label.props.title,
        else:
          target2.data.label.props.title === 'module'
            ? target2.data.label.props.children.props.children[1].props.children
            : target2.data.label.props.title,
      });
      abc(target1.id, target1);
      abc(target2.id, target2);
    }
  }
  abc(thisId, thisElement);

  console.log(jsonData);
  return <div>{/* <pre>{JSON.stringify(jsonData)}</pre> */}</div>;
};

export default Tojson;
