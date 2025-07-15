import supabase from "./supabase";

export async function getApiProductEntry() {
  const { data, error } = await supabase.from("product_entry").select("*");
  console.log(data);
  if (error) {
    console.error("Error fetching products Entry:", error);
  }
  return data;
}

export async function createProductEntry(newProduct) {
  const { data, error } = await supabase
    .from("product_entry")
    .insert([newProduct]);

  if (error) {
    console.error("Error creating product Entry:", error);
    return error;
  }
  return data;
}

export async function updateProductEntry(id, updatedProduct) {
  const { data, error } = await supabase
    .from("product_entry")
    .update(updatedProduct)
    .eq("id", id);
  if (error) {
    console.error("Error updating product Entry:", error);
    return error;
  }
  return data;
}

export async function deleteProductEntry(id) {
  const { data, error } = await supabase
    .from("product_entry")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting product Entry:", error);
    return error;
  }
  return data;
}
