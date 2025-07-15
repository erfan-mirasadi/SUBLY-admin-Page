// userFormFields.js
// تعریف فیلدهای فرم کاربر برای GenericFormModal
export const currencyFormFields = [
  { name: "id", label: "شناسه", readOnly: true, entity: "currencies" },
  {
    name: "name",
    label: "عنوان",
    required: true,
    autoFocus: true,
    placeholder: "عنوان",
  },
  { name: "price", label: "qeimt", placeholder: "" },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
