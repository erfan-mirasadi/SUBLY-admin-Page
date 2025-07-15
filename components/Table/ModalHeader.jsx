// ModalHeader.jsx
// This component renders the header section of the generic form modal.
// It displays the title and a decorative divider.
import React from "react";

export default function ModalHeader({ mode }) {
  return (
    <div className="text-center mb-4 sm:mb-6">
      {/* Modal title based on mode */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
        {mode === "add" ? "➕ افزودن محصول جدید" : "📝 ویرایش محصول"}
      </h2>
      {/* Decorative divider */}
      <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
    </div>
  );
}
