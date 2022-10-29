import { AppStats, DateRange, GlobalProtocolStatsData, GlobalProtocolStatsRequest } from "../types";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

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
  shouldUpdate: boolean;
}> = ({ app, dateRange, updateValue, shouldUpdate }) => {
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
    if (loading || !shouldUpdate || data === undefined) return;
    updateValue(data.globalProtocolStats);
  }, [loading, data, shouldUpdate]);

  return null;
};

export default AppData;
