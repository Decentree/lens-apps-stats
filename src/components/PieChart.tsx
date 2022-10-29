import { Flex, Heading } from "@chakra-ui/react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart: React.FC<{
  labels: string[];
  series: number[];
  name: string;
}> = ({ labels, series, name }) => {
  return (
    <Flex direction="column" align="center" mt={10}>
      <Chart
        series={series}
        options={{
          chart: {
            width: 305,
            type: "pie",
          },
          labels,
          legend: { labels: { useSeriesColors: true } },
        }}
        type="pie"
        width="305px"
      />
      <Heading size="sm" mt={5}>
        {name}
      </Heading>
    </Flex>
  );
};

export default PieChart;
