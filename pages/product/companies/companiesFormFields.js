// userFormFields.js
// تعریف فیلدهای فرم کاربر برای GenericFormModal
export const companiesFormFields = [
  { name: "id", label: "شناسه", readOnly: true, entity: "company" },
  {
    name: "title",
    label: "عنوان",
    required: true,
    autoFocus: true,
    placeholder: "عنوان",
  },
  { name: "description", label: "توضیحات", placeholder: "توضیحات" },
  { name: "features", label: "ویژگی ها", placeholder: "ویژگی ها" },
  { name: "image_url", label: "تصویر", type: "file" },
  { name: "video_url", label: "ویدیو", type: "file" },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
