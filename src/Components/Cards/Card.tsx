interface Props {
  isCard: boolean;
  moduleName: string;
  endFlowType: string;
}

interface IMapping {
  iconName: string;
  color: string;
}

interface IOutputMapping {
  [key: string]: IMapping;
}

const outputMapping: IOutputMapping = {
  autoSuccess: {
    iconName: 'fa-circle-check',
    color: 'success',
  },
  autoDecline: {
    iconName: 'fa-circle-xmark',
    color: 'danger',
  },
  manualReview: {
    iconName: 'fa-circle-exclamation',
    color: 'warning',
  },
};

const Card = ({ isCard, moduleName, endFlowType }: Props) => {
  return isCard ? (
    <div
      className='card border-success mb-3 module'
      style={{ width: '18rem' }}
      title='module'
    >
      <p className='card-text'>
        <i className='fa-solid fa-id-card  text-primary'></i>
        <span>{moduleName}</span>
      </p>
    </div>
  ) : (
    <div className='flowEnd' title={endFlowType}>
      <i
        className={`fa-solid ${outputMapping[endFlowType].iconName} fa-2x text-${outputMapping[endFlowType].color} flowEnd`}
      ></i>
    </div>
  );
};

export default Card;
