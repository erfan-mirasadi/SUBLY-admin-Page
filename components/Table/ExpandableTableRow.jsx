import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableTableRow({
  row,
  columns,
  children,
  colSpan,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-teal-900/20 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <TableCell className="w-8 text-center">
          <span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.accessorKey || column.id}
            className="px-4 py-3 text-sm"
          >
            {column.cell
              ? column.cell({ row: { original: row } })
              : row[column.accessorKey]}
          </TableCell>
        ))}
      </TableRow>
      {open && (
        <TableRow className="bg-teal-900/10">
          <TableCell colSpan={colSpan} className="p-0 border-none">
            {children}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
