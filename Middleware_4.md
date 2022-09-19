# Middleware_4

##### 미들웨어

: 라우트 핸들러 전에 호출되는 함수

요청 및 응답 객체에 대한 액세스 권한이 있음

![Middleware_img](./Middleware_img.png)

express미들웨어와 동일

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(reqL Request, res: Response, nest: NextFunction) {
		console.log('Request ...');
		next();
	}
}
```



##### 미들웨어 적용

app.module.ts

```typescript
@Module({
	imports: [CatsModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
//			.forRoutes('cats');
    	.forRoutes({ path: 'cats', method: RequestMethod.GET});
	}
}
```



##### 라우트 와일드카드

```typescript
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL});
```



##### 미들웨어 소비자 - MiddlewareConsumer

미들웨어를 관리하는 기능 제공



##### 경로 제외

미들웨어가 적용되는 특정 경로를 제외

```typescript
consumer
	.apply(LoggerMiddleware)
	.exclude(
		{path: 'cats', method: RequestMethod.GET},
		{path: 'cats', method: REquestMethod.POST},
		'cats/(.*)'
	)
	.forRoutes(CatsController);
```



##### 기능적 미들웨어

LoggerMiddleware를 직접 만들어보기

```typescript
export function logger(reqL Request, res: Response, next: NextFunction) {
	console.log('Request ...');
	next();
}
```

```typescript
consumer
	.apply(logger)
	.forRoutes(CatsController);
```



##### 다중 미들웨어

여러 미들웨어 적용하기

```typescript
consumer.apply(core(), helmet(), logger).forRoutes(CatsController);
```

여러 미들웨어를 괄호 안에 ' **,** '로 구분하며 여러 미들웨어 적용 가능



##### 글로벌 미들웨어

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

app.use()





