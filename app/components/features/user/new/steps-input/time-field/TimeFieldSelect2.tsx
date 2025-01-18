import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

type TimeFieldSelectProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
};

export const TimeFieldSelect2 = ({
  label,
  value,
  onValueChange,
  options,
}: TimeFieldSelectProps) => (
  <div className="w-1/2">
    <label
      htmlFor={`${label.toLowerCase()}-select`}
      className="text-muted-foreground mb-1 block text-xs font-medium"
    >
      {label}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={`${label.toLowerCase()}-select`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent side="bottom">
        {options.map((option, index) => (
          <SelectItem key={`${option}-${index}`} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
