import { useState } from "react";

// useTableModalForm: هوک مدیریت مودال و فرم جدول (add/edit)
// خروجی: modalOpen, modalMode, selectedItem, handlerها
export default function useTableModalForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" یا "edit"
  const [selectedItem, setSelectedItem] = useState(null);

  // باز کردن مودال افزودن
  const handleAdd = (defaults = {}) => {
    setModalMode("add");
    setSelectedItem(defaults);
    setModalOpen(true);
  };
  // باز کردن مودال ویرایش
  const handleEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  return {
    modalOpen,
    modalMode,
    selectedItem,
    handleAdd,
    handleEdit,
    handleClose,
  };
}
