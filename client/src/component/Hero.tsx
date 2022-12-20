import { useState, useEffect } from 'react';
import AuthorDetails from './AuthorDetails';
import { getAllPubs } from '../utils/fetchAPIData';
import { PublisherResponse } from '../utils/interfaces';
import { Link } from 'react-router-dom';
function Hero() {
  const [pubsArr, setPubsArr] = useState(Array<PublisherResponse>);
  useEffect(() => {
    async function fetchData() {
      const result = await getAllPubs();
      if (result.data.length > 0) {
        console.log(result.data);
        setPubsArr(result.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="m-2 p-2 text-center font-mono font-thin border">
        List of Creators and Their Criteria To Join Their Community
      </div>
      {pubsArr.length>0 ?pubsArr.map((singlePubData) => {
        return <AuthorDetails {...singlePubData}/>;
      }): <Link to={'/pub/form'}><p className='my-8 p-2 text-center font-mono text-xl underline'>Be the first creator.</p></Link>}
    </div>
  );
}
//todo  add the link to the Become a creator page. 
export default Hero;
