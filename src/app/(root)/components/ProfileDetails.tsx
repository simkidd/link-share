import Button from "@/components/ui/Button";
import { Image } from "lucide-react";
import React from "react";

const ProfileDetails = () => {
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

            <div className="flex flex-col items-center justify-center h-[193px] aspect-square bg-purple-100 cursor-pointer rounded-xl text-purple-600 gap-2">
              <Image />
              <span className="font-medium">+ Upload Image</span>
            </div>

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
                placeholder="John"
                className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
              <label className="block text-sm text-gray-600">Last name</label>
              <input
                type="text"
                placeholder="Appleseed"
                className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 items-center">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="md:col-span-2 w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t py-6 flex justify-end">
        <Button variant="solid" className="w-full md:w-fit">
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
