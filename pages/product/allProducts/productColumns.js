export const productColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "title", header: "عنوان" },
  { accessorKey: "caption", header: "توضیح کوتاه" },
  { accessorKey: "category_title", header: "دسته‌بندی" },
  { accessorKey: "company_title", header: "شرکت" },
  { accessorKey: "type", header: "نوع" },
  { accessorKey: "slug", header: "SLUG" },
  {
    accessorKey: "image_small_url",
    header: "تصویر کوچک",
    cell: ({ row }) => {
      const url = row?.original?.image_small_url;
      if (!url) return "-";
      return <img src={url} className="w-12 h-12 object-cover rounded" />;
    },
  },
  {
    accessorKey: "image_big_url",
    header: "تصویر بزرگ",
    cell: ({ row }) => {
      const url = row?.original?.image_big_url;
      if (!url) return "-";
      return <img src={url} className="w-16 h-16 object-cover rounded" />;
    },
  },
  { accessorKey: "explanation", header: "توضیح کامل" },
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
