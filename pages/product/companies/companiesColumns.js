// userColumns.js
// ستون‌های جدول کاربران (UserTable)
// فقط تعریف ستون‌ها، بدون هیچ منطق یا UI

export const companiesColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "title", header: "عنوان" },
  { accessorKey: "description", header: "توضیحات" },
  { accessorKey: "features", header: "ویژگی ها" },
  {
    accessorKey: "caption",
    header: "عنوان کوتاه",
    cell: ({ row }) => (
      <div className="max-w-32 truncate" title={row.original.caption}>
        {row.original.caption || "-"}
      </div>
    ),
  },
  {
    accessorKey: "image_url",
    header: "تصویر",
    cell: ({ row }) => {
      const url = row?.original?.image_url;
      if (!url) return "-";
      return <img src={url} className="w-23 h-16 object-cover rounded" />;
    },
  },
  {
    accessorKey: "image_2",
    header: "تصویر ۲",
    cell: ({ row }) => {
      const url = row?.original?.image_1;
      if (!url) return "-";
      return <img src={url} className="w-23 h-16 object-cover rounded" />;
    },
  },

  {
    accessorKey: "video_url",
    header: "ویدیو",
    cell: ({ row }) => {
      const url = row?.original?.media_url;
      if (!url) return "-";
      return url.includes(".mp4") ? (
        <video src={url} controls className="w-24 h-24 object-cover rounded" />
      ) : (
        <img src={url} className="w-24 h-24 object-cover rounded" />
      );
    },
  },
  { accessorKey: "slug", header: "slug" },
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
