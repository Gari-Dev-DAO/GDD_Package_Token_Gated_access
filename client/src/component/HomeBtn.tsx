import { useNavigate } from 'react-router-dom';

const HomeBtn = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }
  return (
    <div >
      <button
        onClick={handleClick}
        
      >
        Back To Home
      </button>
    </div>
  );
};

export default HomeBtn;
