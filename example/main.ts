// /// <reference types="npm:rxjs@7.8.1" />
import { concat, concatMap, filter } from "rxjs";
import { Convert, File, Print } from "../mod.ts";
import { IFlowDataStorage } from "../module/module.ts";

// console.log = () => {};

// let subscription = concat(File.read("./module/module.file.ts")).subscribe([File.write("./module/module.file.22222.ts"), Print.log("ENVI")]);

// subscription.add(Print.log("ENVI"))

// let subscription = File.watch(".").pipe(filter(dir => dir.isFile), switchMap(value => File.read(value.path))).subscribe(Print.log());

// File.watch("..")
//   .pipe(
//     filter((dir) => dir.isFile),
//     concatMap((dir) => File.read(dir.path)),
//     concatMap((contentFile) => Convert.toText(contentFile)),
//   ).subscribe(Print.log("a"));

File.watch("..").pipe(
  filter((flowDataStorage: IFlowDataStorage) =>
    flowDataStorage.dataStorage.isFile
  ),
  concatMap((dir) => File.read(dir.path)),
).subscribe(Print.log("a"));
