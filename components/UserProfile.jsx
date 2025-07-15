import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function UserProfile() {
  const { data: session, update, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // بارگذاری اطلاعات کاربر
  useEffect(() => {
    if (session?.user) {
      console.log("Session user data:", session.user);
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserProfile = async () => {
    if (!session?.user?.email) {
      toast.error("اطلاعات کاربر در دسترس نیست");
      return;
    }

    // بررسی فیلدهای اجباری
    if (!formData.name) {
      toast.error("لطفاً نام را وارد کنید");
      return;
    }

    // بررسی رمز عبور جدید
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("رمز عبور جدید و تکرار آن یکسان نیستند");
      return;
    }

    setIsLoading(true);
    try {
      // پیدا کردن userId از session (اختیاری)
      const userId = session.user.id || session.user.sub;

      console.log("Sending data:", {
        userId: userId || "not provided",
        email: formData.email,
        name: formData.name,
      });

      // استفاده از API endpoint جدید
      const response = await fetch("/api/admin/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId || null,
          email: formData.email,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "خطا در بروزرسانی اطلاعات");
      }

      const result = await response.json();

      // بروزرسانی session
      await update({
        name: formData.name,
        email: formData.email,
      });

      toast.success("اطلاعات با موفقیت بروزرسانی شد");

      // پاک کردن فیلدهای رمز عبور
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Update error:", error);
      toast.error("خطا در بروزرسانی: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // اگر session در حال بارگذاری است
  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-amber-50 rounded-xl shadow-xl p-8">
          <div className="flex justify-center items-center">
            <Spinner size="large" />
            <span className="ml-2">در حال بارگذاری...</span>
          </div>
        </div>
      </div>
    );
  }

  // اگر session وجود ندارد
  if (!session) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-amber-50 rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            خطا در بارگذاری پروفایل
          </h2>
          <p className="text-center text-gray-200">لطفاً دوباره وارد شوید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-xl shadow-xl p-8 backdrop-blur-md border border-amber-50">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-300">
          Profile 👤
        </h2>

        <div className="space-y-6">
          {/* نام */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام کامل
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="نام خود را وارد کنید"
              className="w-full"
            />
          </div>

          {/* تغییر رمز عبور */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-400">
              تغییر رمز عبور 🔐
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  رمز عبور جدید
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="رمز عبور جدید"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  تکرار رمز عبور جدید
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="تکرار رمز عبور جدید"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* دکمه ذخیره */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={updateUserProfile}
              disabled={isLoading}
              className="bg-cyan-800 hover:bg-cyan-950 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="small" />
                  در حال ذخیره...
                </div>
              ) : (
                "ذخیره تغییرات 💾"
              )}
            </Button>
          </div>
        </div>

        {/* اطلاعات اضافی */}
        <div className="mt-8 p-4  rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">اطلاعات جاری:</h4>
          <p className="text-sm text-gray-600">
            <strong>نام:</strong> {session?.user?.name || "تنظیم نشده"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>ایمیل:</strong> {session?.user?.email || "تنظیم نشده"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>شناسه:</strong>{" "}
            {session?.user?.id || session?.user?.sub || "نامشخص"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Session Status:</strong> {status}
          </p>
        </div>
      </div>
    </div>
  );
}
