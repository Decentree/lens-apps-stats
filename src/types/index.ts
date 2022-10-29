export type GlobalProtocolStatsRequest = {
  request: { sources: string[]; fromTimestamp?: number; toTimestamp?: number };
};

export type AppStats = {
  totalPosts: number;
  totalMirrors: number;
  totalComments: number;
};

export type GlobalProtocolStatsData = {
  globalProtocolStats: AppStats;
};

export type DateRange = {
  start?: Date;
  end?: Date;
};

export type AppTableData = Array<AppStats & { name: string }>;
