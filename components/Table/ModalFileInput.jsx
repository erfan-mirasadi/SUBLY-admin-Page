// ModalFileInput.jsx
// This component renders a file input field with preview for images/videos.
// It receives all necessary props to handle file selection and preview.
import React from "react";
import { Input } from "@/components/ui/input";

export default function ModalFileInput({
  field,
  value,
  imagePreview,
  setImagePreviews,
  setMediaFiles,
  isDisabled,
}) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Preview image/video if available */}
      {(value || imagePreview) && (
        <div className="flex justify-center">
          <img
            src={imagePreview || value}
            alt="تصویر"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-gray-300"
          />
        </div>
      )}
      {/* File input */}
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setImagePreviews((prev) => ({
                ...prev,
                [field.name]: e.target.result,
              }));
            };
            reader.readAsDataURL(file);
            setMediaFiles((prev) => ({
              ...prev,
              [field.name]: file,
            }));
          }
        }}
        disabled={isDisabled}
        className="file:bg-amber-100 file:border-amber-300 file:text-amber-800 hover:file:bg-amber-200 transition-colors text-xs sm:text-sm text-gray-800 placeholder-gray-600"
      />
    </div>
  );
}
