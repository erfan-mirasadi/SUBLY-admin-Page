import supabase from "./supabase";

export async function getApiOrders() {
  const { data, error } = await supabase.from("order").select("*");
  if (error) {
    console.error("Error fetching order:", error);
  }
  return data;
}

export async function createOrder(newOrder) {
  const { data, error } = await supabase.from("Order").insert([newOrder]);
  if (error) {
    console.error("Error creating Order:", error);
    return error;
  }
  return data;
}

export async function updateOrder(id, updatedOrder) {
  const { data, error } = await supabase
    .from("Order")
    .update(updatedOrder)
    .eq("id", id);
  if (error) {
    console.error("Error updating Order:", error);
    return error;
  }
  return data;
}

export async function deleteOrder(id) {
  const { data, error } = await supabase.from("Order").delete().eq("id", id);
  if (error) {
    console.error("Error deleting Order:", error);
    return error;
  }
  return data;
}
