import React, { MouseEventHandler, useState } from "react";

/**
 * The start of a calendar example
 * Improvements:
 * 1. Wrap component in context exosing selected Month and setSelectedMonth, no longer have to pass through components
 */
const CalendarOne: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");
  return (
    <div className="space-y-3">
      <div className="font-bold text-xl text-center">2022</div>
      <div className="flex flex-col-12 justify-between px-10  p-2">
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Jan")}
          label="Jan"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Feb")}
          label="Feb"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Mar")}
          label="Mar"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Apr")}
          label="Apr"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("May")}
          label="May"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("June")}
          label="June"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("July")}
          label="July"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Aug")}
          label="Aug"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Sept")}
          label="Sept"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Oct")}
          label="Oct"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Nov")}
          label="Nov"
        />
        <MonthHeading
          selectedMonth={selectedMonth}
          handleClick={() => setSelectedMonth("Dec")}
          label="Dec"
        />
      </div>
      <div className="p-3 space-y-3">
        <h1 className="text-2xl ">{selectedMonth} Information</h1>
        <p>
          You have selected the month {selectedMonth}. If you want to add
          additional data please click here.
        </p>
      </div>
    </div>
  );
};

const MonthHeading: React.FC<{
  label: string;
  selectedMonth: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
}> = ({ label, handleClick, selectedMonth }) => {
  return (
    <div
      className={`border-b-2 ${
        selectedMonth === label ? "border-b-purple-600" : "border-b-purple-300"
      }  px-2 font-bold hover:cursor-pointer hover:border-b-purple-600`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default CalendarOne;
