import supabase from "./supabase";

export async function getApiCurrencies() {
  const { data, error } = await supabase.from("currencies").select("*");
  if (error) {
    console.error("Error fetching currencies:", error);
  }
  return data;
}

export async function createCurrencies(newcurrencies) {
  const { data, error } = await supabase
    .from("currencies")
    .insert([newcurrencies]);
  if (error) {
    console.error("Error creating currencies:", error);
    return error;
  }
  return data;
}

export async function updateCurrencies(id, updatedcurrencies) {
  const { data, error } = await supabase
    .from("currencies")
    .update(updatedcurrencies)
    .eq("id", id);
  if (error) {
    console.error("Error updating currencies:", error);
    return error;
  }
  return data;
}

export async function deleteCurrencies(id) {
  const { data, error } = await supabase
    .from("currencies")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting currencies:", error);
    return error;
  }
  return data;
}
