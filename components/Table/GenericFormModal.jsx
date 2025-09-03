import { uploadMedia } from "@/services/apiMedia";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import ModalHeader from "./ModalHeader";
import ModalForm from "./ModalForm";
import ModalFooterButtons from "./ModalFooterButtons";

// GenericFormModal: Generic form modal for add/edit
export default function GenericFormModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  formFields,
  categoryOptions = [],
  companyOptions = [],
  productOptions = [],
}) {
  const [mediaFiles, setMediaFiles] = useState({});
  const [form, setForm] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialValues || {});
      setErrors({});
      setImagePreviews({});
      setMediaFiles({});
    }
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateField = (field, value) => {
    if (!field.validate) return null;
    return field.validate(value, form);
  };

  const isFieldDisabled = (field) => {
    if (!field.conditional) return false;
    if (field.name === "value") return false;
    const { field: conditionalField, value } = field.conditional;
    return form[conditionalField] !== value;
  };

  const shouldShowField = (field) => {
    if (!field.conditional) return true;
    if (field.name === "value") return true;
    const { field: conditionalField, value } = field.conditional;
    return form[conditionalField] === value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    formFields.forEach((field) => {
      if (shouldShowField(field)) {
        const error = validateField(field, form[field.name]);
        if (error) newErrors[field.name] = error;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const uploadedFields = {};
    for (const field of formFields) {
      if (field.type === "file" && mediaFiles[field.name]) {
        const entityName =
          formFields.find((f) => f.name === "id")?.entity || "general";
        const url = await uploadMedia(
          mediaFiles[field.name],
          `uploads/${entityName}`
        );
        uploadedFields[field.name] = url;
      }
    }
    const allowedFields = formFields.map((f) => f.name);
    const filteredForm = Object.fromEntries(
      Object.entries({ ...form, ...uploadedFields })
        .filter(([key]) => allowedFields.includes(key))
        .map(([key, value]) => {
          const fieldDef = formFields.find((f) => f.name === key);
          if (
            (value === "" || value === undefined) &&
            fieldDef &&
            (fieldDef.type === "number" || fieldDef.type === "integer")
          ) {
            return [key, null];
          }
          return [key, value];
        })
    );
    onSubmit(filteredForm);
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      // onClick={onClose} // کامنت شده: تا modal با کلیک بیرون بسته نشه
    >
      <div
        className="w-full max-w-4xl bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mx-auto my-4 flex flex-col gap-4 sm:gap-6 max-h-[95vh] overflow-y-auto border border-amber-200"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif" }}
      >
        <ModalHeader mode={mode} />
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <ModalForm
            formFields={formFields}
            form={form}
            errors={errors}
            handleChange={handleChange}
            setImagePreviews={setImagePreviews}
            setMediaFiles={setMediaFiles}
            imagePreviews={imagePreviews}
            isFieldDisabled={isFieldDisabled}
            shouldShowField={shouldShowField}
            categoryOptions={categoryOptions}
            companyOptions={companyOptions}
            productOptions={productOptions}
          />
          <ModalFooterButtons onClose={onClose} mode={mode} Button={Button} />
        </form>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : null
  );
}
