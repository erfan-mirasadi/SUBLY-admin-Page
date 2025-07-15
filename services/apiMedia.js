import supabase from "./supabase";

// ⬆️ آپلود فایل
export async function uploadMedia(file, path = "uploads") {
  const cleanName = file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
  const fileName = `${Date.now()}-${cleanName}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(`${path}/${fileName}`, file);

  if (error) {
    console.error("خطا در آپلود:", error.message);
    return null;
  }

  // ✅ URL نهایی
  const { data } = supabase.storage
    .from("media")
    .getPublicUrl(`${path}/${fileName}`);
  return data?.publicUrl;
}

// 🗑 حذف فایل
export async function deleteMedia(filePath) {
  const { error } = await supabase.storage.from("media").remove([filePath]);
  if (error) {
    console.error("خطا در حذف فایل:", error.message);
    return false;
  }
  return true;
}
