export const couponColumns = [
  { accessorKey: "type", header: "نوع" },
  { accessorKey: "code", header: "کد" },
  { accessorKey: "value", header: "مقدار" },
  { accessorKey: "max_usage", header: "حداکثر استفاده" },
  { accessorKey: "used_count", header: "تعداد استفاده شده" },
  { accessorKey: "expires_at", header: "تاریخ انقضا" },
  { accessorKey: "product_title", header: "محصول" },
  { accessorKey: "user_phone_number", header: "کاربر" },
  {
    accessorKey: "is_active",
    header: "فعال؟",
    cell: ({ row }) => (row.original.is_active ? "فعال" : "غیرفعال"),
  },
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
