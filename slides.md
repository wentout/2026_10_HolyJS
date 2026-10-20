---
theme: default
title: Elegant Observability &ndash; unchained for JavaScript and Node.js
colorSchema: dark
canvasWidth: 700
duration: 40min
timer: countdown
transition: fade-out
layout: cover
---

# Elegant Observability

### unchained for JavaScript and Node.js


---
layout: default
---

# Немного обо мне

<div class="grid grid-cols-[5fr_4fr] gap-6 mt-4 items-center">
<div class="text-lg leading-relaxed pl-4 [&_li]:whitespace-nowrap">

<v-clicks>

- застал времена первой спецификации
- то есть занимаюсь JS четверть века
- родился и живу в Ростове-на-Дону
- до 30 занимался IT-экономикой
- потом как-то &laquo;залип&raquo; в код и  ...
- и вот программирую уже 15 лет
- пришёл рассказать про последние 10

</v-clicks>

</div>
<div class="flex justify-center self-center">
  <img src="/img/ava_pipe_499.jpg" class="w-48 rounded-2xl shadow-lg" />
</div>
</div>


---
layout: image
image: /img/open_telemetry.png
backgroundSize: 55%
---

# Observability: Open Telemetry


---
layout: center
---

# Observability для меня

<v-clicks>

- 2016: впервые столкнулся с нехваткой Observability
- 2018: время, когда я пробовал &laquo;наивные&raquo; решения
- 2019: понял &laquo; с какой стороны &raquo; делать Observable
- 2021 → 2023: делал Runtime и бодался с TypeScript
- 2024 → 2026: рассказывал о различных находках
- 2026: появился AI и подход заработал &laquo;наглядно&raquo;
- Выводы: что это значит и как попробовать

</v-clicks>

---
layout: section
---

# начало драмы

## Глава 1: 2016 →

---
layout: image
image: /img/ukit_main.png
backgroundSize: 55%
---

# Работал в этой компании


---
layout: image
image: /img/team.jpg
backgroundSize: 55%
---

# С этими хорошими людьми

---
layout: image
image: /img/tips.gif
backgroundSize: 55%
---

# Обычный рабочий процесс

---
layout: image
image: /img/s500.jpg
backgroundSize: 55%
---

# Что-то где-то намертво зависало

---
layout: image
image: /img/s500.3.jpg
backgroundSize: 55%
---

# Помидорки пробивали перцентиль

---
layout: image
image: /img/real_stack.png
backgroundSize: 55%
---

# В логи тихо сыпались ошибки


---
layout: image
image: /img/giphy.gif
backgroundSize: 55%
---

# Обычный рабочий процесс

---
layout: image
image: /img/chart_tasks_bugs.svg
backgroundSize: 55%
class: invert-diagram
---

# Взгляд со стороны Jira

---
layout: center
---

# Итого: обычный вторник

<v-clicks>

- <carbon-checkmark-filled class="text-green-400 inline" /> одни запросы проходят happy path
- <carbon-error-filled class="text-red-400 inline" /> другие впадают в Uncaught Exception
- <carbon-view-off-filled class="text-yellow-400 inline" /> третьи просто тихо считают неверно

</v-clicks>

<center>
<v-click>

![tuesday](./img/oscar.gif)

</v-click>
</center>

---
layout: center
class: code-xl
---

# <carbon-checkmark-filled class="text-green-400 inline" /> Happy Path

```js
class Sum extends Number {
	constructor ( [ a, b ] ) {
		super ( a + b );
	}
}

const sum = new Sum( [ 1, 1 ] );
```

---
layout: center
class: code-xl
---

# <carbon-error-filled class="text-red-400 inline" /> Uncaught Exception

```js
// забыли валидацию, влетел null

new Sum (null);

// TypeError: null is not iterable
```

<v-clicks>

- Stack Trace говорит **ГДЕ** упало
- но на **КАКИХ ДАННЫХ** &ndash; не говорит

</v-clicks>


---
layout: center
class: code-xl
---

# <carbon-view-off-filled class="text-yellow-400 inline" /> и есть неверный расчёт

```js
// самый типичный пример
// твой родной язык JavaScript что-ли?
const sum = new Sum([ '1', 1 ]);
// и так вот дальше потеряли "почему"
JSON.parse(JSON.stringify(sum));
```

<v-clicks>

