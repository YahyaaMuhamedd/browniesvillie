import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { SelectInput } from "./selectInput";
import { TextAreaInput } from "./textArea";
import { Input } from "./textInput";

interface SelectInputByTypeProps {
    fieldName: string;
    fieldData: { type: string; value: any, options: { label: string; value: string }[] };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (fieldName: string, selectedOption: string | null) => void;
}

export const SelectInputByType: React.FC<SelectInputByTypeProps> = ({
    fieldName,
    fieldData,
    handleInputChange,
    handleSelectChange,
}) => {
    const { type, value, options } = fieldData;

    switch (type) {
        case "text":
            return (
                <Input
                    formData={value}
                    handleInputChange={handleInputChange}
                    type="text"
                    label={capitalizeFirstLetter(fieldName)}
                    name={fieldName}
                    placeholder={`Enter your ${fieldName}`}
                />
            );
        case "textarea":
            return (
                <TextAreaInput
                    formData={value}
                    handleInputChange={handleInputChange}
                    label={capitalizeFirstLetter(fieldName)}
                    name={fieldName}
                    placeholder={`Enter your ${fieldName}`}
                />
            );
        case "select":
            console.log("Rendering SelectInput with:", { fieldName, value, options });
            return (
                <SelectInput
                    label={capitalizeFirstLetter(fieldName)}
                    name={fieldName}
                    value={value}
                    handleSelectChange={(selectedValue) => handleSelectChange(fieldName, selectedValue || "")}
                    options={options || []}
                />
            );
        default:
            return (
                <Input
                    formData={value}
                    handleInputChange={handleInputChange}
                    type={type}
                    label={capitalizeFirstLetter(fieldName)}
                    name={fieldName}
                    placeholder={`Enter your ${fieldName}`}
                />
            );
    }
};