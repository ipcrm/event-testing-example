import {
    HttpClient,
    HttpClientFactory,
    HttpClientOptions,
    HttpResponse,
} from "@atomist/automation-client";

// HTTP Client just used for testing
export class FakeHttpClient implements HttpClient {
         protected message: HttpResponse<any>;
         constructor(msg?: HttpResponse<any>) {
           this.message = msg;
         }
         public exchange<T>(
           url: string,
           options: HttpClientOptions = {},
         ): Promise<HttpResponse<T>> {
           // tslint:disable-next-line
           return Promise.resolve(this.message ? (this.message as any) : {} as HttpResponse<T>);
         }
         protected configureOptions(options: any): any {
           return options;
         }
       }

export class FakeHttpClientFactory implements HttpClientFactory {
    protected message: HttpResponse<any>;
    constructor(msg?: HttpResponse<any>) {
      this.message = msg;
    }
    public create(url?: string): HttpClient {
        return new FakeHttpClient(this.message || undefined);
    }
}
