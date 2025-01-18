type TimeFieldSelectProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
};

export const TimeFieldSelect = ({
  label,
  selectedValue,
  onValueChange,
  options,
}: TimeFieldSelectProps) => {
  const handleValueChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={`${label}-select`}
        className="mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={`${label}-select`}
        value={selectedValue}
        onChange={(e) => handleValueChange(e.target.value)}
        className="block rounded border border-gray-300 bg-white p-2 pr-8 shadow-sm transition-colors duration-200 hover:border-gray-400 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
      >
        {options.map((option, index) => (
          <option key={`option-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
