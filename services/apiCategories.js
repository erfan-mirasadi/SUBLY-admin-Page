import supabase from "./supabase";

export async function getApiCategories() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) {
    console.error("Error fetching categories:", error);
  }
  return data;
}

export async function createCategory(newCategory) {
  const { data, error } = await supabase.from("category").insert([newCategory]);
  if (error) {
    console.error("Error creating category:", error);
    return error;
  }
  return data;
}

export async function updateCategory(id, updatedCategory) {
  const { data, error } = await supabase
    .from("category")
    .update(updatedCategory)
    .eq("id", id);
  if (error) {
    console.error("Error updating category:", error);
    return error;
  }
  return data;
}

export async function deleteCategory(id) {
  const { data, error } = await supabase.from("category").delete().eq("id", id);
  if (error) {
    console.error("Error deleting category:", error);
    return error;
  }
  return data;
}
