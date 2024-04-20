import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosPublic();
  const { data: isStudent, isPending: isStudentLoading } = useQuery({
    queryKey: [user?.email, "isStudent"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/student/${user.email}`);

      return res.data?.student;
    },
  });
  return [isStudent, isStudentLoading];
};

export default useAdmin;
