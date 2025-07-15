// DataTableToolbar.jsx
// This component renders the top toolbar for the data table, including the search bar and add button.
import React from "react";
import SearchBar from "./SearchBar";

export default function DataTableToolbar({
  searchTerm,
  setSearchTerm,
  columns,
  data,
  meta,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 justify-between mb-4 p-4">
      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="جستجو در جدول..."
          data={data || []}
          searchFields={columns.map((col) => col.accessorKey).filter(Boolean)}
        />
      </div>
      {/* Add button */}
      <div className="flex gap-2">{meta.addButton}</div>
    </div>
  );
}
