import Layout from "@/layouts/Layout";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "@/components/Table/GenericTable";
import { couponColumns } from "./couponColumns";
import { couponFormFields } from "./couponFormFields";
import {
  createCoupon,
  deleteCoupon,
  getApiCoupons,
  updateCoupon,
} from "@/services/apiCoupon";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { getApiUsers } from "@/services/apiUsers";
import { getApiProducts } from "@/services/apiProducts";

function CouponPage() {
  const queryClient = useQueryClient();
  const modalProps = useTableModalForm();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: getApiCoupons,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getApiProducts,
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getApiUsers,
  });

  // تبدیل محصولات به فرمت مناسب برای سلکت باکس
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
      user_phone_number: matchedUser?.phone_number || "کاربر نامشخص",
    };
  });

  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createCoupon(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateCoupon(formData.id, formData);
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
      queryClient.invalidateQueries(["coupons"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const error = await deleteCoupon(id);
      if (error) throw error;
      queryClient.invalidateQueries(["Coupons"]);
    } catch (err) {
      console.error("error on deleting Coupon", err.message);
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
            columns={couponColumns}
            data={enrichedData}
            formFields={couponFormFields}
            modalProps={modalProps}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isLoading={isLoading}
            productOptions={productOptions}
          />
        )}
      </div>
    </Layout>
  );
}

export default CouponPage;