- так как &ndash; это **happy path**
- поэтому ни исключения, ни лога
- и почему оно так было тоже ...

</v-clicks>


---
layout: center
---

## проблемы одинаковые

<v-clicks>

- мы не знаем, какие данные были
- мы теряем контекст момента ошибки
- и воспроизвести её не получится
  
</v-clicks>
<v-click>

## бизнес теряет деньги

</v-click>
<v-clicks>

- на неоправданных ожиданиях клиентов
- на долгой отладке и дорогой разработке
  
</v-clicks>



---
layout: section
---

# error контекст

## Глава 2: → 2018 →


---
layout: image
image: /img/js-everywhere.jpg
backgroundSize: 42%
---

# Чёрная кошка в тёмной комнате

---
layout: center
class: code-fit
---

# Это были времена callback hell
 и всё выглядело как-то так, <v-click> или через Caolan Async </v-click>
<table>

<tbody>
<tr>
<td>

```ts
step1((cb) => {
	step2((cb) => {
		step3((cb) => {
			step4((cb) => {
				step5((cb) => {
					// какая-то ещё работа
					cb(result)
				});
			});
		});
	});
});
```

</td>
<td>
<v-click>

```ts
async.parallel([
    function(cb) { ... },
    function(cb) { ... }
], function(err, results) {
    // optional
});

async.series([
	function(cb) { ... },
	function(cb) { ... },
	function(cb) { ... }
]);
```

</v-click>
</td>

</tr>
</tbody>
</table>


---
layout: center
class: code-fit code-flow
---

# И если присмотреться внимательней ...
то можно было увидеть, как оно выполняется:
<table>
<tbody>
<tr>
<td>


```ts {none|1|1-2|1-3|1-4|1-5|1-6|1-7|1-8|1-9|1-10|1-11|1-12}
step1((cb) => {							    ↓
	step2((cb) => {						    ↓
		step3((cb) => {					    ↓
			step4((cb) => {				    ↓
				step5((cb) => { 		    ↓
					// какая-то ещё работа
					cb(result);          
				});                     ↑
			});                       ↑
		});                         ↑
	});                           ↑
});                             ↑
```

</td>
<td>

```ts {none|1|1-2|1-3|1-4|1-6|1-6,8|1-6,8-9|1-6,8-10|1-6,8-11|1-6,8-12}{'at':13}
async.parallel([            ↓
    function(cb) { ... }   ->
    function(cb) { ... },  ->
], function(err, results) { 
    // optional
});                         

async.series([
	function(cb) { ... },     ↓
	function(cb) { ... },     ↓
	function(cb) { ... },     ↓
]);
```

</td>

</tr>
</tbody>
</table>

---
layout: center
class: code-fit
---

# И можно ли обернуть этот flow ?

этот самый Execution Flow, trace пути выполнения

```ts
const wrap = function ( cb, ...data ) {
	// проверяет элементы data
	// если typeof data [ i ] === 'function'
	// то wrap'ает такие элементы

	const result = cb.call( this, ...data );
	// проверяет typeof result и тоже  wrap'ает
	// если видит, что это function
	return result;
};

```

чтобы следить за контекстом ошибки до её появления


---
layout: center
class: code-fit
---

# Обёртка в реальном коде выглядит как-то так

```ts
const wrap = function ( cb, ...data ) {
	// декорирует cb вглубь data
};

const fn = ( x: number ) => x * 2;                     ← сама работа

const requestInstance = {};
const serviceInstance = {};

// обёртка привязана к истории requestInstance
const w1 = wrap( fn, requestInstance );                  контекст 1

// ПРОБЛЕМА: попытка обернуть с ДРУГИМ контекстом !
const w2 = wrap( w1, serviceInstance );                  контекст 2
```


---
layout: center
class: code-fit
---

# Но! Есть Проблема ... Потому, что Это НЕ ответ

```ts
var saved;
const doWork = function () {   /* какая-то работа */   };

const onRequest = wrap(( cb ) => {
	saved = cb;
}, requestInstance);                           ← контекст requestInstance

onRequest( () => doWork () );
// запрос A закончился но cb ~ saved "выжил" и продолжит
// теперь "протекать" сквозь код в других местах выполнения
const runJob = wrap(( job ) => job (), serviceInstance);

runJob( saved );                               ← продолжает прилипать к коду !!!
```

---
layout: image
image: /img/grafana.jpg
backgroundSize: 55%
---

