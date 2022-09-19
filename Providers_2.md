# Providers

##### 제공자

: nestjs의 근본적인 컨셉!!

<img src="./Providers_img.png" alt="Controller_img" />



##### 서비스

: 데이터 저장 및 검색을 담당하며 컨트롤러에 의해 호출이 되고 기능을 제공

cats.service.ts

```typescript
@Ingectable()
export class CatsService {
	private readonly cats: Cat[] = [];
	
	create(cat: Cat) {
		this.cat.push(cat);
	}
	
	findAll(): Cat[] {
		return this.cats;
	}
}
```

CLI를 이용한 서비스 생성

```
$ nset g service cats
```

@Injectable() : nest ioc 컨테이너에서 관리할 수 있는 클래스임을 선언하는 데코레이터

인터페이스로 사용 가능

```typescript
export interface Cat {
	name: string;
	age: number;
	breed: string;
}
```

컨트롤러에서 서비스 사용

```typescript
@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}
	
	@Post()
	async create(@Body() createCatDto: CreateCatDto) {
		this.catService.create(createCatDto);
	}
	
	@Ger()
	async findAll(): Promise<Cat[]> {
		return this.catService.findAll();
	}
}
```



##### 의존성 주입 - DI(Dependency Injection)

: nest는 의존성 주입에 기반한 디자인 패턴으로 구축



##### 제어 역전 - IoC(Inversion of Controller)

: nest가 사용하는 전략, 프레임워크에 제어의 권한을 넘김으로써 클라이언트 코드가 신경써야할 것을 줄이는 전략

의존성 주입의 기초가 되는 기술



##### 선택적 제공자

반드시 필요한 의존성이 아닌 경우도 있다는 것

ex)

```typescript
@Injectable()
export class HttpService<T> {
	constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```



##### Controller, Service 등록

service, controller가 정의되었다면 app.module.ts 를 수정해야한다.

```
@Module({
	controllers: [CatsController],
	providers: [CatsService]
})
```

