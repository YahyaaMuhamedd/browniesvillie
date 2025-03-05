import React from "react";

interface InputProps {
    formData: any; // Replace `any` with a specific type if possible
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
    name: string;
    placeholder?: string; // Optional prop
    required?: boolean; // Optional prop
}

export const Input: React.FC<InputProps> = ({
    formData,
    handleInputChange,
    type,
    label,
    name,
    placeholder = label, // Default placeholder to label if not provided
    required = true, // Default to true if not provided
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

