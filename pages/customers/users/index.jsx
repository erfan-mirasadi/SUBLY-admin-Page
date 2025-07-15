import Layout from "@/layouts/Layout";
import GenericTable from "@/components/Table/GenericTable";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { userColumns } from "./userColumns";
import { userFormFields } from "./userFormFields";
import {
  getApiUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/apiUsers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

function UsersPage() {
  const queryClient = useQueryClient();
  const modalProps = useTableModalForm();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getApiUsers,
  });

  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createUser(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateUser(formData.id, formData);
      }
      if (error) {
        toast.error(
          "خطا: " + (error.message || error.details || "مشکلی پیش آمد!"),
          { duration: 5000 }
        );
        return; // فقط در صورت موفقیت ادامه بده
      }
      toast.success(
        modalProps.modalMode === "add"
          ? "افزودن با موفقیت انجام شد"
          : "ویرایش با موفقیت انجام شد",
        { duration: 5000 }
      );
      modalProps.handleClose();
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const error = await deleteUser(id);
      if (error) throw error;
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      console.error("error on deleting User", err.message);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {isLoading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spinner size="large" className="mx-auto" />
          </div>
        )}
        {error && <p>خطا: {error.message}</p>}
        {!isLoading && !error && (
          <GenericTable
            columns={userColumns}
            data={data}
            formFields={userFormFields}
            modalProps={modalProps}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        )}
      </div>
    </Layout>
  );
}

export default UsersPage;
