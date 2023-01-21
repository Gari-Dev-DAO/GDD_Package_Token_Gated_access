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
          <div >
            <div >
              <h3 >{address}</h3>
              <p >You could see all the content published by the Author.</p>
            </div>
          </div>
            <div >
              <div >
                <div >
                  <div >
                    <label htmlFor="content-type" >
                      Content Type
                    </label>
                    <select
                      id="content-type"
                      name="content-type"
                      // autoComplete="country-name"                    
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
                        <label htmlFor="about">
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
    </>
  );
};

export default SubContent;
