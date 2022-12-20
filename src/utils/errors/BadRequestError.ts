import { HttpResponse } from "../helpers/HttpResponse";
import { HttpStatus } from "../helpers/HttpStatus";

export class BadRequestError extends HttpResponse {
  constructor(data: any) {
    super(data, HttpStatus.statusCode.BAD_REQUEST);
  }
}