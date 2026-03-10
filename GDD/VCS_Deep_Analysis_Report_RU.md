# 🏖️ Vacation Cafe Simulator — Глубокий Анализ и Пакет Улучшений
**Горизонт: 0–3 месяца | Дата актуальности: 4 марта 2026 | Язык: русский**
**Источники: Steam-форум VCS (100+ постов), Discord-чат (#ru-chat, #suggestions, #bugs), локальные CSV-выгрузки Next Fest 23.02–02.03.2026**

---

## Раздел 1. Обзор игры и жанр

### 1.1 Идентификационная карта игры

| Параметр | Значение |
|---|---|
| **Название** | Vacation Cafe Simulator |
| **Разработчик** | Elven Sun Studios (indie team) |
| **Платформа** | PC (Steam), App ID: 3196440 |
| **Статус** | Демо прошло → ранний доступ запланирован на 2026 |
| **Next Fest** | 23.02–02.03.2026 (первое публичное демо) |
| **Версия на момент анализа** | Patch 0.13.2 (27.02.2026) |
| **Режимы** | Single-player, Co-op (2+ игроков) |
| **Сеттинг** | Итальянский курортный городок; Средиземноморская эстетика |
| **Визуальный стиль** | 3D, от первого лица (FPS-cam), реалистичные текстуры, тёплая цветовая палитра |
| **Язык меню** | EN (основной), локализация ограничена |

### 1.2 Жанровая классификация

```
PRIMARY:   Cozy Simulation
SECONDARY: Cafe / Restaurant Management
TERTIARY:  Life-sim elements (town exploration, vendor interactions)
CO-OP TAG: Co-op Service Sim (2–4 players)
```

**Ближайшие Steam-теги по аудитории:** `Casual`, `Cooking`, `Simulation`, `Relaxing`, `Co-op`, `Early Access`

### 1.3 Core Gameplay Loop (5 фаз)

```
┌─────────────────────────────────────────────────────────────────┐
│  ФАЗА 1: ЗАКУПКА                                                │
│  Игрок идёт в городские магазины → покупает ингредиенты        │
│  (помидоры, моцарелла, тесто для пиццы, оливковое масло и т.д.)│
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ФАЗА 2: ЗАГОТОВКА                                              │
│  Нарезка → замес → базовая mise en place.                       │
│  Это «ручная» часть; много повторов (ключевая точка трения).    │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ФАЗА 3: СЕРВИС                                                 │
│  Посетители приходят → принимаем заказ → готовим → подаём.     │
│  Мини-игры (приготовление пиццы, пасты, антипасти).            │
│  Нет глобального таймера (Peaceful Mode по умолчанию).          │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ФАЗА 4: ВЫРУЧКА & АПГРЕЙДЫ                                     │
│  Деньги → покупка нового оборудования / рецептов / декора.      │
│  Прогресс уровня кафе → разблокировка нового меню.             │
└──────────────────────┬──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ФАЗА 5: СОХРАНЕНИЕ & ПОВТОР                                    │
│  [!] Здесь главная боль: ко-оп прогресс не сохраняется.        │
│  Соло: прогресс сохраняется нестабильно (несколько жалоб).     │
│  Цикл возобновляется: → Фаза 1                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Соответствие заявленному описанию на Steam:** ✅ Консистентно. Игра явно позиционирует «no timers, no stress» — это подтверждается отзывами. Единственное расхождение: Steam-текст обещает «grow your dream cafe», но механика роста в демо ощущается незавершённой (особенно экономика и прогрессия уровней).

---

## Раздел 2. Анализ Фидбека Игроков

### 2.1 Источники и объём

| Источник | Записей | Период | Языки |
|---|---|---|---|
| Steam-форум (CSV 1) | ~100 постов | Сен.2025 – Мар.2026 | EN, FR, IT, PT, RU, ZH |
| Steam-форум (CSV 2) | ~30 постов | Фев.–Мар.2026 | EN, FR, RU |
| Discord #suggestions | ~25 тредов | Янв.–Мар.2026 | EN, FR, IT, ES |
| Discord #ru-chat | ~5 сообщений | Фев.–Мар.2026 | RU |

**Итого:** ~160 уникальных сигналов обратной связи (после дедупликации межъязыковых совпадений).

### 2.2 Таксономия тем и приоритизация

**Формула PriorityScore = 0.5 × Frequency + 0.3 × Severity + 0.2 × Recency** (шкала 1–5)

| Тема | Кластер | Частота (F) | Серьёзность (S) | Свежесть (R) | **Score** | Сигналы |
|---|---|---|---|---|---|---|
| **Save/progress loss** | Co-op stability | 5 | 5 | 5 | **5.00** | "lost 6h progress", "co-op saves deleted", "progress wiped on update" |
| **Performance / FPS** | Technical | 5 | 4 | 5 | **4.70** | VRAM overflow, 10-14fps на minimum specs, Solo crash 32GB RAM |
| **AI-art controversy** | Brand / Trust | 4 | 4 | 4 | **4.00** | "won't buy until AI removed", "nonsense letters on signs", "floating bottles" |
| **Controls/Camera friction** | QoL | 4 | 3 | 4 | **3.70** | Clunky cam, no cursor on Steam Deck, motion blur sickness, Y-axis只 inversion |
| **Prep automation** | Gameplay | 4 | 2 | 4 | **3.40** | "automate cutting", "too much repetition in mise en place" |
| **No after-hours content** | Retention | 3 | 3 | 3 | **3.00** | "city is beautiful, nothing to do after close", "need a house to go home to" |
| **Difficulty modes** | Gameplay | 3 | 2 | 3 | **2.70** | "Peaceful great but need Challenge mode", "timer option", "kitchen fire" |
| **Atmosphere / Cozy feel** | ✅ POSITIVE | 5 | — | 5 | — | "real vacation feeling", "lose track of time for hours", "incredible vibe" |
| **Co-op fun** | ✅ POSITIVE | 4 | — | 4 | — | "best game we played with friend", "TikTok discovery", "cook together" |
| **Unique concept** | ✅ POSITIVE | 4 | — | 5 | — | "nothing like this", "little masterpiece", "developer love" |

> ⚠️ **Проверка конфликта сигналов (таймеры):** 3 игрока против таймеров («no stress = good»), 2 — за («need harder mode»). Решение: опциональный режим сложности, не изменение дефолта.

> ⚠️ **Проверка смещения источников (AI-арт):** 6 жалоб в Discord + 4 в Steam-форуме (10 уникальных сигналов из 160 = 6.25%). НЕ массовая проблема по частоте, НО серьёзность высокая (реальная угроза конверсии в покупку и PR-риск).

> ⚠️ **Мультиязычная проверка:** Жалобы на сохранение (EN: "save/load", FR: "sauvegardée", RU: «прогресс потерян», IT: подразумевается) — одна проблема в 4 языках, не 4 разных.

### 2.3 Топ-3 Сильные стороны (с доказательной базой)

**STRENGTH #1 — «Vacation Vibe» как эмоциональный якорь**
- *Steam (Goddess of Death):* «I find myself lost in my own little world for hours before even realizing it has been hours»
- *Steam (HeikoH):* «It gives you a real vacation feeling, with beautiful scenery»
- *Steam (FrenchEsprit):* «I love the vibe and the easy cooking methods, it's a stress free game!»
- *RU Discord:* «атмосфера просто нереальная»
- **Значимость:** Это конкурентный USP — ни один прямой конкурент не создаёт такого же эффекта «настоящего отпуска».

**STRENGTH #2 — Кооперативный режим ("best with a friend")**
- *Steam (tamisha):* «best game we have ever played... WE ARE SO MAD THAT THE DEMO ENDED» (TikTok → органический вирус)
- *Steam (efr3egtr):* «I love the demo and would love to spend my money and my wife's to continue playing together»
- *Discord:* Тред «Doing co-op with a friend» → активное обсуждение
- **Значимость:** Co-op = виральность (TikTok/Twitch) + выживаемость для пар и друзей → более высокий ARPU при запуске EA.

**STRENGTH #3 — Аутентичный итальянский сеттинг и кулинарная детализация**
- *Forum (pros gorc, ресторанный профессионал):* «Nice mood, nice music and nice ideas everywhere... I worked in restaurants for many years»
- *Forum (MissPeaches):* «I LOVE the demo» + 10 конкретных предложений (позитивная вовлечённость)
- *Forum (antonio.rguezz):* «the game is crazy... it has an incredible future»
- *Качественный сигнал:* Несколько игроков предлагают исправить рецепт карбонары (яйца вместо сливок) — это знак искреннего погружения, а не критика.
- **Значимость:** Аутентичность кухни = credibility у foodie-аудитории → ниша с позитивным word-of-mouth.

### 2.4 Топ-3 Главные проблемы (с доказательной базой)

**PAIN #1 — Потеря прогресса (кооп + соло) [PriorityScore: 5.00]**
- *Steam (Savvy):* «My friends and I played the game for 6 hrs, only to find out our progress wasn't saved»
- *Steam (Robert):* «Played this for 2 hours in co-op but could not find any way of saving»
- *Steam (thaymacgames):* «Twice already it happened. I lost progress twice»
- *Forum (Hurst Quayzar):* «Anytime the game is updated the saves get deleted»
- *RU Discord:* Вопрос о мультиплеерном сохранении → базовый запрос новых игроков
- **Бизнес-риск:** Потеря прогресса = guaranteed negative review при EA-запуске. Критический блокер.

**PAIN #2 — Производительность / Оптимизация [PriorityScore: 4.70]**
- *Steam (AtheistWitch):* «Minimum requirements → 14-10fps, impossible to play. Way too much VRAM»
- *Steam (antonio.rguezz):* «FPS doesn't drop but feels limited when walking»
- *Steam (zMercurz):* «FIX FPS PLS»
- *RU Discord (？？？):* «really laggy... game kinda unlocks fps when interacting»
- *Steam (redenigma):* «Solo game crashes due to memory. 32 GB RAM not enough??»
- **Бизнес-риск:** ~15-20% потенциальных покупателей с бюджетными ноутами = потерянная конверсия.

**PAIN #3 — AI-арт: репутационный риск [PriorityScore: 4.00]**
- *Forum (Zablegoter):* Подробный скриншот-разбор 8+ конкретных артефактов генеративного ИИ
- *Forum (TheIronQueen):* «Won't touch the game till the AI is announced as gone»
- *Forum (ℜ𝔢𝔢𝔣𝔞𝔥):* «You cannot seriously think you could get away with making a game... targeting a creative and artsy type of audience and using AI art»
- *Forum (𝑻𝒉𝒆𝒂):* «Using gen AI at all is the reason I and others will not be playing»
- **Сигнал конфликта:** Разработчики говорят «все арты наши», игроки видят симптомы — проблема либо в реальном AI-использовании, либо в качестве исполнения (floating bottles, nonsense text на знаках, неправильная перспектива). В обоих случаях нужно действие.
- **Бизнес-риск:** В жанре «cozy + handcrafted» — AI-арт = покупательский деструктор. Особенно опасно перед EA-релизом.

---

## Раздел 3. Анализ Ниши и Конкурентов

### 3.1 Конкурентный пул (узкая ниша: cozy cafe)

| Конкурент | Рейтинг Steam | Кол-во отзывов | Статус релиза | Поджанр |
|---|---|---|---|---|
| **Espresso Tycoon** | Very Positive (85%) | 1,100+ | Полный релиз (2023) | Business sim + кастомизация кафе |
| **Traveler's Rest** | Very Positive (89%) | Тысячи | Early Access (2020–) | Tavern sim + farming + crafting |
| **Coffee Caravan** | Very Positive (92%) | 1,290+ | Полный релиз | Roguelite café + road trip |
| **Chef RPG** | Very Positive (87%) | 2,166+ | Early Access (2024–) | RPG + restaurant + open world |

---

### CompetitorSnapshot #1 — Espresso Tycoon

**Позиционирование:** *«Построй свою кофейню от нуля, создай уникальные рецепты напитков, оформи интерьер»*

**Поджанр:** Pure Business Sim с акцентом на кастомизацию

| Аспект | Детали |
|---|---|
| **Core Loop** | Открытие → дизайн интерьера → создание рецептов (3D Coffee Editor) → управление сотрудниками → масштабирование |
| **Top Strengths** | 3D Recipe Editor (визуальный конструктор кофе), полная свобода декора (пол/стены/мебель), latte art как micro-game |
| **Top Weaknesses** | Анонимные, безликие клиенты (нет NPC-личностей); слабый нарратив; лёгкая экономика без реального challenge; выгорание после разблокировки всего контента |
| **Слепая зона для VCS** | Нет атмосферы «места»: кофейня могла бы стоять где угодно. VCS выигрывает здесь за счёт курортного сеттинга. |

---

### CompetitorSnapshot #2 — Traveler's Rest

**Позиционирование:** *«Управляй таверной, выращивай ресурсы, создавай напитки — всё в одном open-world»*

**Поджанр:** Character-controlled tavern sim + farm sim

| Аспект | Детали |
|---|---|
| **Core Loop** | Сбор ресурсов → крафт еды/напитков → открытие таверны → обслуживание гостей → апгрейд и повтор |
| **Top Strengths** | Embodied loop от лица персонажа (Stardew Valley appeal); многослойный крафт (пивоварение, кулинария); милый onboarding с котёнком-наставником |
| **Top Weaknesses** | Рутина нарастает после ~30ч (низкий replayability); день-рутина без внешних событий → ощущение «клетки»; упрощение механики смешивания алкоголя вызвало отток части аудитории |
| **Слепая зона для VCS** | Нет социального контекста «курорта» — таверна изолирована от живого мира. VCS может выиграть за счёт активного городского окружения. |

---

### CompetitorSnapshot #3 — Coffee Caravan

**Позиционирование:** *«Мобильное кофе-кафе + roguelite путешествие по дороге»*

**Поджанр:** Roguelite café management + road trip

| Аспект | Детали |
|---|---|
| **Core Loop** | Выбор маршрута → установка каравана → приготовление кофе → обслуживание → прогресс → перезапуск дня (roguelite) |
| **Top Strengths** | Roguelite убирает монотонность (каждый «день» уникален); relaxed ритм без перегрузки; хорошая оптимизация; ~10 часов контента за $10 |
| **Top Weaknesses** | Глубина ограничена (~10ч до completed); «infinitesimal complexity» — слишком легко, нет стратегического вызова; нет постоянного мира (каждый ран — сначала) |
| **Слепая зона для VCS** | Нет постоянства — игрок не строит «своё» кафе над сессиями. VCS имеет явное преимущество в ownership через кастомизацию и сохранение. |

---

### CompetitorSnapshot #4 — Chef RPG

**Позиционирование:** *«Восстанови забытый ресторан, исследуй открытый мир, подружись с 20+ персонажами»*

**Поджанр:** RPG + restaurant management + open world life-sim

| Аспект | Детали |
|---|---|
| **Core Loop** | Исследование → добыча ресурсов (охота/рыбалка/фарминг) → крафт 240+ рецептов → управление 2 ресторанами → прокачка 40 скиллов → социальные квесты |
| **Top Strengths** | Самые богатые Named NPC (20+ персонажей с романтикой); огромная глубина контента; органичный RPG + resto синтез; открытый мир = retention через exploration |
| **Top Weaknesses** | Нет co-op (критический запрос от игроков: «NEED COOP PLEASE!!!»); баги в EA; сложный UI; высокий порог вхождения |
| **Слепая зона для VCS** | Chef RPG — одиночная игра без co-op. VCS уже имеет co-op → прямое преимущество в сегменте «играть с другом». |

---

### 3.2 Сравнительная таблица

| Конкурент | Рыночная роль | Сильные стороны | Слабые стороны | Окно возможности для VCS |
|---|---|---|---|---|
| **Espresso Tycoon** | Business sim с фокусом на кафе-кастомизацию | 3D Recipe Editor, свобода декора, latte art | Анонимные NPC, слабый нарратив, быстрое выгорание | Named NPC + курортный нарратив = то, чего Espresso Tycoon никогда не даст |
| **Traveler's Rest** | Cozy tavern sim à la Stardew Valley | Embodied loop, crafting depth, milый onboarding | Рутина нарастает, нет внешних событий, «клетка» | Живой resort-город vs изолированная таверна: VCS выигрывает в sense of place |
| **Coffee Caravan** | Roguelite cozy café road trip | Roguelite freshness, relaxed тон, оптимизация | Нет постоянства, мало глубины, ~10ч и готово | Permanence: строишь «своё» кафе через сессии — кардинальное преимущество |
| **Chef RPG** | RPG + restaurant + open world life-sim | Богатые NPC, 240+ рецептов, огромный мир | Нет co-op, сложный вход, баги EA | Co-op — убийственный козырь VCS в том же коридоре глубокого kontenta |

---

## Раздел 4. Стратегия Улучшений (0–3 месяца)

### Матрица приоритизации Impact × Effort

```
IMPACT
  ▲
H │ [I-1] Save System   [I-4] NPC Lite          [I-6] After-Hours
  │ [I-2] Perf Patch    [I-5] Difficulty Opt.
M │ [I-3] AI-Art Fix                             [I-7] Prep Automate
  │
L │
  └────────────────────────────────────────────► EFFORT
              S           M           L
```

---

### QUICK WINS (0–4 недели)

---

#### ImprovementProposal #I-1 — Надёжное сохранение в Co-op
**Категория:** `QoL`
**Проблема-источник:** PAIN #1 — Save/progress loss (PriorityScore 5.00, критический блокер)
**Конкурентный инсайт:** Ни один конкурент не проваливается на этом так явно — это «table stakes» для жанра. Coffee Caravan решает через roguelite-рестарт, VCS должен дать настоящее persistent save.

**Решение:**
- Автосохранение каждые 5 минут игрового времени (фоновое, без UI-прерывания)
- Ручное сохранение через меню паузы доступно хосту и клиентам
- Сохранение при выходе (popup: «Save before leaving?»)
- Защита от вайпа при обновлении игры (versioned save-files с миграцией)

**Impact:** High | **Effort:** S (2–3 дня разработки)
**KPI:** Снижение жалоб на save-проблемы до 0% в Steam-отзывах EA-запуска; рост средней длины сессии с ~2ч до 4ч+ (игроки перестают «бояться играть»).

---

#### ImprovementProposal #I-2 — Патч производительности: VRAM и FPS
**Категория:** `QoL`
**Проблема-источник:** PAIN #2 — Performance (PriorityScore 4.70)
**Конкурентный инсайт:** Coffee Caravan хвалят за «хорошую оптимизацию» — это standard для жанра.

**Решение:**
- Раздельные ползунки: `Texture Quality`, `Shadow Quality`, `Draw Distance`,`Anti-Aliasing` (on/off)
- Автоопределение пресета (low/medium/high) при первом запуске
- Фикс memory leak в Solo-режиме (жалобы 32GB RAM игроков)
- LOD оптимизация для камеры при ходьбе (основная причина «FPS drops when walking»)
- Опция: отключить Motion Blur (отдельный toggle в Settings → Graphics)

**Impact:** High | **Effort:** M (1–2 недели QA + dev)
**KPI:** 0 жалоб на motion sickness; конверсия ≥5% от min-spec аудитории (ранее неспособной запустить); рост wishlist от Steam Deck / laptop сегмента.

---

#### ImprovementProposal #I-3 — AI-Арт: Аудит и Замена Критических Ассетов
**Категория:** `QoL` / Бренд
**Проблема-источник:** PAIN #3 — AI-art perception (PriorityScore 4.00)
**Конкурентный инсайт:** Весь конкурентный пул использует hand-crafted art — это норма жанра. «Artsy & cozy» аудитория особенно чувствительна к AI.

**Решение (не отрицать — действовать):**
1. Внутренний аудит: пройти по всем ассетам из скриншотов игроков (знаки с «Poject», плавающие бутылки, портреты NPC с деформациями)
2. Приоритет замены: UI-иконки → таблички в городе → декоративные картины → портреты
3. Для заменённых ассетов — чёткий communication: патч-ноут «Hand-crafted art update: replaced X assets»
4. НЕ нужно заменять всё сразу — нужна прозрачная дорожная карта

**Impact:** Medium–High (репутация) | **Effort:** M (2–3 недели арт-производства)
**KPI:** Исчезновение AI-art упоминаний в негативных отзывах EA; +5% конверсия в wishlist (возвращение «потерянных» игроков).

---

### MID-TERM (4–8 недель)

---

#### ImprovementProposal #I-4 — «Lite NPC»: Первые Именные Гости
**Категория:** `Retention`
**Проблема-источник:** Отсутствие именных NPC = причина быстрого выгорания (аналог слабости Espresso Tycoon)
**Конкурентный инсайт:** Chef RPG держит 87% рейтинг во многом за счёт 20+ named NPC с квестами. VCS не имеет ни одного.

**Решение (Lite-версия для 0–3 мес. горизонта):**
- 5 «Постоянных гостей» с именем, небольшим аватаром и 1–2 репликами при посещении
  - Примеры: *Marco — местный рыбак, любит морепасту; Sofia — турист, впервые в Италии; Enzo — ежедневный посетитель, кофеман*
- Прогресс отношений: 3 уровня (незнакомец → знакомый → постоянный), влияет на реплики
- Визуальный индикатор: маленький символ ❤️ над столиком постоянного гостя
- Не нужны квесты на этом этапе — только personality + память о предпочтениях

**Impact:** High (D14+ Retention) | **Effort:** M (3–4 недели дизайн + код)
**KPI:** Рост средней длины сессии +20%; упоминание «знакомых гостей» в позитивных отзывах; снижение drop-off после 5-й сессии.

---

#### ImprovementProposal #I-5 — Опциональные Режимы Сложности
**Категория:** `Геймплей и баланс`
**Проблема-источник:** Конфликт сигналов — часть игроков хочет challenge, часть — relaxed. Оба правы.
**Конкурентный инсайт:** Coffee Caravan решил мягко (roguelite без game over), Traveler's Rest не решил. VCS может стать первым в нише с внятной difficulty matrix.

**Решение (согласно предложению игрока Chim' из Discord — адаптировано):**

| Режим | Описание | Для кого |
|---|---|---|
| **Peaceful** (по умолчанию) | No timers, no fires, no expiry — текущее состояние | Relaxed / casual |
| **Normal** | + Таймеры терпения у гостей (body language, не числа), + мелкие случайные события (спёкшееся блюдо, визит инспектора) | Core cozy players |
| **Hard** | + Normal features, + истечение срока годности ингредиентов, + финансовое давление | Hardcore / completionist |

- Выбор режима при создании нового кафе (не меняется в середине игры)
- Нет game-over ни в одном режиме — только последствия (плохие отзывы от гостей → репутация)

**Impact:** Medium | **Effort:** S–M (1–2 недели)
**KPI:** Снижение процента игроков «скучно после 10ч»; рост replayability; охват второй волны аудитории (hardcore sim fans).

---

### BIG BET (8–12 недель)

---

#### ImprovementProposal #I-6 — «После закрытия»: Городская Жизнь вечером
**Категория:** `Retention` / `USP`
**Проблема-источник:** «City is beautiful but nothing to do after cafe closes» (Discord: emliz + Hurst Quayzar + другие)
**Конкурентный инсайт:** Chef RPG выигрывает retention за счёт открытого мира. Coffee Caravan — за счёт road trip контекста. У VCS город УЖЕ ЕСТЬ — его просто надо населить активностями.

**Решение:**
- Закрытие кафе → «Свободное время» (30 мин игрового времени до «конца дня»)
- Активности: прогулка по набережной → встреча с NPC-гостями в off-duty ситуации; посещение местного рынка (закупка ингредиентов + случайные редкие продукты); рыбалка на пирсе (доп. ингредиент; связь с community-запросом «can we fish?»)
- **Опциональная квартира**: можно купить/оформить (простая кастомизация) → «конец дня» = анимация ухода домой → спать → утро. Это решает запросы «house», «sleeping to advance time», «animal crossing feel»

**Impact:** High (D30 Retention, USP) | **Effort:** L (6–8 недель)
**KPI:** Рост среднего playtime per day +35%; позитивные review-упоминания «мне нравится гулять по городу»; уникальный дифференциатор от всех 4 конкурентов.

---

#### ImprovementProposal #I-7 — Автоматизация Заготовки (Prep Automation)
**Категория:** `Геймплей и баланс`
**Проблема-источник:** «Automate cutting», «too much repetitive prep work» (Steam + Forum)
**Конкурентный инсайт:** Chef RPG предлагает наёмников. Traveler's Rest — частичную автоматизацию. Coffee Caravan — нет проблемы (простой рецептурный процесс). VCS имеет самый «ручной» prep — это и USP (аутентичность) и pain (монотонность).

**Решение (баланс аутентичности vs удобства):**
- **Early game:** всё вручную — это обучение + asmr-эффект (ценность первых сессий)
- **Mid game (Level 5+):** Кухонный помощник (временный NPC-стажёр) может выполнять базовую нарезку по команде — игрок задаёт задание, помощник работает пока игрок занят гостями
- **Late game (Level 10+):** Кухонные прибор-апгрейды (Food Processor, Prep Station) — автоматическая нарезка с таймером, без участия игрока
- Философия: «Автоматизация освобождает игрока для более интересных выборов» — не убирает игру, меняет её

**Impact:** Medium–High | **Effort:** M (3–4 недели)
**KPI:** Снижение жалоб на «repetitive prep»; рост session length в mid-game фазе (часы 5–15).

---

## Итог: Roadmap 0–3 месяца

```
НЕДЕЛЯ 1-2   [QUICK WIN]   ████ I-1: Save System Fix            Impact: HIGH  Effort: S
НЕДЕЛЯ 1-4   [QUICK WIN]   ████ I-2: Performance Patch          Impact: HIGH  Effort: M
НЕДЕЛЯ 2-4   [QUICK WIN]   ████ I-3: AI-Art Audit + Replace     Impact: MED   Effort: M
НЕДЕЛЯ 4-7   [MID-TERM]    ████ I-5: Difficulty Modes           Impact: MED   Effort: S-M
НЕДЕЛЯ 5-8   [MID-TERM]    ████ I-4: Lite NPC System (5 guests) Impact: HIGH  Effort: M
НЕДЕЛЯ 8-12  [BIG BET]     ████ I-7: Prep Automation            Impact: MED   Effort: M
НЕДЕЛЯ 8-12  [BIG BET]     ████ I-6: After-Hours City Content   Impact: HIGH  Effort: L
```

### Ожидаемые изменения ключевых метрик (оценка, 3 мес.)

| Метрика | Baseline (демо) | Цель (3 мес. EA) | Инициатива |
|---|---|---|---|
| Жалобы на save/progress | ~12% от постов | < 1% | I-1 |
| % игроков на min-spec | ~0% (не запускается) | ~40% | I-2 |
| Session length (avg) | ~2.5ч | ~4ч+ | I-1 + I-4 |
| D14 Retention | Не известен | ~35%+ | I-4 + I-5 |
| Упоминания AI-art в negative | ~6% | < 1% | I-3 |
| Review score на EA | — | Very Positive (≥85%) | I-1 + I-2 + I-3 вместе |

---

## Assumptions и Defaults

- Горизонт рекомендаций: **0–3 месяца**
- Все estimates по Effort: для команды ≤5 человек (indie)
- Baseline Data: Steam Next Fest демо (23.02–02.03.2026), Patch 0.13.2
- Конкурентный фокус: **узкая ниша cozy cafe** (не broad sim рынок)
- «NPC Lite» — не полная RPG-система, а минимально жизнеспособная версия для EA
- AI-art рекомендации нейтральны: если ассеты действительно сделаны художниками — нужно качество, а не оправдания.
