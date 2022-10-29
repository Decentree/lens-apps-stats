import { useEffect } from "react";

import { gql, useQuery } from "@apollo/client";
import { AppStats, DateRange, GlobalProtocolStatsData, GlobalProtocolStatsRequest } from "../types";

const GLOBAL_PROTOCOL_STATS = gql`
  query globalProtocolStats($request: GlobalProtocolStatsRequest) {
    globalProtocolStats(request: $request) {
      totalPosts
      totalMirrors
      totalComments
    }
  }
`;

const toUnix = (date: Date) => date.getTime() / 1000;

const AppData: React.FC<{
  app: string;
  dateRange: DateRange;
  updateValue: (data: AppStats) => void;
}> = ({ app, dateRange, updateValue }) => {
  const { loading, data, refetch } = useQuery<GlobalProtocolStatsData, GlobalProtocolStatsRequest>(
    GLOBAL_PROTOCOL_STATS,
    {
      variables: {
        request: {
          sources: [app],
          fromTimestamp: dateRange.start === undefined ? undefined : toUnix(dateRange.start),
          toTimestamp: dateRange.end === undefined ? undefined : toUnix(dateRange.end),
        },
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [dateRange, refetch]);

  useEffect(() => {
    if (loading) return;
    if (data === undefined) return;
    updateValue(data.globalProtocolStats);
  }, [loading, data]);

  return null;
};

export default AppData;
