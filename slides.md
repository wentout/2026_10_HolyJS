---
theme: default
title: Elegant Observability &ndash; unchained for JavaScript and Node.js
colorSchema: dark
fonts:
  weights: '200,400,600,700'
canvasWidth: 700
duration: 40min
timer: countdown
transition: fade-out
layout: cover
---

# Elegant <br />Observability

### unchained for JavaScript and Node.js


---
layout: default
---

# Немного обо мне

<div class="grid grid-cols-[5fr_4fr] gap-6 mt-4 items-center">
<div class="text-lg leading-relaxed pl-4 [&_li]:whitespace-nowrap">

<v-clicks>

- родился и живу в Ростове-на-Дону
- до 30 лет занимался IT-экономикой
- но в 1999 уже сделал первый сайт 
- тогда это был ECMA Script 1997
- после 30 окончательно &laquo;залип&raquo; в код
- и вот программирую уже 15 лет
- пришёл рассказать про последние 10

</v-clicks>

</div>
<div class="flex justify-center self-center">
  <img src="/img/ava_pipe_499.jpg" class="w-48 rounded-2xl shadow-lg" />
</div>
</div>


---
layout: default
---

# И это моё Десятое HolyJS 

<div class="grid grid-cols-[5fr_4fr] gap-1 items-center" style="margin-top: -2vh">
<div class="text-lg leading-relaxed pl-4 [&_li]:whitespace-nowrap">

0. 2018 &nbsp; &ndash; &nbsp;  Тонкости Mongoose
1. 2018 &nbsp; &ndash; &nbsp;  Asynchronous zero
2. 2020 &nbsp; &ndash; &nbsp;  Chronotope: await Eloquent.Errors
3. 2021 &nbsp; &ndash; &nbsp;  Strict Types in JavaScript
4. 2021 &nbsp; &ndash; &nbsp;  JavaScript dependent type lineages
5. 2021 &nbsp; &ndash; &nbsp;  Multiple inheritance in JavaScript
6. 2023 &nbsp; &ndash; &nbsp;  Types in Prototypes
7. 2023 &nbsp; &ndash; &nbsp;  Real DTO
8. 2024 &nbsp; &ndash; &nbsp;  Pro.Prototypes Workshop
9. 2026 &nbsp; &ndash; &nbsp;  I Don't Know JavaScript

</div>
<div class="flex justify-center self-center">
  <img src="/img/ucircus/faster2.png" class="w-28 rounded-2xl shadow-lg" />
</div>
</div>



---
layout: cover
---

# Elegant <br />Observability

### unchained for JavaScript and Node.js

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

# Начало &laquo;Драмы&raquo;

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

<v-clicks style="margin-top: -3vh">

- <carbon-checkmark-filled class="text-green-400 inline" /> одни запросы проходят happy path
- <carbon-error-filled class="text-red-400 inline" /> другие впадают в Uncaught Exception
- <carbon-view-off-filled class="text-yellow-400 inline" /> третьи просто тихо считают неверно

</v-clicks>

<v-click>

<img src="./img/pepe-silvija-i-tjulen-1.jpg" width="87%" style="margin-top: 1vh" />

</v-click>

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
// забыли валидацию, влетел undefined

new Sum (obj.nonExistentField);

// TypeError: undefined is not iterable
```

<v-clicks>

- Stack Trace говорит **ГДЕ** упало
- но на **КАКИХ ДАННЫХ** &ndash; не говорит

</v-clicks>


---
layout: center
class: code-xl code-flow
---

# <carbon-view-off-filled class="text-yellow-400 inline" /> И неверный расчёт

```js {none|1-3|1-5}
// самый типичный пример
// твой родной язык JavaScript ?
const sum = new Sum([ '1', 1 ]); // 11
// и вот так теряем "почему"
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

## Проблемы Одинаковые

<v-clicks style="margin-top: 1vh">

- мы не знаем, какие данные были
- мы теряем контекст момента ошибки
- и воспроизвести её не получится
  
</v-clicks>
<v-click>

## Бизнес Теряет Деньги

</v-click>
<v-clicks>

- на неоправданных ожиданиях клиентов
- на долгой отладке и дорогой разработке
  
