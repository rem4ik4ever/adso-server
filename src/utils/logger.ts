import moment from "moment";

export const logger = (args: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`${moment().format("LLL")}: `, args);
  }
};
