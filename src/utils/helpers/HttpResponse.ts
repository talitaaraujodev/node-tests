export class HttpResponse {
    public readonly status: number;
    public readonly data: any;
    
    constructor(data: any, status: number) {
      this.status = status;
      this.data = data;
    }
  }