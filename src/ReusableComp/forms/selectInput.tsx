import Select from "react-select";

export interface SelectInputProps {
    label: string;
    name: string;
    value: string;
    options: { label: string; value: string }[];
    isRequired?: boolean;
    handleSelectChange: (selectedOption: string | null) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    value,
    options,
    isRequired = true,
    handleSelectChange
}) => {
    const selectedOption = options.find(option => option.value === value) || null;

    return (
        <>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Select
                name={name}
                value={selectedOption} // Ensure this is an object, not a string
                onChange={(option) => handleSelectChange(option ? option.value : "")}
                options={options}
                className="mt-1"
                required={isRequired}
            />
        </>
    );
};