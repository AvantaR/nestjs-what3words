import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WHAT_3_WORDS_OPTIONS } from './what3words.constants';
import { What3WordsAsyncOptions, What3WordsOptions, What3WordsOptionsFactory } from './what3words.interface';
import { What3WordsService } from './what3words.service';

@Module({})
export class What3WordsModule {
  static register(options: What3WordsOptions): DynamicModule {
    return {
      module: What3WordsModule,
      providers: [{ provide: WHAT_3_WORDS_OPTIONS, useValue: options }, What3WordsService],
      exports: [What3WordsService],
    };
  }

  static registerAsync(options: What3WordsAsyncOptions): DynamicModule {
    return {
      module: What3WordsModule,
      providers: this.createProviders(options),
      exports: [What3WordsService],
    };
  }

  private static createProviders(options: What3WordsAsyncOptions): Provider[] {
    if (options.useClass) {
      return [
        What3WordsService,
        {
          provide: WHAT_3_WORDS_OPTIONS,
          useFactory: async (optionsFactory: What3WordsOptionsFactory) =>
            await optionsFactory.createWhat3WordsOptions(),
          inject: [options.useClass],
        },
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: WHAT_3_WORDS_OPTIONS,
          useFactory: async (optionsFactory: What3WordsOptionsFactory) =>
            await optionsFactory.createWhat3WordsOptions(),
          inject: [options.useExisting || options.useClass],
        },
      ];
    }

    if (options.useFactory) {
      return [
        What3WordsService,
        {
          provide: WHAT_3_WORDS_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }
  }
}
