export const orderColumns = [
  { accessorKey: "user_name", header: "کاربر" },
  { accessorKey: "product_title", header: "محصول" },
  { accessorKey: "quantity", header: "تعداد" },
  { accessorKey: "unit_price", header: "قیمت واحد" },
  { accessorKey: "total_price", header: "قیمت کل" },
  { accessorKey: "discount_code", header: "کد تخفیف" },
  { accessorKey: "discount_price", header: "مقدار تخفیف" },
  { accessorKey: "status", header: "وضعیت سفارش" },
  { accessorKey: "payment_status", header: "وضعیت پرداخت" },
  { accessorKey: "payment_gateway", header: "درگاه پرداخت" },
  { accessorKey: "paid_at", header: "تاریخ پرداخت" },
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
