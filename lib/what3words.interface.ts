import { ModuleMetadata, Type } from '@nestjs/common';
import { ApiOptions } from '@what3words/api';

export interface What3WordsOptionsFactory {
  createWhat3WordsOptions(): Promise<What3WordsOptions> | What3WordsOptions;
}

export type What3WordsOptions = ApiOptions;
export interface What3WordsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<What3WordsOptionsFactory>;
  useClass?: Type<What3WordsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<What3WordsOptions> | What3WordsOptions;
}
