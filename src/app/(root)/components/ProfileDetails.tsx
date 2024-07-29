"use client";
import Button from "@/components/ui/Button";
import { UpdateProfileInput } from "@/interfaces/user.interface";
import { useAuthStore } from "@/stores/auth.store";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const MAX_FILE_SIZE_MB = 1; // Maximum file size in MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ProfileDetails = () => {
  const { user, updateUserProfile, loadingSave } = useAuthStore();
  const [input, setInput] = useState<UpdateProfileInput>({
    firstName: "",
    lastName: "",
    email: "",
    photoUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setInput({
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setInput((prev) => ({
        ...prev,
        profileUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {
    updateUserProfile(input, selectedFile);
  };

  return (
    <div className="w-full lg:px-10 md:px-6 px-4">
      <div className="space-y-4 my-6">
        <div className="space-x-4">
          <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-5 rounded-xl">
            <div className="flex items-center">
              <label className="block text-sm text-gray-600 mb-2">
                Profile picture
              </label>
            </div>

            <label
              htmlFor="profilePhoto"
              className="relative flex flex-col items-center justify-center h-[193px] aspect-square bg-purple-100 cursor-pointer rounded-xl overflow-hidden text-purple-600 gap-2 group"
            >
              {input.photoUrl ? (
                <>
                  <Image
                    src={input.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <ImageIcon />
                    <span className="font-medium">Change Image</span>
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon />
                  <span className="font-medium">+ Upload Image</span>
                </>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
                id="profilePhoto"
              />
            </label>

            <div className="flex items-center">
              <p className="text-xs text-gray-500 mt-2">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 p-5 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
              <label className="block text-sm text-gray-600">First name</label>
              <input
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
              <label className="block text-sm text-gray-600">Last name</label>
              <input
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={handleInputChange}
                placeholder="Appleseed"
                className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 items-center">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary disabled:text-gray-600"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t py-6 flex justify-end">
        <Button
          variant="solid"
          className="w-full md:w-fit"
          onClick={handleSave}
          disabled={loadingSave}
        >
          {loadingSave ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
