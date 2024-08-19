import { concat } from "rxjs";
import { concatMap, filter } from "rxjs/operators";
import { Print, File } from "../mod.ts";


// console.log = () => {};

// let subscription = concat(File.read("./module/module.file.ts")).subscribe([File.write("./module/module.file.22222.ts"), Print.log("ENVI")]);

// subscription.add(Print.log("ENVI"))

// let subscription = File.watch(".").pipe(filter(dir => dir.isFile), switchMap(value => File.read(value.path))).subscribe(Print.log());

File.watch("..")
  .pipe(
    filter((dir) => dir.isFile),
    concatMap((dir) => File.read(dir.path)),
  ).subscribe(Print.log("a"));