# ... тема интересовала многих ...


---
layout: image
image: /img/DiagGroupSite.png
backgroundSize: 55%
---

# Diagnostic Working Group

---
layout: image
image: /img/issue249.png
backgroundSize: 55%
---

# В итоге оказалось, оно не работает


---
layout: image
image: /img/async_zero.png
backgroundSize: 55%
---

# Asynchronous Zero &ndash; HolyJS 2018


---
layout: center
class: code-xl
---

# Отложенный вызов от запроса

```ts
const { data } = req;

res.send('some response');

setTimeout(() => {
	data.ref.error; // это данные запроса
	// но самого запроса уже нет в ALS
}, 0);
```

---
layout: image
image: /img/als.png
backgroundSize: 55%
---

# в 2018 ALS не было

---
layout: image
image: /img/async_hooks.png
backgroundSize: 55%
---

# были только async_hooks


---
layout: image
image: /img/Andrey.png
backgroundSize: 55%
---

# И в 2019 был ещё Андрей 


---
layout: image
image: /img/context-dive.png
backgroundSize: 55%
---

# и решение я всё-таки запилил



---
layout: image
image: /img/issue249_fin.png
backgroundSize: 55%
---

# А issue закрыл как нерелевантное

---
layout: image
image: /img/dip.png
backgroundSize: 45%
---

# В итоге я пошёл своим путём


---
layout: section
---

# учимся считать

## Глава 3: → 2019 →


---
layout: image
image: /img/Transitive_Closure.svg
backgroundSize: 55%
---

# Контекст &mdash; это данные

---
layout: center
class: code-fit
---

# Контекст &mdash; это данные

<table>
<tbody>
<tr valign = "top">
<td width = "58%">

<img src="/img/Transitive_Closure.svg" width="75%" />

</td>
<td>

<div style = "position: relative; padding-top: 15%; padding-left: -45%; margin-left: -25%">

<v-clicks>

# Direct Acyclic Graph

# !== Execution Flow

</v-clicks>
<br />
<v-click>


### т.к. он описывает

<h1 style = "margin-top: 3%; font-size: 250%; font-weight: bold"> Data Flow </h1>

</v-click>

</div>

</td>
</tr>
</tbody>
</table>



---
layout: image
image: /img/GanttProject.png
backgroundSize: 55%
---

# Данные, распределённые во времени


---
layout: image
image: /img/PrototypeChain.png
backgroundSize: 55%
---

# И в JavaScript есть конструкт


---
layout: center
---

## идентичность данных

<v-click>

# задаётся через наследование

</v-click>

<v-click>

<br />

```ts
Object.setPrototypeOf(
	
	Successor_Instance,  // новая модель
	
	Predecessor_Instance // исходная модель

);
```

</v-click>


---
layout: image
image: /img/EichObjects.png
backgroundSize: 55%
---

# И своеобразная философия


---
layout: image
image: /img/inheritance.png
backgroundSize: 55%
---

# ... и я писал про это статью ...

---
layout: default
title: JS_Object_Topology
---

<h1 class="text-center">... коротко: JS всё объекты ...</h1>

<div class="flex justify-center">
  <img src="/img/JS_Object_Topology.svg" style="filter: invert(1)" width = "90%" />
</div>


---
layout: image
image: /img/EichNullUndefined.png
backgroundSize: 55%
---

# И есть объяснимое поведение

---
layout: image
image: /img/vitya.png
backgroundSize: 55%
---

# Но, оставалась куча вопросов ...


---
layout: center
---

# Как на этом сделать : DAG ?

<table style = "margin-top: -5%">
<tbody>
<tr>
<td width = "67%" >

<v-clicks>

- т.к. `setPrototypeOf` &ndash; не подходит
- и ещё нужны `(...args)` конструкторов
- и `instanceOf` &laquo;такое себе&raquo; identity ...

</v-clicks>
<v-click>

хотя ... если ... попробовать ...

</v-click>
<v-clicks>

- использовать `Symbol.hasInstance`
- и &laquo;привязаться&raquo; `constructor.name`
- и использовать Proxy для отслеживания
- то `new` поможет идентификации

</v-clicks>
</td>
<td>

<img src="/img/Transitive_Closure.svg" />

</td>

</tr>
</tbody>
</table>




---
layout: center
class: code-xl
---

# И как показать идею кодом ...

<v-clicks>

