import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

import TableTwo from '../../../components/Tables/TableTwo';
import DefaultLayout from '../../../layout/DefaultLayout';

const StudentList = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Student list" />
        <div className="flex flex-col gap-10">
          <TableTwo />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default StudentList;
