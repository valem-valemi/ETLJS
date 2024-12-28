export class FlowDataStorage{
  _uri: IUri = null;
  _buffer: ArrayBuffer = null;
  _text: string = null;
  _array: Array<any> = null;

  private constructor() {
  }

  private setUri(uri: string) {
    this._uri = parseUri(uri);
  }

  public getUri(): IUri {
    return this._uri;
  }

  private setBuffer(buffer: ArrayBuffer) {
    this._buffer = buffer;
  }

  private setFlowDataStorage(flowDataStorage: FlowDataStorage) {
    this._uri = flowDataStorage._uri;
    this._buffer = flowDataStorage._buffer;
    this._text = flowDataStorage._text;
    this._array = flowDataStorage._array;
  }

  static build(
    obj: any,
    flowDataStorage: FlowDataStorage = new FlowDataStorage(),
  ): FlowDataStorage {
    switch (obj.constructor.name) {
      case "String":
        flowDataStorage.setUri(obj);
        break;
      case "FlowDataStorage":
        flowDataStorage.setFlowDataStorage(obj);
        break;
      case "Uint8Array":
        flowDataStorage.setBuffer(obj);
        break;
      default:
        break;
    }
    return flowDataStorage;
  }
}

// interface IDataStorage extends Partial<Deno.DirEntry>{
//     buffer?: ArrayBuffer;
//     text?: string;
//     uri: string | URL;
//     array? : Array<any>;
// }

// interface IFlow {
//     name:string,
//     query:string
// }

// export function isIFlowDataStorage(obj: any): obj is IFlowDataStorage {
//     return obj.type === 'IFlowDataStorage';
// }

// export class FactoryIFlowDataStorage {
//     static getPath(path : string, dirEntry?: Deno.DirEntry) : IFlowDataStorage {
//         return {
//             dataStorage : {
//                 uri: path,
//                 isDirectory: dirEntry?.isDirectory,
//                 isFile: dirEntry?.isFile,
//                 isSymlink: dirEntry?.isSymlink,
//                 name: dirEntry?.name
//             },
//             query: [],
//             type:'IFlowDataStorage'
//         }
//     }
// }

interface IUri {
  uri: string;
  scheme: string;
  authority: string;
  path: string;
  query: string;
  fragment: string;
}

export function parseUri(uri: string): IUri {
  const regex =
    /^([a-zA-Z][a-zA-Z\d+\-.]*:)?(\/\/([^\/:?#]*))?([^?#]*)(\?[^#]*)?(#.*)?/;
  const maches = uri.match(regex);

  return {
    uri: uri,
    scheme: maches[1]?.replace(":", ""),
    authority: maches[3],
    path: maches[4],
    query: parseUriQuery(maches[5]),
    fragment: maches[6],
  };
}

function parseUriQuery(query: string): any {
  if (!query) {
    return;
  }
  const params = String(query).match(/[^&]+=[^&]+/); // Separar los pares clave-valor

  const keyValuePairs = params.map((param) => {
    const [key, value] = param.split("=");
    return { key, value };
  });

  keyValuePairs.forEach((pair) => {
    console.log(`Clave: ${pair.key}, Valor: ${pair.value}`);
  });
  return keyValuePairs;
}
