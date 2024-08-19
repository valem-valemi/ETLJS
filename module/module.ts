export interface IFlowDataStorage {
    dataStorage : IDataStorage;
    type: 'IFlowDataStorage';
}

interface IDataStorage extends Partial<Deno.DirEntry>{
    buffer?: ArrayBuffer;
    text?: string;
    uri: string | URL;
    array? : Array<any>;
}

export function isIFlowDataStorage(obj: any): obj is IFlowDataStorage {
    return obj.type === 'IFlowDataStorage';
}

export class FactoryIFlowDataStorage {
    static getPath(path : string, dirEntry?: Deno.DirEntry) : IFlowDataStorage {
        return {
            dataStorage : {
                uri: path,
                isDirectory: dirEntry?.isDirectory,
                isFile: dirEntry?.isFile,
                isSymlink: dirEntry?.isSymlink,
                name: dirEntry?.name
            },
            type:'IFlowDataStorage'
        }
    }
}