import { Link } from 'react-router-dom';
import Info from '../Info';
import Time from '../Time';

const ChatCard = () => {
  console.log();
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Local info status:
        <Info />
        <Time />
      </h4>
      <div className="pl-8   ">
        <br />
        <h4 className="mb-6   text-xl font-semibold text-black dark:text-white">
          Quick shortcut
        </h4>

        <div className="flex gap-3">
          <Link
            to="https://file.openit-edu.com/"
            className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Resources
          </Link>
          <Link
            to="https://www.bteb.gov.bd/"
            className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            BTEB
          </Link>{' '}
          <Link
            to="https://openit-edu.com/"
            className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Landing page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
