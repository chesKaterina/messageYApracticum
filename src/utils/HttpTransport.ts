export enum Metods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE'
};

type TypesOptions = {
  method?: Metods;
  data?: any;
  headers?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
      this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }
  public get<Response>(path = '/'): Promise<Response>{
      return this.request(this.endpoint + path);
  }

  public post<Response>(path: string, data?: unknown): Promise<Response> {
      return this.request(this.endpoint + path, {
      method: Metods.Post,
      data,
      });
  }

  public delete<Response>(path: string): Promise<Response> {
      return this.request(this.endpoint + path, {
      method: Metods.Delete,
      });
  }

  public put(path: string, data: unknown): Promise<Response> {
      return this.request(this.endpoint + path, { data, method: Metods.Put });
  }

  private request<Response> (url: string, options: TypesOptions = {method: Metods.Get}): Promise<Response> {
      const {method, data} = options;
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
    xhr.open(method as Metods, url);

    xhr.onreadystatechange = (e: any) => {

      if (xhr.readyState === XMLHttpRequest.DONE) { 
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    xhr.onabort = () => reject({reason: 'abort'});
    xhr.onerror = () => reject({reason: 'network error'});
    xhr.ontimeout = () => reject({reason: 'timeout'});

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.withCredentials = true;
    xhr.responseType = 'json';

    if (method === Metods.Get || !data) {
      xhr.send();
    } else if (data instanceof FormData) {
      xhr.send(data);
    } else {
      xhr.send(JSON.stringify(data));
    }
  });
}
  }
