import {Observable, Subject, buffer} from "rxjs";
import { FlowDataStorage, getFlowDataStorage, parseUri } from "./module.ts";
// export { File } from "./module.file.ts";
export { Print } from "./module.print.ts";
// export { Convert } from "./module.convert.ts";

export function Read(uriStr:string | FlowDataStorage) : Observable<FlowDataStorage> {
    const flowDataStorage = FlowDataStorage.build(uriStr);
    return ReadProtocol[flowDataStorage.getUri().scheme](flowDataStorage);
}

class ReadProtocol {
    static file(flowDataStorage : FlowDataStorage) : Observable<FlowDataStorage> {
        return new Observable((subscribe: Subject<FlowDataStorage>) => {
            let input = null;
            (async () => {
                input = await Deno.open(flowDataStorage.getUri().authority.concat(flowDataStorage.getUri().path), {write:false, read:true});
                
                const inputReader = input.readable.getReader();
                let done = false;
                while(!done) {
                    const result = await inputReader.read();
                    done = result.done;
                    if (result.value) {
                        subscribe.next(FlowDataStorage.build(result.value, flowDataStorage));
                    }
                }
            })().then(() => subscribe.complete()).catch((e) => {console.log(e); subscribe.error(e)});
            return () => {
                // input?.close();
            }
        });
    }

    static folder(flowDataStorage : FlowDataStorage) : Observable<FlowDataStorage> {
        async function _watch(flowDataStorage: FlowDataStorage, cb : (flowDataStorage: FlowDataStorage) =>{}) {
            const pathRead = flowDataStorage.getUri().authority.concat(flowDataStorage.getUri().path);
            for await (const dirEntry of Deno.readDir(pathRead)){
                const path = `${dirEntry.isDirectory?'folder':'file'}://${pathRead}//${dirEntry.name}`;
                // const flowDataStorage = FactoryIFlowDataStorage.getPath(path, dirEntry);
                const flowDataStorage = FlowDataStorage.build(path);
                cb(flowDataStorage);
                if (dirEntry.isDirectory) {
                    await _watch(flowDataStorage, cb)
                }
            }
        }

        return new Observable((subscribe: Subject<FlowDataStorage>) => {
            (async () => {
                await _watch(flowDataStorage, (flowDataStorage: FlowDataStorage) => subscribe.next(flowDataStorage));
            })().then(() => subscribe.complete()).catch((e) => subscribe.error(e));
            return () => {
            }
        });
    }
}