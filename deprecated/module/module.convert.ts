import {Observable, Subject} from "rxjs";

export class Convert {
    static toText(dataBuffer : Buffer) : Observable {
        return new Observable((subscribe: Subject<String>) => {
            const textDecoder = new TextDecoder();
            (async () => {
                subscribe.next(textDecoder.decode(dataBuffer));                
            })().then(() => subscribe.complete()).catch((e) => {console.log(e); subscribe.error(e)});
    
            return () => {
                //input?.close();
            }
        });
    }
}