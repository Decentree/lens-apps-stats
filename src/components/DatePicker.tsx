import { useState } from "react";
import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  extendTheme,
} from "@chakra-ui/react";
import {
  Calendar,
  CalendarControls,
  CalendarDays,
  CalendarDefaultTheme,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
} from "@uselessdev/datepicker";

import { DateRange } from "../types";

const calendarTheme = extendTheme(CalendarDefaultTheme, {
  components: {
    Calendar: {
      parts: ["calendar"],

      baseStyle: {
        calendar: {
          borderWidth: "0px",
          width: "100%",
          boxShadow: "none",
        },
      },
    },

    CalendarDay: {
      baseStyle: {
        _hover: {
          bgColor: "gray.700",
        },
        _disabled: {
          color: "gray.500",
        },
      },

      variants: {
        selected: {
          bgColor: "teal.600",
          color: "white",

          _hover: {
            bgColor: "teal.500",
          },
        },

        range: {
          bgColor: "teal.700",
          color: "white",

          _hover: {
            bgColor: "teal.600",
          },

          _disabled: {
            _hover: {
              bgColor: "teal.300",
            },
          },
        },

        today: {
          bgColor: "teal.200",
          _hover: {
            bgColor: "teal.200",
          },
        },
      },
    },
  },
});

const dateRangeToString = ({ start, end }: DateRange) => {
  let result = "";
  if (start !== undefined) {
    result += `${start.toLocaleDateString()}`;
  }
  if (start !== undefined && end !== undefined) {
    result += " ";
  }
  if (end !== undefined) {
    result += `- ${end.toLocaleDateString()}`;
  }
  return result;
};

const DatePickerInner: React.FC<{
  date?: Date;
  disablePastDates?: Date | boolean;
  disableFutureDates?: Date | boolean;
  setDate: (date: Date) => void;
}> = ({ date, setDate, disablePastDates, disableFutureDates }) => {
  return (
    <ChakraProvider theme={calendarTheme}>
      <Calendar
        value={{ start: date }}
        onSelectDate={(date) => setDate(date as Date)}
        singleDateSelection
        disablePastDates={disablePastDates}
        disableFutureDates={disableFutureDates}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>
        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </ChakraProvider>
  );
};

const DatePicker: React.FC<{
  onUpdate: (values: DateRange) => void;
}> = ({ onUpdate }) => {
  const [dateRange, setDateRange] = useState<DateRange>({});

  return (
    <Flex alignItems="center">
      <Popover>
        <PopoverTrigger>
          <Input readOnly cursor="pointer" placeholder="Select range" value={dateRangeToString(dateRange)} />
        </PopoverTrigger>
        <PopoverContent w="min-content">
          <PopoverArrow />
          <PopoverBody mb={4}>
            <Flex direction={{ base: "column", md: "row" }} gap={8}>
              <Flex direction="column" align="center" gap={4}>
                <DatePickerInner
                  date={dateRange.start}
                  setDate={(start) =>
                    setDateRange(({ end }) => ({
                      start,
                      end,
                    }))
                  }
                  disableFutureDates={true}
                />
                <Button onClick={() => setDateRange(({ end }) => ({ end }))}>Clear from</Button>
              </Flex>
              <Flex direction="column" align="center" gap={4}>
                <DatePickerInner
                  date={dateRange.end}
                  setDate={(end) =>
                    setDateRange(({ start }) => ({
                      start,
                      end,
                    }))
                  }
                  disablePastDates={dateRange.start}
                  disableFutureDates
                />
                <Button onClick={() => setDateRange(({ start }) => ({ start }))}>Clear to</Button>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button
        colorScheme="green"
        disabled={dateRange.start === undefined || dateRange.end === undefined}
        variant="ghost"
        ml={2}
        onClick={() => onUpdate(dateRange)}>
        Load
      </Button>
    </Flex>
  );
};

export default DatePicker;