</v-clicks>



---
layout: section
---

# контекст ошибки

## Глава 2: → 2018 →


---
layout: center
class: code-fit
---

# 2016 &ndash; это времена callback hell
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
class: code-xl code-flow
---

# Как отследить Execution Flow ?

```ts {none|1|1-2|1-3|1-6|1-7|1-9}
const wrap = function ( cb, ...data ) {
	return function ( ...data ) {
		const result = cb.call( this, ...data );
		if (result instanceof Function) {
			return wrap(result);
		}
		return result;
	}
};
```

---
layout: center
class: code-fit code-flow
---

# Обёртка в реальности выглядит как-то так

```ts {none|1-3|1-5|1-9|1-12|1-14}
const wrap = function ( cb, ...data ) {
	// декорирует cb и data "вглубь"
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
class: code-fit code-flow
---

# И если ещё реальней ... 

```ts {none|1-3|1-7|1-8|1-10|1-14}
var saved;
const doWork = function () {   /* какая-то работа */   };

const onRequest = wrap(( cb ) => {
	saved = cb;
}, requestInstance);                           ← контекст requestInstance

onRequest( () => doWork () );

// запрос A закончился но cb ~ saved "выжил" и продолжит ...
// теперь "протекать" сквозь код в других местах выполнения
const runJob = wrap(( job ) => job (), serviceInstance);

runJob( saved );                               ← продолжает прилипать к коду !!!
```

---
layout: image
image: /img/grafana.jpg
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
image: /img/async_hooks.png
backgroundSize: 55%
---

# Там в 2018 появились async_hooks


---
layout: image
image: /img/issue249.png
backgroundSize: 55%
---

# В итоге оказалось, оно не работает


---
layout: center
class: code-xl code-flow
---

# Пример отсутствия контекста

```ts {none|1-3|1-7|1-10}
// где-то в коде обработки запроса
const { data } = req;

process.on('uncaughtException', (error) => {
	// тут хочу получить data или req
	// но есть только error.stack
});

setTimeout(() => { data.ref.error; }, 0);

```



---
layout: image
image: /img/context-dive.png
backgroundSize: 55%
---

# Но я &laquo;запилил&raquo; решение

---
layout: image
image: /img/async_zero.png
backgroundSize: 55%
---

# И рассказал на HolyJS 2018


---
layout: image
image: /img/Andrey.png
backgroundSize: 55%
---

# А в 2019 появился Андрей 


---
layout: image
image: /img/als.png
backgroundSize: 55%
---

# И в конце 2019 доделал ALS


---
layout: image
image: /img/issue249_fin.png
backgroundSize: 55%
---

# Issue я закрыл как нерелевантное

---
layout: center
class: code-flow
---

# потому, что с ~2020 можно так

```js {none|1-3|1-7|1-11}
const { AsyncLocalStorage } = require('node:async_hooks');
const als = new AsyncLocalStorage();

process.on('uncaughtException', (error) => {
	// нормально обрабатываем res
	const { req, res } = als.getStore();
});

// где-то в коде
als.run({ req, res });

```

---
layout: center
class: code-xl code-flow
---

# Но вопрос остался открыт

```ts {none|1|1-3|1-4|1-7|1-9}
const { data } = req;
// отпускаем запрос на волю
res.send('some response');
// и req в uncaughtException не будет ...
setTimeout(() => {
	data.ref.error; // uncaughtException
}, 0);
// т.к. в ALS самого req уже нет
```


---
layout: image
image: /img/dip.png
backgroundSize: 45%
---

# Поэтому я пошёл своим путём


---
layout: section
---

# Учимся Считать

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

# И в JavaScript есть технология


---
layout: center
class: code-xl code-flow
---

## В Prototype Chain идентичность
## задаётся через наследование

<v-click>

<br />

```ts {none|1|1-3|1-7}
Object.setPrototypeOf(
	
	Successor,     // новая модель
	
	Predecessor    // исходная модель

);
```

</v-click>


---
layout: image
image: /img/EichObjects.png
backgroundSize: 55%
---

# И есть &laquo;своеобразная&raquo; философия


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

# №1 как сделать : DAG ?

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
class: code-xl code-flow
transition: none
---

# И как показать идею кодом ...

```ts {none|1-2|1-5}
// первое поколение
const user = new User({ name: 'Ada' });
// второе поколение
const admin = new user.Admin({ role: 'root' });

