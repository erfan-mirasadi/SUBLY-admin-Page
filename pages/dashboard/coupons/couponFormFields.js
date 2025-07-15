export const couponFormFields = [
  { name: "id", label: "شناسه", readOnly: true, entity: "coupons" },
  {
    name: "type",
    label: "نوع",
    required: true,
    type: "select",
    options: [
      { value: "percentage", label: "درصدی" },
      { value: "fixed", label: "مقدار ثابت" },
    ],
    placeholder: "نوع کوپن را انتخاب کنید",
  },
  {
    name: "code",
    label: "کد",
    required: true,
    placeholder: "کد کوپن",
  },
  {
    name: "value",
    label: "مقدار",
    required: true,
    type: "number",
    conditional: {
      field: "type",
      value: "fixed",
      message: "مقدار تخفیف را وارد کن",
      elseMessage: "چند درصد تخفیف می‌دی؟",
    },
  },
  {
    name: "max_usage",
    label: "حداکثر استفاده",
    required: true,
    placeholder: "حداکثر استفاده (عدد)",
    type: "number",
  },
  {
    name: "used_count",
    label: "تعداد استفاده شده",
    placeholder: "تعداد استفاده شده (عدد)",
    type: "number",
    readOnly: true,
  },
  {
    name: "expires_at",
    label: "تاریخ انقضا",
    placeholder: "تاریخ انقضا (yyyy-mm-dd)",
    type: "date",
  },
  {
    name: "product_id",
    label: "محصول",
    type: "select",
    placeholder: "محصول را انتخاب کنید",
    options: [], // این آرایه در کامپوننت اصلی پر می‌شود
  },
  {
    name: "user_id",
    label: "کاربر",
    placeholder: "کاربر id را وارد کنید",
  },
  {
    name: "is_active",
    label: "فعال؟",
    required: true,
    type: "switch",
  },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
