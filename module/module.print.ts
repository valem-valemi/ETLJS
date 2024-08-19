import { default as dayjs} from "dayjs";

export class Print {
  static log(...args : any[]) {
    args.unshift(dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"));
    return {
      next: (x) => console["log"].apply(this, args.concat(x)),
      complete: () => console["log"].apply(this, args.concat("Completed")),
      error: (x) => console["error"].apply(this, args.concat(x)),
    };
  }

  static start() {

  }

  static end() {
    
  }

//   static time(...args : any[]) {
//     let time = dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")
//     args.unshift(time);
//     console.time(time);
//     return {
//       next: (x) => console["log"].apply(this, args.concat(x)),
//       complete: () => {console["timeLog"].apply(this, args.concat("Completed"))},
//       error: (x) => console["error"].apply(this, args.concat(x)),
//     };
//   }
}
