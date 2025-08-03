import supabase from "./supabase";

export async function getApiCoupons() {
  const { data, error } = await supabase.from("coupons").select("*");
  if (error) {
    console.error("Error fetching coupons:", error);
  }
  return data;
}

export async function createCoupon(newCoupon) {
  const { data, error } = await supabase.from("coupons").insert([newCoupon]);
  if (error) {
    console.error("Error creating coupon:", error);
    return error;
  }
  return data;
}

export async function updateCoupon(id, updatedCoupon) {
  const { data, error } = await supabase
    .from("coupons")
    .update(updatedCoupon)
    .eq("id", id);
  if (error) {
    console.error("Error updating coupon:", error);
    return error;
  }
  return data;
}

export async function deleteCoupon(id) {
  const { data, error } = await supabase.from("coupons").delete().eq("id", id);
  if (error) {
    console.error("Error deleting coupon:", error);
    return error;
  }
  return data;
}
