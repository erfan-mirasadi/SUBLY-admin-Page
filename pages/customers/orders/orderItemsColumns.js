// Order Items table columns configuration
export const orderItemsColumns = [
  {
    accessorKey: "product_title",
    header: "نام محصول",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.product_title || "محصول نامشخص"}
      </div>
    ),
  },
  {
    accessorKey: "product_plan_model",
    header: "مدل محصول",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.product_plan_model || "مدل نامشخص"}
      </div>
    ),
  },
  {
    accessorKey: "product_plan_length",
    header: "مدت زمان",
    cell: ({ row }) => (
      <div className="text-center" dir="rtl">
        {row.original.product_plan_length
          ? `${row.original.product_plan_length} - ماهه`
          : "مدت زمان نامشخص"}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "تعداد",
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity || 0}</div>
    ),
  },
  {
    accessorKey: "unit_price",
    header: "قیمت واحد",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.unit_price
          ? `${row.original.unit_price.toLocaleString()} تومان`
          : "نامشخص"}
      </div>
    ),
  },
  {
    accessorKey: "discount_price",
    header: "تخفیف",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.discount_price
          ? `${row.original.discount_price.toLocaleString()} تومان`
          : "بدون تخفیف"}
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: "قیمت کل",
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        {row.original.total_price
          ? `${row.original.total_price.toLocaleString()} تومان`
          : "نامشخص"}
      </div>
    ),
  },
  {
    accessorKey: "plan_id",
    header: "شناسه پلن",
    cell: ({ row }) => (
      <div className="text-center">{row.original.plan_id || "ندارد"}</div>
    ),
  },
  {
    accessorKey: "user_name",
    header: "نام کاربری",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.user_name || "-"}
      </div>
    ),
  },
  {
    accessorKey: "password",
    header: "رمز عبور",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.password ? "••••••••" : "-"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => (
      <div
        className="text-center max-w-32 truncate"
        title={row.original.description}
      >
        {row.original.description || "-"}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "تاریخ ایجاد",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return (
        <div className="text-center text-xs">
          {date.toLocaleDateString("fa-IR")}
        </div>
      );
    },
  },
];
