import Layout from "@/layouts/Layout";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "@/components/Table/GenericTable";
import { currencyFormFields } from "./currencyFormFields";
import { currencyColumns } from "./currencyColumns";
import {
  createCurrencies,
  deleteCurrencies,
  getApiCurrencies,
  updateCurrencies,
} from "@/services/apiCurrencies";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const CurrencyPage = () => {
  const queryClient = useQueryClient();
  const modalProps = useTableModalForm();
  // Fetch companies from the Supabase database
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Currencies"],
    queryFn: getApiCurrencies,
  });

  //function to handle add/edit
  // this function will be called when the form is submitted
  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createCurrencies(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateCurrencies(formData.id, formData);
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
      queryClient.invalidateQueries(["Currencies"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const error = await deleteCurrencies(id);
      if (error) throw error;
      // Refresh the table
      queryClient.invalidateQueries(["Currencies"]);
    } catch (err) {
      console.error("error on deleting Currencies: ", err.message);
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
            columns={currencyColumns}
            data={data}
            formFields={currencyFormFields}
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

export default CurrencyPage;
