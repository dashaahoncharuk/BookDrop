const books = [
  {
    "id": "book-001",
    "title": "Мовчазна пацієнтка",
    "author": "Алекс Майклідіс",
    "pages": 384,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "dark-academia",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Ненадійний оповідач",
      "Таємниці минулого",
      "Замкнений простір"
    ],
    "description": "Алісія берегла мовчання шість років після трагедії. Чи зможе психотерапевт розгадати її таємницю?",
    "cover": "assets/covers/silent-patient.webp",
    "category": "thriller"
  },
  {
    "id": "book-002",
    "title": "Сім чоловіків Евелін Г'юґо",
    "author": "Тейлор Дженкінс Рід",
    "pages": 448,
    "genre": "Драма / Ретро",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "cozy",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Старий Голлівуд",
      "Сповідь",
      "Заборонене кохання"
    ],
    "description": "Ікона кіно на схилі літ вирішує розкрити всю правду про своє гламурне та скандальне життя.",
    "cover": "assets/covers/evelyn-hugo.webp",
    "category": "novel"
  },
  {
    "id": "book-003",
    "title": "Дюна",
    "author": "Френк Герберт",
    "pages": 412,
    "genre": "Наукова фантастика",
    "moods": [
      "drive",
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 8,
    "pace": "slow",
    "tropes": [
      "Обраний герой",
      "Політичні інтриги",
      "Чужі світи"
    ],
    "description": "Епічна історія про планету Арракіс, прянощі та шлях молодого Паула Атріда.",
    "cover": "assets/covers/dune.webp",
    "category": "scifi"
  },
  {
    "id": "book-004",
    "title": "Тривожні люди",
    "author": "Фредрік Бакман",
    "pages": 320,
    "genre": "Сучасна проза",
    "moods": [
      "cozy",
      "emotional"
    ],
    "vibe": "cozy",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Дивні персонажі",
      "Життєві драми",
      "Гумор"
    ],
    "description": "Банковий грабіжник невдалими намаганнями пограбування бере в заручники вісім надзвичайно ексцентричних покупців.",
    "cover": "assets/covers/anxious-people.webp",
    "category": "novel"
  },
  {
    "id": "book-005",
    "title": "Служниця",
    "author": "Фріда Мак-Фадден",
    "pages": 304,
    "genre": "Психологічний саспенс",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 10,
    "pace": "fast",
    "tropes": [
      "Замкнений простір",
      "Несподіваний фінал"
    ],
    "description": "Ідеальна родина з розкішного маєтку приховує темні секрети, які загрожують життю нової служниці.",
    "cover": "assets/covers/housemaid.webp",
    "category": "thriller"
  },
  {
    "id": "book-006",
    "title": "Гордість і упередження",
    "author": "Джейн Остін",
    "pages": 416,
    "genre": "Класичний роман",
    "moods": [
      "romantic",
      "cozy"
    ],
    "vibe": "romantic",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Від ворогів до закоханих",
      "Суспільні умовності",
      "Дотепні діалоги"
    ],
    "description": "Розумна Елізабет Беннет і гордовитий містер Дарсі вчаться бачити одне одного без упереджень.",
    "cover": "assets/covers/pride-and-prejudice.webp",
    "category": "novel"
  },
  {
    "id": "book-007",
    "title": "1984",
    "author": "Джордж Орвелл",
    "pages": 328,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Тоталітарний режим",
      "Контроль свідомості",
      "Бунт одинака"
    ],
    "description": "Вінстон Сміт живе під всевидючим оком Великого Брата й наважується на заборонене — думати вільно.",
    "cover": "assets/covers/1984.webp",
    "category": "scifi"
  },
  {
    "id": "book-008",
    "title": "Гаррі Поттер і філософський камінь",
    "author": "Дж. К. Роулінг",
    "pages": 320,
    "genre": "Фентезі",
    "moods": [
      "cozy",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 4,
    "pace": "fast",
    "tropes": [
      "Обраний герой",
      "Школа магії",
      "Дружба"
    ],
    "description": "Хлопчик, який дізнається, що він чарівник, вирушає до Гоґвортсу й розгадує таємницю загадкового каменя.",
    "cover": "assets/covers/harry-potter-1.webp",
    "category": "novel"
  },
  {
    "id": "book-009",
    "title": "Володар перснів: Братство персня",
    "author": "Дж. Р. Р. Толкін",
    "pages": 576,
    "genre": "Епічне фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Подорож героя",
      "Боротьба добра і зла",
      "Братство"
    ],
    "description": "Фродо Торбин вирушає в небезпечну подорож, щоб знищити Перстень Всевладдя.",
    "cover": "assets/covers/fellowship-of-the-ring.webp",
    "category": "fantasy"
  },
  {
    "id": "book-010",
    "title": "Гобіт",
    "author": "Дж. Р. Р. Толкін",
    "pages": 310,
    "genre": "Фентезі",
    "moods": [
      "cozy",
      "adventurous"
    ],
    "vibe": "epic",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Несподівана подорож",
      "Дракон і скарб",
      "Скромний герой"
    ],
    "description": "Більбо Торбин залишає затишну нору й разом із гномами вирушає по скарб, який стереже дракон.",
    "cover": "assets/covers/the-hobbit.webp",
    "category": "novel"
  },
  {
    "id": "book-011",
    "title": "Над прірвою у житі",
    "author": "Дж. Д. Селінджер",
    "pages": 240,
    "genre": "Сучасна проза",
    "moods": [
      "melancholic",
      "emotional"
    ],
    "vibe": "introspective",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Дорослішання",
      "Бунт проти фальші",
      "Самотність"
    ],
    "description": "Шістнадцятирічний Голден блукає Нью-Йорком і шукає щось справжнє у світі дорослих.",
    "cover": "assets/covers/catcher-in-the-rye.webp",
    "category": "novel"
  },
  {
    "id": "book-012",
    "title": "Великий Ґетсбі",
    "author": "Френсіс Скотт Фіцджеральд",
    "pages": 208,
    "genre": "Класична проза",
    "moods": [
      "melancholic",
      "emotional"
    ],
    "vibe": "historical",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Нещасне кохання",
      "Американська мрія",
      "Розкіш і порожнеча"
    ],
    "description": "Таємничий мільйонер влаштовує розкішні вечірки заради однієї-єдиної жінки.",
    "cover": "assets/covers/great-gatsby.webp",
    "category": "novel"
  },
  {
    "id": "book-013",
    "title": "Вбити пересмішника",
    "author": "Гарпер Лі",
    "pages": 376,
    "genre": "Соціальна драма",
    "moods": [
      "emotional",
      "intellectual"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Расова несправедливість",
      "Дитячий погляд",
      "Суд"
    ],
    "description": "Очима маленької Скаут ми бачимо, як її батько-адвокат боронить невинного чоловіка.",
    "cover": "assets/covers/to-kill-a-mockingbird.webp",
    "category": "novel"
  },
  {
    "id": "book-014",
    "title": "Ім'я рози",
    "author": "Умберто Еко",
    "pages": 576,
    "genre": "Історичний детектив",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "dark-academia",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Середньовічний монастир",
      "Таємничі вбивства",
      "Заборонена бібліотека"
    ],
    "description": "Монах-францисканець розслідує серію загадкових смертей у віддаленому абатстві.",
    "cover": "assets/covers/name-of-the-rose.webp",
    "category": "thriller"
  },
  {
    "id": "book-015",
    "title": "Таємна історія",
    "author": "Донна Тартт",
    "pages": 576,
    "genre": "Психологічний роман",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "dark-academia",
    "tension": 8,
    "pace": "slow",
    "tropes": [
      "Елітарний коледж",
      "Замкнена компанія",
      "Моральний занепад"
    ],
    "description": "Група студентів-класиків переступає межу, і їхнє товариство починає руйнуватися.",
    "cover": "assets/covers/the-secret-history.webp",
    "category": "novel"
  },
  {
    "id": "book-016",
    "title": "Дівчина з татуюванням дракона",
    "author": "Стіг Ларссон",
    "pages": 592,
    "genre": "Детектив",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Зникнення",
      "Родинні таємниці",
      "Геніальна хакерка"
    ],
    "description": "Журналіст і хакерка Лісбет Саландер розслідують зникнення, що сталося десятиліття тому.",
    "cover": "assets/covers/girl-with-dragon-tattoo.webp",
    "category": "thriller"
  },
  {
    "id": "book-017",
    "title": "Зникла",
    "author": "Гіліан Флінн",
    "pages": 432,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Ненадійний оповідач",
      "Зникла дружина",
      "Шлюб із брехнею"
    ],
    "description": "У п'яту річницю весілля Емі зникає, а всі докази вказують на її чоловіка.",
    "cover": "assets/covers/gone-girl.webp",
    "category": "thriller"
  },
  {
    "id": "book-018",
    "title": "Дівчина у потягу",
    "author": "Пола Гокінс",
    "pages": 336,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Ненадійний оповідач",
      "Спостерігач",
      "Втрата пам'яті"
    ],
    "description": "Щоранку Рейчел бачить із вікна потяга «ідеальну» пару — аж поки одного дня все змінюється.",
    "cover": "assets/covers/girl-on-the-train.webp",
    "category": "thriller"
  },
  {
    "id": "book-019",
    "title": "Вбивство у «Східному експресі»",
    "author": "Агата Крісті",
    "pages": 256,
    "genre": "Класичний детектив",
    "moods": [
      "mysterious",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Замкнений простір",
      "Коло підозрюваних",
      "Геніальний детектив"
    ],
    "description": "Еркюль Пуаро має розплутати вбивство в потязі, застряглому у снігах.",
    "cover": "assets/covers/murder-on-orient-express.webp",
    "category": "thriller"
  },
  {
    "id": "book-020",
    "title": "І не лишилось жодного",
    "author": "Агата Крісті",
    "pages": 272,
    "genre": "Класичний детектив",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Замкнений простір",
      "Острів",
      "Помста"
    ],
    "description": "Десятеро незнайомців на самотньому острові гинуть один за одним згідно з моторошною лічилкою.",
    "cover": "assets/covers/and-then-there-were-none.webp",
    "category": "thriller"
  },
  {
    "id": "book-021",
    "title": "Пригоди Шерлока Холмса",
    "author": "Артур Конан Дойл",
    "pages": 320,
    "genre": "Класичний детектив",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "cozy",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Дедукція",
      "Детектив і помічник",
      "Вікторіанський Лондон"
    ],
    "description": "Збірка оповідань про найвідомішого детектива світу та його вірного друга доктора Ватсона.",
    "cover": "assets/covers/sherlock-holmes.webp",
    "category": "thriller"
  },
  {
    "id": "book-022",
    "title": "Код да Вінчі",
    "author": "Ден Браун",
    "pages": 560,
    "genre": "Трилер",
    "moods": [
      "mysterious",
      "drive"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Шифри й символи",
      "Таємні товариства",
      "Гонитва"
    ],
    "description": "Символіст Роберт Ленґдон розплутує загадку, заховану у шедеврах мистецтва.",
    "cover": "assets/covers/da-vinci-code.webp",
    "category": "novel"
  },
  {
    "id": "book-023",
    "title": "Сяйво",
    "author": "Стівен Кінг",
    "pages": 544,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Ізольований готель",
      "Божевілля",
      "Надприродне"
    ],
    "description": "Зимовий доглядач готелю поступово божеволіє, а його син бачить те, чого не бачать інші.",
    "cover": "assets/covers/the-shining.webp",
    "category": "horror"
  },
  {
    "id": "book-024",
    "title": "Воно",
    "author": "Стівен Кінг",
    "pages": 1138,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 9,
    "pace": "slow",
    "tropes": [
      "Дитячі страхи",
      "Дружба",
      "Зло, що повертається"
    ],
    "description": "Група друзів стикається з істотою, що ховається під містом і приймає образ їхніх страхів.",
    "cover": "assets/covers/it.webp",
    "category": "horror"
  },
  {
    "id": "book-025",
    "title": "Дракула",
    "author": "Брем Стокер",
    "pages": 448,
    "genre": "Готичний горор",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Вампіри",
      "Епістолярна форма",
      "Готичний замок"
    ],
    "description": "Молодий адвокат їде до Трансильванії й потрапляє у владу стародавнього графа-вампіра.",
    "cover": "assets/covers/dracula.webp",
    "category": "horror"
  },
  {
    "id": "book-026",
    "title": "Франкенштейн",
    "author": "Мері Шеллі",
    "pages": 280,
    "genre": "Готичний роман",
    "moods": [
      "dark",
      "melancholic"
    ],
    "vibe": "gothic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Божевільний учений",
      "Самотність створіння",
      "Межі науки"
    ],
    "description": "Учений оживляє створену ним істоту й розплачується за свою гординю.",
    "cover": "assets/covers/frankenstein.webp",
    "category": "horror"
  },
  {
    "id": "book-027",
    "title": "Джейн Ейр",
    "author": "Шарлотта Бронте",
    "pages": 544,
    "genre": "Класичний роман",
    "moods": [
      "romantic",
      "emotional"
    ],
    "vibe": "gothic",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Гувернантка",
      "Таємниця маєтку",
      "Кохання попри все"
    ],
    "description": "Незалежна гувернантка закохується у загадкового господаря Торнфілд-холлу.",
    "cover": "assets/covers/jane-eyre.webp",
    "category": "novel"
  },
  {
    "id": "book-028",
    "title": "Буремний перевал",
    "author": "Емілі Бронте",
    "pages": 416,
    "genre": "Готичний роман",
    "moods": [
      "dark",
      "emotional"
    ],
    "vibe": "gothic",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Руйнівне кохання",
      "Помста",
      "Вересові пустища"
    ],
    "description": "Пристрасть Гіткліфа та Кеті руйнує долі двох родин на безжальних йоркширських пустищах.",
    "cover": "assets/covers/wuthering-heights.webp",
    "category": "novel"
  },
  {
    "id": "book-029",
    "title": "Ребекка",
    "author": "Дафна дю Мор'є",
    "pages": 448,
    "genre": "Готичний саспенс",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Тінь першої дружини",
      "Таємничий маєток",
      "Ревнощі"
    ],
    "description": "Нова місіс де Вінтер живе в тіні своєї ідеальної попередниці Ребекки.",
    "cover": "assets/covers/rebecca.webp",
    "category": "thriller"
  },
  {
    "id": "book-030",
    "title": "Маленькі жінки",
    "author": "Луїза Мей Олкотт",
    "pages": 576,
    "genre": "Класичний роман",
    "moods": [
      "cozy",
      "emotional"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Сестринство",
      "Дорослішання",
      "Родинне тепло"
    ],
    "description": "Чотири сестри Марч ростуть, мріють і шукають своє місце у світі.",
    "cover": "assets/covers/little-women.webp",
    "category": "novel"
  },
  {
    "id": "book-031",
    "title": "Тіні забутих предків",
    "author": "Михайло Коцюбинський",
    "pages": 160,
    "genre": "Українська класика",
    "moods": [
      "emotional",
      "romantic"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Гуцульський світ",
      "Трагічне кохання",
      "Карпатські вірування"
    ],
    "description": "Іван і Марічка — закохані з ворожих родів у мальовничих Карпатах.",
    "cover": "assets/covers/shadows-of-forgotten-ancestors.webp",
    "category": "novel"
  },
  {
    "id": "book-032",
    "title": "Лісова пісня",
    "author": "Леся Українка",
    "pages": 160,
    "genre": "Драма-феєрія",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "magical",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Міфічні істоти",
      "Кохання мавки й людини",
      "Жертва"
    ],
    "description": "Мавка закохується в людину й дізнається, що таке справжнє кохання та втрата.",
    "cover": "assets/covers/forest-song.webp",
    "category": "fantasy"
  },
  {
    "id": "book-033",
    "title": "Захар Беркут",
    "author": "Іван Франко",
    "pages": 224,
    "genre": "Історична повість",
    "moods": [
      "adventurous",
      "emotional"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Оборона громади",
      "Монгольська навала",
      "Мудрий ватажок"
    ],
    "description": "Тухольська громада під проводом Захара Беркута боронить свою землю від монголів.",
    "cover": "assets/covers/zakhar-berkut.webp",
    "category": "novel"
  },
  {
    "id": "book-034",
    "title": "Музей покинутих секретів",
    "author": "Оксана Забужко",
    "pages": 832,
    "genre": "Історичний роман",
    "moods": [
      "emotional",
      "intellectual"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Родинна сага",
      "Історія ХХ століття",
      "Розслідування минулого"
    ],
    "description": "Журналістка розплутує родинні таємниці, що тягнуться крізь десятиліття української історії.",
    "cover": "assets/covers/museum-of-abandoned-secrets.webp",
    "category": "novel"
  },
  {
    "id": "book-035",
    "title": "Фелікс Австрія",
    "author": "Софія Андрухович",
    "pages": 288,
    "genre": "Історичний роман",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Станіславів початку ХХ ст.",
      "Доля жінки",
      "Пам'ять"
    ],
    "description": "Роман про Станіславів початку ХХ століття та долю служниці Стефи.",
    "cover": "assets/covers/felix-austria.webp",
    "category": "novel"
  },
  {
    "id": "book-036",
    "title": "Ворошиловград",
    "author": "Сергій Жадан",
    "pages": 416,
    "genre": "Сучасна проза",
    "moods": [
      "emotional",
      "drive"
    ],
    "vibe": "introspective",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Повернення додому",
      "Степ і бензоколонка",
      "Друзі"
    ],
    "description": "Герман повертається на Донбас, щоб урятувати бензоколонку брата від рейдерів.",
    "cover": "assets/covers/voroshylovhrad.webp",
    "category": "novel"
  },
  {
    "id": "book-037",
    "title": "Інтернат",
    "author": "Сергій Жадан",
    "pages": 272,
    "genre": "Сучасна проза",
    "moods": [
      "dark",
      "emotional"
    ],
    "vibe": "introspective",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Війна",
      "Дорога крізь лінію фронту",
      "Вибір"
    ],
    "description": "Педагог проходить крізь зону бойових дій, щоб забрати племінника з інтернату.",
    "cover": "assets/covers/internat.webp",
    "category": "novel"
  },
  {
    "id": "book-038",
    "title": "Тигролови",
    "author": "Іван Багряний",
    "pages": 416,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Втеча",
      "Тайга",
      "Боротьба за свободу"
    ],
    "description": "Григорій Многогрішний тікає з-під конвою й мусить пережити тайгу та переслідування.",
    "cover": "assets/covers/tyhrolovy.webp",
    "category": "novel"
  },
  {
    "id": "book-039",
    "title": "Місто",
    "author": "Валер'ян Підмогильний",
    "pages": 320,
    "genre": "Класичний роман",
    "moods": [
      "intellectual",
      "dark"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Амбіції",
      "Провінціал у великому місті",
      "Моральні компроміси"
    ],
    "description": "Степан Радченко приїздить до Києва й вирішує підкорити місто за будь-яку ціну.",
    "cover": "assets/covers/misto.webp",
    "category": "novel"
  },
  {
    "id": "book-040",
    "title": "Чорний ворон",
    "author": "Василь Шкляр",
    "pages": 376,
    "genre": "Історичний роман",
    "moods": [
      "dark",
      "adventurous"
    ],
    "vibe": "historical",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Повстанці",
      "Визвольні змагання",
      "Вірність"
    ],
    "description": "Історія повстанського загону «Чорний ворон» у 1920-х роках.",
    "cover": "assets/covers/black-raven.webp",
    "category": "novel"
  },
  {
    "id": "book-041",
    "title": "Гра престолів",
    "author": "Джордж Р. Р. Мартін",
    "pages": 800,
    "genre": "Епічне фентезі",
    "moods": [
      "dark",
      "drive"
    ],
    "vibe": "epic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Політичні інтриги",
      "Боротьба за трон",
      "Несподівані смерті"
    ],
    "description": "Знатні доми Вестеросу борються за Залізний трон, а на півночі прокидається давнє зло.",
    "cover": "assets/covers/game-of-thrones.webp",
    "category": "fantasy"
  },
  {
    "id": "book-042",
    "title": "Ім'я вітру",
    "author": "Патрік Ротфусс",
    "pages": 672,
    "genre": "Фентезі",
    "moods": [
      "adventurous",
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Історія в історії",
      "Магічна академія",
      "Геніальний герой"
    ],
    "description": "Легендарний Квоут розповідає історію власного життя — від мандрівного артиста до студента Університету.",
    "cover": "assets/covers/name-of-the-wind.webp",
    "category": "novel"
  },
  {
    "id": "book-043",
    "title": "Шлях королів",
    "author": "Брендон Сандерсон",
    "pages": 1008,
    "genre": "Епічне фентезі",
    "moods": [
      "adventurous",
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Складна магічна система",
      "Кілька сюжетних ліній",
      "Війна"
    ],
    "description": "У світі, який нищать буревії, перетинаються долі солдата-раба, вченої та принца-воїна.",
    "cover": "assets/covers/way-of-kings.webp",
    "category": "fantasy"
  },
  {
    "id": "book-044",
    "title": "Гіперіон",
    "author": "Ден Сіммонс",
    "pages": 528,
    "genre": "Наукова фантастика",
    "moods": [
      "intellectual",
      "mysterious"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Паломництво",
      "Історії мандрівників",
      "Загадкова істота"
    ],
    "description": "Семеро паломників вирушають до Гробниць часу й по дорозі розповідають свої історії.",
    "cover": "assets/covers/hyperion.webp",
    "category": "scifi"
  },
  {
    "id": "book-045",
    "title": "Основа",
    "author": "Айзек Азімов",
    "pages": 288,
    "genre": "Наукова фантастика",
    "moods": [
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Падіння імперії",
      "Психоісторія",
      "Стратегія"
    ],
    "description": "Математик передбачає крах Галактичної імперії й закладає основи її майбутнього відродження.",
    "cover": "assets/covers/foundation.webp",
    "category": "scifi"
  },
  {
    "id": "book-046",
    "title": "Марсіянин",
    "author": "Енді Вейр",
    "pages": 384,
    "genre": "Наукова фантастика",
    "moods": [
      "drive",
      "funny"
    ],
    "vibe": "survival",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Виживання",
      "Наукові рішення",
      "Чорний гумор"
    ],
    "description": "Астронавт, якого помилково залишили на Марсі, мусить вижити, спираючись на науку та гумор.",
    "cover": "assets/covers/the-martian.webp",
    "category": "scifi"
  },
  {
    "id": "book-047",
    "title": "Проєкт «Аве Марія»",
    "author": "Енді Вейр",
    "pages": 496,
    "genre": "Наукова фантастика",
    "moods": [
      "drive",
      "intellectual"
    ],
    "vibe": "survival",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Місія порятунку",
      "Перший контакт",
      "Втрата пам'яті"
    ],
    "description": "Єдиний вцілілий член екіпажу прокидається на кораблі й має врятувати Землю.",
    "cover": "assets/covers/project-hail-mary.webp",
    "category": "scifi"
  },
  {
    "id": "book-048",
    "title": "451 градус за Фаренгейтом",
    "author": "Рей Бредбері",
    "pages": 208,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Заборонені книжки",
      "Цензура",
      "Пробудження"
    ],
    "description": "Пожежник, що палить книжки, починає сумніватися у світі, який його оточує.",
    "cover": "assets/covers/fahrenheit-451.webp",
    "category": "scifi"
  },
  {
    "id": "book-049",
    "title": "Дивний новий світ",
    "author": "Олдос Гакслі",
    "pages": 288,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Контроль через щастя",
      "Касти",
      "Бунт"
    ],
    "description": "Світ без болю й свободи, де людей створюють у пробірках за замовленням.",
    "cover": "assets/covers/brave-new-world.webp",
    "category": "scifi"
  },
  {
    "id": "book-050",
    "title": "Оповідь служниці",
    "author": "Маргарет Етвуд",
    "pages": 352,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "emotional"
    ],
    "vibe": "dystopian",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Тоталітарна теократія",
      "Відібрана свобода",
      "Опір"
    ],
    "description": "У Гілеаді жінок позбавили прав, і Фредова мусить боротися за себе.",
    "cover": "assets/covers/handmaids-tale.webp",
    "category": "scifi"
  },
  {
    "id": "book-051",
    "title": "Автостопом по Галактиці",
    "author": "Дуглас Адамс",
    "pages": 224,
    "genre": "Гумористична фантастика",
    "moods": [
      "cozy",
      "funny"
    ],
    "vibe": "light",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Кінець світу",
      "Абсурдний гумор",
      "Космічні мандри"
    ],
    "description": "Артур Дент рятується від знесення Землі й потрапляє у шалену космічну подорож.",
    "cover": "assets/covers/hitchhikers-guide.webp",
    "category": "scifi"
  },
  {
    "id": "book-052",
    "title": "Гра Ендера",
    "author": "Орсон Скотт Кард",
    "pages": 384,
    "genre": "Наукова фантастика",
    "moods": [
      "drive",
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Вундеркінд",
      "Військова академія",
      "Моральний вибір"
    ],
    "description": "Талановитого хлопчика готують до війни з прибульцями у військовій школі.",
    "cover": "assets/covers/enders-game.webp",
    "category": "scifi"
  },
  {
    "id": "book-053",
    "title": "Лев, відьма та шафа",
    "author": "К. С. Льюїс",
    "pages": 208,
    "genre": "Дитяче фентезі",
    "moods": [
      "cozy",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Портал до іншого світу",
      "Пророцтво",
      "Добро проти зла"
    ],
    "description": "Четверо дітей крізь шафу потрапляють у Нарнію, скуту вічною зимою.",
    "cover": "assets/covers/lion-witch-wardrobe.webp",
    "category": "fantasy"
  },
  {
    "id": "book-054",
    "title": "Тінь і кістка",
    "author": "Лі Бардуго",
    "pages": 352,
    "genre": "Young adult фентезі",
    "moods": [
      "adventurous",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Обраний герой",
      "Темний володар",
      "Прихована сила"
    ],
    "description": "Аліна розкриває в собі рідкісну силу світла, здатну змінити долю країни.",
    "cover": "assets/covers/shadow-and-bone.webp",
    "category": "fantasy"
  },
  {
    "id": "book-055",
    "title": "Шістка воронів",
    "author": "Лі Бардуго",
    "pages": 480,
    "genre": "Young adult фентезі",
    "moods": [
      "drive",
      "dark"
    ],
    "vibe": "magical",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Пограбування",
      "Команда аутсайдерів",
      "Темне місто"
    ],
    "description": "Злодій Каз збирає команду для найнебезпечнішого пограбування у своєму житті.",
    "cover": "assets/covers/six-of-crows.webp",
    "category": "fantasy"
  },
  {
    "id": "book-056",
    "title": "Пісня Ахілла",
    "author": "Медлін Міллер",
    "pages": 400,
    "genre": "Міфологічний роман",
    "moods": [
      "romantic",
      "emotional"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Грецька міфологія",
      "Заборонене кохання",
      "Троянська війна"
    ],
    "description": "Історія кохання Патрокла й Ахілла на тлі Троянської війни.",
    "cover": "assets/covers/song-of-achilles.webp",
    "category": "novel"
  },
  {
    "id": "book-057",
    "title": "Цирцея",
    "author": "Медлін Міллер",
    "pages": 400,
    "genre": "Міфологічний роман",
    "moods": [
      "emotional",
      "mysterious"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Грецька міфологія",
      "Відьма-вигнанка",
      "Самотній острів"
    ],
    "description": "Дочка титана Геліоса знаходить власну силу на самотньому острові.",
    "cover": "assets/covers/circe.webp",
    "category": "fantasy"
  },
  {
    "id": "book-058",
    "title": "Нічний цирк",
    "author": "Ерін Моргенштерн",
    "pages": 512,
    "genre": "Магічний реалізм",
    "moods": [
      "mysterious",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Магічна дуель",
      "Таємничий цирк",
      "Кохання суперників"
    ],
    "description": "Двоє молодих чарівників змушені змагатися на арені чарівного цирку, що з'являється вночі.",
    "cover": "assets/covers/night-circus.webp",
    "category": "fantasy"
  },
  {
    "id": "book-059",
    "title": "Дім у лазуровому морі",
    "author": "Ті Джей Клун",
    "pages": 400,
    "genre": "Затишне фентезі",
    "moods": [
      "cozy",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Знайдена родина",
      "Магічні діти",
      "Доброта"
    ],
    "description": "Соціальний працівник приїздить на острів із незвичайними дітьми й змінюється сам.",
    "cover": "assets/covers/house-in-the-cerulean-sea.webp",
    "category": "fantasy"
  },
  {
    "id": "book-060",
    "title": "Хлопчик у смугастій піжамі",
    "author": "Джон Бойн",
    "pages": 224,
    "genre": "Історична драма",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Дитячий погляд на війну",
      "Дружба через паркан",
      "Трагічний фінал"
    ],
    "description": "Син коменданта табору дружить із хлопчиком по той бік дроту.",
    "cover": "assets/covers/boy-in-striped-pyjamas.webp",
    "category": "novel"
  },
  {
    "id": "book-061",
    "title": "Злодійка книжок",
    "author": "Маркус Зузак",
    "pages": 512,
    "genre": "Історичний роман",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Нацистська Німеччина",
      "Сила слів",
      "Оповідач — Смерть"
    ],
    "description": "Дівчинка Лізель рятується від жахів війни, крадучи книжки.",
    "cover": "assets/covers/book-thief.webp",
    "category": "novel"
  },
  {
    "id": "book-062",
    "title": "До зустрічі з тобою",
    "author": "Джоджо Мойєс",
    "pages": 480,
    "genre": "Романтична драма",
    "moods": [
      "emotional",
      "romantic"
    ],
    "vibe": "romantic",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Кохання і вибір",
      "Різні світи",
      "Сльози"
    ],
    "description": "Луїза береться доглядати за паралізованим Віллом і змінює його погляд на життя.",
    "cover": "assets/covers/me-before-you.webp",
    "category": "novel"
  },
  {
    "id": "book-063",
    "title": "Один день",
    "author": "Девід Ніколс",
    "pages": 464,
    "genre": "Романтична драма",
    "moods": [
      "romantic",
      "melancholic"
    ],
    "vibe": "romantic",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Друзі-коханці",
      "Двадцять років",
      "Плин часу"
    ],
    "description": "Роман, що щороку зазирає в життя двох людей в один і той самий день — 15 липня.",
    "cover": "assets/covers/one-day.webp",
    "category": "novel"
  },
  {
    "id": "book-064",
    "title": "Щоденник Бріджит Джонс",
    "author": "Гелен Філдінг",
    "pages": 384,
    "genre": "Романтична комедія",
    "moods": [
      "funny",
      "cozy"
    ],
    "vibe": "light",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Щоденникова форма",
      "Самоіронія",
      "Любовний трикутник"
    ],
    "description": "Кумедні записи тридцятирічної Бріджит про роботу, кохання й нескінченні дієти.",
    "cover": "assets/covers/bridget-jones-diary.webp",
    "category": "novel"
  },
  {
    "id": "book-065",
    "title": "Все закінчується на нас",
    "author": "Колін Гувер",
    "pages": 368,
    "genre": "Романтична драма",
    "moods": [
      "emotional",
      "dark"
    ],
    "vibe": "romantic",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Токсичні стосунки",
      "Важкий вибір",
      "Перше кохання"
    ],
    "description": "Ліллі закохується в хірурга, але минуле нагадує про себе.",
    "cover": "assets/covers/it-ends-with-us.webp",
    "category": "novel"
  },
  {
    "id": "book-066",
    "title": "Червоний, білий і королівський синій",
    "author": "Кейсі Маквістон",
    "pages": 432,
    "genre": "Романтична комедія",
    "moods": [
      "romantic",
      "funny"
    ],
    "vibe": "light",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Від ворогів до закоханих",
      "Королівська родина",
      "Політика"
    ],
    "description": "Син президента США й британський принц змушені вдавати друзів — і закохуються.",
    "cover": "assets/covers/red-white-royal-blue.webp",
    "category": "novel"
  },
  {
    "id": "book-067",
    "title": "Вина зірок",
    "author": "Джон Грін",
    "pages": 320,
    "genre": "Young adult драма",
    "moods": [
      "emotional",
      "romantic"
    ],
    "vibe": "romantic",
    "tension": 5,
    "pace": "fast",
    "tropes": [
      "Підліткове кохання",
      "Хвороба",
      "Сльози"
    ],
    "description": "Двоє підлітків зустрічаються в групі підтримки й проживають свою маленьку вічність.",
    "cover": "assets/covers/fault-in-our-stars.webp",
    "category": "novel"
  },
  {
    "id": "book-068",
    "title": "Атомні звички",
    "author": "Джеймс Клір",
    "pages": 320,
    "genre": "Саморозвиток",
    "moods": [
      "uplifting",
      "intellectual"
    ],
    "vibe": "light",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Маленькі кроки",
      "Системи замість цілей",
      "Практичні поради"
    ],
    "description": "Практичний посібник, як за допомогою дрібних змін побудувати корисні звички.",
    "cover": "assets/covers/atomic-habits.webp",
    "category": "other"
  },
  {
    "id": "book-069",
    "title": "Людина в пошуках справжнього сенсу",
    "author": "Віктор Франкл",
    "pages": 192,
    "genre": "Нон-фікшн",
    "moods": [
      "emotional",
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Досвід табору",
      "Пошук сенсу",
      "Логотерапія"
    ],
    "description": "Психіатр розповідає про досвід концтабору та про те, як сенс допомагає вистояти.",
    "cover": "assets/covers/mans-search-for-meaning.webp",
    "category": "other"
  },
  {
    "id": "book-070",
    "title": "Сапієнс. Коротка історія людства",
    "author": "Юваль Ной Харарі",
    "pages": 464,
    "genre": "Нон-фікшн",
    "moods": [
      "intellectual"
    ],
    "vibe": "epic",
    "tension": 2,
    "pace": "medium",
    "tropes": [
      "Еволюція людства",
      "Великі революції",
      "Нестандартні ідеї"
    ],
    "description": "Огляд історії людства від мисливців-збирачів до технологічних революцій.",
    "cover": "assets/covers/sapiens.webp",
    "category": "other"
  },
  {
    "id": "book-071",
    "title": "Думай повільно… вирішуй швидко",
    "author": "Деніел Канеман",
    "pages": 656,
    "genre": "Нон-фікшн",
    "moods": [
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Когнітивні упередження",
      "Дві системи мислення",
      "Наука про рішення"
    ],
    "description": "Нобелівський лауреат пояснює, як працює мислення і чому ми помиляємося.",
    "cover": "assets/covers/thinking-fast-and-slow.webp",
    "category": "other"
  },
  {
    "id": "book-072",
    "title": "Алхімік",
    "author": "Пауло Коельйо",
    "pages": 208,
    "genre": "Притча",
    "moods": [
      "uplifting",
      "cozy"
    ],
    "vibe": "magical",
    "tension": 2,
    "pace": "medium",
    "tropes": [
      "Пошук призначення",
      "Мандрівка до скарбу",
      "Мудрі наставники"
    ],
    "description": "Пастух Сантьяго вирушає через пустелю на пошуки власної Особистої Легенди.",
    "cover": "assets/covers/the-alchemist.webp",
    "category": "novel"
  },
  {
    "id": "book-073",
    "title": "Маленький принц",
    "author": "Антуан де Сент-Екзюпері",
    "pages": 96,
    "genre": "Філософська казка",
    "moods": [
      "melancholic",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Дитячий погляд",
      "Дружба",
      "Філософські притчі"
    ],
    "description": "Льотчик зустрічає в пустелі маленького мандрівника з іншої планети.",
    "cover": "assets/covers/little-prince.webp",
    "category": "novel"
  },
  {
    "id": "book-074",
    "title": "Старий і море",
    "author": "Ернест Гемінґвей",
    "pages": 128,
    "genre": "Повість",
    "moods": [
      "melancholic",
      "emotional"
    ],
    "vibe": "introspective",
    "tension": 4,
    "pace": "slow",
    "tropes": [
      "Боротьба з природою",
      "Самотність",
      "Гідність"
    ],
    "description": "Старий рибалка сам б'ється з велетенською рибою у відкритому морі.",
    "cover": "assets/covers/old-man-and-the-sea.webp",
    "category": "novel"
  },
  {
    "id": "book-075",
    "title": "Сто років самотності",
    "author": "Габріель Гарсія Маркес",
    "pages": 448,
    "genre": "Магічний реалізм",
    "moods": [
      "emotional",
      "mysterious"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Родинна сага",
      "Магічний реалізм",
      "Цикли історії"
    ],
    "description": "Сага родини Буендіа у вигаданому містечку Макондо.",
    "cover": "assets/covers/hundred-years-of-solitude.webp",
    "category": "novel"
  },
  {
    "id": "book-076",
    "title": "Парфуми",
    "author": "Патрік Зюскінд",
    "pages": 272,
    "genre": "Психологічний роман",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Одержимість",
      "Геній-убивця",
      "Світ запахів"
    ],
    "description": "Юнак з абсолютним нюхом готовий на все, щоб створити ідеальні парфуми.",
    "cover": "assets/covers/perfume.webp",
    "category": "novel"
  },
  {
    "id": "book-077",
    "title": "Щоденник Анни Франк",
    "author": "Анна Франк",
    "pages": 304,
    "genre": "Автобіографія",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Переховування",
      "Дорослішання",
      "Свідчення війни"
    ],
    "description": "Щоденник дівчинки, яка переховувалася від нацистів в Амстердамі.",
    "cover": "assets/covers/diary-of-anne-frank.webp",
    "category": "other"
  },
  {
    "id": "book-078",
    "title": "Норвезький ліс",
    "author": "Харукі Муракамі",
    "pages": 384,
    "genre": "Сучасна проза",
    "moods": [
      "melancholic",
      "romantic"
    ],
    "vibe": "introspective",
    "tension": 3,
    "pace": "slow",
    "tropes": [
      "Втрата",
      "Студентські роки",
      "Любовний трикутник"
    ],
    "description": "Тору згадує студентські роки, кохання та втрати, що його сформували.",
    "cover": "assets/covers/norwegian-wood.webp",
    "category": "novel"
  },
  {
    "id": "book-079",
    "title": "Кафка на пляжі",
    "author": "Харукі Муракамі",
    "pages": 560,
    "genre": "Магічний реалізм",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Дві сюжетні лінії",
      "Втеча з дому",
      "Сюрреалізм"
    ],
    "description": "Підліток утікає з дому, а старий чоловік уміє розмовляти з котами — і їхні долі переплітаються.",
    "cover": "assets/covers/kafka-on-the-shore.webp",
    "category": "novel"
  },
  {
    "id": "book-080",
    "title": "Мовчання ягнят",
    "author": "Томас Гарріс",
    "pages": 368,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Серійний убивця",
      "Інтелектуальна гра",
      "Агентка ФБР"
    ],
    "description": "Стажерка ФБР звертається по допомогу до в'язня-канібала, щоб упіймати іншого вбивцю.",
    "cover": "assets/covers/silence-of-the-lambs.webp",
    "category": "thriller"
  },
  {
    "id": "book-081",
    "title": "Бібліотека опівночі",
    "author": "Метт Гейг",
    "pages": 304,
    "genre": "Філософська проза",
    "moods": [
      "emotional",
      "uplifting"
    ],
    "vibe": "magical",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Альтернативні життя",
      "Другий шанс",
      "Магічна бібліотека"
    ],
    "description": "Нора потрапляє до бібліотеки, де кожна книжка — життя, яке вона могла прожити.",
    "cover": "assets/covers/midnight-library.webp",
    "category": "novel"
  },
  {
    "id": "book-082",
    "title": "Чоловік на ім'я Уве",
    "author": "Фредрік Бакман",
    "pages": 352,
    "genre": "Сучасна проза",
    "moods": [
      "cozy",
      "emotional"
    ],
    "vibe": "cozy",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Буркотливий герой",
      "Нові сусіди",
      "Гумор і сум"
    ],
    "description": "Буркотливий пенсіонер хоче жити сам по собі, але нові сусіди ламають його плани.",
    "cover": "assets/covers/man-called-ove.webp",
    "category": "novel"
  },
  {
    "id": "book-083",
    "title": "Тут була Бріт-Марі",
    "author": "Фредрік Бакман",
    "pages": 336,
    "genre": "Сучасна проза",
    "moods": [
      "cozy",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "medium",
    "tropes": [
      "Другий шанс",
      "Футбол",
      "Місцеві дивацтва"
    ],
    "description": "У 63 роки Бріт-Марі починає нове життя в містечку, де футбол — це все.",
    "cover": "assets/covers/britt-marie-was-here.webp",
    "category": "novel"
  },
  {
    "id": "book-084",
    "title": "Вісім ідеальних вбивств",
    "author": "Пітер Свонсон",
    "pages": 304,
    "genre": "Детектив",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "cozy",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Книжкова крамниця",
      "Список вбивств",
      "Детектив про детективи"
    ],
    "description": "Власник книгарні розуміє, що хтось відтворює вбивства з його списку найкращих детективів.",
    "cover": "assets/covers/eight-perfect-murders.webp",
    "category": "thriller"
  },
  {
    "id": "book-085",
    "title": "Тринадцята казка",
    "author": "Діана Сеттерфілд",
    "pages": 480,
    "genre": "Готичний роман",
    "moods": [
      "mysterious",
      "melancholic"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Розповідь біографині",
      "Родинні таємниці",
      "Старий маєток"
    ],
    "description": "Відома письменниця нарешті розповідає біографині історію своєї родини, повну таємниць.",
    "cover": "assets/covers/thirteenth-tale.webp",
    "category": "novel"
  },
  {
    "id": "book-086",
    "title": "Подружжя по сусідству",
    "author": "Шейрі Лапена",
    "pages": 320,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Зникла дитина",
      "Таємниці подружжя",
      "Несподівані повороти"
    ],
    "description": "На вечірці в сусідів зникає немовля — і всі гості стають підозрюваними.",
    "cover": "assets/covers/couple-next-door.webp",
    "category": "thriller"
  },
  {
    "id": "book-087",
    "title": "Острів проклятих",
    "author": "Деніс Лігейн",
    "pages": 384,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Лікарня на острові",
      "Зникла пацієнтка",
      "Ненадійна реальність"
    ],
    "description": "Маршал розслідує зникнення пацієнтки з лікарні для небезпечних душевнохворих.",
    "cover": "assets/covers/shutter-island.webp",
    "category": "thriller"
  },
  {
    "id": "book-088",
    "title": "Нейромант",
    "author": "Вільям Ґібсон",
    "pages": 320,
    "genre": "Кіберпанк",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Хакери",
      "Кіберпростір",
      "Штучний інтелект"
    ],
    "description": "Хакер-невдаха отримує останнє завдання у світі кіберпростору.",
    "cover": "assets/covers/neuromancer.webp",
    "category": "scifi"
  },
  {
    "id": "book-089",
    "title": "Портрет Доріана Грея",
    "author": "Оскар Вайлд",
    "pages": 288,
    "genre": "Готичний роман",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Угода з долею",
      "Краса й розпуста",
      "Портрет, що старіє"
    ],
    "description": "Прекрасний юнак зберігає молодість, а старіє його портрет.",
    "cover": "assets/covers/dorian-gray.webp",
    "category": "novel"
  },
  {
    "id": "book-090",
    "title": "Три товариші",
    "author": "Еріх Марія Ремарк",
    "pages": 480,
    "genre": "Класична проза",
    "moods": [
      "emotional",
      "melancholic"
    ],
    "vibe": "historical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Дружба",
      "Кохання й хвороба",
      "Між війнами"
    ],
    "description": "Троє друзів переживають повоєнну Німеччину, кохання та втрати.",
    "cover": "assets/covers/three-comrades.webp",
    "category": "novel"
  },
  {
    "id": "book-091",
    "title": "На західному фронті без змін",
    "author": "Еріх Марія Ремарк",
    "pages": 320,
    "genre": "Воєнний роман",
    "moods": [
      "dark",
      "emotional"
    ],
    "vibe": "historical",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Окопна війна",
      "Втрачене покоління",
      "Дружба"
    ],
    "description": "Молоді солдати дізнаються справжню ціну війни на фронті Першої світової.",
    "cover": "assets/covers/all-quiet-on-the-western-front.webp",
    "category": "novel"
  },
  {
    "id": "book-092",
    "title": "Володар мух",
    "author": "Вільям Голдінг",
    "pages": 256,
    "genre": "Алегорична проза",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Діти на безлюдному острові",
      "Занепад цивілізації",
      "Боротьба за владу"
    ],
    "description": "Група хлопців на безлюдному острові поступово скочується до жорстокості.",
    "cover": "assets/covers/lord-of-the-flies.webp",
    "category": "novel"
  },
  {
    "id": "book-093",
    "title": "Життя Пі",
    "author": "Ян Мартел",
    "pages": 352,
    "genre": "Пригодницька проза",
    "moods": [
      "adventurous",
      "intellectual"
    ],
    "vibe": "survival",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Виживання в морі",
      "Тигр у човні",
      "Віра й правда"
    ],
    "description": "Хлопець опиняється в рятувальному човні посеред океану разом із бенгальським тигром.",
    "cover": "assets/covers/life-of-pi.webp",
    "category": "novel"
  },
  {
    "id": "book-094",
    "title": "Енн із Зелених Дахів",
    "author": "Люсі Мод Монтгомері",
    "pages": 416,
    "genre": "Класичний роман",
    "moods": [
      "cozy",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "slow",
    "tropes": [
      "Дівчинка-сирота",
      "Острів Принца Едуарда",
      "Дружба"
    ],
    "description": "Балакуча руда сирота змінює життя двох літніх брата й сестри.",
    "cover": "assets/covers/anne-of-green-gables.webp",
    "category": "novel"
  },
  {
    "id": "book-095",
    "title": "Таємний сад",
    "author": "Френсіс Годжсон Бернетт",
    "pages": 288,
    "genre": "Дитяча класика",
    "moods": [
      "cozy",
      "mysterious"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Зачинений сад",
      "Дружба",
      "Зцілення"
    ],
    "description": "Самотня Мері знаходить зачинений сад і разом із друзями повертає його до життя.",
    "cover": "assets/covers/secret-garden.webp",
    "category": "novel"
  },
  {
    "id": "book-096",
    "title": "Острів скарбів",
    "author": "Роберт Луїс Стівенсон",
    "pages": 288,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Пірати",
      "Карта скарбів",
      "Морська подорож"
    ],
    "description": "Юний Джим Гокінс вирушає з піратами й авантюристами на пошуки скарбу.",
    "cover": "assets/covers/treasure-island.webp",
    "category": "novel"
  },
  {
    "id": "book-097",
    "title": "Граф Монте-Крісто",
    "author": "Александр Дюма",
    "pages": 1312,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "dark"
    ],
    "vibe": "historical",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Помста",
      "Несправедливе ув'язнення",
      "Таємна особа"
    ],
    "description": "Невинно засуджений моряк утікає з в'язниці й вишукано мститься своїм ворогам.",
    "cover": "assets/covers/count-of-monte-cristo.webp",
    "category": "novel"
  },
  {
    "id": "book-098",
    "title": "Три мушкетери",
    "author": "Александр Дюма",
    "pages": 704,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Дружба",
      "Дуелі",
      "Придворні інтриги"
    ],
    "description": "Молодий гасконець д'Артаньян стає мушкетером і потрапляє в пастку королівських інтриг.",
    "cover": "assets/covers/three-musketeers.webp",
    "category": "novel"
  },
  {
    "id": "book-099",
    "title": "Знедолені",
    "author": "Віктор Гюго",
    "pages": 1488,
    "genre": "Історичний роман",
    "moods": [
      "emotional",
      "intellectual"
    ],
    "vibe": "historical",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Милосердя",
      "Переслідування",
      "Революційний Париж"
    ],
    "description": "Колишній каторжник Жан Вальжан прагне чесного життя, але інспектор Жавер не припиняє переслідування.",
    "cover": "assets/covers/les-miserables.webp",
    "category": "novel"
  },
  {
    "id": "book-100",
    "title": "Собор Паризької Богоматері",
    "author": "Віктор Гюго",
    "pages": 512,
    "genre": "Історичний роман",
    "moods": [
      "emotional",
      "dark"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Нерозділене кохання",
      "Дзвонар-горбань",
      "Середньовічний Париж"
    ],
    "description": "Квазімодо, Есмеральда й архідиякон Фролло — трагічний трикутник у середньовічному Парижі.",
    "cover": "assets/covers/notre-dame-de-paris.webp",
    "category": "novel"
  },
  {
    "id": "book-101",
    "title": "Інтерв'ю з вампіром",
    "author": "Енн Райс",
    "pages": 352,
    "genre": "Готичний горор",
    "moods": [
      "dark",
      "romantic"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Вампіри",
      "Сповідь безсмертного",
      "Новий Орлеан"
    ],
    "description": "Вампір Луї розповідає репортерові історію свого безсмертного життя.",
    "cover": "assets/covers/interview-with-the-vampire.webp",
    "category": "horror"
  },
  {
    "id": "book-102",
    "title": "Тінь вітру",
    "author": "Карлос Руїс Сафон",
    "pages": 544,
    "genre": "Готичний детектив",
    "moods": [
      "mysterious",
      "romantic"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Цвинтар забутих книжок",
      "Зниклий автор",
      "Барселона"
    ],
    "description": "Хлопчик знаходить на Цвинтарі забутих книжок роман, чий автор зник без сліду.",
    "cover": "assets/covers/shadow-of-the-wind.webp",
    "category": "thriller"
  },
  {
    "id": "book-103",
    "title": "Кохання під час холери",
    "author": "Габріель Гарсія Маркес",
    "pages": 432,
    "genre": "Роман",
    "moods": [
      "romantic",
      "melancholic"
    ],
    "vibe": "romantic",
    "tension": 3,
    "pace": "slow",
    "tropes": [
      "Кохання крізь роки",
      "Очікування",
      "Магічний реалізм"
    ],
    "description": "Флорентіно чекає на Ферміну понад п'ятдесят років.",
    "cover": "assets/covers/love-in-the-time-of-cholera.webp",
    "category": "novel"
  },
  {
    "id": "book-104",
    "title": "Нестерпна легкість буття",
    "author": "Мілан Кундера",
    "pages": 352,
    "genre": "Філософський роман",
    "moods": [
      "intellectual",
      "melancholic"
    ],
    "vibe": "introspective",
    "tension": 4,
    "pace": "slow",
    "tropes": [
      "Вибір і відповідальність",
      "Кохання",
      "Легкість і тягар"
    ],
    "description": "Переплетені долі чотирьох героїв на тлі Праги 1960-х.",
    "cover": "assets/covers/unbearable-lightness-of-being.webp",
    "category": "novel"
  },
  {
    "id": "book-105",
    "title": "Відьмак: Останнє бажання",
    "author": "Анджей Сапковський",
    "pages": 288,
    "genre": "Фентезі",
    "moods": [
      "dark",
      "adventurous"
    ],
    "vibe": "epic",
    "tension": 5,
    "pace": "fast",
    "tropes": [
      "Мисливець на чудовиськ",
      "Збірка оповідань",
      "Моральна сірість"
    ],
    "description": "Відьмак Геральт береться за небезпечні замовлення й шукає своє місце у світі.",
    "cover": "assets/covers/the-last-wish.webp",
    "category": "novel"
  },
  {
    "id": "book-106",
    "title": "Персі Джексон і Викрадач блискавок",
    "author": "Рік Ріордан",
    "pages": 384,
    "genre": "Фентезі",
    "moods": [
      "adventurous",
      "funny"
    ],
    "vibe": "magical",
    "tension": 4,
    "pace": "fast",
    "tropes": [
      "Сучасні боги",
      "Обраний герой",
      "Подорож країною"
    ],
    "description": "Підліток дізнається, що він син грецького бога, і вирушає на пошуки викраденої блискавки Зевса.",
    "cover": "assets/covers/percy-jackson-lightning-thief.webp",
    "category": "novel"
  },
  {
    "id": "book-107",
    "title": "Голодні ігри",
    "author": "Сюзанна Коллінз",
    "pages": 384,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "drive"
    ],
    "vibe": "dystopian",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Арена виживання",
      "Бунтарка",
      "Любовний трикутник"
    ],
    "description": "Шістнадцятирічна Кетніс добровільно йде на смертельні ігри замість молодшої сестри.",
    "cover": "assets/covers/hunger-games.webp",
    "category": "scifi"
  },
  {
    "id": "book-108",
    "title": "Дивергент",
    "author": "Вероніка Рот",
    "pages": 480,
    "genre": "Антиутопія",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "dystopian",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Розподіл на фракції",
      "Обрана",
      "Заколот"
    ],
    "description": "У суспільстві, поділеному на фракції, Беатріс приховує, що не вписується в жодну з них.",
    "cover": "assets/covers/divergent.webp",
    "category": "scifi"
  },
  {
    "id": "book-109",
    "title": "Пеппі Довгапанчоха",
    "author": "Астрід Ліндґрен",
    "pages": 160,
    "genre": "Дитяча класика",
    "moods": [
      "cozy",
      "funny"
    ],
    "vibe": "light",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Незвичайна дівчинка",
      "Пригоди",
      "Дружба"
    ],
    "description": "Дев'ятирічна Пеппі живе сама з конем і мавпочкою та перевертає життя містечка догори дриґом.",
    "cover": "assets/covers/pippi-longstocking.webp",
    "category": "fantasy"
  },
  {
    "id": "book-110",
    "title": "Мері Поппінс",
    "author": "Памела Треверс",
    "pages": 192,
    "genre": "Дитяче фентезі",
    "moods": [
      "cozy",
      "funny"
    ],
    "vibe": "magical",
    "tension": 1,
    "pace": "medium",
    "tropes": [
      "Чарівна няня",
      "Буденна магія",
      "Родинне тепло"
    ],
    "description": "Загадкова няня з парасолькою прилітає зі східним вітром і перетворює будні на чари.",
    "cover": "assets/covers/mary-poppins.webp",
    "category": "fantasy"
  },
  {
    "id": "book-111",
    "title": "Вітер у вербах",
    "author": "Кеннет Грем",
    "pages": 256,
    "genre": "Дитяче фентезі",
    "moods": [
      "cozy",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "slow",
    "tropes": [
      "Річкові мандри",
      "Дружба тварин",
      "Затишний дім"
    ],
    "description": "Кріт, Щур, Борсук і пан Жаб мандрують берегами річки й потрапляють у кумедні пригоди.",
    "cover": "assets/covers/wind-in-the-willows.webp",
    "category": "fantasy"
  },
  {
    "id": "book-112",
    "title": "Троє в одному човні, не рахуючи собаки",
    "author": "Джером К. Джером",
    "pages": 256,
    "genre": "Гумористична проза",
    "moods": [
      "funny",
      "cozy"
    ],
    "vibe": "light",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Англійський гумор",
      "Подорож Темзою",
      "Друзі"
    ],
    "description": "Троє друзів і пес вирушають у подорож Темзою, а кожна дрібниця перетворюється на комедію.",
    "cover": "assets/covers/three-men-in-a-boat.webp",
    "category": "novel"
  },
  {
    "id": "book-113",
    "title": "Кафе на краю світу",
    "author": "Джон Стрелекі",
    "pages": 160,
    "genre": "Притча",
    "moods": [
      "uplifting",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Питання про сенс",
      "Придорожнє кафе",
      "Зупинка в дорозі"
    ],
    "description": "Випадкова зупинка в придорожньому кафе змушує героя поставити собі три прості, але важливі запитання.",
    "cover": "assets/covers/cafe-at-the-end-of-the-world.webp",
    "category": "novel"
  },
  {
    "id": "book-114",
    "title": "Полліанна",
    "author": "Елеонор Портер",
    "pages": 240,
    "genre": "Класичний роман",
    "moods": [
      "uplifting",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "slow",
    "tropes": [
      "Оптимізм",
      "Гра в радість",
      "Маленьке містечко"
    ],
    "description": "Дівчинка-сирота вчить усе місто «гри в радість» і знаходить світле навіть у скруті.",
    "cover": "assets/covers/pollyanna.webp",
    "category": "novel"
  },
  {
    "id": "book-115",
    "title": "Татусь-Довгоніжка",
    "author": "Джін Вебстер",
    "pages": 208,
    "genre": "Епістолярний роман",
    "moods": [
      "romantic",
      "cozy"
    ],
    "vibe": "romantic",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Листи",
      "Анонімний благодійник",
      "Студентські роки"
    ],
    "description": "Сирота-студентка пише листи таємничому покровителю й не підозрює, хто він насправді.",
    "cover": "assets/covers/daddy-long-legs.webp",
    "category": "novel"
  },
  {
    "id": "book-116",
    "title": "Багатий тато, бідний тато",
    "author": "Роберт Кійосакі",
    "pages": 336,
    "genre": "Особисті фінанси",
    "moods": [
      "uplifting",
      "intellectual"
    ],
    "vibe": "light",
    "tension": 1,
    "pace": "fast",
    "tropes": [
      "Фінансова грамотність",
      "Два підходи",
      "Прості поради"
    ],
    "description": "Книга про те, як по-різному мислять про гроші двоє «батьків» і чому це визначає статки.",
    "cover": "assets/covers/rich-dad-poor-dad.webp",
    "category": "other"
  },
  {
    "id": "book-117",
    "title": "Сила звички",
    "author": "Чарльз Дахігг",
    "pages": 416,
    "genre": "Нон-фікшн",
    "moods": [
      "intellectual",
      "uplifting"
    ],
    "vibe": "light",
    "tension": 1,
    "pace": "medium",
    "tropes": [
      "Наука про звички",
      "Приклади з життя",
      "Зміна поведінки"
    ],
    "description": "Автор пояснює, як формуються звички та як змінити їх на рівні людини, бізнесу й суспільства.",
    "cover": "assets/covers/power-of-habit.webp",
    "category": "other"
  },
  {
    "id": "book-118",
    "title": "Чарлі і шоколадна фабрика",
    "author": "Роальд Дал",
    "pages": 208,
    "genre": "Дитяче фентезі",
    "moods": [
      "funny",
      "cozy"
    ],
    "vibe": "magical",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Золотий квиток",
      "Дивний власник фабрики",
      "Солодкий світ"
    ],
    "description": "Бідний хлопчик отримує золотий квиток на екскурсію таємничою фабрикою Віллі Вонки.",
    "cover": "assets/covers/charlie-chocolate-factory.webp",
    "category": "fantasy"
  },
  {
    "id": "book-119",
    "title": "Матильда",
    "author": "Роальд Дал",
    "pages": 240,
    "genre": "Дитяче фентезі",
    "moods": [
      "funny",
      "uplifting"
    ],
    "vibe": "magical",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Геніальна дівчинка",
      "Нестерпні дорослі",
      "Телекінез"
    ],
    "description": "Вундеркінд Матильда вчиться захищатися від жахливої родини й суворої директорки школи.",
    "cover": "assets/covers/matilda.webp",
    "category": "fantasy"
  },
  {
    "id": "book-120",
    "title": "Шоколад",
    "author": "Джоанн Гарріс",
    "pages": 320,
    "genre": "Сучасний роман",
    "moods": [
      "cozy",
      "romantic"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "medium",
    "tropes": [
      "Французьке містечко",
      "Солодощі",
      "Конфлікт традицій"
    ],
    "description": "Вієнн відкриває шоколадну крамницю в містечку, де бояться змін, і змінює життя мешканців.",
    "cover": "assets/covers/chocolat.webp",
    "category": "novel"
  },
  {
    "id": "book-121",
    "title": "Розум і почуття",
    "author": "Джейн Остін",
    "pages": 400,
    "genre": "Класичний роман",
    "moods": [
      "romantic",
      "cozy"
    ],
    "vibe": "romantic",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Сестри Дешвуд",
      "Розум чи серце",
      "Суспільні умовності"
    ],
    "description": "Дві сестри з протилежними характерами шукають кохання у світі суворих умовностей.",
    "cover": "assets/covers/sense-and-sensibility.webp",
    "category": "novel"
  },
  {
    "id": "book-122",
    "title": "Емма",
    "author": "Джейн Остін",
    "pages": 480,
    "genre": "Класичний роман",
    "moods": [
      "romantic",
      "funny"
    ],
    "vibe": "romantic",
    "tension": 2,
    "pace": "slow",
    "tropes": [
      "Свахівство",
      "Помилки в почуттях",
      "Дотепні діалоги"
    ],
    "description": "Самовпевнена Емма Вудгауз знайомить інших, але не помічає власних почуттів.",
    "cover": "assets/covers/emma.webp",
    "category": "novel"
  },
  {
    "id": "book-123",
    "title": "Прогулянка на згадку",
    "author": "Ніколас Спаркс",
    "pages": 224,
    "genre": "Романтична драма",
    "moods": [
      "romantic",
      "emotional"
    ],
    "vibe": "romantic",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Нерівна пара",
      "Перше кохання",
      "Містечко на узбережжі"
    ],
    "description": "Бунтівний підліток і сором'язлива дочка пастора закохуються попри всі обставини.",
    "cover": "assets/covers/a-walk-to-remember.webp",
    "category": "novel"
  },
  {
    "id": "book-124",
    "title": "Кіт на ім'я Боб",
    "author": "Джеймс Боуен",
    "pages": 304,
    "genre": "Автобіографія",
    "moods": [
      "uplifting",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 2,
    "pace": "medium",
    "tropes": [
      "Реальна історія",
      "Бездомний і кіт",
      "Другий шанс"
    ],
    "description": "Вуличний музикант і рудий кіт рятують одне одного й змінюють життя.",
    "cover": "assets/covers/street-cat-named-bob.webp",
    "category": "other"
  },
  {
    "id": "book-125",
    "title": "Щоденник пам'яті",
    "author": "Ніколас Спаркс",
    "pages": 240,
    "genre": "Романтична драма",
    "moods": [
      "romantic",
      "melancholic"
    ],
    "vibe": "romantic",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Кохання крізь роки",
      "Спогади",
      "Літня пристрасть"
    ],
    "description": "Старенький чоловік читає дружині історію їхнього кохання, яку вона давно забула.",
    "cover": "assets/covers/the-notebook.webp",
    "category": "novel"
  },
  {
    "id": "book-126",
    "title": "Пригоди Тома Сойєра",
    "author": "Марк Твен",
    "pages": 272,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "funny"
    ],
    "vibe": "light",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Дитячі пустощі",
      "Скарб",
      "Містечко на Міссісіпі"
    ],
    "description": "Невгамовний Том разом із другом Геком шукає скарби й потрапляє в небезпечні пригоди.",
    "cover": "assets/covers/tom-sawyer.webp",
    "category": "novel"
  },
  {
    "id": "book-127",
    "title": "Столітній старець, який виліз у вікно і зник",
    "author": "Юнас Юнассон",
    "pages": 416,
    "genre": "Комедійний роман",
    "moods": [
      "funny",
      "adventurous"
    ],
    "vibe": "light",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Сторічний утікач",
      "Абсурдні пригоди",
      "Чорний гумор"
    ],
    "description": "Сторічний Аллан вилазить із вікна будинку для літніх і потрапляє у вир кумедних подій.",
    "cover": "assets/covers/hundred-year-old-man.webp",
    "category": "novel"
  },
  {
    "id": "book-128",
    "title": "Принцеса-наречена",
    "author": "Вільям Голдман",
    "pages": 288,
    "genre": "Фентезі",
    "moods": [
      "funny",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Справжнє кохання",
      "Пірати й велетні",
      "Іронія"
    ],
    "description": "Казка про кохання, піратів і велетнів з іронічним оповідачем.",
    "cover": "assets/covers/princess-bride.webp",
    "category": "fantasy"
  },
  {
    "id": "book-129",
    "title": "Зоряний пил",
    "author": "Ніл Гейман",
    "pages": 256,
    "genre": "Фентезі",
    "moods": [
      "romantic",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Зірка, що впала",
      "Подорож за обіцянкою",
      "Казка для дорослих"
    ],
    "description": "Юнак іде по зірку, що впала, і знаходить значно більше, ніж обіцяв коханій.",
    "cover": "assets/covers/stardust.webp",
    "category": "fantasy"
  },
  {
    "id": "book-130",
    "title": "Добрі передвісники",
    "author": "Террі Пратчетт, Ніл Гейман",
    "pages": 400,
    "genre": "Гумористичне фентезі",
    "moods": [
      "funny",
      "adventurous"
    ],
    "vibe": "light",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Кінець світу",
      "Дует ангела й демона",
      "Британський гумор"
    ],
    "description": "Ангел і демон, що звикли до земного життя, намагаються зупинити Армагеддон.",
    "cover": "assets/covers/good-omens.webp",
    "category": "fantasy"
  },
  {
    "id": "book-131",
    "title": "Колір магії",
    "author": "Террі Пратчетт",
    "pages": 288,
    "genre": "Гумористичне фентезі",
    "moods": [
      "funny",
      "adventurous"
    ],
    "vibe": "light",
    "tension": 3,
    "pace": "fast",
    "tropes": [
      "Плаский світ",
      "Невдаха-чарівник",
      "Мандрівка"
    ],
    "description": "Невдаха-чарівник і наївний турист мандрують Пласким світом, потрапляючи в халепи.",
    "cover": "assets/covers/color-of-magic.webp",
    "category": "fantasy"
  },
  {
    "id": "book-132",
    "title": "Марсіянські хроніки",
    "author": "Рей Бредбері",
    "pages": 256,
    "genre": "Наукова фантастика",
    "moods": [
      "melancholic",
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 3,
    "pace": "slow",
    "tropes": [
      "Колонізація Марса",
      "Збірка новел",
      "Самотність"
    ],
    "description": "Збірка новел про освоєння Марса, де фантастика ховає роздуми про людську природу.",
    "cover": "assets/covers/martian-chronicles.webp",
    "category": "scifi"
  },
  {
    "id": "book-133",
    "title": "Клуб убивств по четвергах",
    "author": "Річард Осман",
    "pages": 400,
    "genre": "Затишний детектив",
    "moods": [
      "funny",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 3,
    "pace": "medium",
    "tropes": [
      "Літні детективи",
      "Будинок для пенсіонерів",
      "Гумор"
    ],
    "description": "Четверо пенсіонерів щочетверга розслідують старі справи — і натрапляють на справжнє вбивство.",
    "cover": "assets/covers/thursday-murder-club.webp",
    "category": "thriller"
  },
  {
    "id": "book-134",
    "title": "Чарівник Земномор'я",
    "author": "Урсула Ле Гуїн",
    "pages": 240,
    "genre": "Фентезі",
    "moods": [
      "intellectual",
      "adventurous"
    ],
    "vibe": "epic",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Школа чарівників",
      "Тінь, яку випустив герой",
      "Сила імені"
    ],
    "description": "Юний Ґед випускає тінь, що переслідує його, і мусить зустрітися з нею віч-на-віч.",
    "cover": "assets/covers/wizard-of-earthsea.webp",
    "category": "fantasy"
  },
  {
    "id": "book-135",
    "title": "Я, робот",
    "author": "Айзек Азімов",
    "pages": 288,
    "genre": "Наукова фантастика",
    "moods": [
      "intellectual"
    ],
    "vibe": "light",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Закони робототехніки",
      "Збірка оповідань",
      "Етика ШІ"
    ],
    "description": "Збірка оповідань про роботів, закони робототехніки та межі людяності.",
    "cover": "assets/covers/i-robot.webp",
    "category": "scifi"
  },
  {
    "id": "book-136",
    "title": "Соляріс",
    "author": "Станіслав Лем",
    "pages": 224,
    "genre": "Наукова фантастика",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 4,
    "pace": "slow",
    "tropes": [
      "Контакт із розумним океаном",
      "Провина",
      "Межі пізнання"
    ],
    "description": "Науковці на орбіті планети з розумним океаном стикаються зі своїми найглибшими спогадами.",
    "cover": "assets/covers/solaris.webp",
    "category": "scifi"
  },
  {
    "id": "book-137",
    "title": "Машина часу",
    "author": "Герберт Веллс",
    "pages": 128,
    "genre": "Наукова фантастика",
    "moods": [
      "intellectual",
      "adventurous"
    ],
    "vibe": "light",
    "tension": 4,
    "pace": "fast",
    "tropes": [
      "Подорож у майбутнє",
      "Класова сатира",
      "Елої та морлоки"
    ],
    "description": "Винахідник вирушає у далеке майбутнє й відкриває розділене на два види людство.",
    "cover": "assets/covers/the-time-machine.webp",
    "category": "scifi"
  },
  {
    "id": "book-138",
    "title": "Сторонній",
    "author": "Альбер Камю",
    "pages": 160,
    "genre": "Філософська проза",
    "moods": [
      "intellectual",
      "melancholic"
    ],
    "vibe": "introspective",
    "tension": 4,
    "pace": "medium",
    "tropes": [
      "Байдужість",
      "Суд",
      "Абсурд"
    ],
    "description": "Мерсо, байдужий до світу, потрапляє під суд, де судять не лише його вчинок, а й його спокій.",
    "cover": "assets/covers/the-stranger.webp",
    "category": "novel"
  },
  {
    "id": "book-139",
    "title": "Двадцять тисяч льє під водою",
    "author": "Жуль Верн",
    "pages": 448,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Підводний човен",
      "Загадковий капітан",
      "Морські глибини"
    ],
    "description": "Вчений потрапляє на борт «Наутілуса» капітана Немо й вирушає в подорож океанськими глибинами.",
    "cover": "assets/covers/twenty-thousand-leagues.webp",
    "category": "scifi"
  },
  {
    "id": "book-140",
    "title": "Подорож до центру Землі",
    "author": "Жуль Верн",
    "pages": 288,
    "genre": "Пригодницький роман",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 5,
    "pace": "fast",
    "tropes": [
      "Підземний світ",
      "Експедиція",
      "Вулкан"
    ],
    "description": "Професор із племінником спускаються в кратер вулкана й знаходять підземний світ.",
    "cover": "assets/covers/journey-to-the-center-of-the-earth.webp",
    "category": "scifi"
  },
  {
    "id": "book-141",
    "title": "Вбивство Роджера Екройда",
    "author": "Агата Крісті",
    "pages": 320,
    "genre": "Класичний детектив",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "cozy",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Сільська садиба",
      "Несподіваний фінал",
      "Пуаро на пенсії"
    ],
    "description": "Пуаро виходить на пенсію, але мусить розкрити вбивство в тихому англійському селі.",
    "cover": "assets/covers/murder-of-roger-ackroyd.webp",
    "category": "thriller"
  },
  {
    "id": "book-142",
    "title": "Смерть на Нілі",
    "author": "Агата Крісті",
    "pages": 352,
    "genre": "Класичний детектив",
    "moods": [
      "mysterious",
      "cozy"
    ],
    "vibe": "cozy",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Круїз по Нілу",
      "Коло підозрюваних",
      "Любовний трикутник"
    ],
    "description": "Медовий місяць на річковому пароплаві закінчується вбивством, і Пуаро береться до справи.",
    "cover": "assets/covers/death-on-the-nile.webp",
    "category": "thriller"
  },
  {
    "id": "book-143",
    "title": "Книга кладовища",
    "author": "Ніл Гейман",
    "pages": 304,
    "genre": "Фентезі",
    "moods": [
      "cozy",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Хлопчик серед привидів",
      "Кладовище як дім",
      "Дорослішання"
    ],
    "description": "Хлопчика, що вижив у ніч вбивства родини, виховують привиди на старому кладовищі.",
    "cover": "assets/covers/graveyard-book.webp",
    "category": "fantasy"
  },
  {
    "id": "book-144",
    "title": "Перетворення",
    "author": "Франц Кафка",
    "pages": 96,
    "genre": "Новела",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 5,
    "pace": "fast",
    "tropes": [
      "Абсурд",
      "Відчуження",
      "Родина"
    ],
    "description": "Одного ранку комівояжер Грегор Замза прокидається комахою.",
    "cover": "assets/covers/the-metamorphosis.webp",
    "category": "novel"
  },
  {
    "id": "book-145",
    "title": "Війна світів",
    "author": "Герберт Веллс",
    "pages": 224,
    "genre": "Наукова фантастика",
    "moods": [
      "dark",
      "drive"
    ],
    "vibe": "dystopian",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Вторгнення прибульців",
      "Паніка",
      "Виживання"
    ],
    "description": "Марсіяни вторгаються в Англію, і людство опиняється на межі знищення.",
    "cover": "assets/covers/war-of-the-worlds.webp",
    "category": "scifi"
  },
  {
    "id": "book-146",
    "title": "Кораліна",
    "author": "Ніл Гейман",
    "pages": 192,
    "genre": "Темне фентезі",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Дзеркальний світ",
      "Інша мати",
      "Дитячий горор"
    ],
    "description": "Дівчинка знаходить двері до ідеальної копії свого дому, де на неї чекає небезпечна «інша мати».",
    "cover": "assets/covers/coraline.webp",
    "category": "horror"
  },
  {
    "id": "book-147",
    "title": "Чи сняться андроїдам електричні вівці?",
    "author": "Філіп К. Дік",
    "pages": 256,
    "genre": "Наукова фантастика",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Мисливець на андроїдів",
      "Що значить бути людиною",
      "Світ після катастрофи"
    ],
    "description": "Мисливець на андроїдів має знайти шістьох втікачів — але чим вони відрізняються від людей?",
    "cover": "assets/covers/do-androids-dream.webp",
    "category": "scifi"
  },
  {
    "id": "book-148",
    "title": "Кров ельфів",
    "author": "Анджей Сапковський",
    "pages": 352,
    "genre": "Фентезі",
    "moods": [
      "dark",
      "adventurous"
    ],
    "vibe": "epic",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Навчання Цірі",
      "Політичні війни",
      "Відьмак"
    ],
    "description": "Геральт доглядає Цірі, дівчину з особливою долею, а світ рухається до війни.",
    "cover": "assets/covers/blood-of-elves.webp",
    "category": "fantasy"
  },
  {
    "id": "book-149",
    "title": "Американські боги",
    "author": "Ніл Гейман",
    "pages": 592,
    "genre": "Міське фентезі",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Старі й нові боги",
      "Подорож Америкою",
      "Афера"
    ],
    "description": "Колишній в'язень стає охоронцем таємничого містера Середи й потрапляє у війну богів.",
    "cover": "assets/covers/american-gods.webp",
    "category": "fantasy"
  },
  {
    "id": "book-150",
    "title": "Чума",
    "author": "Альбер Камю",
    "pages": 352,
    "genre": "Філософський роман",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "introspective",
    "tension": 6,
    "pace": "slow",
    "tropes": [
      "Карантин міста",
      "Моральний вибір",
      "Солідарність"
    ],
    "description": "У місті, відрізаному від світу епідемією, лікар Ріє бореться з хворобою.",
    "cover": "assets/covers/the-plague.webp",
    "category": "novel"
  },
  {
    "id": "book-151",
    "title": "Процес",
    "author": "Франц Кафка",
    "pages": 288,
    "genre": "Філософський роман",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "introspective",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Невідоме звинувачення",
      "Бюрократія",
      "Абсурд"
    ],
    "description": "Банківського службовця Йозефа К. заарештовують без пояснення причини.",
    "cover": "assets/covers/the-trial.webp",
    "category": "novel"
  },
  {
    "id": "book-152",
    "title": "Гаррі Поттер і в'язень Азкабану",
    "author": "Дж. К. Роулінг",
    "pages": 448,
    "genre": "Фентезі",
    "moods": [
      "adventurous",
      "mysterious"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Втеча з в'язниці",
      "Подорож у часі",
      "Хрещений"
    ],
    "description": "Гаррі дізнається про втікача Сіріуса Блека й розплутує таємниці минулого своїх батьків.",
    "cover": "assets/covers/harry-potter-3.webp",
    "category": "fantasy"
  },
  {
    "id": "book-153",
    "title": "Привиди дому на пагорбі",
    "author": "Шерлі Джексон",
    "pages": 208,
    "genre": "Готичний горор",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "slow",
    "tropes": [
      "Будинок із привидами",
      "Психологічний страх",
      "Ізоляція"
    ],
    "description": "Група людей оселяється у відомому будинку з привидами, і він починає впливати на кожного.",
    "cover": "assets/covers/haunting-of-hill-house.webp",
    "category": "horror"
  },
  {
    "id": "book-154",
    "title": "Жінка в чорному",
    "author": "Сьюзен Гілл",
    "pages": 176,
    "genre": "Готичний горор",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Привид",
      "Болотний маєток",
      "Англійська готика"
    ],
    "description": "Молодий адвокат їде в глушину розібратися зі спадщиною й натрапляє на моторошну історію.",
    "cover": "assets/covers/woman-in-black.webp",
    "category": "horror"
  },
  {
    "id": "book-155",
    "title": "Володар перснів: Дві вежі",
    "author": "Дж. Р. Р. Толкін",
    "pages": 464,
    "genre": "Епічне фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "slow",
    "tropes": [
      "Розділене братство",
      "Битва за Гельмову Балку",
      "Війна"
    ],
    "description": "Братство розпалося, і кожен герой веде власну боротьбу проти темних сил.",
    "cover": "assets/covers/the-two-towers.webp",
    "category": "fantasy"
  },
  {
    "id": "book-156",
    "title": "Гаррі Поттер і келих вогню",
    "author": "Дж. К. Роулінг",
    "pages": 640,
    "genre": "Фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "magical",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Турнір трьох чарівників",
      "Повернення зла",
      "Дорослішання"
    ],
    "description": "Гаррі змушений брати участь у небезпечному турнірі, за яким ховається змова.",
    "cover": "assets/covers/harry-potter-4.webp",
    "category": "fantasy"
  },
  {
    "id": "book-157",
    "title": "Маленьке життя",
    "author": "Ханя Янагіхара",
    "pages": 816,
    "genre": "Драма",
    "moods": [
      "emotional",
      "dark"
    ],
    "vibe": "introspective",
    "tension": 8,
    "pace": "slow",
    "tropes": [
      "Дружба",
      "Травма",
      "Нью-Йорк"
    ],
    "description": "Історія чотирьох друзів у Нью-Йорку, у центрі якої — нелегка доля Джуда.",
    "cover": "assets/covers/a-little-life.webp",
    "category": "novel"
  },
  {
    "id": "book-158",
    "title": "Керрі",
    "author": "Стівен Кінг",
    "pages": 256,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Булінг",
      "Телекінез",
      "Випускний"
    ],
    "description": "Принижувана однокласниками Керрі виявляє в собі небезпечну силу.",
    "cover": "assets/covers/carrie.webp",
    "category": "horror"
  },
  {
    "id": "book-159",
    "title": "Червоний дракон",
    "author": "Томас Гарріс",
    "pages": 400,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Серійний убивця",
      "Профайлер",
      "Гра розуму"
    ],
    "description": "Колишній агент ФБР повертається до справи, щоб упіймати вбивцю, якого називають Зубною феєю.",
    "cover": "assets/covers/red-dragon.webp",
    "category": "thriller"
  },
  {
    "id": "book-160",
    "title": "Дівчина, яка гралася з вогнем",
    "author": "Стіг Ларссон",
    "pages": 656,
    "genre": "Детектив",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Минуле хакерки",
      "Розслідування",
      "Помста"
    ],
    "description": "Лісбет Саландер опиняється серед підозрюваних у подвійному вбивстві.",
    "cover": "assets/covers/girl-who-played-with-fire.webp",
    "category": "thriller"
  },
  {
    "id": "book-161",
    "title": "Темні місця",
    "author": "Гіліан Флінн",
    "pages": 400,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Родинна трагедія",
      "Хибний вирок",
      "Розслідування"
    ],
    "description": "Дівчина, яка вижила в родинній трагедії, через 25 років повертається до подій тієї ночі.",
    "cover": "assets/covers/dark-places.webp",
    "category": "thriller"
  },
  {
    "id": "book-162",
    "title": "Гострі предмети",
    "author": "Гіліан Флінн",
    "pages": 288,
    "genre": "Психологічний трилер",
    "moods": [
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Рідне містечко",
      "Родинні рани",
      "Серія вбивств"
    ],
    "description": "Журналістка повертається в рідне місто розслідувати вбивства дівчаток і зустрічається з власним минулим.",
    "cover": "assets/covers/sharp-objects.webp",
    "category": "thriller"
  },
  {
    "id": "book-163",
    "title": "Той, що біжить лабіринтом",
    "author": "Джеймс Дашнер",
    "pages": 400,
    "genre": "Антиутопія",
    "moods": [
      "drive",
      "dark"
    ],
    "vibe": "dystopian",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Лабіринт",
      "Втрата пам'яті",
      "Підлітки в пастці"
    ],
    "description": "Підліток прокидається в центрі лабіринту без пам'яті й разом з іншими шукає вихід.",
    "cover": "assets/covers/maze-runner.webp",
    "category": "scifi"
  },
  {
    "id": "book-164",
    "title": "Салемс-Лот",
    "author": "Стівен Кінг",
    "pages": 592,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 9,
    "pace": "slow",
    "tropes": [
      "Вампіри в містечку",
      "Повернення додому",
      "Маленьке місто"
    ],
    "description": "Письменник повертається в рідне містечко, де оселилося зло.",
    "cover": "assets/covers/salems-lot.webp",
    "category": "horror"
  },
  {
    "id": "book-165",
    "title": "Буря мечів",
    "author": "Джордж Р. Р. Мартін",
    "pages": 1008,
    "genre": "Епічне фентезі",
    "moods": [
      "dark",
      "drive"
    ],
    "vibe": "epic",
    "tension": 10,
    "pace": "medium",
    "tropes": [
      "Несподівані смерті",
      "Війна",
      "Зради"
    ],
    "description": "Війна п'яти королів набирає обертів, а зради шокують навіть бувалих читачів.",
    "cover": "assets/covers/storm-of-swords.webp",
    "category": "fantasy"
  },
  {
    "id": "book-166",
    "title": "Мізері",
    "author": "Стівен Кінг",
    "pages": 368,
    "genre": "Психологічний трилер",
    "moods": [
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 10,
    "pace": "fast",
    "tropes": [
      "Полон",
      "Письменник у пастці",
      "Ізоляція"
    ],
    "description": "Письменник після аварії опиняється в полоні в «найвідданішої шанувальниці».",
    "cover": "assets/covers/misery.webp",
    "category": "thriller"
  },
  {
    "id": "book-167",
    "title": "Таємниця служниці",
    "author": "Фріда Мак-Фадден",
    "pages": 336,
    "genre": "Психологічний саспенс",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 10,
    "pace": "fast",
    "tropes": [
      "Секрети",
      "Несподіваний фінал",
      "Замкнений простір"
    ],
    "description": "Служниця потрапляє в новий дім, де всі приховують небезпечну таємницю.",
    "cover": "assets/covers/housemaids-secret.webp",
    "category": "thriller"
  },
  {
    "id": "book-168",
    "title": "Кладовище домашніх тварин",
    "author": "Стівен Кінг",
    "pages": 432,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 10,
    "pace": "medium",
    "tropes": [
      "Горе й втрата",
      "Прокляте місце",
      "Воскресіння"
    ],
    "description": "Лікар переїздить із родиною до нового дому біля старого кладовища, яке вміє повертати мертвих.",
    "cover": "assets/covers/pet-sematary.webp",
    "category": "horror"
  },
  {
    "id": "book-169",
    "title": "Екзорцист",
    "author": "Вільям Пітер Блетті",
    "pages": 384,
    "genre": "Горор",
    "moods": [
      "dark"
    ],
    "vibe": "gothic",
    "tension": 10,
    "pace": "medium",
    "tropes": [
      "Одержимість",
      "Віра й сумніви",
      "Священик"
    ],
    "description": "Мати шукає порятунок для дочки, одержимої демоном, і звертається по допомогу до священика.",
    "cover": "assets/covers/the-exorcist.webp",
    "category": "horror"
  },
  {
    "id": "book-170",
    "title": "Дорога",
    "author": "Кормак Маккарті",
    "pages": 256,
    "genre": "Постапокаліпсис",
    "moods": [
      "dark",
      "emotional"
    ],
    "vibe": "dystopian",
    "tension": 10,
    "pace": "slow",
    "tropes": [
      "Батько й син",
      "Виживання",
      "Світ після катастрофи"
    ],
    "description": "Батько з сином бредуть крізь випалену Америку, тримаючись лише одне за одного.",
    "cover": "assets/covers/the-road.webp",
    "category": "scifi"
  },
  {
    "id": "book-171",
    "title": "Сліпота",
    "author": "Жозе Сарамаґо",
    "pages": 352,
    "genre": "Антиутопія",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 10,
    "pace": "medium",
    "tropes": [
      "Епідемія сліпоти",
      "Карантин",
      "Моральний занепад"
    ],
    "description": "Раптова епідемія сліпоти руйнує суспільний лад і оголює людську жорстокість.",
    "cover": "assets/covers/blindness.webp",
    "category": "scifi"
  },
  {
    "id": "book-172",
    "title": "Четверте крило",
    "author": "Ребекка Яррос",
    "pages": 560,
    "genre": "Романтичне фентезі",
    "moods": [
      "adventurous",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Школа драконоїдів",
      "Від ворогів до закоханих",
      "Смертельні випробування"
    ],
    "description": "Вайолет мріяла про життя серед книжок, але мусить вступити до академії вершників драконів, де виживають не всі.",
    "cover": "assets/covers/fourth-wing.webp",
    "category": "fantasy"
  },
  {
    "id": "book-173",
    "title": "Двір шипів і троянд",
    "author": "Сара Дж. Маас",
    "pages": 432,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Красуня і чудовисько",
      "Світ фей",
      "Прокляття"
    ],
    "description": "Мисливиця Фейра вбиває вовка в лісі й опиняється в полоні в загадковому світі фей.",
    "cover": "assets/covers/court-of-thorns-and-roses.webp",
    "category": "fantasy"
  },
  {
    "id": "book-174",
    "title": "Пріорат Помаранчевого дерева",
    "author": "Саманта Шеннон",
    "pages": 848,
    "genre": "Епічне фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Дракони",
      "Королеви-воїтельки",
      "Давнє пророцтво"
    ],
    "description": "Світ готується до пробудження дракона, а королева, маг і вершниця опиняються по різні боки війни.",
    "cover": "assets/covers/priory-of-the-orange-tree.webp",
    "category": "fantasy"
  },
  {
    "id": "book-175",
    "title": "Вавилон",
    "author": "Ребекка Куанг",
    "pages": 544,
    "genre": "Темне академічне фентезі",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dark-academia",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Магія слів",
      "Критика колоніалізму",
      "Елітний університет"
    ],
    "description": "Робін Світвотер вчиться в Оксфорді мистецтву перекладу, на якому тримається імперія, і мусить обрати сторону.",
    "cover": "assets/covers/babel.webp",
    "category": "fantasy"
  },
  {
    "id": "book-176",
    "title": "Макова війна",
    "author": "Ребекка Куанг",
    "pages": 544,
    "genre": "Темне фентезі",
    "moods": [
      "dark",
      "drive"
    ],
    "vibe": "epic",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Військова академія",
      "Шаманізм",
      "Ціна влади"
    ],
    "description": "Сирота Рін потрапляє до елітної військової академії й відкриває в собі небезпечну силу.",
    "cover": "assets/covers/the-poppy-war.webp",
    "category": "fantasy"
  },
  {
    "id": "book-177",
    "title": "Піранезі",
    "author": "Сюзанна Кларк",
    "pages": 272,
    "genre": "Містичне фентезі",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Нескінченний будинок",
      "Втрата пам'яті",
      "Загадка світу"
    ],
    "description": "Піранезі живе в безмежному будинку з тисячами залів і приливами, поки не з'являються сліди чужої присутності.",
    "cover": "assets/covers/piranesi.webp",
    "category": "fantasy"
  },
  {
    "id": "book-178",
    "title": "Лезо",
    "author": "Джо Аберкромбі",
    "pages": 544,
    "genre": "Темне фентезі",
    "moods": [
      "dark",
      "funny"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Антигерої",
      "Чорний гумор",
      "Брудна війна"
    ],
    "description": "Варвар, катувальник і марнославний офіцер опиняються втягнутими у війну, якої не вибирали.",
    "cover": "assets/covers/the-blade-itself.webp",
    "category": "fantasy"
  },
  {
    "id": "book-179",
    "title": "Народжений туманом: Остання імперія",
    "author": "Брендон Сандерсон",
    "pages": 672,
    "genre": "Епічне фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Пограбування",
      "Система магії",
      "Повстання проти тирана"
    ],
    "description": "Злодійка Вен і Келсір задумують повалити безсмертного імператора, що тримає світ у попелі.",
    "cover": "assets/covers/mistborn.webp",
    "category": "fantasy"
  },
  {
    "id": "book-180",
    "title": "Брехня Локка Ламори",
    "author": "Скотт Лінч",
    "pages": 720,
    "genre": "Фентезі-пригода",
    "moods": [
      "funny",
      "adventurous"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Майстри афер",
      "Місто-лабіринт",
      "Банда злодіїв"
    ],
    "description": "Хитрий шахрай Локк Ламора і його банда обкрадають знать, аж поки не зустрічають небезпечнішого за себе.",
    "cover": "assets/covers/lies-of-locke-lamora.webp",
    "category": "fantasy"
  },
  {
    "id": "book-181",
    "title": "Невидиме життя Едді Ларю",
    "author": "В. Е. Шваб",
    "pages": 480,
    "genre": "Історичне фентезі",
    "moods": [
      "melancholic",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "slow",
    "tropes": [
      "Угода з темрявою",
      "Безсмертя",
      "Забуття"
    ],
    "description": "Едді укладає угоду, за якою всі її забувають, і триста років живе без сліду, доки хтось не згадує її ім'я.",
    "cover": "assets/covers/addie-larue.webp",
    "category": "fantasy"
  },
  {
    "id": "book-182",
    "title": "Десять тисяч дверей Січня",
    "author": "Алікс Е. Гарроу",
    "pages": 384,
    "genre": "Портальне фентезі",
    "moods": [
      "mysterious",
      "emotional"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Двері в інші світи",
      "Загадкова книга",
      "Дорослішання"
    ],
    "description": "Дівчинка знаходить книгу, яка розповідає про двері між світами, і розуміє, що вона сама частина цієї історії.",
    "cover": "assets/covers/ten-thousand-doors-of-january.webp",
    "category": "fantasy"
  },
  {
    "id": "book-183",
    "title": "З корінням",
    "author": "Наомі Новік",
    "pages": 448,
    "genre": "Казкове фентезі",
    "moods": [
      "mysterious",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Слов'янський фольклор",
      "Чарівник і учениця",
      "Зловісний ліс"
    ],
    "description": "Агнешка живе біля лісу, що поглинає людей, і щодесять років Дракон забирає до своєї вежі одну дівчину.",
    "cover": "assets/covers/uprooted.webp",
    "category": "fantasy"
  },
  {
    "id": "book-184",
    "title": "Срібна прядильниця",
    "author": "Наомі Новік",
    "pages": 480,
    "genre": "Казкове фентезі",
    "moods": [
      "adventurous",
      "mysterious"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Перетворення срібла в золото",
      "Крижані королі",
      "Сильні героїні"
    ],
    "description": "Міріем береться прясти срібло в золото, і її вміння привертає увагу крижаного володаря.",
    "cover": "assets/covers/spinning-silver.webp",
    "category": "fantasy"
  },
  {
    "id": "book-185",
    "title": "П'ятий сезон",
    "author": "Н. К. Джемісін",
    "pages": 512,
    "genre": "Науково-фантастичне фентезі",
    "moods": [
      "dark",
      "intellectual"
    ],
    "vibe": "dystopian",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Кінець світу",
      "Сила землі",
      "Материнство"
    ],
    "description": "У світі, що регулярно руйнують катаклізми, жінка шукає дочку, а в її минулому прихована ключова таємниця.",
    "cover": "assets/covers/the-fifth-season.webp",
    "category": "fantasy"
  },
  {
    "id": "book-186",
    "title": "Гідеон Дев'ята",
    "author": "Тамсін Мюїр",
    "pages": 448,
    "genre": "Космічне темне фентезі",
    "moods": [
      "dark",
      "funny"
    ],
    "vibe": "gothic",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Некроманти",
      "Загадковий палац",
      "Дует-суперниці"
    ],
    "description": "Фехтувальниця Гідеон і некромантка Харроу їдуть до вмираючого палацу, де змагання за безсмертя стає смертельним.",
    "cover": "assets/covers/gideon-the-ninth.webp",
    "category": "fantasy"
  },
  {
    "id": "book-187",
    "title": "Легенди та лате",
    "author": "Тревіс Балдрі",
    "pages": 304,
    "genre": "Затишне фентезі",
    "moods": [
      "cozy",
      "uplifting"
    ],
    "vibe": "cozy",
    "tension": 1,
    "pace": "slow",
    "tropes": [
      "Кав'ярня",
      "Відставний воїн",
      "Знайдена родина"
    ],
    "description": "Орчиха-воїтелька кидає мечі й відкриває першу в місті кав'ярню.",
    "cover": "assets/covers/legends-and-lattes.webp",
    "category": "fantasy"
  },
  {
    "id": "book-188",
    "title": "Атлас: шестеро",
    "author": "Олівія Блейк",
    "pages": 416,
    "genre": "Темне академічне фентезі",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "dark-academia",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Таємне товариство",
      "Шестеро обраних",
      "Бібліотека Александрії"
    ],
    "description": "Шестеро наймогутніших чарівників світу отримують право вступити до таємної Александрійської бібліотеки, але лише п'ятеро залишаться живими.",
    "cover": "assets/covers/the-atlas-six.webp",
    "category": "fantasy"
  },
  {
    "id": "book-189",
    "title": "Жорстокий принц",
    "author": "Голлі Блек",
    "pages": 384,
    "genre": "Young adult фентезі",
    "moods": [
      "dark",
      "romantic"
    ],
    "vibe": "magical",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Інтриги фей",
      "Від ворогів до закоханих",
      "Смертна у світі фей"
    ],
    "description": "Дівчина-смертна живе при дворі фей і вирішує здобути там місце будь-якою ціною.",
    "cover": "assets/covers/the-cruel-prince.webp",
    "category": "fantasy"
  },
  {
    "id": "book-190",
    "title": "Океан в кінці дороги",
    "author": "Ніл Гейман",
    "pages": 192,
    "genre": "Міське фентезі",
    "moods": [
      "mysterious",
      "melancholic"
    ],
    "vibe": "magical",
    "tension": 5,
    "pace": "medium",
    "tropes": [
      "Спогади дитинства",
      "Давнє зло",
      "Сусідська ферма"
    ],
    "description": "Дорослий чоловік повертається до дитячого дому й згадує дивовижну й страшну історію однієї осені.",
    "cover": "assets/covers/ocean-at-the-end-of-the-lane.webp",
    "category": "fantasy"
  },
  {
    "id": "book-191",
    "title": "Скляний трон",
    "author": "Сара Дж. Маас",
    "pages": 432,
    "genre": "Young adult фентезі",
    "moods": [
      "adventurous",
      "drive"
    ],
    "vibe": "epic",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Турнір",
      "Вбивця-героїня",
      "Королівський палац"
    ],
    "description": "Найкраща юна вбивця королівства змагається за звання чемпіона короля й за власну свободу.",
    "cover": "assets/covers/throne-of-glass.webp",
    "category": "fantasy"
  },
  {
    "id": "book-192",
    "title": "Веріті",
    "author": "Колін Гувер",
    "pages": 336,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Таємна рукопис",
      "Ненадійний оповідач",
      "Шокуючий фінал"
    ],
    "description": "Письменниця знаходить в будинку відомої авторки автобіографію, яка змінює уявлення про всю родину.",
    "cover": "assets/covers/verity.webp",
    "category": "thriller"
  },
  {
    "id": "book-193",
    "title": "Жінка у вікні",
    "author": "А. Дж. Фінн",
    "pages": 448,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Агорафобія",
      "Ненадійний оповідач",
      "Свідок злочину"
    ],
    "description": "Агорафобка спостерігає за сусідами й стає свідком вбивства, у яке ніхто не вірить.",
    "cover": "assets/covers/woman-in-the-window.webp",
    "category": "thriller"
  },
  {
    "id": "book-194",
    "title": "За зачиненими дверима",
    "author": "Б. А. Періс",
    "pages": 336,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Ідеальний шлюб",
      "Домашній полон",
      "Тиран"
    ],
    "description": "Ідеальна пара з обкладинки глянцю приховує жахливу таємницю за зачиненими дверима.",
    "cover": "assets/covers/behind-closed-doors.webp",
    "category": "thriller"
  },
  {
    "id": "book-195",
    "title": "Список гостей",
    "author": "Люсі Фолі",
    "pages": 384,
    "genre": "Детектив",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Весілля на острові",
      "Кілька оповідачів",
      "Замкнений простір"
    ],
    "description": "На ірландському острові під час розкішного весілля одного з гостей знаходять мертвим.",
    "cover": "assets/covers/the-guest-list.webp",
    "category": "thriller"
  },
  {
    "id": "book-196",
    "title": "Останнє, що він мені сказав",
    "author": "Лора Дейв",
    "pages": 320,
    "genre": "Психологічний трилер",
    "moods": [
      "mysterious",
      "emotional"
    ],
    "vibe": "intense-thriller",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Зникнення чоловіка",
      "Мачуха і падчерка",
      "Записка"
    ],
    "description": "Чоловік зникає, залишивши записку: «Захисти її». Хановер мусить зрозуміти, хто її чоловік насправді.",
    "cover": "assets/covers/last-thing-he-told-me.webp",
    "category": "thriller"
  },
  {
    "id": "book-197",
    "title": "Велика маленька брехня",
    "author": "Ліан Мор'яті",
    "pages": 512,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "funny"
    ],
    "vibe": "intense-thriller",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Мами з передмістя",
      "Плітки",
      "Таємниці"
    ],
    "description": "Три жінки з тихого містечка ховають секрети, які виявляються смертельними на шкільному вечорі.",
    "cover": "assets/covers/big-little-lies.webp",
    "category": "thriller"
  },
  {
    "id": "book-198",
    "title": "Діви",
    "author": "Алекс Майклідіс",
    "pages": 400,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "dark-academia",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Кембридж",
      "Грецька міфологія",
      "Серія вбивств"
    ],
    "description": "Психотерапевтка розслідує вбивства в Кембриджі й підозрює харизматичного професора античності.",
    "cover": "assets/covers/the-maidens.webp",
    "category": "thriller"
  },
  {
    "id": "book-199",
    "title": "Вбивства сорок",
    "author": "Ентоні Горовіц",
    "pages": 496,
    "genre": "Детектив",
    "moods": [
      "mysterious",
      "intellectual"
    ],
    "vibe": "cozy",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Детектив у детективі",
      "Рукопис",
      "Класична загадка"
    ],
    "description": "Редакторка читає рукопис нового роману про вбивство й помічає, що розв'язка пропала, а автор мертвий.",
    "cover": "assets/covers/magpie-murders.webp",
    "category": "thriller"
  },
  {
    "id": "book-200",
    "title": "У лісі",
    "author": "Тана Френч",
    "pages": 464,
    "genre": "Детектив",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "slow",
    "tropes": [
      "Дублінський відділ убивств",
      "Давнє зникнення",
      "Поліцейські-напарники"
    ],
    "description": "Детектив, що в дитинстві пережив зникнення друзів у лісі, береться за нову справу про вбивство дівчинки.",
    "cover": "assets/covers/in-the-woods.webp",
    "category": "thriller"
  },
  {
    "id": "book-201",
    "title": "Родина нагорі",
    "author": "Ліза Джуелл",
    "pages": 464,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Спадщина",
      "Секти і родинні таємниці",
      "Лондонський будинок"
    ],
    "description": "Дівчина отримує у спадок розкішний будинок і дізнається про свою родину страшну правду.",
    "cover": "assets/covers/the-family-upstairs.webp",
    "category": "thriller"
  },
  {
    "id": "book-202",
    "title": "Жінка в каюті 10",
    "author": "Рут Веа",
    "pages": 384,
    "genre": "Детектив",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Круїз",
      "Замкнений простір",
      "Ненадійна свідка"
    ],
    "description": "Журналістка на розкішному лайнері чує, як у сусідній каюті щось падає у воду, а каюта виявляється порожньою.",
    "cover": "assets/covers/woman-in-cabin-10.webp",
    "category": "thriller"
  },
  {
    "id": "book-203",
    "title": "В'язень",
    "author": "Фріда Мак-Фадден",
    "pages": 352,
    "genre": "Психологічний саспенс",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Тюремна лікарка",
      "Небезпечна близькість",
      "Несподіваний фінал"
    ],
    "description": "Лікарка в'язниці дізнається небезпечну таємницю одного з ув'язнених.",
    "cover": "assets/covers/the-inmate.webp",
    "category": "thriller"
  },
  {
    "id": "book-204",
    "title": "Посібник зі вбивств для хорошої дівчинки",
    "author": "Голлі Джексон",
    "pages": 416,
    "genre": "Young adult детектив",
    "moods": [
      "mysterious",
      "drive"
    ],
    "vibe": "cozy",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Школярка-детектив",
      "Стара справа",
      "Місцеві таємниці"
    ],
    "description": "Школярка розслідує старе вбивство, у якому нібито давно знайшли винного.",
    "cover": "assets/covers/good-girls-guide-to-murder.webp",
    "category": "thriller"
  },
  {
    "id": "book-205",
    "title": "Перш ніж я засну",
    "author": "С. Дж. Вотсон",
    "pages": 384,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Амнезія",
      "Щоденник",
      "Ненадійний світ"
    ],
    "description": "Щоранку Крістін прокидається без спогадів і довіряє лише щоденнику, який веде таємно.",
    "cover": "assets/covers/before-i-go-to-sleep.webp",
    "category": "thriller"
  },
  {
    "id": "book-206",
    "title": "Один із нас бреше",
    "author": "Карен Макменус",
    "pages": 368,
    "genre": "Young adult детектив",
    "moods": [
      "mysterious",
      "drive"
    ],
    "vibe": "intense-thriller",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Покарання в школі",
      "Чотири підозрювані",
      "Таємниці"
    ],
    "description": "Четверо учнів на покаранні стають підозрюваними у смерті однокласника.",
    "cover": "assets/covers/one-of-us-is-lying.webp",
    "category": "thriller"
  },
  {
    "id": "book-207",
    "title": "Дружина між нами",
    "author": "Ґрір Гендрікс, Сара Пеканен",
    "pages": 384,
    "genre": "Психологічний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Колишня дружина",
      "Ненадійні оповідачі",
      "Шокуючі повороти"
    ],
    "description": "Колишня дружина стежить за нареченою свого чоловіка, але все не так, як здається.",
    "cover": "assets/covers/the-wife-between-us.webp",
    "category": "thriller"
  },
  {
    "id": "book-208",
    "title": "Кров і попіл",
    "author": "Дженніфер Л. Арментраут",
    "pages": 624,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Заборонене кохання",
      "Від ворогів до закоханих",
      "Таємниці минулого"
    ],
    "description": "Героїня, яку з дитинства готують до священного призначення, живе під пильною охороною. Зустріч із загадковим охоронцем змушує її сумніватися в усьому, що їй розповідали. Початок популярного циклу для дорослих читачів (18+).",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-209",
    "title": "Королівство плоті й вогню",
    "author": "Дженніфер Л. Арментраут",
    "pages": 688,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "dark"
    ],
    "vibe": "magical",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Заборонене кохання",
      "Політичні інтриги",
      "Таємниці минулого"
    ],
    "description": "Друга книга циклу «Кров і попіл». Героїня опиняється серед колишніх ворогів і дізнається, що правда про світ зовсім інша. Для дорослих читачів (18+).",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-210",
    "title": "Тінь у жариві",
    "author": "Дженніфер Л. Арментраут",
    "pages": 688,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "dark"
    ],
    "vibe": "magical",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Обраний герой",
      "Заборонене кохання",
      "Прокляття"
    ],
    "description": "Перша книга приквельної серії «Плоть і вогонь»: події за тисячоліття до «Крові й попелу». Героїню обрали ще до народження, щоб виконати відчайдушну угоду її предків. Для дорослих читачів (18+).",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-211",
    "title": "Війна двох королев",
    "author": "Дженніфер Л. Арментраут",
    "pages": 752,
    "genre": "Романтичне фентезі",
    "moods": [
      "adventurous",
      "romantic"
    ],
    "vibe": "epic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Війна",
      "Політичні інтриги",
      "Кохання на відстані"
    ],
    "description": "Четверта книга циклу «Кров і попіл». Героїня готова на все, щоб врятувати коханого, але спершу має переконати військову еліту воювати за її правилами. Для дорослих читачів (18+).",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-212",
    "title": "Хірург",
    "author": "Тесс Ґеррітсен",
    "pages": 352,
    "genre": "Медичний трилер",
    "moods": [
      "dark",
      "mysterious",
      "drive"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "fast",
    "tropes": [
      "Серійний вбивця",
      "Детективний дует",
      "Розслідування"
    ],
    "description": "У Бостоні з’являється вбивця з холоднокровною хірургічною точністю. Детективка Джейн Ріццолі й судмедекспертка Мора Айлз беруться за справу, що нагадує давнє, нібито закрите. Перша книга серії «Ріццолі та Айлз».",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-213",
    "title": "Грішна",
    "author": "Тесс Ґеррітсен",
    "pages": 336,
    "genre": "Детективний трилер",
    "moods": [
      "mysterious",
      "dark"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Детективний дует",
      "Заплутана справа",
      "Таємниці минулого"
    ],
    "description": "Третя книга серії «Ріццолі та Айлз». Вбивство шокує Бостон, а ниточки до розгадки ведуть далеко за межі міста. Заплутана справа з фіналом, який перевертає всі припущення.",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-214",
    "title": "Я знаю секрет",
    "author": "Тесс Ґеррітсен",
    "pages": 336,
    "genre": "Детективний трилер",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "intense-thriller",
    "tension": 8,
    "pace": "fast",
    "tropes": [
      "Серійний вбивця",
      "Детективний дует",
      "Світ кіно"
    ],
    "description": "Дванадцята книга серії «Ріццолі та Айлз». Загибель режисерки фільмів жахів виглядає як почерк жорстокого вбивці, і детективи намагаються вгадати, хто стане наступною жертвою.",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-215",
    "title": "Хімія смерті",
    "author": "Саймон Бекетт",
    "pages": 384,
    "genre": "Психологічний детектив",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Втрата",
      "Містечко з таємницями",
      "Судова антропологія"
    ],
    "description": "Судовий антрополог Девід Гантер ховається від болісного минулого в тихому англійському містечку. Але коли поряд зникає людина, він не може залишитися осторонь. Перша книга серії про Девіда Гантера.",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-216",
    "title": "Шепіт мертвих",
    "author": "Саймон Бекетт",
    "pages": 384,
    "genre": "Психологічний детектив",
    "moods": [
      "dark",
      "mysterious",
      "drive"
    ],
    "vibe": "intense-thriller",
    "tension": 9,
    "pace": "medium",
    "tropes": [
      "Серійний вбивця",
      "Судова антропологія",
      "Ідеальний злочин"
    ],
    "description": "Третя книга серії про Девіда Гантера. Антрополог повертається до «трупної ферми» в США, де має допомогти розслідувати злочин, після якого не лишилося жодних слідів.",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-217",
    "title": "Запах смерті",
    "author": "Саймон Бекетт",
    "pages": 448,
    "genre": "Психологічний детектив",
    "moods": [
      "dark",
      "mysterious"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Судова антропологія",
      "Таємниці минулого",
      "Втрата"
    ],
    "description": "Шоста книга серії про Девіда Гантера: нова справа торкається не лише професії героя, а й його особистої історії та старих ран.",
    "cover": "",
    "category": "thriller"
  },
  {
    "id": "book-218",
    "title": "Корона брехні",
    "author": "Ебіґейл Овен",
    "pages": 544,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "medium",
    "tropes": [
      "Підміна особи",
      "Від ворогів до закоханих",
      "Політичні інтриги"
    ],
    "description": "Століттями Аридом правлять королеви з магічним даром, а їм загрожує викрадення злим безсмертним королем сусіднього краю. Але таємничий викрадач, що з’являється першим, помиляється: забирає не ту, кого планував. Перша книга серії «Домініони».",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-219",
    "title": "Лайтларк",
    "author": "Алекс Астер",
    "pages": 400,
    "genre": "Романтичне фентезі",
    "moods": [
      "dark",
      "romantic",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Прокляття",
      "Випробування",
      "Любовний трикутник"
    ],
    "description": "Острів Лайтларк виринає з туману лише раз на століття. Правителі шести земель мають пройти смертельні випробування, а героїня приховує власні плани. Популярна новинка BookTok для дорослих читачів (18+).",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-220",
    "title": "Викрадач поцілунку",
    "author": "Л. Дж. Шен",
    "pages": 376,
    "genre": "Темний романс",
    "moods": [
      "dark",
      "romantic"
    ],
    "vibe": "romantic",
    "tension": 7,
    "pace": "fast",
    "tropes": [
      "Заборонене кохання",
      "Любовний трикутник",
      "Мафія"
    ],
    "description": "Поцілунок під масками й зірване весілля: героїня опиняється між двома суперниками, що ладні боротися за неї до кінця. Темний романс для дорослих читачів (18+).",
    "cover": "",
    "category": "novel"
  },
  {
    "id": "book-221",
    "title": "Готикана",
    "author": "RuNyx",
    "pages": 384,
    "genre": "Готичний романс",
    "moods": [
      "dark",
      "romantic",
      "mysterious"
    ],
    "vibe": "dark-academia",
    "tension": 7,
    "pace": "medium",
    "tropes": [
      "Заборонене кохання",
      "Таємниці минулого",
      "Замкнений простір"
    ],
    "description": "Після втрати матері Корвіна потрапляє до старовинного університету в замку на вершині гори, де кожен камінь приховує таємницю. Найбільша загадка — суворий професор. Для дорослих читачів (18+).",
    "cover": "",
    "category": "novel"
  },
  {
    "id": "book-222",
    "title": "Проблема раю",
    "author": "Крістіна Лорен",
    "pages": 352,
    "genre": "Романтична комедія",
    "moods": [
      "funny",
      "romantic",
      "cozy"
    ],
    "vibe": "romantic",
    "tension": 2,
    "pace": "fast",
    "tropes": [
      "Дотепні діалоги",
      "Другий шанс",
      "Гумор"
    ],
    "description": "Тепла й дотепна романтична комедія від авторського дуету Крістіни Лорен про стосунки, що складаються зовсім не за планом.",
    "cover": "",
    "category": "novel"
  },
  {
    "id": "book-223",
    "title": "Змія й крила ночі",
    "author": "Карісса Бродбент",
    "pages": 608,
    "genre": "Темне фентезі",
    "moods": [
      "dark",
      "romantic",
      "adventurous"
    ],
    "vibe": "gothic",
    "tension": 8,
    "pace": "medium",
    "tropes": [
      "Турнір",
      "Від ворогів до закоханих",
      "Вампіри"
    ],
    "description": "Орея — людське дитя, прийомна дочка короля вампірів. Її єдиний шанс не стати здобиччю — легендарний турнір Кеджарі, де доведеться укласти союз із небезпечним суперником. Перша книга «Корони Ніаксії».",
    "cover": "",
    "category": "fantasy"
  },
  {
    "id": "book-224",
    "title": "Тіні між нами",
    "author": "Тріша Левенселлер",
    "pages": 376,
    "genre": "Романтичне фентезі",
    "moods": [
      "romantic",
      "dark",
      "adventurous"
    ],
    "vibe": "magical",
    "tension": 6,
    "pace": "fast",
    "tropes": [
      "Політичні інтриги",
      "Від ворогів до закоханих",
      "Помста"
    ],
    "description": "Алессандра втомилася залишатися непоміченою й складає хитрий план: звабити Короля Тіней, вийти за нього заміж і посісти трон. Та вона не єдина, хто бажає йому смерті. Перша книга дилогії.",
    "cover": "",
    "category": "fantasy"
  }
];

window.books = books;
