// ModalForm.jsx
// This component renders the form body for the generic form modal.
// It maps over formFields and renders ModalField for each field.
import React from "react";
import ModalField from "./ModalField";

export default function ModalForm({
  formFields,
  form,
  errors,
  handleChange,
  setImagePreviews,
  setMediaFiles,
  imagePreviews,
  isFieldDisabled,
  shouldShowField,
  categoryOptions = [],
  companyOptions = [],
  productOptions = [],
}) {
  return (
    <form className="space-y-4 sm:space-y-6">
      {formFields.map((field, index) => {
        if (!shouldShowField(field)) return null;
        return (
          <div key={field.name} className="space-y-2 sm:space-y-3">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-600 text-base sm:text-lg">
                {field.label}
              </label>
              {field.conditional && (
                <p className="text-xs sm:text-sm text-cyan-600 bg-cyan-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-r-4 border-cyan-400">
                  {/* Conditional message */}
                  💡 {field.conditional.message}
                </p>
              )}
              {errors[field.name] && (
                <p className="text-xs sm:text-sm text-red-600 bg-red-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-r-4 border-red-400">
                  {/* Error message */}
                  ⚠️ {errors[field.name]}
                </p>
              )}
            </div>
            <ModalField
              field={field}
              value={form[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              setImagePreviews={setImagePreviews}
              setMediaFiles={setMediaFiles}
              imagePreview={imagePreviews[field.name]}
              isDisabled={isFieldDisabled(field)}
              categoryOptions={categoryOptions}
              companyOptions={companyOptions}
              productOptions={productOptions}
              form={form}
            />
            {index < formFields.length - 1 && (
              <div className="border-t border-gray-200 my-2 sm:my-4"></div>
            )}
          </div>
        );
      })}
    </form>
  );
}
