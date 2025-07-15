import Layout from "@/layouts/Layout";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "@/components/Table/GenericTable";
import { companiesFormFields } from "./companiesFormFields";
import { companiesColumns } from "./companiesColumns";
import {
  createCompany,
  deleteCompany,
  getApiCompanies,
  updateCompany,
} from "@/services/apiCompanies";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const companiesPage = () => {
  const queryClient = useQueryClient();
  const modalProps = useTableModalForm();
  // Fetch companies from the Supabase database
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: getApiCompanies,
  });

  //function to handle add/edit
  // this function will be called when the form is submitted
  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createCompany(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateCompany(formData.id, formData);
      }
      if (error) {
        toast.error(
          "خطا: " + (error.message || error.details || "مشکلی پیش آمد!"),
          { duration: 5000 }
        );
        return;
      }
      toast.success("همه چی اوکی بود و با موفقیت انجام شد!", {
        duration: 5000,
      });
      modalProps.handleClose();
      queryClient.invalidateQueries(["company"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const error = await deleteCompany(id);
      if (error) throw error;
      // Refresh the table
      queryClient.invalidateQueries(["company"]);
    } catch (err) {
      console.error("error on deleting company: ", err.message);
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
            columns={companiesColumns}
            data={data}
            formFields={companiesFormFields}
            modalProps={modalProps}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        )}
      </div>
    </Layout>
  );
};

export default companiesPage;
