// userColumns.js
// ستون‌های جدول کاربران (UserTable)
// فقط تعریف ستون‌ها، بدون هیچ منطق یا UI

export const currencyColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "name", header: "عنوان" },
  { accessorKey: "price", header: "qeimt" },
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
  // عملیات (ویرایش/حذف) در UserTable اضافه می‌شود
];
