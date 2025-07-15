// ModalFooterButtons.jsx
// This component renders the footer action buttons for the generic form modal.
// It receives onClose, mode, and Button as props.
import React from "react";

export default function ModalFooterButtons({ onClose, mode, Button }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6 sm:mt-8 justify-end pt-4 sm:pt-6 border-t-2 border-amber-200">
      {/* Cancel button */}
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 hover:from-red-100 hover:to-pink-100 hover:scale-95 shadow-xl min-w-[120px] text-red-700 font-semibold rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all text-sm sm:text-base w-full sm:w-auto"
        onClick={onClose}
      >
        ❌ انصراف
      </Button>
      {/* Submit button */}
      <Button
        type="submit"
        className="text-white shadow-2xl backdrop-blur-sm border-2 border-cyan-600 hover:bg-cyan-700 font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 hover:scale-105 transition-all cursor-pointer min-w-[120px] rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
      >
        {mode === "add" ? "✅ افزودن" : "💾 ذخیره"}
      </Button>
    </div>
  );
}
