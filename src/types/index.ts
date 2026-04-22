export type Rank = "BRONZE" | "SILVER" | "GOLD";
export interface CustomerI {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  rank: Rank;
  totalSpending: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}