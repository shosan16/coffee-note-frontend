type TimeFieldSelectProps = {
  label: string;
  selectedValue: number;
  onValueChange: (value: string) => void;
  options: string[];
};

export const TimeFieldSelect = ({
  label,
  selectedValue,
  onValueChange,
  options,
}: TimeFieldSelectProps) => (
  <div className="flex flex-col">
    <label htmlFor={`${label}-select`} className="mb-1 text-sm font-medium">
      {label}
    </label>
    <select
      id={`${label}-select`}
      value={String(selectedValue).padStart(2, '0')}
      onChange={(e) => onValueChange(e.target.value)}
      className="block rounded border border-gray-300 p-2 pr-8 text-black shadow-sm transition-colors duration-200 hover:border-gray-400 focus:outline-none sm:text-sm"
    >
      {options.map((option, index) => (
        <option key={`option-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
