// userFormFields.js
// تعریف فیلدهای فرم کاربر برای GenericFormModal
export const categoriesFormFields = [
  { name: "id", label: "شناسه", readOnly: true, entity: "categories" },
  {
    name: "title",
    label: "عنوان",
    required: true,
    autoFocus: true,
    placeholder: "عنوان",
  },
  { name: "description", label: "توضیحات", placeholder: "توضیحات" },
  {
    name: "caption",
    label: "عنوان کوتاه",
    placeholder: "عنوان کوتاه یا زیرنویس",
  },
  {
    name: "features",
    label: "ویژگی‌ها",
    placeholder: "ویژگی‌ها و مشخصات این دسته‌بندی را شرح دهید...",
  },
  {
    name: "slug",
    label: "slug",
    placeholder: "slug",
    required: true,
    unique: true,
  },
  { name: "image_url", label: "تصویر", type: "file" },
  { name: "image_2", label: "تصویر ۲", type: "file" },
  { name: "video_url", label: "ویدیو", type: "file" },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
