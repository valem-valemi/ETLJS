// /// <reference types="npm:rxjs@7.8.1" />
import { buffer, concat, concatMap, filter } from "rxjs";
import { Print, Read } from "../mod.ts";
import { FlowDataStorage } from "../module/module.ts";
// import { IFlowDataStorage } from "../module/module.ts";

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

// File.watch("..").pipe(
//   filter((flowDataStorage: IFlowDataStorage) =>
//     flowDataStorage.dataStorage.isFile
//   ),
//   concatMap((dir) => File.read(dir.path)),
// ).subscribe(Print.log("a"));


// Read("folder://..?recursive")
Read("file://./main.ts").subscribe(Print.log())

// Read("file://C:\\Users\\Bryan\\Downloads\\script.7z").subscribe(Print.log())


// Read("file://C:\\Driver\\S34C65xU.cat").subscribe(Print.log())

// Read("folder://.").subscribe(Print.log())

FlowDataStorage.build("sd");
FlowDataStorage.build(new FlowDataStorage());
FlowDataStorage.build(Uint8Array.from([12, 3, 5 ]));
FlowDataStorage.build(new FlowDataStorage());

// Read("https://www.google.cl/jdkfs?iiii#uuuuu")
// Read("ftp://isp.s00058.CL.wal-mart.com/usr/tmp?only=spi28")