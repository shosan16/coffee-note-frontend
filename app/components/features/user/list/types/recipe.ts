export type Recipe = {
  id: number;
  name: string;
  bean_amount: number;
  water_temperature: number;
  water_amount: number;
  grinder_name: string | null;
  dripper_name: string;
  description: string;
  roast_level: string;
  grind_level: string;
};
