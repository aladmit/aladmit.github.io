---
description: Договорились о терминах, обсудили состав платформенной команды, необходимый набор компетенций и с чего начать продажу идеи о платформах бизнесу.
tags:
  - platform
published: 2022-10-13
title: Конспект стрима "компетенции платформенной команды" у @dosepic
---

Участники
- **Карапет Манасян** – руководитель платформы [московской биржи](https://www.moex.com)
- **Игорь Курочкин** – эксперт [enabling.team](https://enabling.team)
- **Артём Науменко** – Head of Infra в [Skyeng](https://skyengschool.com)

## Договорились о терминах
- Site Reliability Engineering – когда разработчик занимается эксплуатацией
- Platform Engineering – когда продакт занимается внутренним продуктом
- Platform Team – тип продуктовой команды, которая занимается внутренним продуктом

Platform team отличается от инфраструктурной команды наличием продуктовых компетенций. Команда понимает кто ее клиент, регулярно занимается custdev'ом и выявлением болей других команд, превращает это в беклог и роадмап.

Платформа – внутренний продукт(сервис), который позволяет разработчику получить нужный результат, без взаимодействия с человеком из другой команды и ожидания.

## Компетенции и состав команды
Продуктовые компетенции обязательно должны быть у руководителя команды. Если их не хватает, можно добавить в команду Product Owner. Всей команде нужен опыт разработки, чтобы дизайнить API, обрабатывать ошибки, писать тесты и заранее решать проблемы, которые могут возникнуть у разработчика. Хорошо бы иметь в команде настоящего разработчика, который бы добавлял контекст реальной работы.

В Skyeng платформенные инженеры разрабатывают платформу на тех же инструментах, которые они предоставляют разработчикам. Так они лучше понимают что с инструментами не так и куда их развивать.

Получается, что платформенная команда состоит из тех же ролей, которые есть в кроссфункциональной продуктовой команде: Product Owner, Developer, Ops и QA.

## Как продать платформу топ-менеджменту?
### Ответ Игоря Курочкина
Нужно начать с кастдева своего бизнеса и разработчиков. Какие у них планы? На какие метрики они смотрят? Формулируем как платформа может помочь улучшить какие-то из этих метрик и идем обсуждать с топ-менеджментом. В разговоре необходимость в платформе может подтвердиться, а может выясниться что компании нужно что-то совсем другое.

### Ответ Артёма Науменко
Топ-менеджмент смотрит на бизнес-метрики: Time to Market и сколько денег на реализации компания зарабатывает. От сюда выводиться стоимость одно часа – time to market. Если разработчик 4 часа ждет доступы к базе, то компания в деньгах потеряла 4 часа time to market'а. Приходим и говорим, что реализовав сервис выдачи доступов мы будем зарабатывать вот на столько больше денег.

### Мой пример
Компания делала коробочный SaaS для корпоративных клиентов. Инженеры хотели сделать внутреннюю платформу, чтобы ускорить разработку, сделать всем удобнее, но бизнес не выделял на это ресурсов. На звонке с бизнесом выяснилось что компания не только на SaaS, но и на и на часах разработки фич под заказ. Бизнес не хочет ускорять разработку, потому что ему это выгодно. Развивать платформу в такой компании смысла нет.

## Трансформация инфраструктурной команды в платформенную
Стоить начать с поиска апологета платформенного подхода в команде, дать ему ресурсов и власти на развитие этой идеи. В команде обязательно должен быть кто-то, у кого есть представление, в итоге должна выглядеть платформенная команда. Если такого человека нет, его нужно нанять снаружи. Например, это может быть [enabling.team](http://enabling.team) (не удержался 😅)

Трансформация процесс длительный, поэтому на эту задачу нужен человек, которому нравится общаться с разработчиками других команд, готовый доводить дело до конца.

Альтернативный вариант, это разобрать команду и внедрить инженеров в команды разработки. Таким образом они все свое время будут посвящать помощи разработчикам, начнут понимать их боли и потребности. Есть риск что такой вариант понравится не всем и часть инженеров уйдет.

##  Чего не хватает на рынке для движения в сторону платформ
- конференций и комьюнити о платформах
- книг
- ярких лица, которые бы развивали эту тему

## Ссылки
- стрим проходил в канале [@dosepic](https://t.me/dosepic)