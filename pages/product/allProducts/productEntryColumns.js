export const productEntryColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "model", header: "مدل" },
  { accessorKey: "description", header: "توضیح" },
  { accessorKey: "features", header: "ویژگی‌ها" },
  { accessorKey: "region", header: "منطقه" },
  {
    accessorKey: "created_at",
    header: "تاریخ ایجاد",
    cell: ({ row }) =>
      row?.original?.created_at
        ? new Date(row.original.created_at).toLocaleString("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
  },
];
