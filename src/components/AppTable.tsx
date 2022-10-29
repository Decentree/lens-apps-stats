import { useCallback, useMemo, useState } from "react";
import _ from "lodash";

import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import Loading from "./Loading";
import type { AppTableData } from "../types";

const COLUMNS = ["name", "totalPosts", "totalMirrors", "totalComments"];

type Column = typeof COLUMNS[number];
type ColumnConfig = { name: string; defaultOrderAscending?: boolean };
type Ordering = { column: Column; ascending: boolean };

const COLUMN_CONFIGS: Record<Column, ColumnConfig> = {
  name: { name: "Name" },
  totalPosts: { name: "Posts", defaultOrderAscending: false },
  totalMirrors: { name: "Mirrors", defaultOrderAscending: false },
  totalComments: { name: "Comments", defaultOrderAscending: false },
};

const OrderingIndicator: React.FC<{ ascending?: boolean }> = ({ ascending }) => {
  switch (ascending) {
    case undefined:
      return <></>;
    case true:
      return <TriangleUpIcon />;
    case false:
      return <TriangleDownIcon />;
  }
};

const ColumnHeader: React.FC<{
  column: Column;
  ascending?: boolean;
  orderable: boolean;
  updateOrdering: () => void;
}> = ({ column, ascending, orderable, updateOrdering }) => {
  return (
    <Th cursor={orderable ? "pointer" : "normal"} onClick={updateOrdering}>
      <Flex gap={3}>
        {COLUMN_CONFIGS[column].name}
        <Box w={3}>
          <OrderingIndicator ascending={ascending} />
        </Box>
      </Flex>
    </Th>
  );
};

const AppTable: React.FC<{ data: AppTableData | null }> = ({ data: appStats }) => {
  const [ordering, setOrdering] = useState<Ordering>({
    column: "totalPosts",
    ascending: false,
  });

  const updateOrdering = useCallback((column: Column) => {
    setOrdering((sortBy) => {
      const columnConfig = COLUMN_CONFIGS[column];
      if (columnConfig.defaultOrderAscending === undefined) {
        return sortBy;
      }
      return {
        column,
        ascending: sortBy.column === column ? !sortBy.ascending : columnConfig.defaultOrderAscending,
      };
    });
  }, []);

  const orderedStats = useMemo(
    () => (appStats === null ? null : _.orderBy(appStats, ordering.column, ordering.ascending ? "asc" : "desc")),
    [appStats, ordering]
  );

  const handleRedirect = (name: string) => {
    if (name === "Lenster") {
      window.open("https://lenster.xyz/", "_blank");
    } else if (name === "Lenstube") {
      window.open("https://lenstube.xyz/", "_blank");
    } else if (name === "Iris") {
      window.open("https://irisapp.xyz/", "_blank");
    } else if (name === "Orb") {
      window.open("https://orb.ac/", "_blank");
    } else if (name === "Teaparty") {
      window.open("https://app.teaparty.life/", "_blank");
    } else {
      window.open("https://lumiere.withlens.app/", "_blank");
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              {COLUMNS.map((column) => (
                <ColumnHeader
                  key={column}
                  column={column}
                  orderable={COLUMN_CONFIGS[column].defaultOrderAscending !== undefined}
                  ascending={ordering.column === column ? ordering.ascending : undefined}
                  updateOrdering={() => updateOrdering(column)}
                  cursor="pointer"
                />
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {orderedStats === null ? (
              <Tr>
                <Td colSpan={4}>
                  <Flex justify="center" align="center" h={280}>
                    <Loading />
                  </Flex>
                </Td>
              </Tr>
            ) : (
              orderedStats.map(({ name, totalPosts, totalMirrors, totalComments }) => (
                <Tr key={name} cursor="pointer" onClick={() => handleRedirect(name)}>
                  <Td>{name}</Td>
                  <Td>{totalPosts}</Td>
                  <Td>{totalMirrors}</Td>
                  <Td>{totalComments}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppTable;
