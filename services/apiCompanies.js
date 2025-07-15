import supabase from "./supabase";

export async function getApiCompanies() {
  const { data, error } = await supabase.from("company").select("*");
  console.log(data);
  if (error) {
    console.error("Error fetching companies:", error);
  }
  return data;
}

export async function createCompany(newCompany) {
  const { data, error } = await supabase.from("company").insert([newCompany]);
  if (error) {
    console.error("Error creating company:", error);
    return error;
  }
  return data;
}

export async function updateCompany(id, updatedCompany) {
  const { data, error } = await supabase
    .from("company")
    .update(updatedCompany)
    .eq("id", id);
  if (error) {
    console.error("Error updating company:", error);
    return error;
  }
  return data;
}

export async function deleteCompany(id) {
  const { data, error } = await supabase.from("company").delete().eq("id", id);
  if (error) {
    console.error("Error deleting company:", error);
    return error;
  }
  return data;
}
