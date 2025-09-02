export const productEntryColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "model", header: "مدل" },
  { accessorKey: "description", header: "کوتاه توضیح" },
  { accessorKey: "features", header: "ویژگی‌ها" },
  { accessorKey: "region", header: "منطقه" },
  { accessorKey: "info", header: "اطلاعات پلن" },
  {
    accessorKey: "need_login",
    header: "نیاز به اطلاعات یوزر دارد؟",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.need_login
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.need_login ? "بله" : "خیر"}
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