```ts
// первое поколение
const user = new User({ name: 'Ada' });
// второе поколение
const admin = new user.Admin({ role: 'root' });

Object.getPrototypeOf( admin ) // → user
```

 &laquo; память &raquo; истории объекта теперь лежит в Prototype Chain.

</v-clicks>


---
layout: image
image: /img/Mnemonica.png
backgroundSize: 55%
---

# Так появилась Mnemonica


---
layout: default
class: code-lg
---

# mnemonica: define()

```ts
import { define } from 'mnemonica';

const User = define('User', function (data) {
	this.name = data.name;
});

const Admin = User.define('Admin', function (data) {
	this.name = data.name;
});
```

---
layout: default
class: code-lg
---

# mnemonica: @decorate()

```ts
import { decorate } from 'mnemonica';

// root object
@decorate ()
class User { /.../ };

// predecessor ↓
@decorate ( User )
class Admin { /.../ }

```

---
layout: default
---

# в Runtime это &ndash; дерево

```ts
const user  = new User({ name: 'Ada' });
const admin = new user.Admin({ role: 'root' });
const god   = new admin.SuperAdmin();
```

<div class="flex justify-center mt-2">
<Chart type="tree" class="w-125"
  :data="{ name: 'User', children: [ { name: 'Admin', children: [ { name: 'SuperAdmin' } ] }, { name: 'Manager' }, { name: 'Guest' } ] }"
  :opts="{ dy: 26, dx: 100, width: 370, margin: { top: 24, bottom: 12, right: 24, left: 60 } }" />
</div>

---
layout: default
---

# И это и есть &laquo;Жизненный Цикл&raquo;

<div class="timeline-hl">

# &mdash; <span style="color:orange">Time</span>  &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span style="color:orange">Line</span> &mdash; &mdash; <span style="color:orange">&gt;</span>

</div>

<div class="timeline-dim">

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

# &mdash; <span>Time</span> &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; &mdash; <span style="color:green">|</span> &mdash; &mdash; &mdash; &mdash;  <span>Line</span> &mdash; &mdash; <span>&gt;</span>

</div>


<div class="timeline-chart">
<Chart type="tree" class="w-125"
  :data="{ name: 'User', children: [ { name: 'Admin', children: [ { name: 'SuperAdmin' } ] }, { name: 'Manager' }, { name: 'Guest' } ] }"
  :opts="{ dy: 55, dx: 120, width: 370, margin: { top: 15, bottom: 75, right: 24, left: 60 } }" />
</div>


---
layout: section
---

# TypeScript vs Runtime

### Глава 4. 2021 → ...


---
layout: center
---

# TypeScript и Runtime

<v-clicks>

- TypeScript типы &laquo;живут&raquo; до компиляции
- граф экземпляров Mnemonica &ndash; &laquo;после&raquo;
- и есть ещё TypeScript декораторы ...
- для IntelliSense всё это нужно как-то &laquo;подружить&raquo;
- и вообще есть ещё та самая &laquo;строгая типизация&raquo;

</v-clicks>


---
layout: image
image: /img/TypesInPrototypes.png
backgroundSize: 55%
---

# Про это был отдельный доклад


---
layout: center
class: code-xl
---

# С паттерном Identity


```ts
export type ConstructorDefinition <T> 
	=	{
			new(): T
		} | { 
			( this: T,
				...args: unknown[]): void
		};
```


---
layout: center
---

# Как-то так это выглядело

```ts
type Proto<P, T> =
	Pick<P,Exclude<keyof P, keyof T>> & T;

const define = function <P extends object, T>(
	Constructor: { (this: T): void },
	proto: P,
) {
	const MyConstructor = function (): Proto<P, T> {
		return new Constructor;
	};
	Object.setPrototypeOf(MyConstructor.prototype, proto);
	return MyConstructor;
};
```

table

---
layout: center
---

# Но с Identity это лишь ...

<v-clicks>

- ## `.apply` &mdash; аргументы как .apply
- ## `.call`  &mdash; аргументы как .call
- ## `.bind`  &mdash; отложенный вызов

</v-clicks>
<br />
<v-click>


```ts
export type ConstructorDefinition <T> =
	{ new(): T } | { 
		( this: T, ...args: unknown[]): void
	};
```

</v-click>


---
layout: center
class: code-xl
---

## Поэтому Declaration Merging : Registry

