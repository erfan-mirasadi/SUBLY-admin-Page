import Layout from "@/layouts/Layout";
import useTableModalForm from "@/components/Table/useTableModalForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import GenericTable from "@/components/Table/GenericTable";
import { productFormFields } from "./productFormFields";
import { productColumns } from "./productColumns";
import { productEntryColumns } from "./productEntryColumns";
import { productEntryFormFields } from "./productEntryFormFields";
import { productPlanColumns } from "./productPlanColumns";
import { productPlanFormFields } from "./productPlanFormFields";
import {
  createProduct,
  deleteProduct,
  getApiProducts,
  updateProduct,
} from "@/services/apiProducts";
import { toast } from "sonner";
import { getApiCategories } from "@/services/apiCategories";
import { getApiCompanies } from "@/services/apiCompanies";
import { Spinner } from "@/components/ui/spinner";
import useTableModalFormBase from "@/components/Table/useTableModalForm";
import React from "react";

// سرویس‌های فرضی برای product_entry و plans (در صورت نبود، باید بسازید)
import {
  createProductEntry,
  updateProductEntry,
  deleteProductEntry,
} from "@/services/apiProductEntry";
import {
  createProductPlan,
  updateProductPlan,
  deleteProductPlan,
} from "@/services/apiProductPlans";

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const modalProps = useTableModalForm();
  // برای هر سطح مودال جدا
  const entryModalProps = useTableModalFormBase();
  const planModalProps = useTableModalFormBase();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getApiProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getApiCategories,
  });

  const { data: companies = [] } = useQuery({
    queryKey: ["company"],
    queryFn: getApiCompanies,
  });

  // enrich product data
  const enrichedData = (data || []).map((item) => {
    const category = categories.find((c) => c.id === item.category_id);
    const company = companies.find((c) => c.id === item.company_id);
    return {
      ...item,
      category_title: category?.title || "نامشخص",
      company_title: company?.title || "نامشخص",
    };
  });

  // عملیات محصول
  const handleSubmit = async (formData) => {
    try {
      let error;
      if (modalProps.modalMode === "add") {
        error = await createProduct(formData);
      } else if (modalProps.modalMode === "edit") {
        error = await updateProduct(formData.id, formData);
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
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"), {
        duration: 5000,
      });
    }
  };
  const handleDelete = async (id) => {
    try {
      const error = await deleteProduct(id);
      if (error) throw error;
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      console.error("error on deleting product", err.message);
    }
  };

  // عملیات product_entry
  const handleEntrySubmit = async (formData) => {
    try {
      let error;
      if (entryModalProps.modalMode === "add") {
        error = await createProductEntry(formData);
      } else if (entryModalProps.modalMode === "edit") {
        error = await updateProductEntry(formData.id, formData);
      }
      if (error) {
        toast.error(
          "خطا: " + (error.message || error.details || "مشکلی پیش آمد!")
        );
        return;
      }
      toast.success("عملیات با موفقیت انجام شد!");
      entryModalProps.handleClose();
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"));
    }
  };
  const handleEntryDelete = async (id) => {
    try {
      const error = await deleteProductEntry(id);
      if (error) throw error;
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      toast.error("خطا در حذف ورودی محصول: " + (err.message || ""));
    }
  };

  // عملیات plans
  const handlePlanSubmit = async (formData) => {
    try {
      let error;
      if (planModalProps.modalMode === "add") {
        error = await createProductPlan(formData);
      } else if (planModalProps.modalMode === "edit") {
        error = await updateProductPlan(formData.id, formData);
      }
      if (error) {
        toast.error(
          "خطا: " + (error.message || error.details || "مشکلی پیش آمد!")
        );
        return;
      }
      toast.success("عملیات با موفقیت انجام شد!");
      planModalProps.handleClose();
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      toast.error("خطا: " + (err.message || "یه مشکلی پیش اومد!"));
    }
  };
  const handlePlanDelete = async (id) => {
    try {
      const error = await deleteProductPlan(id);
      if (error) throw error;
      queryClient.invalidateQueries(["product"]);
    } catch (err) {
      toast.error("خطا در حذف پلن: " + (err.message || ""));
    }
  };

  // رندر جدول plans
  const renderPlansTable = (entry) => (
    <div className="p-2">
      <GenericTable
        columns={productPlanColumns}
        data={entry.product_plans || []}
        formFields={productPlanFormFields}
        modalProps={planModalProps}
        onSubmit={(formData) =>
          handlePlanSubmit({ ...formData, product_entry_id: entry.id })
        }
        onDelete={handlePlanDelete}
        isLoading={false}
        hideSearchBar={true}
        showAddRow={true}
        onAddRow={() =>
          planModalProps.handleAdd({ product_entry_id: entry.id })
        }
      />
    </div>
  );

  // رندر جدول product_entry
  const renderEntryTable = (product) => (
    <div className="p-2">
      <GenericTable
        columns={productEntryColumns}
        data={product.product_entry || []}
        formFields={productEntryFormFields}
        modalProps={entryModalProps}
        onSubmit={(formData) =>
          handleEntrySubmit({ ...formData, product_id: product.id })
        }
        onDelete={handleEntryDelete}
        isLoading={false}
        expandableRows={true}
        renderExpandedRow={renderPlansTable}
        hideSearchBar={true}
        showAddRow={true}
        onAddRow={() => entryModalProps.handleAdd({ product_id: product.id })}
      />
    </div>
  );

  return (
    <Layout>
      <div className="p-6">
        {isLoading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner size="large" className="mx-auto" />
          </div>
        )}
        {error && <p>خطا: {error.message}</p>}
        {!isLoading && !error && (
          <GenericTable
            columns={productColumns}
            data={enrichedData}
            formFields={productFormFields}
            modalProps={modalProps}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isLoading={isLoading}
            categoryOptions={categories}
            companyOptions={companies}
            expandableRows={true}
            renderExpandedRow={renderEntryTable}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
