export const productPlanColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "title", header: "عنوان پلن" },
  { accessorKey: "price", header: "قیمت" },
  { accessorKey: "discount_price", header: "قیمت تخفیف‌خورده" },
  { accessorKey: "state", header: "وضعیت" },
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