```ts
// читаем исходники и генерирует реестр
// код merge'им через tsconfig.json
interface TypeRegistry {

	Root: IDefinitorInstance<'Root', /* … */>
	User: IDefinitorInstance<'User', /* … */>
	Admin: IDefinitorInstance<'User.Admin', /* … */>

}
```

---
layout: statement
title: tactica-nestjs
---

# <br /> DEMO 1

## Mnemographica: 3D



---
layout: center
title: Mnemographica 3D
---

<GraphOverlay src="/mnemographica-graph.html" title="Mnemographica Graph" />


---
layout: section
---

# Observability &laquo;экспериментально&raquo;


---
layout: center
---

# @mnemonica/dive
# @mnemonica/otel

```ts
// Callback, рождённый в запросе A,
// выжил в сервисе B и рассказывает
// историю мёртвого запроса A
```

<v-clicks>

- контекст привязан к идентичности экземпляра
- пересечение границ видно в графе вызовов
- ... profit ...

</v-clicks>


---
layout: center
---

# @mnemonica/nestjs

<v-clicks>

- NestJS &ndash; крепость: его не переделать
- поэтому инструментируем снаружи, адаптером
- DTO-шки: ошибки доклада «Real DTO» учтены

</v-clicks>

---
layout: statement
---

# <br /> DEMO 2

## Nest.JS: живые трассы


---
layout: statement
---

# <br /> DEMO 3
# Exec Flow → DFD
## aka &laquo; что по там фронту &raquo;


---
layout: center
title: kbtrainer
---

<GraphOverlay src="/electron-graph.html" title="Electron Graph" />


---
layout: section
---

# что это меняет

---
layout: center
---

# <br /> &laquo; высота птичьего полёта &raquo;

<v-clicks>

- не только отладка: проектирование
- граф типов читается человеком и машиной
- `.tactica` &ndash; инструкция для AI-агентов из коробки

</v-clicks>


---
layout: center
---

# <br /> AI пишет код быстрее,<br/> чем мы проверяем

<v-clicks>

- корректность &ndash; новая валюта
- реестр типов = машиночитаемое намерение
- агент знает, ЧТО он построил

</v-clicks>


---
layout: statement
---

# <br /> DEMO 4

## нечто большое


---
layout: center
---


# <br /> <br /> AI доволен


<v-click>

### « It's a genuinely strange and good feeling<br/> to be shown a picture of my own reasoning<br/> about a codebase. »

</v-click>


---
layout: center
---

<GraphOverlay src="/real-work-graph.html" title="Real Work Graph" />

---
layout: image
image: /img/mythographica.png
---

# <a href="https://mythographica.github.io">https://<span style="color: orange">mythographica</span>.github.io</a>


---
layout: center
---

## &nbsp; Доклад стоял &laquo;на плечах гигантов&raquo;

<div class="flex gap-6 items-start justify-center mt-6">
  <figure class="text-center">
    <img src="/img/DimaOVR.png" class="h-44 rounded" />
    <figcaption class="mt-2 text-sm opacity-80">Дмитрий Пацура<br/>TypeScript</figcaption>
  </figure>
  <figure class="text-center">
    <img src="/img/Vsevolod.png" class="h-44 rounded" />
    <figcaption class="mt-2 text-sm opacity-80">Всеволод Родионов<br/>Proxy в конце цепочки</figcaption>
  </figure>
</div>

---
layout: center
---

<center>

# И продолжает стоять ;^)

</center>

<div class="flex gap-6 items-start justify-center mt-6">
  <figure class="text-center">
    <img src="/img/vasya.jpg" class="h-44 rounded" />
	<figcaption class="mt-2 text-sm opacity-80">Василий Корянов</figcaption>
  </figure>
  <figure class="text-center">
	<img src="/img/pasha.png" class="h-44 rounded" />
	<figcaption class="mt-2 text-sm opacity-80">Павел Востриков</figcaption>
  </figure>
  <figure class="text-center">
	<img src="/img/vitya.jpg" class="h-44 rounded" />
	<figcaption class="mt-2 text-sm opacity-80">Виктор Хомяков</figcaption>
  </figure>
</div>




---
layout: end
---

# <br /> <br /> Спасибо!


---
layout: center
---

# <br /> <br /> Q & A

### 10 минут



--- 
hide: true
layout: image
image: /img/Typeomatica.png
backgroundSize: 55%
---

#  библиотека про строгую типизацию