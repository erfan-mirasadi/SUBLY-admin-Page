import Layout from "@/layouts/Layout";
import GenericTable from "@/components/Table/GenericTable";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { orderColumns } from "./orderColumns";
import { orderFormFields } from "./orderFormFields";
import { Spinner } from "@/components/ui/spinner";
import { getApiUsers } from "@/services/apiUsers";
import { getApiProducts } from "@/services/apiProducts";
import {
  createOrder,
  deleteOrder,
  getApiOrders,
  updateOrder,
} from "@/services/apiOrders";
import { toast } from "sonner";

function OrdersPage() {
  const queryClient = new QueryClient();
  const modalProps = useTableModalForm();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order"],
    queryFn: getApiOrders,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getApiProducts,
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getApiUsers,
  });

  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createOrder(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateOrder(formData.id, formData);
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
      QueryClient.invalidateQueries(["order"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const error = await deleteOrder(id);
      if (error) throw error;
      queryClient.invalidateQueries(["order"]);
    } catch (err) {
      console.error("error on deleting Coupon", err.message);
    }
  };
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.title,
  }));
  // Enriching order data with product and user names
  const enrichedData = (data || []).map((item) => {
    const matchedProduct = products.find((p) => p.id === item.product_id);
    const matchedUser = users.find((u) => u.id === item.user_id);

    return {
      ...item,
      product_title: matchedProduct?.title || "محصول نامشخص",
      unit_price: matchedProduct?.price || "قیمت محصول نامشخص",
      user_name: matchedUser?.name || "کاربر نامشخص",
    };
  });

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
            columns={orderColumns}
            data={enrichedData}
            formFields={orderFormFields}
            modalProps={modalProps}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onDelete={handleDelete}
            productOptions={productOptions}
          />
        )}
      </div>
    </Layout>
  );
}

export default OrdersPage;
