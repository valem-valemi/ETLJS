import {Observable, Subject} from "rxjs";
import { existsSync } from "std/fs/exists.ts";
import { FactoryIFlowDataStorage, IFlowDataStorage, isIFlowDataStorage } from "./module.ts";

export class File {
    static read(path : String) : Observable {
        return new Observable(subscribe => {
            let input = null;
            (async () => {
                
                input = await Deno.open(path, {write:false, read:true});
    
                const inputReader = input.readable.getReader();
                let done = false;
    
                do {
                    const result = await inputReader.read();
    
                    done = result.done;
                    if (result.value) {
                        subscribe.next(result.value);
                    }
                } while (done);
                
            })().then(() => subscribe.complete()).catch((e) => {console.log(e); subscribe.error(e)});
    
            return () => {
                //input?.close();
            }
        });
    }

    static write(path: String){
        // const file = Deno.openSync(path, {write:true});
        return {
            next: (data) => {
                console.log(typeof data, data)
            },
            complete: () => {},
            error: () => {}
        }
    }

    static watch(path: string | IFlowDataStorage ): Observable {
        const flowDataStorage = !isIFlowDataStorage(path) ? FactoryIFlowDataStorage.getPath(path) : path;
        
        async function _watch(flowDataStorage: IFlowDataStorage, cb : (flowDataStorage: IFlowDataStorage) =>{}) {
            const pathRead = flowDataStorage.dataStorage.uri;
            for await (const dirEntry of Deno.readDir(pathRead)){
                const path = `${pathRead}\\${dirEntry.name}`;
                const flowDataStorage = FactoryIFlowDataStorage.getPath(path, dirEntry);
                cb(flowDataStorage);
                if (dirEntry.isDirectory) {
                    await _watch(flowDataStorage, cb)
                }
            }
        }

        return new Observable((subscribe: Subject<IFlowDataStorage>) => {
            (async () => {
                await _watch(flowDataStorage, (flowDataStorage: IFlowDataStorage) => subscribe.next(flowDataStorage));
            })().then(() => subscribe.complete()).catch((e) => subscribe.error(e));
            return () => {
            }
        });
    }
}