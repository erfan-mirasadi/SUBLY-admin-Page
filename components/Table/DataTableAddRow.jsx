// DataTableAddRow.jsx
// This component renders the add row at the end of the table for nested/expandable tables.
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

export default function DataTableAddRow({ columns, expandableRows, onAddRow }) {
  return (
    <TableRow>
      {/* If expandableRows is enabled, add an empty cell */}
      {expandableRows && <TableCell />}
      {columns.map((column, idx) =>
        column.accessorKey === "actions" ? (
          <TableCell
            key={column.accessorKey || column.id}
            className="px-4 py-3 text-sm"
          >
            <button
              onClick={onAddRow}
              className="w-full flex items-center justify-center gap-2 text-cyan-900 font-bold bg-cyan-100 hover:bg-cyan-200 border-2 border-cyan-400 rounded-lg py-2 px-3 transition-all"
            >
              <span>افزودن</span> <span className="text-lg">➕</span>
            </button>
          </TableCell>
        ) : (
          <TableCell key={column.accessorKey || column.id} />
        )
      )}
    </TableRow>
  );
}
