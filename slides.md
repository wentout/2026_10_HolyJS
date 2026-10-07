---
theme: default
title: Elegant Observability — unchained for JavaScript and Node.js
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

# немного обо мне

<div class="grid grid-cols-[5fr_4fr] gap-6 mt-4 items-center">
<div class="text-lg leading-relaxed pl-4 [&_li]:whitespace-nowrap">

<v-clicks>

- застал времена первой спецификации
- то есть занимаюсь JS четверть века
- немного age'изма: да мне почти 45
- родился и живу в Ростове-на-Дону
- да, там тоже есть IT и инженеры
- до 30 занимался IT-экономикой
- потом как-то &laquo;залип&raquo; в код и  ...

</v-clicks>

</div>
<div class="flex justify-center self-center">
  <img src="/img/ava_pipe_499.jpg" class="w-48 rounded-2xl shadow-lg" />
</div>
</div>

---
layout: center
---

# о чём и как я буду говорить

<v-clicks>

- 2016: момент, когда я начал заниматься этой проблемой
- 2018: время, когда я я решал её самым &laquo;наивным&raquo; способом
- 2019: наконец-то понял, что так не получится и &laquo;как нужно&raquo;
- 2021 → 2023: адаптировал Runtime решение для TypeScript
- 2024 → 2026: рассказывал о находках и пробовал визуализацию
- 2026: появился AI, всё решилось:  Observability &laquo;наглядно&raquo;
- Выводы, которые можно посчитать

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

# работал в этой компании


---
layout: image
image: /img/team.jpg
backgroundSize: 55%
---

# с этими хорошими людьми


---
layout: image
image: /img/philip_roberts.png
backgroundSize: 55%
---

# ничто не предвещало проблем

---
layout: image
image: /img/s500.jpg
backgroundSize: 55%
---

# что-то где-то намертво зависало

---
layout: image
image: /img/s500.3.jpg
backgroundSize: 55%
---

# помидорки пробивали перцентиль

---
layout: image
image: /img/real_stack.png
backgroundSize: 55%
---

# в логи тихо сыпались ошибки

---
layout: image
image: /img/tips.gif
backgroundSize: 55%
---

# обычный рабочий процесс

---
layout: image
image: /img/giphy.gif
backgroundSize: 55%
---

# обычный рабочий процесс

---
layout: image
image: /img/task_types_chart.png
backgroundSize: 55%
---

# взгляд со стороны Jira

---
layout: center
---

# итого: обычный вторник

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
---

# <carbon-error-filled class="text-red-400 inline" /> Uncaught Exception

```js
// забыли валидацию, влетел null

new Sum (null);

// TypeError: null is not iterable
```

<v-clicks>

- Stack Trace говорит, **ГДЕ** упало
- но на **КАКИХ ДАННЫХ** — не говорит

</v-clicks>


---
layout: center
---

# <carbon-view-off-filled class="text-yellow-400 inline" /> неверный расчёт

```js
// самый типичный пример

const sum = new Sum([ '1', 1 ]);
// твой родной язык JavaScript что-ли?
JSON.parse(JSON.stringify(sum));
```

<v-clicks>

- так как &mdash; это **happy path**
- поэтому ни исключения, ни лога
- и почему оно так было тоже ...

</v-clicks>


---
layout: center
---

## проблемы одинаковые

<v-clicks>

- мы не знаем какие данные были
- мы теряем контекст момента ошибки
- и воспроизвести её не получится
  
</v-clicks>
<br/>
<v-click>

# бизнес теряет деньги

</v-click>


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

# чёрная кошка в тёмной комнате

---
layout: center
class: code-fit
---

# это были времена callback hell

<table>
<tr>
<td>

```ts
step1((cb) => {
	step2((cb) => {
		step3((cb) => {
			step4((cb) => {
				step5((cb) => {
					cb(result)// какая-то ещё работа
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
    function(callback) { ... },
    function(callback) { ... }
], function(err, results) {
    // optional callback
});

async.series([
	function(callback) { ... },
	function(callback) { ... }
]);
```

</v-click>
</td>

</tr>

</table>

---
layout: center
class: code-fit
---

# подумал, что можно всё обернуть