```

---
layout: center
class: code-xl code-flow
transition: none
---

# ... и ещё раз ... наглядно ...

```ts {1-2|1-5}
// первое поколение
const ⟪user⟫ = new User({ name: 'Ada' });
// второе поколение
const admin = new ⟪user⟫.Admin({ role: 'root' });

```


---
layout: center
class: code-xl code-flow
transition: none
---

# ... и для &laquo;полноты картины&raquo;  ...

```ts
// первое поколение
const ⟪user⟫ = new User({ name: 'Ada' });
// второе поколение
const ⟪admin⟫ = new ⟪user⟫.Admin({ role: 'root' });

Object.getPrototypeOf( ⟪admin⟫ ); // ⟪user⟫
```

<v-click>

И &laquo; память &raquo; истории объекта будет в Prototype Chain.

</v-click>


---
layout: image
image: /img/Mnemonica.png
backgroundSize: 55%
---

# Так появилась Mnemonica


---
layout: default
class: code-lg code-flow
---

# mnemonica: define()

```ts {none|1|1-6|1-10}
import { define } from 'mnemonica';

const ⟪User⟫ = define('User', function (data) {
	this.name = data.name;
});

const Admin = ⟪User⟫.define('Admin', function (data) {
	this.name = data.name;
});

```

---
layout: default
class: code-lg code-flow
---

# mnemonica: @decorate()

```ts {none|1|1-6|1-10}
import { decorate } from 'mnemonica';

// root object
@decorate ()
class ⟪User⟫ { /.../ };

// predecessor
@decorate ( ⟪User⟫ )
class Admin { /.../ }

