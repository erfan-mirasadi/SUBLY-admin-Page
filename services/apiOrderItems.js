import { supabase } from "./supabase";

// Get all order items
export const getApiOrderItems = async () => {
  try {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching order items:", error);
      return { error };
    }

    return data;
  } catch (err) {
    console.error("Error in getApiOrderItems:", err);
    return { error: err };
  }
};

// Create a new order item
export const createOrderItem = async (orderItemData) => {
  try {
    const { data, error } = await supabase
      .from("order_items")
      .insert([orderItemData])
      .select();

    if (error) {
      console.error("Error creating order item:", error);
      return { error };
    }

    return data;
  } catch (err) {
    console.error("Error in createOrderItem:", err);
    return { error: err };
  }
};

// Update an order item
export const updateOrderItem = async (id, orderItemData) => {
  try {
    const { data, error } = await supabase
      .from("order_items")
      .update(orderItemData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating order item:", error);
      return { error };
    }

    return data;
  } catch (err) {
    console.error("Error in updateOrderItem:", err);
    return { error: err };
  }
};

// Delete an order item
export const deleteOrderItem = async (id) => {
  try {
    const { error } = await supabase.from("order_items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting order item:", error);
      return { error };
    }

    return null;
  } catch (err) {
    console.error("Error in deleteOrderItem:", err);
    return { error: err };
  }
};
