import React from 'react';
import TableThree from '../../../components/Tables/TableThree';

import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AllUserList from './AllUserList';


const AllUser = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="All User panel" />

        <div className="flex flex-col gap-10">
       
          <AllUserList/>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AllUser;
