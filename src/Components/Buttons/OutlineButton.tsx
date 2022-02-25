interface Props {
  color: string;
  setConvertData: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  data: string;
}

const OutlineButton = ({ color, setConvertData, value, data }: Props) => {
  return (
    <button
      className='btn btn-outline-success mt-4 mx-4'
      onClick={(event) => {
        event.preventDefault();
        setConvertData(value);
      }}
    >
      {data}
    </button>
  );
};

export default OutlineButton;
