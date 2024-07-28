"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  CreateLinkInput,
  Link,
  UpdateLinkInput,
} from "@/interfaces/link.interface";
import { useLinkStore } from "@/stores/link.store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import {
  FaCodepen,
  FaFacebook,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaPenToSquare,
  FaPlus,
  FaYoutube,
} from "react-icons/fa6";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import SkeletonLinkItem from "./SkeletonLinkItem";
import * as Yup from "yup";
import Placeholder from "./Placeholder";

const platforms = [
  { value: "GitHub", label: "GitHub", icon: <FaGithub /> },
  { value: "YouTube", label: "YouTube", icon: <FaYoutube /> },
  { value: "LinkedIn", label: "LinkedIn", icon: <FaLinkedin /> },
  { value: "Facebook", label: "Facebook", icon: <FaFacebook /> },
  { value: "Frontend Mentor", label: "Frontend Mentor", icon: <FaCodepen /> },
];

const urlSchema = Yup.string().url("Invalid URL").required("URL is required");

interface ValidationError {
  index?: number;
  id?: string;
  errors: string[];
}

const LinkList = () => {
  const {
    links,
    addLink,
    updateLink,
    deleteLink,
    fetchLinks,
    loading,
    loadingSave,
  } = useLinkStore();
  const [newLinks, setNewLinks] = useState<CreateLinkInput[]>([]);
  const [editingLinks, setEditingLinks] = useState<UpdateLinkInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchLinks();
      setIsLoading(false);
    };
    fetchData();
  }, [fetchLinks]);

  const handleAddLinkForm = () => {
    setNewLinks([...newLinks, { platform: "", url: "" }]);
  };

  const handleSaveLinks = async () => {
    const errors: ValidationError[] = [];

    for (let index = 0; index < newLinks.length; index++) {
      const link = newLinks[index];
      try {
        await urlSchema.validate(link.url, { abortEarly: false });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          errors.push({
            index,
            errors: err.errors,
          });
        }
      }
    }

    for (let i = 0; i < editingLinks.length; i++) {
      const link = editingLinks[i];
      try {
        await urlSchema.validate(link.url, { abortEarly: false });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          errors.push({
            id: link.id,
            errors: err.errors,
          });
        }
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const saveNewLinksPromises = newLinks
      .filter((link) => link.platform && link.url)
      .map((link) => addLink(link));

    const saveEditingLinksPromises = editingLinks
      .filter((link) => link.platform && link.url)
      .map((link) => updateLink(link));

    await Promise.all([...saveNewLinksPromises, ...saveEditingLinksPromises]);

    setNewLinks([]);
    setEditingLinks([]);
    setValidationErrors([]); // Clear errors after successful save
    fetchLinks(); // Refresh the list after saving
  };

  const handleChangeNew = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const updatedLinks = newLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setNewLinks(updatedLinks);
  };

  const handleRemoveNewLink = (index: number) => {
    setValidationErrors([]);
    setNewLinks(newLinks.filter((_, i) => i !== index));
  };

  const handleChangeEditing = (
    id: string,
    field: "platform" | "url",
    value: string
  ) => {
    const updatedLinks = editingLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setEditingLinks(updatedLinks);
  };

  const handleEditLink = (link: Link) => {
    if (!editingLinks.find((editLink) => editLink.id === link.id)) {
      setEditingLinks([...editingLinks, { ...link }]);
    }
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
    setValidationErrors([]);
    fetchLinks(); // Refresh the list after deleting
  };

  const isSaveDisabled = () => {
    const hasInvalidNewLinks = newLinks.some(
      (link) => !link.platform || !link.url
    );
    const hasInvalidEditingLinks = editingLinks.some(
      (link) => !link.platform || !link.url
    );
    return hasInvalidNewLinks || hasInvalidEditingLinks || loadingSave;
  };

  return (
    <div className="w-full">
      <div className="w-full lg:px-10 md:px-6 px-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full justify-center mb-6 font-medium"
          onClick={handleAddLinkForm}
        >
          <FaPlus />
          Add New Link
        </Button>
      </div>

      {isLoading ? (
        <div className="my-6 lg:px-10 md:px-6 px-4">
          <SkeletonLinkItem />
        </div>
      ) : (
        <div className="my-6 lg:px-10 md:px-6 px-4">
          {links.length === 0 && newLinks.length === 0 && (
            <>
              <Placeholder />
            </>
          )}
          <ul className="w-full space-y-6">
            {links.map((link, index) => (
              <li
                key={link.id}
                className="p-5 bg-[#fafafa] border-gray-100 border rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-bold">Link #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditLink(link)}
                      className="text-primary flex items-center gap-1 text-base"
                    >
                      <FaPenToSquare />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-red-500 flex items-center gap-1 text-base"
                    >
                      <FaTimesCircle />
                      Remove
                    </button>
                  </div>
                </div>
                {editingLinks.find((editLink) => editLink.id === link.id) ? (
                  <>
                    <label className="flex flex-col text-[12px]">
                      Platform
                    </label>
                    <div className="mb-3">
                      <Select
                        options={platforms}
                        value={
                          editingLinks.find(
                            (editLink) => editLink.id === link.id
                          )?.platform || ""
                        }
                        onChange={(value) =>
                          handleChangeEditing(link.id, "platform", value)
                        }
                      />
                    </div>

                    <label className="flex flex-col text-[12px]">Link</label>
                    <div className="relative mt-1">
                      <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={
                          editingLinks.find(
                            (editLink) => editLink.id === link.id
                          )?.url || ""
                        }
                        onChange={(e) =>
                          handleChangeEditing(link.id, "url", e.target.value)
                        }
                        placeholder="https://yourlink.com"
                        className={`p-2 pl-10 border border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg w-full ${
                          validationErrors.some((error) => error.id === link.id)
                            ? "border-red-500"
                            : ""
                        }`}
                      />

                      {validationErrors.find(
                        (error) => error.id === link.id
                      ) && (
                        <p className="text-red-500 text-sm absolute right-4 top-1/2 transform -translate-y-1/2">
                          {validationErrors
                            .find((error) => error.id === link.id)
                            ?.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <label className="flex flex-col text-[12px]">
                      Platform
                    </label>
                    <div className="relative mb-3 mt-1">
                      {renderIconByPlatform(link.platform)}
                      <input
                        type="text"
                        value={link.platform}
                        className="p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none text-gray-500"
                        readOnly
                      />
                    </div>

                    <label className="flex flex-col text-[12px]">Link</label>
                    <div className="relative mt-1">
                      <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={link.url}
                        className="p-2 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none text-gray-500"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </li>
            ))}
            {/* adding new link */}
            {newLinks.map((link, index) => (
              <li
                key={index}
                className="flex flex-col mb-4 p-4 border bg-[#fafafa] border-gray-100 rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-bold">
                    Link #{links.length + index + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveNewLink(index)}
                    className="text-red-500 flex items-center gap-1 text-base"
                  >
                    <FaTimesCircle />
                    Remove
                  </button>
                </div>
                <label className="flex flex-col text-[12px]">Platform</label>
                <div className="mb-3">
                  <Select
                    options={platforms}
                    value={link.platform}
                    onChange={(e) => handleChangeNew(index, "platform", e)}
                  />
                </div>
                <label className="flex flex-col text-[12px]">Link</label>
                <div className="relative mt-1">
                  <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700" />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      handleChangeNew(index, "url", e.target.value)
                    }
                    placeholder="https://www.example.com"
                    className={`p-2 pl-10 border border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg w-full ${
                      validationErrors.some((error) => error.index === index)
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {validationErrors.find((error) => error.index === index) && (
                    <p className="text-red-500 text-sm absolute right-4 top-1/2 transform -translate-y-1/2">
                      {validationErrors
                        .find((error) => error.index === index)
                        ?.errors.join(", ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="w-full lg:px-10 md:px-6 px-4 border-t py-6 flex justify-end">
        {(newLinks.length > 0 || editingLinks.length > 0) && (
          <Button
            variant="solid"
            onClick={handleSaveLinks}
            disabled={isSaveDisabled()}
            className="w-full md:w-fit"
          >
            {loadingSave ? "Saving..." : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LinkList;

const renderIconByPlatform = (platform: string) => {
  switch (platform) {
    case "GitHub":
      return (
        <FaGithub className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
    case "YouTube":
      return (
        <FaYoutube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
    case "LinkedIn":
      return (
        <FaLinkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
    case "Facebook":
      return (
        <FaFacebook className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
    case "Frontend Mentor":
      return (
        <FaCodepen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
    default:
      return (
        <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      );
  }
};
