import supabase from "./supabase";

export async function getApiProductPlans() {
  const { data, error } = await supabase.from("product_plans").select("*");
  if (error) {
    console.error("Error fetching products Plans:", error);
  }
  return data;
}

// تابع صحیح برای افزودن پلن جدید
export async function createProductPlan(newPlan) {
  const { data, error } = await supabase
    .from("product_plans")
    .insert([newPlan]);

  if (error) {
    console.error("Error creating product plan:", error);
    return error;
  }
  return data;
}

export async function updateProductPlan(id, updatedPlan) {
  const { data, error } = await supabase
    .from("product_plans")
    .update(updatedPlan)
    .eq("id", id);
  if (error) {
    console.error("Error updating product plan:", error);
    return error;
  }
  return data;
}

export async function deleteProductPlan(id) {
  const { data, error } = await supabase
    .from("product_plans")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting product plan:", error);
    return error;
  }
  return data;
}
