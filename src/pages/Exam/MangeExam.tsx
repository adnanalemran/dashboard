import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StudentList from '../UserPage/StudentList/StudentList';
import StudentExam from './StudentExam';

const MangeExam = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Exam post" />

        <StudentExam/>
      </DefaultLayout>
    </div>
  );
};

export default MangeExam;
