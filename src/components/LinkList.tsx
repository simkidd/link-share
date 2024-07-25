"use client"
import {
  CreateLinkInput,
  Link,
  UpdateLinkInput,
} from "@/interfaces/link.interface";
import { useLinkStore } from "@/stores/link.store";
import React, { useState, useEffect } from "react";

const platforms = [
  "GitHub",
  "YouTube",
  "LinkedIn",
  "Facebook",
  "Frontend Mentor",
];

const LinkList = () => {
  const { links, addLink, updateLink, deleteLink, fetchLinks } = useLinkStore();
  const [newLinks, setNewLinks] = useState<CreateLinkInput[]>([]);
  const [editingLinks, setEditingLinks] = useState<UpdateLinkInput[]>([]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleAddLinkForm = () => {
    setNewLinks([...newLinks, { platform: "", url: "" }]);
  };

  const handleSaveLinks = async () => {
    for (const newLink of newLinks) {
      await addLink(newLink);
    }
    setNewLinks([]);
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
    setNewLinks(newLinks.filter((_, i) => i !== index));
  };

  const handleChangeEditing = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const updatedLinks = editingLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setEditingLinks(updatedLinks);
  };

  const handleSaveEditingLinks = async () => {
    for (const link of editingLinks) {
      await updateLink(link);
    }
    setEditingLinks([]);
  };

  const handleEditLink = (link: Link) => {
    setEditingLinks([...editingLinks, link]);
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-xl mx-auto">
      <h1 className="text-2xl mb-2">Customize your links</h1>
      <p className="text-lg mb-5">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        onClick={handleAddLinkForm}
        className="bg-indigo-600 text-white py-2 px-4 rounded mb-5"
      >
        + Add new link
      </button>
      <ul className="w-full">
        {links.map((link, index) => (
          <li
            key={link.id}
            className="flex flex-col mb-4 p-4 border border-gray-300 rounded"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg">Link #{index + 1}</span>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
            <label className="flex flex-col mb-2">
              Platform
              <select
                value={link.platform}
                onChange={(e) =>
                  handleChangeEditing(index, "platform", e.target.value)
                }
                className="p-2 mt-1 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select platform
                </option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col">
              Link
              <input
                type="text"
                value={link.url}
                onChange={(e) =>
                  handleChangeEditing(index, "url", e.target.value)
                }
                placeholder="e.g. https://www.example.com"
                className="p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </li>
        ))}
        {newLinks.map((link, index) => (
          <li
            key={index}
            className="flex flex-col mb-4 p-4 border border-gray-300 rounded"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg">Link #{links.length + index + 1}</span>
              <button
                onClick={() => handleRemoveNewLink(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
            <label className="flex flex-col mb-2">
              Platform
              <select
                value={link.platform}
                onChange={(e) =>
                  handleChangeNew(index, "platform", e.target.value)
                }
                className="p-2 mt-1 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select platform
                </option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col">
              Link
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleChangeNew(index, "url", e.target.value)}
                placeholder="e.g. https://www.example.com"
                className="p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </li>
        ))}
      </ul>
      {(newLinks.length > 0 || editingLinks.length > 0) && (
        <button
          onClick={handleSaveLinks}
          className={`bg-indigo-600 text-white py-2 px-4 rounded mt-5 ${
            newLinks.some((link) => !link.platform || !link.url)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={newLinks.some((link) => !link.platform || !link.url)}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default LinkList;
