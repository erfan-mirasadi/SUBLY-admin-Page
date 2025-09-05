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
  {
    name: "caption",
    label: "عنوان کوتاه",
    placeholder: "عنوان کوتاه یا زیرنویس",
  },
  {
    name: "features",
    label: "محصولات",
    placeholder: "لیست محصولات و خدمات این شرکت را شرح دهید...",
  },
  { name: "image_url", label: "تصویر", type: "file" },
  { name: "image_2", label: "تصویر ۲", type: "file" },
  { name: "video_url", label: "ویدیو", type: "file" },
  {
    name: "slug",
    label: "slug",
    placeholder: "slug",
    required: true,
    unique: true,
  },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
