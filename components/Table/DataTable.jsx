import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import DataTableToolbar from "./DataTableToolbar";
import DataTableBody from "./DataTableBody";
import DataTableAddRow from "./DataTableAddRow";
import DataTablePagination from "./DataTablePagination";

// DataTable: Main data table component with state and composition
export default function DataTable({
  columns,
  data,
  meta = {},
  hideSearchBar = false,
  expandableRows = false,
  renderExpandedRow,
  showAddRow = false,
  onAddRow,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // Responsive: set itemsPerPage based on device size
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    // If window is defined (client-side)
    if (typeof window !== "undefined") {
      const updateItemsPerPage = () => {
        // Use 4 rows per page on small devices (width < 640px)
        if (window.innerWidth < 1040) {
          setItemsPerPage(6);
        } else {
          setItemsPerPage(8);
        }
      };
      updateItemsPerPage();
      window.addEventListener("resize", updateItemsPerPage);
      return () => window.removeEventListener("resize", updateItemsPerPage);
    }
  }, []);

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    if (!searchTerm) return data;
    return data.filter((item) =>
      columns.some((column) => {
        const value = item[column.accessorKey];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      {/* Top toolbar */}
      {!hideSearchBar && (
        <DataTableToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          columns={columns}
          data={data}
          meta={meta}
        />
      )}
      {/* Table - responsive font and row size for small devices */}
      <div className="flex-1 w-full overflow-hidden">
        <div className="w-full h-full border-2 border-teal-500/30 rounded-xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-teal-900/10 to-teal-800/5 flex flex-col">
          <div className="flex-1 overflow-y-auto max-h-[70vh] md:max-h-[78vh]">
            <Table className="w-full min-w-full text-teal-50/90 text-xs sm:text-sm">
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-teal-900/30 hover:bg-teal-900/40 transition-colors">
                  {/* Responsive header cell size */}
                  {expandableRows && (
                    <TableHead className="w-8 px-1 py-2 sm:px-4 sm:py-3" />
                  )}
                  {columns.map((column) => (
                    <TableHead
                      key={column.accessorKey || column.id}
                      className="text-xs sm:text-sm font-semibold text-teal-100 px-1 py-2 sm:px-4 sm:py-3 whitespace-nowrap"
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              {/* Table body - responsive handled in DataTableBody */}
              <DataTableBody
                paginatedData={paginatedData}
                columns={columns}
                expandableRows={expandableRows}
                renderExpandedRow={renderExpandedRow}
                searchTerm={searchTerm}
                showAddRow={false}
                onAddRow={null}
                // Responsive: pass a prop if needed
              />
              {/* Add row (for nested tables) */}
              {showAddRow && typeof onAddRow === "function" && (
                <TableBody>
                  <DataTableAddRow
                    columns={columns}
                    expandableRows={expandableRows}
                    onAddRow={onAddRow}
                  />
                </TableBody>
              )}
            </Table>
          </div>
          {/* Pagination */}
          <DataTablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
