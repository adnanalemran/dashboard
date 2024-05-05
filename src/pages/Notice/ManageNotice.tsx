import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import WebNotice from './WebNotice';

const ManageNotice = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Notice" />

        <WebNotice />
      </DefaultLayout>
    </div>
  );
};

export default ManageNotice;
