// TableAddButton.jsx
// This component renders the add button for the table meta bar.
import React from "react";
import { Button } from "@/components/ui/button";

export default function TableAddButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="text-white shadow-2xl backdrop-blur-xs border-2 border-cyan-800 hover:bg-cyan-950 font-extrabold font-mono bg-cyan-800 hover:scale-105 transition-transform cursor-pointer duration-350 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
    >
      افزودن ➕
    </Button>
  );
}
