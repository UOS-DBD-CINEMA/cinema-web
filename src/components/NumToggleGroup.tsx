import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type NumToggleGroupProps = {
  maxNum: number;
  selectedNum: number;
  setSelectedNum: React.Dispatch<React.SetStateAction<number>>;
};

export function NumToggleGroup({
  maxNum,
  selectedNum,
  setSelectedNum,
}: NumToggleGroupProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={selectedNum.toString()}
      onValueChange={value => setSelectedNum(Number(value))}
    >
      {[...Array(maxNum + 1).keys()].map(num => (
        <ToggleGroupItem
          key={num}
          value={num.toString()}
          aria-label={num.toString()}
          className="text-md"
        >
          {num}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
