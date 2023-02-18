import { Injectable } from '@angular/core';
import { QueryEncoder } from '@angular/http';

@Injectable()
export class HttpQueryEncoderService extends QueryEncoder {
  encodeKey(k: string): string {
    return k;
  }
  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }
}

