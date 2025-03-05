import React from "react";

interface TextAreaInputProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
    formData,
    handleInputChange,
    label,
    name,
    placeholder = label,
    rows = 3,
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    );
};