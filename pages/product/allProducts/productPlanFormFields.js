export const productPlanFormFields = [
  {
    name: "title",
    label: "عنوان پلن",
    required: true,
    placeholder: "عنوان پلن",
  },
  {
    name: "price",
    label: "قیمت",
    required: true,
    type: "number",
    placeholder: "قیمت",
  },
  {
    name: "state",
    label: "آیا تخفیف دارد؟",
    type: "switch",
    required: false,
    onValue: "outlet",
    offValue: null,
    defaultValue: null,
  },
  {
    name: "discount_price",
    label: "قیمت تخفیف‌خورده",
    required: false,
    type: "number",
    placeholder: "قیمت تخفیف‌خورده",
    conditional: {
      field: "state",
      value: "outlet",
      message: "اگر می‌خواهید تخفیف اعمال شود، مقدار را وارد کنید.",
    },
    validate: (value, formData) => {
      if (formData.state !== "outlet") return null;
      const price = parseFloat(formData.price) || 0;
      const discount = parseFloat(value) || 0;
      return discount <= price
        ? null
        : "میزان تخفیف باید کمتر از قیمت اصلی باشد!";
    },
  },
  {
    name: "product_entry_id",
    label: "شناسه ورودی محصول",
    required: true,
    readOnly: true,
  },
  { name: "id", label: "شناسه", readOnly: true },
  { name: "created_at", label: "تاریخ ایجاد", readOnly: true },
];