```ts
const wrap = function ( cb, ...data ) {
	// проверяет элементы data
	// если typeof data [ i ] === 'function'
	// то wrap'ает такие элементы

	const result = cb.call(this, ...data );

	// проверяет typeof result
	// и тоже  wrap'ает
	// если видит, что это function

	return result;
};

```

единичный вызов &laquo;расползается&raquo; по коду


---
layout: center
class: code-fit
---

# обёртка в реальном коде

```ts
const wrap = function (cb, ...data) {
	// декорирует cb вглубь data
};

const fn = (x: number) => x * 2;

const requestInstance = {};
const serviceInstance = {};

// обёртка привязана к истории requestInstance
const w1 = wrap(fn, requestInstance);

// ПРОБЛЕМА: попытка обернуть с ДРУГИМ контекстом !
const w2 = wrap(w1, serviceInstance);
```


---
layout: center
class: code-fit
---

# Но! Реальная проблема Хуже ...

```ts
var saved;

const doWork = function () { /* какая-то работа */ };

const onRequest = wrap((cb) => {
	saved = cb;
}, requestInstance);     // контекст requestInstance

onRequest(() => doWork());

// запрос A закончился но cb~saved выжил 
// и теперь "прорастает" сквозь код в других местах

const runJob = wrap((job) => job(), serviceInstance);
runJob( saved );
```

---
layout: image
image: /img/ne4to_main.webp
backgroundSize: 55%
---

# тема интересовала не только меня



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

# в итоге оказалось, оно не работает


---
layout: image
image: /img/context-dive.png
backgroundSize: 55%
---

# но решение я всё-таки запилил


---
layout: image
image: /img/async_zero.png
backgroundSize: 55%
---

# Asynchronous Zero — HolyJS 2018


---
layout: image
image: /img/dip.png
backgroundSize: 45%
---

# в итоге я пошёл своим путём


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

# контекст &mdash; это данные

---
layout: image
image: /img/GanttProject.png
backgroundSize: 55%
---

# данные, распределённые во времени

---
layout: image
image: /img/GanttChart.png
backgroundSize: 55%
---

# и это уже давно всё придумано


---
layout: image
image: /img/PrototypeChain.png
backgroundSize: 55%
---

# и в JavaScript есть конструкт

---
layout: image
image: /img/EichObjects.png
backgroundSize: 55%
---

# и своеобразная философия


---
layout: image
image: /img/EichNullUndefined.png
backgroundSize: 55%
---

# и есть объяснимое поведение

---
layout: image
image: /img/inheritance.png
backgroundSize: 55%
---

# я писал про это статью

---
layout: default
title: JS_Object_Topology
---

<h1 class="text-center">коротко: JS всё объекты</h1>

<div class="flex justify-center">
  <img src="/img/JS_Object_Topology.svg" style="filter: invert(1)" width = "90%" />
</div>


---
layout: center
---

### идентичность данных
<v-click>

## задаётся через наследование

</v-click>

<v-click>

<br />

```ts
Object.getPrototypeOf(
	
	Successor_Instance,  // новая модель
	
	Predecessor_Instance // исходная модель

);
```

</v-click>


---
layout: center
---

# Как построить : Trie ~ DAG


<table>
<tr>
<td width = "67%" >

<v-clicks>

- `setPrototypeOf` — не подходит
- т.к. нужны `(...args)` конструкторов
- `instanceOf` может означать identity
- если использовать `Symbol.hasInstance`
- и ещё &laquo;залочить&raquo; `constructor.name`
- и если использовать Proxy как вход
- `new` поможет выделить сам процесс

</v-clicks>
</td>
<td>

<img src="/img/Transitive_Closure.svg" />

</td>

</tr>
</table>


---
layout: center
class: code-lg
---

# и показать идею кодом ...

```ts
// первое поколение
const user = new User({ name: 'Ada' });

// второе поколение
const admin = new user.Admin({ role: 'root' });

Object.getPrototypeOf( admin ) // → user
```

<v-click>

Теперь Prototype Chain **и есть** &laquo; память &raquo; объекта.

</v-click>


---
layout: image
image: /img/Mnemonica.png
backgroundSize: 55%
---

# так появилась Mnemonica


---
layout: center
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
layout: center
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

# а в Runtime это — дерево

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

