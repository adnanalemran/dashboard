import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.jsx";
import useAxiosPublic from "./useAxiosPublic.jsx";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosPublic();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
