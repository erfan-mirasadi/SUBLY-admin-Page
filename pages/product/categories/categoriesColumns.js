export const categoriesColumns = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "title", header: "عنوان" },
  { accessorKey: "description", header: "توضیحات" },
  { accessorKey: "features", header: "ویژگی ها" },
  {
    accessorKey: "image_url",
    header: "تصویر",
    cell: ({ row }) => {
      const url = row?.original?.image_url;
      if (!url) return "-";
      return <img src={url} className="w-16 h-16 object-cover rounded" />;
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
];