# поэтому есть &laquo;Жизненный Цикл&raquo;

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
- граф экземпляров Mnemonica — &laquo;после&raquo;
- и есть ещё TypeScript декораторы ...
- для IntelliSense всё это нужно как-то &laquo;подружить&raquo;
- и вообще есть ещё та самая &laquo;строгая типизация&raquo;

</v-clicks>

---
layout: center
---

# Учим TS наследованию

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
layout: image
image: /img/TypesInPrototypes.png
backgroundSize: 55%
---

# про это был отдельный доклад


---
layout: center
---

# паттерном Identity


```ts

export type ConstructorDefinition <T> =
	{
		new(): T
	} | { 
		( this: T, ...args: unknown[]): void
	};
```

<v-clicks>

- `.apply` &mdash; аргументы как .apply
- `.call`  &mdash; аргументы как .call
- `.bind`  &mdash; отложенный вызов

</v-clicks>


---
layout: image
image: /img/Typeomatica.png
backgroundSize: 55%
---

# и библиотека про строгую типизацию


---
layout: center
---

## Declaration Merging : Registry

```ts
// читаем исходники и генерирует реестр

interface TypeRegistry {

	Root: IDefinitorInstance<'Root', /* … */>
	User: IDefinitorInstance<'User', /* … */>
	Admin: IDefinitorInstance<'User.Admin', /* … */>

}
```

<v-click>

TS Types генерируются из кода для tsconfig.json

</v-click>




---
layout: statement
title: tactica-nestjs
---

# DEMO 1

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

</v-clicks>


---
layout: center
---

# @mnemonica/nestjs

<v-clicks>

- NestJS — крепость: его не переделать
- поэтому инструментируем снаружи, адаптером
- DTO-шки: ошибки доклада «Real DTO» учтены

</v-clicks>

---
layout: statement
---

# DEMO 2

## Nest.JS: живые трассы


---
layout: statement
---

# DEMO 3

## что по фронту

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

# Высота птичьего полёта

<v-clicks>

- не только отладка: проектирование
- граф типов читается человеком и машиной
- `.tactica` — инструкция для AI-агентов из коробки

</v-clicks>


---
layout: center
---

# AI пишет код быстрее,<br/> чем мы проверяем

<v-clicks>

- корректность — новая валюта
- реестр типов = машиночитаемое намерение
- агент знает, ЧТО он построил

</v-clicks>

---
layout: center
---

# AI доволен


<v-click>

## « It's a genuinely strange and good feeling<br/> to be shown a picture of my own reasoning<br/> about a codebase. »

</v-click>

---
layout: statement
---

# DEMO 4

## нечто большое

---
layout: center
---

<GraphOverlay src="/real-work-graph.html" title="Real Work Graph" />

---
layout: center
---

# Что попробовать дома

<v-clicks>

- `npm i mnemonica`
- `npx tactica` на своём проекте
- Mnemographica — инструкция в репозитории

</v-clicks>

---
layout: center
---

# &laquo; Стоя на плечах Гигантов &raquo;

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

# Итоги

<v-clicks>

- никаких скрытых фоновых инструментов
- ничего странного в пакетах
- maintainability в runtime
- ответы заранее: AoT/AST
- простая цепочка обработки ошибок

</v-clicks>


---
layout: end
---

# Спасибо!


---
layout: center
---

# Q & A

### 10 минут

---
layout: center
---

# FIN



---
hide: true
layout: center
---

# Три формы одной ошибки

<v-clicks>

- отложенный вызов
- очередь сообщений
- обычный ReferenceError
- ... и их комбинации

</v-clicks>

---
hide: true
layout: center
---

# Отложенный вызов

```ts
const data = 'data';
res.send('data');
setTimeout(() => {
    // some error here
}, 0);
```

<v-click>

Запрос уже завершён. Ошибка случится потом. Кто её поймает?

</v-click>

---
hide: true
layout: center
---

# Очередь сообщений

```ts
const data = req.data;
// no try-catch block
await queue.send('data');
```

<v-click>

Между `await` и падением — чужой event loop.

</v-click>

---
hide: true
layout: center
---

# Обычный ReferenceError

```ts
const data = req.data;
// no try-catch block
const parsed = data.a.b.c
```

<v-click>

Самая частая ошибка в проде. И самая необъяснимая.

</v-click>
