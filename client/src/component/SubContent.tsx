import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SubContent = () => {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const { value } = state;
  useEffect(() => {
    const addressR = sessionStorage.getItem('usrAddr') as string;
    setData(value.data);
    setAddress(addressR);
  }, []);
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 mx-4 my-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{address}</h3>
              <p className="mt-1 text-sm text-gray-600">You could see all the content published by the Author.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="content-type" className="block text-sm font-medium text-gray-700">
                      Content Type
                    </label>
                    <select
                      id="content-type"
                      name="content-type"
                      // autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Text</option>
                      <option>Picture</option>
                      <option>Video</option>
                    </select>
                  </div>
                </div>

                {data.length > 0 ? (
                  data.map((dataR, indexx) => {
                    return (
                      <div key={indexx}>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          {dataR}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>Nothing to Show</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubContent;
