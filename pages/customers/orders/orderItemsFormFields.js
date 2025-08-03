// Order Items form fields configuration
export const orderItemsFormFields = [
  {
    name: "order_id",
    label: "شناسه سفارش",
    type: "number",
    required: true,
    placeholder: "شناسه سفارش را وارد کنید",
  },
  {
    name: "quantity",
    label: "تعداد",
    type: "number",
    required: true,
    placeholder: "تعداد را وارد کنید",
    min: 1,
  },
  {
    name: "unit_price",
    label: "قیمت واحد",
    type: "number",
    required: true,
    placeholder: "قیمت واحد را وارد کنید",
    min: 0,
  },
  {
    name: "discount_price",
    label: "مبلغ تخفیف",
    type: "number",
    required: false,
    placeholder: "مبلغ تخفیف را وارد کنید",
    min: 0,
  },
  {
    name: "total_price",
    label: "قیمت کل",
    type: "number",
    required: true,
    placeholder: "قیمت کل را وارد کنید",
    min: 0,
  },
  {
    name: "plan_id",
    label: "شناسه پلن",
    type: "number",
    required: false,
    placeholder: "شناسه پلن را وارد کنید (اختیاری)",
  },
];
