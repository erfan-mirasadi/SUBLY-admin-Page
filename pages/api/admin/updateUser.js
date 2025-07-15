// /pages/api/admin/updateUser.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  console.log("KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email, name } = req.body;

    console.log("Received data:", { userId, email, name });

    if (!name) {
      console.log("Missing fields:", { name: !!name });
      return res.status(400).json({
        error: "Missing required field: name",
        received: { userId, email, name },
      });
    }

    let authData, userData;

    // اگر userId موجود باشد، از آن استفاده کن
    if (userId && userId !== "not provided") {
      // آپدیت اطلاعات کاربر در auth
      const { data: auth, error: authError } =
        await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { full_name: name },
        });

      if (authError) {
        console.error("Auth update error:", authError);
        // اگر خطا در auth بود، ادامه بده و فقط در جدول user آپدیت کن
        console.log("Continuing with user table update only");
      } else {
        authData = auth;
      }
    }

    // آپدیت اطلاعات در جدول user - فقط name
    const { data: user, error: userError } = await supabase
      .from("user")
      .update({
        name: name,
      })
      .eq("id", userId || 1); // اگر userId نباشد، از id=1 استفاده کن

    if (userError) {
      console.error("User table update error:", userError);
      return res.status(500).json({ error: userError.message });
    }
    userData = user;

    console.log("Update successful:", { authData, userData });

    return res.status(200).json({
      success: true,
      data: {
        user: userData,
        auth: authData,
        updatedName: name,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ error: error.message });
  }
}
