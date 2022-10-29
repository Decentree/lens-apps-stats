import { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Heading, Text, Button, Tabs, Tab, TabList, TabPanels, TabPanel, Link, Center } from "@chakra-ui/react";

import AppData from "../components/AppData";
import AppTable from "../components/AppTable";
import DatePicker from "../components/DatePicker";
import Loading from "../components/Loading";
import PieChart from "../components/PieChart";

import { AppStats, DateRange } from "../types";

const firstToUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const APPS = ["lenster", "orb", "iris", "lenstube", "lumiere", "teaparty"];
const CHART_FIELDS: { name: string; field: keyof AppStats }[] = [
  { name: "posts", field: "totalPosts" },
  { name: "mirrors", field: "totalMirrors" },
  { name: "comments", field: "totalComments" },
];

const AppDataWrapper: React.FC<{ dateRange: DateRange }> = ({ dateRange }) => {
  const [appStats, setAppStats] = useState<Record<string, AppStats>>({});

  useEffect(() => setAppStats({}), [dateRange]);

  const loading = useMemo(() => {
    return !APPS.every((app) => appStats[app] !== undefined);
  }, [appStats]);

  const tableData = useMemo(
    () =>
      loading
        ? null
        : Object.entries(appStats).map(([name, stats]) => ({
            ...stats,
            name: firstToUpperCase(name),
          })),
    [appStats, loading]
  );

  const updateValue = useCallback(
    (app: string) => (data: AppStats) =>
      setAppStats((appStats) => ({
        ...appStats,
        [app]: data,
      })),
    []
  );

  return (
    <>
      {APPS.map((app) => (
        <AppData key={app} app={app} dateRange={dateRange} updateValue={updateValue(app)} />
      ))}
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Rankings</Tab>
          <Tab>Charts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AppTable data={tableData} />
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Center mt={10}>
                <Loading />
              </Center>
            ) : (
              <Flex overflowY="scroll" flexDirection={["column", "column", "row", "row"]}>
                {CHART_FIELDS.map(({ name, field }) => (
                  <PieChart
                    key={field}
                    name={`Apps by ${name}`}
                    labels={APPS.map(firstToUpperCase)}
                    series={APPS.map((app) => appStats[app][field])}
                  />
                ))}
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const Home: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({});

  const reset = () => {
    setDateRange({});
  };

  return (
    <Flex direction="column" alignItems="center" height="100vh">
      <Heading size="xl" pt={20} pb={3}>
        Lens Apps Stats (🌿, 📈)
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Statistics for apps on Lens protocol. Let the race begin!
      </Text>
      <Flex width={["96%", "96%", "70%", "70%"]} height="100%" flexDirection="column" mt={10} position="relative">
        <Flex justifyContent="space-between" width="100%" flexDirection={["column", "column", "row", "row"]} mb={10}>
          <DatePicker onUpdate={setDateRange} reset={reset} />
          <a target="_blank" href="https://tally.so/r/nper6q">
            <Button colorScheme="green" marginTop={[3, 3, 0, 0]}>
              Add app
            </Button>
          </a>
        </Flex>
        <AppDataWrapper dateRange={dateRange} />
        <Flex position={["static", "static", "absolute", "absolute"]} right={0} bottom={5} paddingBottom={5}>
          <Text>Made with ❤️ by&nbsp;</Text>
          <Link href="https://decentree.com/" color="green" isExternal>
            Decentree
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
