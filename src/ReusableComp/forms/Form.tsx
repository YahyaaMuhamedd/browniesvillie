import React from "react";
import { SelectInputByType } from "./selectInputByType";
import Button from "../Button";

interface FormField {
    type: string; // "text", "email", "number", "textarea", "select"
    name: string;
    label: string;
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select inputs
}

interface FormProps {
    formData: Record<string, any>; // Form data state
    fields: FormField[]; // Explicit field configuration
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (fieldName: string, selectedOption: string | null) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors?: Record<string, string>; // Validation errors
    cssClasses?: string; // Custom CSS classes for the form
    children?: React.ReactNode; // Additional content (e.g., custom fields, buttons)
    options?: { label: string; value: string }[];
}

export const Form: React.FC<FormProps> = ({
    formData,
    fields,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    errors,
    cssClasses,
    children,
}) => {
    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${cssClasses || ""}`}>
            {fields.map((field) => (
                <div key={field.name}>
                    <SelectInputByType
                        fieldName={field.name}
                        fieldData={{
                            type: field.type,
                            value: formData[field.name] || "", // Corrected this
                            options: field.options || []
                        }}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                    />
                    {errors && errors[field.name] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            {children}

            <Button
                buttonName="Submit Order"
                cssClasses="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                type="submit"
            />
        </form>
    );
};