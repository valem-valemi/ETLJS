import { ETLJS, FileUse } from "../mod.ts";
import { Print } from "../module/module.print.ts";

ETLJS.use(new FileUse());

ETLJS.read("file://./main.ts").subscribe(Print.log());