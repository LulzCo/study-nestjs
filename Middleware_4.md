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



##### 미들웨어 소비자

미들웨어를 관리하는 

