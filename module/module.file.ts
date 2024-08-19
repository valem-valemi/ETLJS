import {Observable} from "rxjs";
import { existsSync } from "std/fs/exists.ts";

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

    static watch(path: String, ) {
        async function _watch(path: String, cb) {
            for await (const dirEntry of Deno.readDir(path)){
                dirEntry.path = `${path}\\${dirEntry.name}`;
                cb(dirEntry);
                if (dirEntry.isDirectory) {
                    await _watch(dirEntry.path, cb)
                }
            }
        }

        return new Observable(subscribe => {
            (async () => {
                await _watch(path, (dir) => {subscribe.next(dir)});
            })().then(() => subscribe.complete()).catch((e) => {console.log(e); subscribe.error(e)});
            return () => {
            }
        });
    }
}