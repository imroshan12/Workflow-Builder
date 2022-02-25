import { DragEvent } from 'react';

interface Props {
  setIsCard: React.Dispatch<React.SetStateAction<boolean>>;
  setIconName: React.Dispatch<React.SetStateAction<string>>;
  setEndFlowType: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({
  setIsCard,
  setIconName,
  setColor,
  setEndFlowType,
}: Props) => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className='card border-success mb-6 dndnode input'
        onDragStart={(event) => {
          setIsCard(true);
          return onDragStart(event, 'input');
        }}
        draggable
        style={{ maxWidth: '18rem' }}
      >
        <p className='card-text'>
          <i className='fa-solid fa-id-card text-primary'></i> Input
        </p>
      </div>
      <div
        className='card border-success mb-6 dndnode'
        onDragStart={(event) => {
          setIsCard(true);
          return onDragStart(event, 'default');
        }}
        draggable
        style={{ maxWidth: '18rem' }}
      >
        <p className='card-text'>
          <i className='fa-solid fa-id-card text-primary'></i> Default
        </p>
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) => {
          setIconName('fa-circle-xmark');
          setIsCard(false);
          setColor('danger');
          setEndFlowType('autoDecline');
          return onDragStart(event, 'output');
        }}
        draggable
      >
        <i className='fa-solid fa-circle-xmark fa-2x text-danger'></i>
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) => {
          setIconName('fa-circle-check');
          setIsCard(false);
          setColor('success');
          setEndFlowType('autoSuccess');
          return onDragStart(event, 'output');
        }}
        draggable
      >
        <i className='fa-solid fa-circle-check fa-2x text-success'></i>
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) => {
          setIsCard(false);
          setIconName('fa-circle-exclamation');
          setColor('warning');
          setEndFlowType('manualReview');
          return onDragStart(event, 'output');
        }}
        draggable
      >
        <i className='fa-solid fa-circle-exclamation fa-2x text-warning'></i>
      </div>
    </aside>
  );
};

export default Sidebar;
