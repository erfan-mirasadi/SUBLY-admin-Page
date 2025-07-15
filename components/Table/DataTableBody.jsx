// DataTableBody.jsx
// This component renders the table body and all rows for the data table.
// It supports expandable rows and normal rows.
import React from "react";
import ExpandableTableRow from "./ExpandableTableRow";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function DataTableBody({
  paginatedData,
  columns,
  expandableRows,
  renderExpandedRow,
  searchTerm,
  showAddRow,
  onAddRow,
}) {
  return (
    <TableBody className="divide-y divide-teal-700/30">
      {paginatedData.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={columns.length + (expandableRows ? 1 : 0)}
            className="text-center py-8 sm:py-12 text-teal-200/70 text-xs sm:text-sm"
          >
            {searchTerm ? "نتیجه‌ای یافت نشد" : "داده‌ای موجود نیست"}
          </TableCell>
        </TableRow>
      ) : (
        paginatedData.map((row, index) =>
          expandableRows ? (
            <ExpandableTableRow
              key={row.id || index}
              row={row}
              columns={columns}
              colSpan={columns.length + 1}
            >
              {renderExpandedRow ? renderExpandedRow(row) : null}
            </ExpandableTableRow>
          ) : (
            // Responsive row and cell size for small devices
            <TableRow
              key={row.id || index}
              className="hover:bg-teal-800/20 transition-colors duration-200 text-xs sm:text-sm min-h-[32px] sm:min-h-[44px]"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.accessorKey || column.id}
                  className="px-1 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                >
                  {column.cell
                    ? column.cell({ row: { original: row } })
                    : row[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          )
        )
      )}
      {/* Add row (for nested tables) will be handled in a separate component */}
    </TableBody>
  );
}
