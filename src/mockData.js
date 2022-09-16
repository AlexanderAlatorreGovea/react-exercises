import { format, parse } from "date-fns";

export const mockData = [
  {
    id: "1",
    name: "Lucas",
    favoriteFood: "Lasagna",
    dateOfBirth: "1901-01-23",
  },
  {
    id: "2",
    name: "Larry",
    favoriteFood: "Pizza",
    dateOfBirth: "1902-02-15",
  },
  {
    id: "3",
    name: "Josh",
    favoriteFood: "Tacos",
    dateOfBirth: "1922-03-15",
  },
  {
    id: "4",
    name: "Larry",
    favoriteFood: "Reguetoni",
    dateOfBirth: "1923-03-15",
  },
  {
    id: "5",
    name: "Laurance",
    favoriteFood: "Penne",
    dateOfBirth: "1924-03-15",
  },
  {
    id: "6",
    name: "Jake",
    favoriteFood: "Salad",
    dateOfBirth: "1922-05-15",
  },
  {
    id: "7",
    name: "Jeff",
    favoriteFood: "Ramen",
    dateOfBirth: "1932-03-15",
  },
  {
    id: "8",
    name: "Alex",
    favoriteFood: "Burgers",
    dateOfBirth: "1972-03-15",
  },
  {
    id: "9",
    name: "Trent",
    favoriteFood: "Tiramisu",
    dateOfBirth: "1922-08-15",
  },
  {
    id: "10",
    name: "Josh",
    favoriteFood: "Tacos",
    dateOfBirth: "1922-03-15",
  },
];

export const COLUMNS = [
  {
    accessor: "id",
    label: "ID",
  },
  {
    accessor: "name",
    label: "Name",
  },
  {
    accessor: ({ dateOfBirth }) =>
      format(parse(dateOfBirth, "yyyy-MM-dd", new Date()), "do MMMM yyyy"),
    label: "Date of Birth",
  },
  // {
  //   accessor: ({ dateOfBirth }) => (
  //     <span>
  //       {format(parse(dateOfBirth, "yyyy-MM-dd", new Date()), "do MMMM yyyy")}
  //       <button>Edit</button>
  //     </span>
  //   ),
  //   label: "Date of Birth",
  // },
  {
    accessor: "favoriteFood",
    label: "Favorite Food",
  },
];
