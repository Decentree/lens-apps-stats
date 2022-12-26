import { useCallback, useMemo, useState } from "react";
import _ from "lodash";

import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import Loading from "./Loading";
import type { AppTableData } from "../types";

const COLUMNS = ["name", "platform", "totalPosts", "totalMirrors", "totalComments"];

type Column = typeof COLUMNS[number];
type ColumnConfig = { name: string; defaultOrderAscending?: boolean };
type Ordering = { column: Column; ascending: boolean };

const COLUMN_CONFIGS: Record<Column, ColumnConfig> = {
  name: { name: "Name" },
  platform: { name: "Platform" },
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

  const handlePlaform = (name: string) => {
    if (name === "Lenster") {
      return "Web";
    } else if (name === "Lenstube") {
      return "Web";
    } else if (name === "Iris") {
      return "Web";
    } else if (name === "Orb") {
      return "Mobile";
    } else if (name === "Teaparty") {
      return "Web";
    } else if (name === "Lumiere") {
      return "Web";
    } else if (name === "Phaver") {
      return "Mobile";
    } else if (name === "Onboard") {
      return "Mobile";
    } else if (name === "Clipto") {
      return "Web";
    } else if (name === "Memester") {
      return "Web";
    } else if (name === "Buttrfly") {
      return "Mobile";
    } else if (name === "Lensport") {
      return "Web";
    } else if (name === "Lensta") {
      return "Mobile";
    } else if (name === "Superfun") {
      return "Web";
    } else if (name === "Lentil") {
      return "Mobile";
    }
  };

  return (
    <>
      <TableContainer height="517px" overflowY="scroll">
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
                />
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {orderedStats === null ? (
              <Tr>
                <Td colSpan={5}>
                  <Flex justify="center" align="center" h={444}>
                    <Loading />
                  </Flex>
                </Td>
              </Tr>
            ) : (
              orderedStats.map(({ name, totalPosts, totalMirrors, totalComments }) => (
                <Tr key={name} cursor="pointer">
                  <Td>{name}</Td>
                  <Td>{handlePlaform(name)}</Td>
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
