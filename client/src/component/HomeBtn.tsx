import { useNavigate } from 'react-router-dom';

const HomeBtn = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }
  return (
    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
      <button
        onClick={handleClick}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back To Home
      </button>
    </div>
  );
};

export default HomeBtn;
