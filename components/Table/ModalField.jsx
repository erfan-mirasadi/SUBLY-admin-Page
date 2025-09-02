// ModalField.jsx
// This component renders a single form field (input, select, textarea, switch, file, etc.) for the generic form modal.
// It receives all necessary props to handle value, errors, and events.
import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ModalFileInput from "./ModalFileInput";

export default function ModalField({
  field,
  value,
  error,
  onChange,
  setImagePreviews,
  setMediaFiles,
  imagePreview,
  isDisabled,
  categoryOptions = [],
  companyOptions = [],
  productOptions = [],
  form,
}) {
  // Helper to render the correct field type
  if (field.type === "file") {
    return (
      <ModalFileInput
        field={field}
        value={value}
        imagePreview={imagePreview}
        setImagePreviews={setImagePreviews}
        setMediaFiles={setMediaFiles}
        isDisabled={isDisabled}
      />
    );
  }
  if (
    field.name === "description" ||
    field.name === "caption" ||
    field.name === "explanation" ||
    field.name === "info"
  ) {
    return (
      <textarea
        name={field.name}
        value={value || ""}
        onChange={onChange}
        placeholder={field.placeholder || ""}
        required={field.required}
        disabled={isDisabled}
        className={`w-full ${
          field.name === "explanation"
            ? "min-h-[120px] sm:min-h-[150px]"
            : field.name === "info"
            ? "min-h-[100px] sm:min-h-[120px]"
            : "min-h-[80px] sm:min-h-[100px]"
        } max-h-80 resize-y rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
        style={{ fontFamily: "inherit" }}
      />
    );
  }
  if (field.name === "category_id") {
    return (
      <select
        name={field.name}
        value={value || ""}
        onChange={onChange}
        required={field.required}
        disabled={isDisabled}
        className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
      >
        <option value="">📋 یک گزینه را انتخاب کنید</option>
        {categoryOptions.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
    );
  }
  if (field.name === "company_id") {
    return (
      <select
        name={field.name}
        value={value || ""}
        onChange={onChange}
        required={field.required}
        disabled={isDisabled}
        className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
      >
        <option value="">🏢 یک گزینه را انتخاب کنید</option>
        {companyOptions.map((com) => (
          <option key={com.id} value={com.id}>
            {com.title}
          </option>
        ))}
      </select>
    );
  }
  if (field.name === "product_id") {
    return (
      <select
        name={field.name}
        value={value || ""}
        onChange={onChange}
        required={field.required}
        disabled={isDisabled}
        className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
      >
        <option value="">📦 محصول را انتخاب کنید</option>
        {productOptions.map((product) => (
          <option key={product.value} value={product.value}>
            {product.label}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "switch") {
    return (
      <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gradient-to-r from-amber-50 to-yellow-200 rounded-xl border-2 border-amber-200">
        <Switch
          checked={!!value}
          onCheckedChange={(checked) => {
            onChange({
              target: {
                name: field.name,
                value: checked
                  ? field.onValue !== undefined
                    ? field.onValue
                    : true
                  : field.offValue !== undefined
                  ? field.offValue
                  : false,
              },
            });
          }}
          id={`switch-${field.name}`}
        />
        <label
          htmlFor={`switch-${field.name}`}
          className="font-semibold text-gray-700 select-none cursor-pointer text-sm sm:text-lg"
        >
          {value ? "فعال" : "غیرفعال"}
        </label>
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <select
        name={field.name}
        value={value || ""}
        onChange={onChange}
        required={field.required}
        disabled={isDisabled}
        className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
      >
        <option value="">{field.placeholder || "انتخاب کنید"}</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "datalist") {
    return (
      <Input
        type={field.type || "text"}
        name={field.name}
        value={value || ""}
        onChange={onChange}
        placeholder={field.placeholder || ""}
        required={field.required}
        disabled={isDisabled}
        className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
        autoFocus={field.autoFocus}
        readOnly={field.readOnly}
      />
    );
  }
  if (field.readOnly) {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700 text-base sm:text-lg">
          {field.label}
        </label>
        <Input
          name={field.name}
          value={value || ""}
          readOnly
          className="w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>
    );
  }

  // Generic textarea handler
  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        value={value || ""}
        onChange={onChange}
        placeholder={field.placeholder || ""}
        required={field.required}
        disabled={isDisabled}
        className={`w-full min-h-[120px] sm:min-h-[150px] max-h-80 resize-y rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "bg-white hover:border-amber-300"
        }`}
        style={{ fontFamily: "inherit" }}
      />
    );
  }

  // Default input
  return (
    <Input
      type={field.type || "text"}
      name={field.name}
      value={value || ""}
      onChange={onChange}
      required={field.required}
      disabled={isDisabled}
      className={`w-full rounded-xl border-2 p-2 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-800 placeholder-gray-600 ${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-100"
          : "bg-white hover:border-amber-300"
      }`}
      placeholder={
        field.conditional &&
        form[field.conditional.field] === field.conditional.value
          ? field.conditional.message
          : field.conditional && field.conditional.elseMessage
          ? field.conditional.elseMessage
          : field.placeholder || ""
      }
      autoFocus={field.autoFocus}
      readOnly={field.readOnly}
    />
  );
}
