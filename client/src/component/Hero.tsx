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
      <div >
        List of Creators and Their Criteria To Join Their Community
      </div>
      {pubsArr.length>0 ?pubsArr.map((singlePubData) => {
        return <AuthorDetails {...singlePubData}/>;
      }): <Link to={'/pub/form'}><p >Be the first creator.</p></Link>}
    </div>
  );
}
//todo  add the link to the Become a creator page. 
export default Hero;
