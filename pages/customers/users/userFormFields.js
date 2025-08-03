// userFormFields.js
// تعریف فیلدهای فرم کاربر برای GenericFormModal
export const userFormFields = [
  {
    name: "name",
    label: "نام",
    required: true,
    autoFocus: true,
    placeholder: "نام کاربر",
  },
  {
    name: "last_name",
    label: "نام خانوادگی",
    required: true,
    placeholder: "نام خانوادگی کاربر",
  },
  {
    name: "phone",
    label: "شماره تماس",
    required: true,
    placeholder: "مثال: 09123456789",
  },
  { name: "discount_code", label: "کد تخفیف", placeholder: "کد تخفیف" },
  {
    name: "last_order_id",
    label: "آخرین سفارش",
    placeholder: "شناسه آخرین سفارش",
  },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