```

---
layout: default
---

# в Runtime &ndash; это дерево

```ts
const user  = new User({ name: 'Ada' });
const admin = new user.Admin({ role: 'root' });
const super   = new admin.SuperAdmin();
```

<div class="flex justify-center mt-2">
<Chart type="tree" class="w-125"
  :data="{ name: 'User', children: [ { name: 'Admin', children: [ { name: 'SuperAdmin' } ] }, { name: 'Manager' }, { name: 'Guest' } ] }"
  :opts="{ dy: 26, dx: 100, width: 370, margin: { top: 24, bottom: 12, right: 24, left: 60 } }" />
</div>

---
layout: default
---

# &laquo;Жизненный Цикл&raquo; данных

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
image: /img/Typeomatica.png
backgroundSize: 55%
---

# Начал с типизации

---
layout: image
image: /img/TypesInPrototypes.png
backgroundSize: 55%
---

# Потом занялся прототипами


---
layout: center
class: code-xl code-flow
---

# Паттерн : обычное Identity

```ts {none|1|1-2|1-4|1-7}
export type ConstructorDefinition <T> 
	= {	new(): T } |
	  { (
				this: T,
				...args: unknown[]
		): void
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

---
layout: center
class: code-xl code-flow
---

# Основа &ndash; это Pick + Exclude

```ts {none|1|1-3|1-4|1-5|1-7}
type Proto < Prototype, Type > =
	Pick<
		Prototype,
		Exclude<
			keyof Prototype, keyof Type
		>
	> & Type;
```


---
layout: center
---

# Но с Identity это лишь ...

<v-clicks>

- ## `.apply`&nbsp;&ndash; аргументы как .apply
- ## `.call `&nbsp;&ndash; аргументы как .call
- ## `.bind `&nbsp;&ndash; отложенный вызов

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
class: code-xl code-flow
---

## Решение &ndash; Declaration Merging 

```ts {none|1|1-2|1-3|1-5|1-6|1-9}
// по исходникам и генерируется реестр
// далее merge'ится через tsconfig.json
interface TypeRegistry {

	Root  : IDefinitor<'Root',       /* … */>
	User  : IDefinitor<'Root.User',  /* … */>
	Admin : IDefinitor<'Root.User.Admin' ...

}
```

---
layout: default
---

# Но как это Контролировать ?

```ts
const user  = new User({ name: 'Ada' });
const admin = new user.Admin({ role: 'root' });
const super   = new admin.SuperAdmin();
// Some Person, Other Person, Random Person, Sibling Person
```

<div class="flex justify-center mt-2">
<Chart type="tree" class="w-125"
  :data="{ name: 'User', children: [ { name: 'Admin', children: [ { name: 'SuperAdmin' } ] }, { name: 'Manager' }, { name: 'Guest' }, { name: 'Same Person', children: [ { name: 'Other Person' }] }, { name: 'Random Person' }, { name: 'Sibling Person' } ] }"
  :opts="{ dy: 20, dx: 100, width: 370, margin: { top: 24, bottom: 12, right: 24, left: 60 } }" />
</div>


---
layout: section
---

# Observability &laquo;визуально&raquo;


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
layout: center
---

# И это полезно если

<v-clicks>

- ## наглядность из запроса `A`,
- ## выжила в обработчике `N` и ...
- ## для ошибки в коде `X` и ...
- ## это полностью отслеживается
- ## привычным инструментарием

</v-clicks>


---
layout: image
image: /img/open_telemetry.png
backgroundSize: 55%
---

# Observability: Open Telemetry


---
layout: center
---

# Построим Observability 


```ts
// Handler, рождённый в запросе A,
// выжил в сервисе B и рассказывает
// историю мёртвого запроса A
```

<v-clicks>


## @mnemonica/dive<br/> @mnemonica/otel

- контекст привязан к идентичности экземпляра
- идентичность видна в графе вызовов

</v-clicks>


---
layout: center
class: code-flow
---

# Но в Back-End есть NestJS

<v-clicks style="margin-top:-2vh">

- NestJS &ndash; крепость: его не переделать
- адаптер: @mnemonica/nestjs

</v-clicks>

<v-click>

```ts {1|1-3|1-5|1-6|1-9}
export class MvpController {
	createWidget (
		@Body (
			// mvp импортируется из @mnemonica/nestjs
			mvp.forType(MvpWidgetType, CreateWidgetDto)
			// mvp : mnemonica validation pipe
		) widget: MvpWidget,
		@Req() req: Request,
	): object { // ...
```

</v-click>


---
layout: statement
---

# <br /> DEMO 2

## Nest.JS: живые трассы


---
layout: center
class: table-fit
---

# результаты, для наглядности 

<table>
<thead>
<tr>
<th>**</th>
<th>express / fastify / nest</th>
<th>они же</th>
<th>nest</th>
</tr>
</thead>
<tbody>
<tr>
<td>OTel wiring</td>
<td>Node SDK + auto-instrumentations</td>
<td>@mnemonica/dive<br />@mnemonica/otel</td>
<td>+<br />@mnemonica/nestjs</td>
</tr>
<tr>
<td>HTTP span на запрос</td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
</tr>
<tr>
<td>Construction spans</td>
<td><carbon-error-filled class="text-red-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
</tr>
<tr>
<td>Service-call spans</td>
<td><carbon-error-filled class="text-red-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
</tr>
<tr>
<td>пойманная ошибка запроса</td>
<td>enriched 500</td>
<td>+ unblinder *</td>
<td>+ unblinder *</td>
</tr>
<tr>
<td>Uncaught Exception / Unhandled Rejection</td>
<td>
<span style="color: red">
только stack, <br />ручной boilerplate
</span>
</td>
<td>
<span style="color: orange">
branch + экземпляр <br />+ его аргументы
</span>
</td>
<td>
<span class="text-green-400 font-bold">
то же самое, + <br /> трасса До Ошибки
</span>
</td>
</tr>
<tr>
<td>&laquo;30 секунд спустя&raquo;</td>
<td><carbon-error-filled class="text-red-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
<td><carbon-checkmark-filled class="text-green-400 inline" /></td>
</tr>
<tr>
<td>какие <b>данные</b> упали</td>
<td>не связать</td>
<td>доступны</td>
<td>доступны и полны</td>
</tr>
</tbody>
</table>

<p style="padding-left: 1vw">* <b>Unblinder</b> &mdash; обработчик ошибок из @mnemonica/otel: по объекту ошибки восстанавливает экземпляр,
<br /> &nbsp; его construction аргументы и execution flow и пишет их в Jaeger span</p>

<p style="padding-left: 1vw">** примеры таблицы доступны в репозитории https://github.com/mythographica/finecut</p>


---
layout: center
title: tactica-nestjs
---

<GraphOverlay src="/tactica-nestjs-graph.html" title="Electron Graph" />


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

# <br /> AI пишет код быстрее,<br/> чем мы проверяем

<v-clicks>

- корректность &ndash; это новая &laquo;валюта&raquo;
- 3D визуализация упрощает понимание
- `.tactica` &ndash; инструкция для AI &laquo;из коробки&raquo;
- реестр типов == машиночитаемое намерение
- итого: совместная человеко-машинная разработка


</v-clicks>

---
layout: statement
---

# <br /> DEMO 4

## нечто большое


---
layout: center
---

<GraphOverlay src="/real-work-graph.html" title="Real Work Graph" />

---
layout: center
---

# <br /> <br /> Агент остался доволен

<v-click>

### « It's a genuinely strange and good feeling<br/> to be shown a picture of my own reasoning<br/> about a codebase. »

</v-click>


---
layout: center
class: table-fit table-center
---

<center>

# Применимость идеи в языках

</center>

<br />

<table>
<thead>
<tr>
<th></th>
<th>JS / Node</th>
<th>Python<br />data / ML</th>
<th>Go</th>
<th>JVM, Kotlin, reactive Java</th>
<th>.NET</th>
<th>Rust</th>
</tr>
</thead>
<tbody>
<tr>
<td>неверные данные</td>
<td class="text-red-400">высокая</td>
<td class="text-red-400 font-bold">очень высокая</td>
<td class="text-yellow-400">средняя<br />zero values</td>
<td class="text-red-400">высокая</td>
<td class="text-yellow-400">средняя</td>
<td class="text-green-400">низкая</td>
</tr>
<tr>
<td>потерян async-контекст</td>
<td class="text-red-400">высокая</td>
<td class="text-yellow-400">средняя</td>
<td class="text-yellow-400">средняя<br />явный <br /><code>ctx</code></td>
<td class="text-red-400 font-bold">очень высокая, MDC</td>
<td class="text-green-400">низкая <br />через<br /><code>AsyncLocal</code></td>
<td class="text-green-400">низкая</td>
</tr>
<tr>
<td>lineage в домене</td>
<td class="text-yellow-400">средняя</td>
<td class="text-red-400">высокая</td>
<td class="text-yellow-400">средняя</td>
<td class="text-red-400 font-bold">очень высокая, аудит</td>
<td class="text-red-400">высокая</td>
<td class="text-green-400">аудит</td>
</tr>
<tr>
<td>механизм</td>
<td><b>native</b></td>
<td><code>__getattr__</code></td>
<td>embedding</td>
<td>Kotlin, KSP, <br /><span class="whitespace-nowrap"><code>by</code> delegation</span></td>
<td>delegation вручную</td>
<td><code>Deref</code>, macros</td>
</tr>
</tbody>
</table>

<v-click>

<center>

 пока сделал только для Python & Go

</center>

</v-click>


---
layout: image
image: /img/mnemonica-py.png
backgroundSize: 75%
---

---
layout: image
image: /img/mnemonica-go.png
backgroundSize: 75%
---


---
layout: default
---


# <a href="https://mythographica.github.io">https://<span style="color: orange">mythographica</span>.github.io</a>


<div class="grid grid-cols-[7fr_4fr] gap-7 mt-11 items-center">
<img src="/img/mythographica.png" class="w-full rounded-lg shadow-lg" />
<img src="/img/qrcode_mythographica.github.io.png" class="w-full rounded-lg shadow-lg" />
</div>


---
layout: center
---

<center>

## &nbsp; Стоял &laquo;на плечах гигантов&raquo;

</center>

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

# И продолжил стоять ;^)

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
layout: center
---

<center>

#  Спасибо!

<br />

<img src="/img/qrcode_github.com.png" width="55%" class="rounded" />

</center>

---
layout: end
---

<center>

#  Q & A

<br />

<img src="/img/qrcode_github.com.png" width="55%" class="rounded" />

</center>