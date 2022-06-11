import React from "react";
import { gql, useMutation } from "@apollo/client";

/**
 * Input type for Mutation
 */
type HolidayAMonthInput = {
  january: Date;
  february: Date;
};

const HOLIDAY_A_MONTH = gql`
  mutation HolidayAMonth($holidays: HolidayAMonthInput!) {
    addHolidays(holidays: $holidays) {
      id
      month
      date
    }
  }
`;

/**
 * Sample data to pass to the mutation
 */
const test: HolidayAMonthInput = {
  january: new Date(),
  february: new Date(),
};

const HolidayAMonth: React.FC = () => {
  const [addHolidays, { loading, error, data }] = useMutation(HOLIDAY_A_MONTH);
  if (error) {
    return <div>Submission Error: ${error.message}</div>;
  }
  if (loading) {
    return <div>Submitting</div>;
  }
  if (data) {
    console.log("Data", data);
  }
  return (
    <div>
      <p>
        An example of a hard coded mutation to try out mutations. Also wanted to
        see what I could do with dates. Dates as string working in UTC seems
        like a great approach.
      </p>
      <button onClick={() => addHolidays({ variables: { holidays: test } })}>
        Add Holidays
      </button>
    </div>
  );
};

export default HolidayAMonth;
