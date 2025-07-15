// TableActionsColumn.jsx
// This component renders the actions column for each row in the table (edit and delete buttons).
import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function TableActionsColumn({
  row,
  modalProps,
  handleDeleteClick,
  deleting,
  deleteId,
}) {
  const rowData = row?.original || row;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
      {/* Edit button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => modalProps.handleEdit(rowData)}
        className="cursor-pointer text-gray-900 bg-amber-50 border-2 border-gray-500 backdrop-blur-lg hover:bg-amber-200 shadow-lg hover:scale-95 duration-350 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2"
      >
        📝 Edit
      </Button>
      {/* Delete button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDeleteClick(rowData?.id)}
        disabled={deleting && deleteId === (row?.original?.id || row?.id)}
        className="cursor-pointer text-white bg-red-800 border-2 border-red-950 backdrop-blur-lg hover:bg-red-600 shadow-xl hover:scale-95 duration-350 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2"
      >
        {deleting && deleteId === (row?.original?.id || row?.id) ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner size="small" />
          </span>
        ) : (
          "حذف"
        )}
      </Button>
    </div>
  );
}
