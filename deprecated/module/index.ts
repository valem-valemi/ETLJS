import { buffer, Observable, Subject } from "rxjs";
const plugin: Map<string, any> = new Map();

export class ETLJS {
  private static plugin: Map<string, any> = new Map();

  public static use(use: IUse) {
    this.plugin.set(use.getScheme(), use);
  }

  public static read(uri: any): Observable<any> {
    const uriObject = ETLJS.parseUri(uri);

    console.log(uriObject);
    //Default Observer
    // deno-lint-ignore no-explicit-any
    return new Observable((subscribe: any) => {
      subscribe.error(new Error(`No implements uri ${uri}`));
    });
  }

  private static parseUri(uri: string): IUri {
    const regex =
      /^([a-zA-Z][a-zA-Z\d+\-.]*:)?(\/\/([^\/:?#]*))?([^?#]*)(\?[^#]*)?(#.*)?/;
    const maches = uri.match(regex);

    if (!maches) {
      return {
        uri: "",
        scheme: "",
        authority: "",
        path: "",
        query: "",
        fragment: "",
      };
    }
    return {
      uri: uri,
      scheme: maches[1]?.replace(":", ""),
      authority: maches[3],
      path: maches[4],
      query: maches[5],
      fragment: maches[6],
    };
  }
}

export class FileUse implements IUse {
  getScheme(): string {
    return "file";
  }
}

interface IUse {
  getScheme(): string;
}

interface IUri {
  uri: string;
  scheme: string;
  authority: string;
  path: string;
  query: string;
  fragment: string;
}
