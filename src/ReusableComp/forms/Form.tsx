import React from "react";
import { SelectInputByType } from "./selectInputByType";
import Button from "../Button";

interface FormField {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
}

interface FormProps {
    formData: Record<string, any>;
    fields: FormField[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonName: string
    handleSelectChange: (fieldName: string, selectedOption: string | null) => void;
    errors?: Record<string, string>;
    cssClasses?: string;
    children?: React.ReactNode;
    options?: { label: string; value: string }[];
    BtnCssClasses?: string
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
    buttonName,
    BtnCssClasses
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
                        label={field.label}
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
                buttonName={buttonName}
                type="submit"
                handleclick={() => { }}
                cssClasses={BtnCssClasses}
            />
        </form>
    );
};