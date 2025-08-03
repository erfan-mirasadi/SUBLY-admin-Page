import Layout from "@/layouts/Layout";
import GenericTable from "@/components/Table/GenericTable";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { orderColumns } from "./orderColumns";
import { orderFormFields } from "./orderFormFields";
import { orderItemsColumns } from "./orderItemsColumns";
import { orderItemsFormFields } from "./orderItemsFormFields";
import { Spinner } from "@/components/ui/spinner";
import { getApiUsers } from "@/services/apiUsers";
import { getApiProducts } from "@/services/apiProducts";
import { getApiProductPlans } from "@/services/apiProductPlans";
import { getApiProductEntry } from "@/services/apiProductEntry";
import {
  createOrder,
  deleteOrder,
  getApiOrders,
  updateOrder,
} from "@/services/apiOrders";
import {
  createOrderItem,
  deleteOrderItem,
  updateOrderItem,
} from "@/services/apiOrderItems";
import { toast } from "sonner";
import React from "react";

function OrdersPage() {
  const queryClient = new QueryClient();
  const modalProps = useTableModalForm();
  const orderItemsModalProps = useTableModalForm();

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
  const { data: productPlans = [] } = useQuery({
    queryKey: ["productPlans"],
    queryFn: getApiProductPlans,
  });
  const { data: productEntries = [] } = useQuery({
    queryKey: ["productEntries"],
    queryFn: getApiProductEntry,
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
      toast.error("خطا در حذف سفارش: " + (err.message || ""));
    }
  };

  // Order Items handlers
  const handleOrderItemSubmit = async (formData) => {
    try {
      let error;
      if (orderItemsModalProps.modalMode === "add") {
        error = await createOrderItem(formData);
      } else if (orderItemsModalProps.modalMode === "edit") {
        error = await updateOrderItem(formData.id, formData);
      }
      if (error) {
        toast.error(
          "خطا: " + (error.message || error.details || "مشکلی پیش آمد!")
        );
        return;
      }
      toast.success("عملیات با موفقیت انجام شد!");
      orderItemsModalProps.handleClose();
      queryClient.invalidateQueries(["order"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"));
    }
  };

  const handleOrderItemDelete = async (id) => {
    try {
      const error = await deleteOrderItem(id);
      if (error) throw error;
      queryClient.invalidateQueries(["order"]);
      toast.success("آیتم سفارش با موفقیت حذف شد!");
    } catch (err) {
      toast.error("خطا در حذف آیتم سفارش: " + (err.message || ""));
    }
  };

  // Render order items table
  const renderOrderItemsTable = (order) => {
    // Enrich order items with product, product entry, and product plan data
    const enrichedOrderItems = (order.order_items || []).map((item) => {
      const productPlan = productPlans.find((plan) => plan.id === item.plan_id);
      const productEntry = productEntries.find(
        (entry) => entry.id === productPlan?.product_entry_id
      );
      const product = products.find(
        (prod) => prod.id === productEntry?.product_id
      );

      return {
        ...item,
        product_title: product?.title || "محصول نامشخص",
        product_plan_model: productEntry?.model || "مدل نامشخص",
        product_plan_length: productPlan?.title || "مدت زمان نامشخص",
      };
    });

    return (
      <div className="p-2 max-h-80 overflow-y-auto">
        <GenericTable
          columns={orderItemsColumns}
          data={enrichedOrderItems}
          formFields={orderItemsFormFields}
          modalProps={orderItemsModalProps}
          onSubmit={(formData) =>
            handleOrderItemSubmit({ ...formData, order_id: order.id })
          }
          onDelete={handleOrderItemDelete}
          isLoading={false}
          hideSearchBar={true}
          showAddRow={true}
          onAddRow={() =>
            orderItemsModalProps.handleAdd({ order_id: order.id })
          }
        />
      </div>
    );
  };
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.title,
  }));
  // Enriching order data with product and user names
  const enrichedData = (data || []).map((item) => {
    // const matchedProduct = products.find((p) => p.id === item.product_id);
    const matchedUser = users.find((u) => u.id === item.user_id);

    return {
      ...item,
      user_name: matchedUser?.name || matchedUser?.phone || "کاربر نامشخص",
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
            expandableRows={true}
            renderExpandedRow={renderOrderItemsTable}
          />
        )}
      </div>
    </Layout>
  );
}

export default OrdersPage;
