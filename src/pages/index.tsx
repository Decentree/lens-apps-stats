import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Link,
  Center,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import AppData from "../components/AppData";
import AppTable from "../components/AppTable";
import DatePicker from "../components/DatePicker";
import Loading from "../components/Loading";
import PieChart from "../components/PieChart";

import { AppStats, DateRange } from "../types";

import { FaGithub } from "react-icons/fa";

const firstToUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const CHART_FIELDS: { name: string; field: keyof AppStats }[] = [
  { name: "posts", field: "totalPosts" },
  { name: "mirrors", field: "totalMirrors" },
  { name: "comments", field: "totalComments" },
];

const AppDataWrapper: React.FC<{ dateRange: DateRange }> = ({ dateRange }) => {
  const [appStats, setAppStats] = useState<Record<string, AppStats>>({});
  const [apps, setApps] = useState<string>("all");

  useEffect(() => setAppStats({}), [dateRange, apps]);

  const APPS =
    apps === "all"
      ? [
          "lenster",
          "orb",
          "iris",
          "lenstube",
          "lumiere",
          "teaparty",
          "phaver",
          "onboard",
          "clipto",
          "memester",
          "buttrfly",
          "superfun",
          "lensta",
          "lensport",
          "lentil",
          "amnisiac",
        ]
      : apps === "web"
      ? ["lenster", "iris", "lenstube", "lumiere", "teaparty", "clipto", "memester", "superfun", "lensport", "amnisiac"]
      : ["orb", "phaver", "onboard", "buttrfly", "lensta", "lentil"];

  const loading = useMemo(() => {
    return !APPS.every((app) => appStats[app] !== undefined);
  }, [appStats, apps]);

  const tableData = useMemo(
    () =>
      loading
        ? null
        : Object.entries(appStats).map(([name, stats]) => ({
            ...stats,
            name: firstToUpperCase(name),
          })),
    [appStats, loading, APPS]
  );

  const updateValue = useCallback(
    (app: string) => (data: AppStats) =>
      setAppStats((stats) => ({
        ...stats,
        [app]: data,
      })),
    []
  );

  return (
    <>
      {APPS.map((app) => (
        <AppData
          key={app}
          app={app}
          dateRange={dateRange}
          updateValue={updateValue(app)}
          shouldUpdate={appStats[app] === undefined}
        />
      ))}
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Rankings</Tab>
          <Tab>Charts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Flex mb={1} flexDirection="row" gap={3}>
                <Button
                  variant="solid"
                  onClick={() => setApps("all")}
                  colorScheme={apps === "all" ? "green" : "gray"}
                  h="35px">
                  All
                </Button>
                <Button
                  variant="solid"
                  onClick={() => setApps("web")}
                  colorScheme={apps === "web" ? "green" : "gray"}
                  h="35px">
                  Web
                </Button>
                <Button
                  variant="solid"
                  onClick={() => setApps("mobile")}
                  colorScheme={apps === "mobile" ? "green" : "gray"}
                  h="35px">
                  Mobile
                </Button>
              </Flex>
              <AppTable data={tableData} />
            </Box>
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Center mt={10}>
                <Loading />
              </Center>
            ) : (
              <Box>
                <Flex mb={1} flexDirection="row" gap={3}>
                  <Button
                    variant="solid"
                    onClick={() => setApps("all")}
                    colorScheme={apps === "all" ? "green" : "gray"}
                    h="35px">
                    All
                  </Button>
                  <Button
                    variant="solid"
                    onClick={() => setApps("web")}
                    colorScheme={apps === "web" ? "green" : "gray"}
                    h="35px">
                    Web
                  </Button>
                  <Button
                    variant="solid"
                    onClick={() => setApps("mobile")}
                    colorScheme={apps === "mobile" ? "green" : "gray"}
                    h="35px">
                    Mobile
                  </Button>
                </Flex>
                <Flex overflowY="scroll" justifyContent="center" flexDirection={["column", "column", "row", "row"]}>
                  {CHART_FIELDS.map(({ name, field }) => (
                    <PieChart
                      key={field}
                      name={`Apps by ${name}`}
                      labels={APPS.map(firstToUpperCase)}
                      series={APPS.map((app) => appStats[app][field])}
                    />
                  ))}
                </Flex>
              </Box>
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
      <Heading size="xl" pt="20px" pb={3} px={3}>
        Lens Apps Stats (????, ????)
      </Heading>
      <Flex alignItems="center" px={3}>
        <Text fontSize="lg" textAlign="center" mr={2}>
          Statistics for apps on Lens Protocol. Let the race begin!
        </Text>
        <Tooltip label="Data are from the official Lens GraphQL API" placement="bottom">
          <InfoOutlineIcon />
        </Tooltip>
      </Flex>
      <Flex width={["96%", "96%", "80%", "80%"]} height="100%" flexDirection="column" mt={3} position="relative">
        <Flex justifyContent="space-between" width="100%" flexDirection={["column", "column", "row", "row"]} mb={2}>
          <DatePicker onUpdate={setDateRange} reset={reset} />
          <a target="_blank" href="https://tally.so/r/nper6q">
            <Button colorScheme="green" marginTop={[3, 3, 0, 0]}>
              Add app
            </Button>
          </a>
        </Flex>
        <AppDataWrapper dateRange={dateRange} />
        <Flex position={["static", "static", "absolute", "absolute"]} left={0} bottom={4}>
          <a href="https://github.com/Decentree/lens-apps-stats" target="_blank">
            <FaGithub size={24} />
          </a>
        </Flex>
        <Flex
          position={["static", "static", "absolute", "absolute"]}
          right={0}
          bottom={4}
          paddingBottom={[10, 10, 0, 0]}
          marginTop={2}>
          <Text>Made with ?????? by&nbsp;</Text>
          <Link href="https://decentree.com/" color="green" isExternal>
            Decentree
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
