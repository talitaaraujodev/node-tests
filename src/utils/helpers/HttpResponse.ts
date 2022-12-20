export class HttpResponse {
    public readonly status: number;
    public readonly data: string | {};
    
    constructor(data: string | {}, status: number) {
      this.status = status;
      this.data = data;
    }
  }