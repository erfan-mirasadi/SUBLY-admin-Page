export const productPlanColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "title", header: "عنوان پلن" },
  { accessorKey: "price", header: "قیمت" },
  { accessorKey: "discount_price", header: "قیمت تخفیف‌خورده" },
  { accessorKey: "state", header: "وضعیت" },
  {
    accessorKey: "is_available",
    header: "موجودی",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.original.is_available
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.is_available ? "موجود" : "ناموجود"}
      </span>
    ),
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
