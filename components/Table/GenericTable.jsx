import React, { useState } from "react";
import DataTable from "./DataTable";
import GenericFormModal from "./GenericFormModal";
import TableActionsColumn from "./TableActionsColumn";
import TableDeleteDialog from "./TableDeleteDialog";
import TableAddButton from "./TableAddButton";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// GenericTable: Main generic table component with modal and delete dialog
export default function GenericTable({
  columns,
  data,
  formFields,
  modalProps,
  onSubmit,
  onDelete,
  isLoading,
  categoryOptions,
  companyOptions,
  productOptions,
  expandableRows,
  renderExpandedRow,
  hideSearchBar,
  addButton,
  showAddRow,
  onAddRow,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Handle delete with confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(deleteId);
      toast.success("حذف با موفقیت انجام شد");
      setConfirmOpen(false);
    } catch (err) {
      toast.error("خطا در حذف: " + (err?.message || ""));
    } finally {
      setDeleting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-[400px]">
        <Spinner size="large" className="mx-auto" />
      </div>
    );
  }

  // Add actions column using TableActionsColumn
  const allColumns = [
    ...columns,
    {
      accessorKey: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <TableActionsColumn
          row={row}
          modalProps={modalProps}
          handleDeleteClick={handleDeleteClick}
          deleting={deleting}
          deleteId={deleteId}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      {/* Data table with all columns and add button */}
      <DataTable
        columns={allColumns}
        data={data}
        meta={{
          addButton:
            addButton !== undefined ? (
              addButton
            ) : (
              <TableAddButton
                onClick={() =>
                  modalProps.handleAdd({ created_at: new Date().toISOString() })
                }
              />
            ),
        }}
        expandableRows={
          typeof expandableRows !== "undefined" ? expandableRows : false
        }
        renderExpandedRow={renderExpandedRow}
        hideSearchBar={hideSearchBar}
        showAddRow={showAddRow}
        onAddRow={onAddRow}
      />

      {/* Add/Edit Modal */}
      <GenericFormModal
        open={modalProps.modalOpen}
        mode={modalProps.modalMode}
        initialValues={modalProps.selectedItem}
        onClose={modalProps.handleClose}
        onSubmit={onSubmit}
        formFields={formFields}
        categoryOptions={categoryOptions || []}
        companyOptions={companyOptions || []}
        productOptions={productOptions || []}
      />

      {/* Delete Confirmation Dialog */}
      <TableDeleteDialog
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        handleConfirmDelete={handleConfirmDelete}
        deleting={deleting}
      />
    </div>
  );
}
