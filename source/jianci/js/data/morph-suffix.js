/* 简词 · 词根词缀库（后缀） */
(function () {
  var ENTRIES = [
    {
      id: "s-able",
      kind: "suffix",
      text: "-able",
      forms: ["able"],
      meaning: "形容词后缀：能…的",
      note: "动词加 able 变形容词",
      examples: ["readable", "comfortable", "washable"]
    },
    {
      id: "s-ible",
      kind: "suffix",
      text: "-ible",
      forms: ["ible"],
      meaning: "形容词后缀：可…的",
      note: "多接拉丁词根，如 visible",
      examples: ["visible", "possible", "flexible"]
    },
    {
      id: "s-ability",
      kind: "suffix",
      text: "-ability",
      forms: ["ability"],
      meaning: "名词后缀：…的能力",
      note: "由 able 转化，如 ability",
      examples: ["disability", "capability", "stability"]
    },
    {
      id: "s-ibility",
      kind: "suffix",
      text: "-ibility",
      forms: ["ibility"],
      meaning: "名词后缀：…的可能性",
      note: "由 ible 转化，如 possibility",
      examples: ["possibility", "flexibility", "responsibility"]
    },
    {
      id: "s-acy",
      kind: "suffix",
      text: "-acy",
      forms: ["acy"],
      meaning: "名词后缀：性质或状态",
      note: "形容词变名词，如 accuracy",
      examples: ["accuracy", "privacy", "democracy"]
    },
    {
      id: "s-age",
      kind: "suffix",
      text: "-age",
      forms: ["age"],
      meaning: "名词后缀：行为或结果",
      note: "动词变名词，如 package",
      examples: ["package", "marriage", "breakage"]
    },
    {
      id: "s-al",
      kind: "suffix",
      text: "-al",
      forms: ["al"],
      meaning: "形容词后缀：…的",
      note: "名词变形容词，如 natural",
      examples: ["natural", "personal", "global"]
    },
    {
      id: "s-ance",
      kind: "suffix",
      text: "-ance",
      forms: ["ance"],
      meaning: "名词后缀：状态或行为",
      note: "常与 ant 对应，如 importance",
      examples: ["importance", "distance", "performance"]
    },
    {
      id: "s-ence",
      kind: "suffix",
      text: "-ence",
      forms: ["ence"],
      meaning: "名词后缀：状态或性质",
      note: "常与 ent 对应，如 difference",
      examples: ["difference", "silence", "confidence"]
    },
    {
      id: "s-ancy",
      kind: "suffix",
      text: "-ancy",
      forms: ["ancy"],
      meaning: "名词后缀：性质或状态",
      note: "形容词变名词，如 vacancy",
      examples: ["vacancy", "infancy", "pregnancy"]
    },
    {
      id: "s-ency",
      kind: "suffix",
      text: "-ency",
      forms: ["ency"],
      meaning: "名词后缀：性质或状态",
      note: "形容词变名词，如 frequency",
      examples: ["frequency", "efficiency", "emergency"]
    },
    {
      id: "s-ant",
      kind: "suffix",
      text: "-ant",
      forms: ["ant"],
      meaning: "名词或形容词后缀",
      note: "表人或物，如 servant",
      examples: ["servant", "important", "assistant"]
    },
    {
      id: "s-ent",
      kind: "suffix",
      text: "-ent",
      forms: ["ent"],
      meaning: "形容词后缀：…性质的",
      note: "表具有某性质，如 different",
      examples: ["different", "patient", "silent"]
    },
    {
      id: "s-ar",
      kind: "suffix",
      text: "-ar",
      forms: ["ar"],
      meaning: "形容词后缀：…的",
      note: "也可表人，如 beggar",
      examples: ["similar", "popular", "beggar"]
    },
    {
      id: "s-ary",
      kind: "suffix",
      text: "-ary",
      forms: ["ary"],
      meaning: "形容词或名词后缀",
      note: "与…有关，如 library",
      examples: ["library", "military", "necessary"]
    },
    {
      id: "s-ate",
      kind: "suffix",
      text: "-ate",
      forms: ["ate"],
      meaning: "动词或形容词后缀",
      note: "表使…或具有…的，如 activate",
      examples: ["activate", "fortunate", "graduate"]
    },
    {
      id: "s-ation",
      kind: "suffix",
      text: "-ation / -tion / -sion",
      forms: ["ation", "tion", "sion", "ion"],
      meaning: "名词后缀：动作或状态",
      note: "动词变名词，如 creation",
      examples: ["education", "creation", "decision"]
    },
    {
      id: "s-cy",
      kind: "suffix",
      text: "-cy",
      forms: ["cy"],
      meaning: "名词后缀：性质或状态",
      note: "形容词变名词，如 fluency",
      examples: ["accuracy", "agency", "fluency"]
    },
    {
      id: "s-dom",
      kind: "suffix",
      text: "-dom",
      forms: ["dom"],
      meaning: "名词后缀：状态或领域",
      note: "如 freedom、kingdom",
      examples: ["freedom", "kingdom", "wisdom"]
    },
    {
      id: "s-ee",
      kind: "suffix",
      text: "-ee",
      forms: ["ee"],
      meaning: "名词后缀：受动者",
      note: "表被…的人，如 employee",
      examples: ["employee", "trainee", "interviewee"]
    },
    {
      id: "s-eer",
      kind: "suffix",
      text: "-eer",
      forms: ["eer"],
      meaning: "名词后缀：从事…的人",
      note: "如 engineer、volunteer",
      examples: ["engineer", "volunteer", "pioneer"]
    },
    {
      id: "s-en",
      kind: "suffix",
      text: "-en",
      forms: ["en"],
      meaning: "动词或形容词后缀",
      note: "使…或由…制成，如 wooden",
      examples: ["strengthen", "widen", "wooden"]
    },
    {
      id: "s-er",
      kind: "suffix",
      text: "-er",
      forms: ["er"],
      meaning: "名词后缀：…的人或物",
      note: "动词加 er，如 teacher",
      examples: ["teacher", "worker", "computer"]
    },
    {
      id: "s-or",
      kind: "suffix",
      text: "-or",
      forms: ["or"],
      meaning: "名词后缀：…的人或物",
      note: "如 actor、doctor",
      examples: ["actor", "doctor", "tractor"]
    },
    {
      id: "s-ery",
      kind: "suffix",
      text: "-ery",
      forms: ["ery"],
      meaning: "名词后缀：行为或场所",
      note: "如 bakery、bravery",
      examples: ["bakery", "slavery", "bravery"]
    },
    {
      id: "s-ese",
      kind: "suffix",
      text: "-ese",
      forms: ["ese"],
      meaning: "名词后缀：…国人或语",
      note: "表国家的人或语言，如 Chinese",
      examples: ["Chinese", "Japanese", "Portuguese"]
    },
    {
      id: "s-esque",
      kind: "suffix",
      text: "-esque",
      forms: ["esque"],
      meaning: "形容词后缀：…风格的",
      note: "如 picturesque、statuesque",
      examples: ["picturesque", "statuesque", "grotesque"]
    },
    {
      id: "s-ful",
      kind: "suffix",
      text: "-ful",
      forms: ["ful"],
      meaning: "形容词后缀：充满…的",
      note: "名词加 ful，如 useful",
      examples: ["useful", "beautiful", "careful"]
    },
    {
      id: "s-fy",
      kind: "suffix",
      text: "-fy",
      forms: ["fy"],
      meaning: "动词后缀：使…化",
      note: "构成动词，如 satisfy",
      examples: ["simplify", "beautify", "satisfy"]
    },
    {
      id: "s-ify",
      kind: "suffix",
      text: "-ify",
      forms: ["ify"],
      meaning: "动词后缀：使成为…",
      note: "如 classify、purify",
      examples: ["classify", "identify", "purify"]
    },
    {
      id: "s-hood",
      kind: "suffix",
      text: "-hood",
      forms: ["hood"],
      meaning: "名词后缀：身份或状态",
      note: "如 childhood、brotherhood",
      examples: ["childhood", "neighborhood", "brotherhood"]
    },
    {
      id: "s-ian",
      kind: "suffix",
      text: "-ian",
      forms: ["ian"],
      meaning: "名词后缀：…的人",
      note: "如 musician、historian",
      examples: ["musician", "Canadian", "historian"]
    },
    {
      id: "s-ic",
      kind: "suffix",
      text: "-ic",
      forms: ["ic"],
      meaning: "形容词后缀：…的",
      note: "如 basic、historic",
      examples: ["basic", "historic", "electric"]
    },
    {
      id: "s-ical",
      kind: "suffix",
      text: "-ical",
      forms: ["ical"],
      meaning: "形容词后缀：…的",
      note: "如 medical、musical",
      examples: ["medical", "musical", "practical"]
    },
    {
      id: "s-ile",
      kind: "suffix",
      text: "-ile",
      forms: ["ile"],
      meaning: "形容词后缀：易…的",
      note: "如 fragile、mobile",
      examples: ["fragile", "mobile", "fertile"]
    },
    {
      id: "s-ine",
      kind: "suffix",
      text: "-ine",
      forms: ["ine"],
      meaning: "形容词或名词后缀",
      note: "如 marine、machine",
      examples: ["marine", "divine", "machine"]
    },
    {
      id: "s-ing",
      kind: "suffix",
      text: "-ing",
      forms: ["ing"],
      meaning: "名词或形容词后缀",
      note: "动词加 ing，如 running",
      examples: ["running", "interesting", "building"]
    },
    {
      id: "s-ish",
      kind: "suffix",
      text: "-ish",
      forms: ["ish"],
      meaning: "形容词后缀：略…的",
      note: "如 childish、reddish",
      examples: ["childish", "selfish", "reddish"]
    },
    {
      id: "s-ism",
      kind: "suffix",
      text: "-ism",
      forms: ["ism"],
      meaning: "名词后缀：主义或行为",
      note: "如 socialism、tourism",
      examples: ["socialism", "criticism", "tourism"]
    },
    {
      id: "s-ist",
      kind: "suffix",
      text: "-ist",
      forms: ["ist"],
      meaning: "名词后缀：…者",
      note: "如 artist、scientist",
      examples: ["artist", "scientist", "tourist"]
    },
    {
      id: "s-ite",
      kind: "suffix",
      text: "-ite",
      forms: ["ite"],
      meaning: "名词后缀：…的人或物",
      note: "如 favorite、granite",
      examples: ["favorite", "granite", "socialite"]
    },
    {
      id: "s-ity",
      kind: "suffix",
      text: "-ity",
      forms: ["ity"],
      meaning: "名词后缀：性质或状态",
      note: "如 reality、activity",
      examples: ["reality", "activity", "curiosity"]
    },
    {
      id: "s-ty",
      kind: "suffix",
      text: "-ty",
      forms: ["ty"],
      meaning: "名词后缀：性质或状态",
      note: "如 safety、loyalty",
      examples: ["beauty", "safety", "loyalty"]
    },
    {
      id: "s-ive",
      kind: "suffix",
      text: "-ive",
      forms: ["ive"],
      meaning: "形容词后缀：有…性质的",
      note: "如 active、creative",
      examples: ["active", "creative", "expensive"]
    },
    {
      id: "s-ize",
      kind: "suffix",
      text: "-ize",
      forms: ["ize"],
      meaning: "动词后缀：使…化",
      note: "如 realize、organize",
      examples: ["realize", "modernize", "organize"]
    },
    {
      id: "s-ise",
      kind: "suffix",
      text: "-ise",
      forms: ["ise"],
      meaning: "动词后缀：使…化",
      note: "英式拼写，如 realise",
      examples: ["realise", "advertise", "surprise"]
    },
    {
      id: "s-less",
      kind: "suffix",
      text: "-less",
      forms: ["less"],
      meaning: "形容词后缀：无…的",
      note: "名词加 less，如 hopeless",
      examples: ["hopeless", "careless", "endless"]
    },
    {
      id: "s-let",
      kind: "suffix",
      text: "-let",
      forms: ["let"],
      meaning: "名词后缀：小…",
      note: "如 booklet、leaflet",
      examples: ["booklet", "leaflet", "streamlet"]
    },
    {
      id: "s-like",
      kind: "suffix",
      text: "-like",
      forms: ["like"],
      meaning: "形容词后缀：像…的",
      note: "如 childlike、lifelike",
      examples: ["childlike", "lifelike", "businesslike"]
    },
    {
      id: "s-ly",
      kind: "suffix",
      text: "-ly",
      forms: ["ly"],
      meaning: "副词后缀：…地",
      note: "形容词加 ly，如 quickly",
      examples: ["quickly", "friendly", "daily"]
    },
    {
      id: "s-ment",
      kind: "suffix",
      text: "-ment",
      forms: ["ment"],
      meaning: "名词后缀：行为或结果",
      note: "动词加 ment，如 movement",
      examples: ["development", "government", "movement"]
    },
    {
      id: "s-most",
      kind: "suffix",
      text: "-most",
      forms: ["most"],
      meaning: "形容词后缀：最…的",
      note: "如 foremost、utmost",
      examples: ["foremost", "utmost", "topmost"]
    },
    {
      id: "s-ness",
      kind: "suffix",
      text: "-ness",
      forms: ["ness"],
      meaning: "名词后缀：性质或状态",
      note: "形容词加 ness，如 happiness",
      examples: ["happiness", "kindness", "darkness"]
    },
    {
      id: "s-ology",
      kind: "suffix",
      text: "-ology",
      forms: ["ology"],
      meaning: "名词后缀：…学",
      note: "如 biology、psychology",
      examples: ["biology", "geology", "psychology"]
    },
    {
      id: "s-logy",
      kind: "suffix",
      text: "-logy",
      forms: ["logy"],
      meaning: "名词后缀：…学；…论",
      note: "如 geology、technology",
      examples: ["biology", "geology", "technology"]
    },
    {
      id: "s-ous",
      kind: "suffix",
      text: "-ous",
      forms: ["ous"],
      meaning: "形容词后缀：充满…的",
      note: "名词加 ous，如 famous",
      examples: ["famous", "dangerous", "nervous"]
    },
    {
      id: "s-ious",
      kind: "suffix",
      text: "-ious",
      forms: ["ious"],
      meaning: "形容词后缀：有…性质的",
      note: "如 curious、serious",
      examples: ["curious", "serious", "previous"]
    },
    {
      id: "s-eous",
      kind: "suffix",
      text: "-eous",
      forms: ["eous"],
      meaning: "形容词后缀：有…性质的",
      note: "如 courageous、gorgeous",
      examples: ["courageous", "gorgeous", "courteous"]
    },
    {
      id: "s-ship",
      kind: "suffix",
      text: "-ship",
      forms: ["ship"],
      meaning: "名词后缀：状态或关系",
      note: "如 friendship、leadership",
      examples: ["friendship", "leadership", "hardship"]
    },
    {
      id: "s-some",
      kind: "suffix",
      text: "-some",
      forms: ["some"],
      meaning: "形容词后缀：引起…的",
      note: "如 handsome、awesome",
      examples: ["handsome", "troublesome", "awesome"]
    },
    {
      id: "s-ster",
      kind: "suffix",
      text: "-ster",
      forms: ["ster"],
      meaning: "名词后缀：…的人",
      note: "如 gangster、youngster",
      examples: ["gangster", "youngster", "songster"]
    },
    {
      id: "s-ure",
      kind: "suffix",
      text: "-ure",
      forms: ["ure"],
      meaning: "名词后缀：行为或结果",
      note: "如 pressure、failure",
      examples: ["pressure", "failure", "pleasure"]
    },
    {
      id: "s-ward",
      kind: "suffix",
      text: "-ward",
      forms: ["ward"],
      meaning: "副词后缀：朝…方向",
      note: "如 forward、backward",
      examples: ["forward", "backward", "homeward"]
    },
    {
      id: "s-wise",
      kind: "suffix",
      text: "-wise",
      forms: ["wise"],
      meaning: "副词后缀：在…方面",
      note: "如 likewise、clockwise",
      examples: ["likewise", "clockwise", "otherwise"]
    },
    {
      id: "s-y",
      kind: "suffix",
      text: "-y",
      forms: ["y"],
      meaning: "形容词后缀：多…的",
      note: "名词加 y，如 rainy",
      examples: ["rainy", "healthy", "sunny"]
    },
    {
      id: "s-an",
      kind: "suffix",
      text: "-an",
      forms: ["an"],
      meaning: "名词或形容词后缀",
      note: "表人或…的，如 American",
      examples: ["American", "human", "urban"]
    },
    {
      id: "s-ette",
      kind: "suffix",
      text: "-ette",
      forms: ["ette"],
      meaning: "名词后缀：小…或女性",
      note: "如 cigarette、novelette",
      examples: ["cigarette", "kitchenette", "novelette"]
    },
    {
      id: "s-itude",
      kind: "suffix",
      text: "-itude",
      forms: ["itude"],
      meaning: "名词后缀：性质或状态",
      note: "如 attitude、gratitude",
      examples: ["attitude", "gratitude", "solitude"]
    },
    {
      id: "s-oid",
      kind: "suffix",
      text: "-oid",
      forms: ["oid"],
      meaning: "形容词后缀：像…的",
      note: "如 humanoid、android",
      examples: ["humanoid", "android", "void"]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = ENTRIES;
  if (typeof window !== "undefined") {
    window.MORPH_DATA = window.MORPH_DATA || {};
    window.MORPH_DATA.suffix = ENTRIES;
  }
})();