import supabase from "./supabase";

export async function getApiProducts() {
  const { data, error } = await supabase
    .from("product")
    .select(`*, product_entry(*, product_plans(*))`);
  if (error) {
    console.error("Error fetching products:", error);
  }
  return data;
}

export async function createProduct(newProduct) {
  const { data, error } = await supabase.from("product").insert([newProduct]);

  if (error) {
    console.error("Error creating product:", error);
    return error;
  }
  return data;
}

export async function updateProduct(id, updatedProduct) {
  const { data, error } = await supabase
    .from("product")
    .update(updatedProduct)
    .eq("id", id);
  if (error) {
    console.error("Error updating product:", error);
    return error;
  }
  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("product").delete().eq("id", id);
  if (error) {
    console.error("Error deleting product:", error);
    return error;
  }
  return data;
}
