import schedule from "node-schedule";
import moment from "moment";

interface ExpressionObjInterfaceNonRepetitive {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  message: string;
}

interface ExpressionObjInterfaceRepetitive {
  expression: string;
  message: string;
}

/**
 * @function RepetitiveTask - Schedule a repetitive task using a cron expression.
 * @param {string} expression - The cron expression that specifies the schedule for the task.
 * @param {string} message - The message that will be logged to the console each time the task is run.
 * @param {string} phone - The phone number associated with the task.
*/
const RepetitiveTask = (expression: string, message: string,phone:string) => {
  const job = schedule.scheduleJob(expression, () => {
    console.log(message);
  });
};


/**
 * @function NonRepetitiveTask - Schedule a non-repetitive task to run once at a specific date and time
 * @param {number} year - The year of the scheduled task
 * @param {number} month - The month of the scheduled task (0-11)
 * @param {number} day - The day of the scheduled task (1-31)
 * @param {number} hour - The hour of the scheduled task (0-23)
 * @param {number} minute - The minute of the scheduled task (0-59)
 * @param {string} message - The message that will be logged to the console when the task is run
 * @param {string} phone - The phone number associated with the task.
*/
const NonRepetitiveTask = (
  year = 0,
  month = 0,
  day = 0,
  hour = 0,
  minute = 0,
  message: string,
  phone : string
  ) => {
  const rule = new schedule.RecurrenceRule();

  // year
  const yyyy = year;
  // month
  const MM = month;
  // day
  const dd = day;
  // hour
  const hh = hour;
  // minute
  const mm = minute;

  let t = `${yyyy}-${MM}-${dd} ${hh}:${mm}:00`;
  let format = "YYYY-MM-DD HH:mm:ss";
  const time = moment(t, format);
  rule.tz = "Asia/Kolkata";
  rule.year = time.year();
  rule.month = time.month();
  rule.date = time.date();
  rule.hour = time.hours();
  rule.minute = time.minutes();
  rule.second = time.seconds();

  schedule.scheduleJob(rule, async function () {
    console.log(message);
  });
};



/**
 * @function CronExpressioHandler - Handle a cron expression and schedule a task based on the expression type
 * @param {string} response - The response string that contains the cron expression and task details
 * @param {string} phone - The phone number associated with the task.
*/
const CronExpressioHandler = (response: string,phone:string) => {
  /**
   * This code block checks if the string response starts with "SETNRE".
   * If it does, the function extracts the main string by removing the first 6 characters of the response string.
   * The main string is then parsed into a JavaScript object using JSON.parse() function. The resulting object conforms to the ExpressionObjInterfaceNonRepetitive interface.
   * The year, month, day, hour, and minute properties of the object are destructured into separate variables.
   * Finally, the NonRepetitiveTask function is called, passing in the year, month, day, hour, minute, message, and phone number properties of the object as parameters to create a non-repetitive task.
   */
  if (response.startsWith("SETNRE")) {
    const mainStr = response.substring(6);
    const obj: ExpressionObjInterfaceNonRepetitive = JSON.parse(mainStr);
    const { year, month, day, hour, minute } = obj;
    NonRepetitiveTask(year, month, day, hour, minute, obj.message,phone);
  }

  /**
   * This code block checks if the string response starts with "SETRE".
   * If it does, the function extracts the main string by removing the first 5 characters of the response string.
   * The main string is then parsed into a JavaScript object using JSON.parse() function. The resulting object conforms to the ExpressionObjInterfaceRepetitive interface.
   * Finally, the RepetitiveTask function is called, passing in the expression, message, and phone number properties of the object as parameters to create a repetitive task.
   */
  if (response.startsWith("SETRE")) {
    const mainStr = response.substring(5);
    const obj: ExpressionObjInterfaceRepetitive = JSON.parse(mainStr);
    RepetitiveTask(obj.expression, obj.message,phone);
  }
};

export default CronExpressioHandler;
