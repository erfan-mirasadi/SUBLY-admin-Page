// userColumns.js
// ستون‌های جدول کاربران (UserTable)
// فقط تعریف ستون‌ها، بدون هیچ منطق یا UI

export const userColumns = [
  { accessorKey: "name", header: "نام" },
  { accessorKey: "last_name", header: "نام خانوادگی" },
  { accessorKey: "phone_number", header: "شماره تماس" },
  { accessorKey: "discount_code", header: "کد تخفیف" },
  { accessorKey: "last_order_id", header: "آخرین سفارش" },
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
