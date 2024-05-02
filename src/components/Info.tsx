import { useEffect, useState } from 'react';

const Info = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((error) => {
        console.error('Error fetching database status:', error.message);
        setStatus('! DB not connected , please contact: 01917019619');
      });
  }, []);
  return (
    <div>
      <div className=" mt-16">
        <p className="">
            <marquee >
                 {status}
            </marquee>
           </p>
      </div>
      <hr className="py-4" />
    </div>
  );
};

export default Info;
