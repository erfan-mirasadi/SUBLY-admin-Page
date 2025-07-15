import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

// SearchBar: کامپوننت جستجو با قابلیت پیشنهادات
export default function SearchBar({
  value,
  onChange,
  placeholder = "جستجو...",
  data = [], // داده‌ها برای پیشنهادات
  searchFields = [], // فیلدهایی که باید جستجو شوند
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // تولید پیشنهادات بر اساس متن جستجو
  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = data
      .filter((item) => {
        return searchFields.some((field) => {
          const fieldValue = item[field];
          if (fieldValue == null) return false;
          return String(fieldValue).toLowerCase().includes(value.toLowerCase());
        });
      })
      .map((item) => {
        // پیدا کردن اولین فیلد که شامل متن جستجو است
        const matchingField = searchFields.find((field) => {
          const fieldValue = item[field];
          if (fieldValue == null) return false;
          return String(fieldValue).toLowerCase().includes(value.toLowerCase());
        });
        return item[matchingField];
      })
      .filter((suggestion, index, self) => self.indexOf(suggestion) === index) // حذف تکرار
      .slice(0, 5); // حداکثر 5 پیشنهاد

    setSuggestions(filteredSuggestions);
  }, [value, data, searchFields]);

  // بستن پیشنهادات با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // بستن پیشنهادات با فشردن Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full min-w-0 text-sm md:text-base bg-teal-50/10 border-teal-200/30 text-teal-50 placeholder:text-teal-100/50 focus:border-teal-400/50 focus:ring-teal-400/20"
      />

      {/* پیشنهادات */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b border border-teal-50/30 rounded-lg shadow-xl z-20 mt-1 backdrop-blur-sm">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-teal-800/50 cursor-pointer text-teal-50/60 transition-colors"
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
