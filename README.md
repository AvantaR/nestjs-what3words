# nestjs-what3words

What3Words module for NestJS

### Installation

**Yarn**

```bash
yarn add nestjs-what3words
```

**NPM**

```bash
npm install nestjs-what3words --save
```

### Registering What3Words module

It is possible to register What3Words module synchronously and asynchronously.

### Synchronous registering

For registering module synchronously use `register()` method, which expect object with `key` property. Example:

```Typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { What3WordsModule } from 'nestjs-what3words';

@Module({
  imports: [What3WordsModule.register({ key: 'YOUR API KEY' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Asynchronous registering

When you need to resolve asynchronous dependencies, you can use `registerAsync()` method.

**useClass**

`useClass` property accepts class which implements `What3WordsOptionsFactory` interface. For example:

```Typescript
class What3WordConfig implements What3WordsOptionsFactory {
  createWhat3WordsOptions(): ApiOptions | Promise<ApiOptions> {
    return { key: 'YOUR KEY' };
  }
}
```

```Typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { What3WordsModule, What3WordsOptionsFactory } from 'nestjs-what3words';
import { ApiOptions } from '@what3words/api';

@Module({
  imports: [What3WordsModule.registerAsync({ useClass: What3WordConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**useFactory**

```Typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { What3WordsModule } from 'nestjs-what3words';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    What3WordsModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return { key: configService.get('WHAT3WORDS_API_KEY') };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Feel free to contribute!
