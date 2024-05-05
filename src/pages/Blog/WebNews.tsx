import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosPublic';

const WebNews = () => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const { data: notices = [], refetch } = useQuery({
    queryKey: ['notice'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blog', {});
      if (res.data) {
        setLoading(false);
      }
      return res.data;
    },
  });
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success...',
      text: 'Publish success',
    });
  };
  const handleDeleteNoticce = (notice) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blog/${notice?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, image, notice } = e.target.elements;

    const noticeTitle = title.value;
    const imageUrl = image.value;
    const noticeDetails = notice.value;

    const postDate = new Date().toLocaleDateString();

    const formData = {
      noticeTitle: noticeTitle,
      imageUrl: imageUrl,
      postDate: postDate,
      noticeDetails: noticeDetails,
    };

    axiosSecure.post('/blog', formData).then(() => {
      refetch();
      showSuccessAlert();
    });
  };
  // if (loading === true) {
  //   return <>Loading..</>;
  // }
  return (
    <div className="text-black">
      <div className="card  rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9   ">
        <div className=" mb-6   font-semibold text-black dark:text-white">
          <h4>Total Publish news : {notices?.length}</h4>
        </div>

        <hr className="border-b-1 border-purple-400" />
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4">
            <input
              type="text"
              name="title"
              className=" w-1/2 mb-2 bg-slate-100 dark:bg-slate-800 dark:text-white p-2 rounded-md"
              placeholder="Title"
            />
            <input
              type="text"
              name="image"
              placeholder="Entar image url"
              className="w-1/2 mb-2 bg-slate-100 dark:bg-slate-800 dark:text-white p-2 rounded-md"
            />
          </div>

          <textarea
            type="text"
            name="notice"
            rows="5"
            cols="50"
            className=" w-full mb-2 bg-slate-100 dark:bg-slate-800 dark:text-white  p-2 rounded-md"
            placeholder="notice "
          />

          <br />
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Publish news
            </button>
          </div>
        </form>
      </div>
      <div className="card rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="overflow-x-auto">
          <div className=" ">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              News
            </h4>

            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5  mb-6 text-xl font-semibold text-black dark:text-white">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    no
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Image
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    title
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Notice Date
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5"></div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Action
                  </h5>
                </div>
              </div>

              {notices.map((data, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${
                    key === notices.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={key}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="hidden text-black dark:text-white sm:block">
                      {key + 1}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {data.noticeTitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {data.noticeTitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{data.postDate}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">
                      {data.noticeDate}
                    </p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">
                      <button
                        onClick={() => handleDeleteNoticce(data)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTrash />
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebNews;
