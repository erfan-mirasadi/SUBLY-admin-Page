export const orderColumns = [
  {
    accessorKey: "id",
    header: "شناسه سفارش",
    cell: ({ row }) => (
      <div className="text-center font-medium">#{row.original.id}</div>
    ),
  },
  { accessorKey: "user_name", header: "کاربر" },
  { accessorKey: "unit_price", header: "قیمت واحد" },
  { accessorKey: "total_price", header: "قیمت کل" },
  { accessorKey: "discount_code", header: "کد تخفیف" },
  { accessorKey: "discount_price", header: "مقدار تخفیف" },
  { accessorKey: "status", header: "وضعیت سفارش" },
  { accessorKey: "payment_status", header: "وضعیت پرداخت" },
  { accessorKey: "payment_gateway", header: "درگاه پرداخت" },
  { accessorKey: "paid_at", header: "تاریخ پرداخت" },
  { accessorKey: "telegram_info", header: "اطلاعات تلگرام" },
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
