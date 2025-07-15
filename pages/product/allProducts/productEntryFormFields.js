export const productEntryFormFields = [
  { name: "model", label: "مدل", required: true, placeholder: "مدل" },
  {
    name: "description",
    label: "توضیح",
    required: false,
    placeholder: "توضیح",
  },
  {
    name: "features",
    label: "ویژگی‌ها",
    required: false,
    placeholder: "ویژگی‌ها",
  },
  { name: "region", label: "منطقه", required: false, placeholder: "منطقه" },
  // { name: "product_id", label: "شناسه محصول", required: true, type: "hidden" },
  // {
  //   name: "product_id",
  //   label: "شناسه ورودی محصول",
  //   required: true,
  //   readOnly: true,
  // },
  { name: "id", label: "شناسه", readOnly: true },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
