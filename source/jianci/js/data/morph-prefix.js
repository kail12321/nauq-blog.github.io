/* 简词 · 词根词缀库（前缀） */
(function () {
  var ENTRIES = [
    {
      id: "p-ab",
      kind: "prefix",
      text: "ab- / abs-",
      forms: ["ab", "abs"],
      meaning: "离开；相反；不",
      note: "表示离开或偏离，如 abnormal、abstract",
      examples: ["abnormal", "absent", "abstract"]
    },
    {
      id: "p-ad",
      kind: "prefix",
      text: "ad- / ac- / af- / ag- / al- / ap- / ar- / as- / at-",
      forms: ["ad", "ac", "af", "ag", "al", "ap", "ar", "as", "at"],
      meaning: "向；朝向；加强",
      note: "表示方向或加强，如 adapt、accept",
      examples: ["adapt", "accept", "affect", "approve"]
    },
    {
      id: "p-ambi",
      kind: "prefix",
      text: "ambi-",
      forms: ["ambi"],
      meaning: "双；两；双方",
      note: "表示两者或双方，如 ambiguous",
      examples: ["ambiguous", "ambition", "ambivalent"]
    },
    {
      id: "p-an",
      kind: "prefix",
      text: "an-",
      forms: ["an"],
      meaning: "不；无；缺乏",
      note: "表示否定或缺乏，如 anonymous",
      examples: ["anonymous", "anemia", "anarchy"]
    },
    {
      id: "p-anti",
      kind: "prefix",
      text: "anti-",
      forms: ["anti"],
      meaning: "反对；抗；非",
      note: "表示反对或抵抗，如 antisocial",
      examples: ["antisocial", "antibiotic", "antiwar"]
    },
    {
      id: "p-auto",
      kind: "prefix",
      text: "auto-",
      forms: ["auto"],
      meaning: "自己；自动；自身",
      note: "表示自身或自动，如 automatic",
      examples: ["automatic", "autograph", "autobiography"]
    },
    {
      id: "p-be",
      kind: "prefix",
      text: "be-",
      forms: ["be"],
      meaning: "使；加强；在",
      note: "加在动词或名词前，如 belittle、beside",
      examples: ["belittle", "beloved", "beside", "become"]
    },
    {
      id: "p-bi",
      kind: "prefix",
      text: "bi-",
      forms: ["bi"],
      meaning: "二；两；双",
      note: "表示二或双，如 bicycle、bilingual",
      examples: ["bicycle", "bilingual", "bimonthly"]
    },
    {
      id: "p-circum",
      kind: "prefix",
      text: "circum-",
      forms: ["circum"],
      meaning: "周围；环绕",
      note: "表示环绕或周围，如 circumstance",
      examples: ["circumstance", "circumnavigate", "circumference"]
    },
    {
      id: "p-co",
      kind: "prefix",
      text: "co- / com- / con- / col- / cor-",
      forms: ["co", "com", "con", "col", "cor"],
      meaning: "共同；一起；加强",
      note: "表示共同或一起，如 cooperate、connect",
      examples: ["cooperate", "connect", "collect", "correct"]
    },
    {
      id: "p-contra",
      kind: "prefix",
      text: "contra- / contro-",
      forms: ["contra", "contro"],
      meaning: "反对；相反；逆",
      note: "表示相反或对抗，如 contradict",
      examples: ["contradict", "contrary", "controversy"]
    },
    {
      id: "p-counter",
      kind: "prefix",
      text: "counter-",
      forms: ["counter"],
      meaning: "反对；相反；对应",
      note: "表示反对或对应，如 counterattack",
      examples: ["counterattack", "counterpart", "counteract"]
    },
    {
      id: "p-de",
      kind: "prefix",
      text: "de-",
      forms: ["de"],
      meaning: "向下；离开；去除；相反",
      note: "表示下降、去除或相反，如 descend、defrost",
      examples: ["descend", "defrost", "decrease"]
    },
    {
      id: "p-dia",
      kind: "prefix",
      text: "dia-",
      forms: ["dia"],
      meaning: "穿过；横过；之间",
      note: "表示穿过或分离，如 diameter、dialogue",
      examples: ["diameter", "dialogue", "diagnose"]
    },
    {
      id: "p-dis",
      kind: "prefix",
      text: "di- / dis- / dif-",
      forms: ["di", "dis", "dif"],
      meaning: "不；分开；离开",
      note: "表示否定或分离，如 disagree、divide",
      examples: ["disagree", "divide", "differ", "dismiss"]
    },
    {
      id: "p-dys",
      kind: "prefix",
      text: "dys-",
      forms: ["dys"],
      meaning: "坏；不良；困难",
      note: "表示不良或困难，如 dysfunction",
      examples: ["dysfunction", "dyslexia", "dysentery"]
    },
    {
      id: "p-en",
      kind: "prefix",
      text: "en- / em-",
      forms: ["en", "em"],
      meaning: "使；进入；在内",
      note: "使成为或进入，如 enable、empower",
      examples: ["enable", "enlarge", "empower", "embrace"]
    },
    {
      id: "p-endo",
      kind: "prefix",
      text: "endo-",
      forms: ["endo"],
      meaning: "内；在内；内部",
      note: "表示内部，如 endocrine、endoscope",
      examples: ["endocrine", "endoscope", "endogenous"]
    },
    {
      id: "p-epi",
      kind: "prefix",
      text: "epi-",
      forms: ["epi"],
      meaning: "在…上；外；旁",
      note: "表示在上或附加，如 epidemic、epilogue",
      examples: ["epidemic", "epilogue", "episode"]
    },
    {
      id: "p-eu",
      kind: "prefix",
      text: "eu-",
      forms: ["eu"],
      meaning: "好；优；真正",
      note: "表示良好或优美，如 euphemism",
      examples: ["euphemism", "euphoria", "eulogy"]
    },
    {
      id: "p-ex",
      kind: "prefix",
      text: "e- / ex- / ef-",
      forms: ["e", "ex", "ef"],
      meaning: "出；向外；完全",
      note: "表示向外或离开，如 exit、export",
      examples: ["export", "exit", "effect", "exclude"]
    },
    {
      id: "p-exo",
      kind: "prefix",
      text: "exo-",
      forms: ["exo"],
      meaning: "外；外界；外部",
      note: "表示外部，如 exoskeleton、exotic",
      examples: ["exoskeleton", "exotic", "exothermic"]
    },
    {
      id: "p-extra",
      kind: "prefix",
      text: "extra- / extro-",
      forms: ["extra", "extro"],
      meaning: "外；超出；额外",
      note: "表示在…之外或额外，如 extraordinary",
      examples: ["extraordinary", "extraterrestrial", "extrovert"]
    },
    {
      id: "p-fore",
      kind: "prefix",
      text: "fore-",
      forms: ["fore"],
      meaning: "前；预先；在前",
      note: "表示在前或预先，如 forecast、foresee",
      examples: ["forecast", "foresee", "forehead"]
    },
    {
      id: "p-hetero",
      kind: "prefix",
      text: "hetero-",
      forms: ["hetero"],
      meaning: "异；不同；相异",
      note: "表示相异或不同，如 heterogeneous",
      examples: ["heterogeneous", "heterodox"]
    },
    {
      id: "p-homo",
      kind: "prefix",
      text: "homo-",
      forms: ["homo"],
      meaning: "同；相同；同类",
      note: "表示相同或同类，如 homogeneous",
      examples: ["homogeneous", "homonym", "homosexual"]
    },
    {
      id: "p-hyper",
      kind: "prefix",
      text: "hyper-",
      forms: ["hyper"],
      meaning: "过度；超；上",
      note: "表示过度或超出，如 hyperactive",
      examples: ["hyperactive", "hypertension", "hyperbole"]
    },
    {
      id: "p-hypo",
      kind: "prefix",
      text: "hypo-",
      forms: ["hypo"],
      meaning: "下；低；不足；次",
      note: "表示在下或不足，如 hypothesis",
      examples: ["hypothesis", "hypocrisy", "hypodermic"]
    },
    {
      id: "p-in",
      kind: "prefix",
      text: "il- / im- / in- / ir-",
      forms: ["in", "im", "il", "ir"],
      meaning: "不；非；向内",
      note: "表示否定或向内，如 invisible、import",
      examples: ["invisible", "impossible", "illegal", "irregular"]
    },
    {
      id: "p-infra",
      kind: "prefix",
      text: "infra-",
      forms: ["infra"],
      meaning: "下；下部；低于",
      note: "表示下方或低于，如 infrared",
      examples: ["infrared", "infrastructure", "infrasonic"]
    },
    {
      id: "p-inter",
      kind: "prefix",
      text: "inter-",
      forms: ["inter"],
      meaning: "在…之间；相互",
      note: "表示之间或相互，如 international",
      examples: ["international", "interact", "interrupt"]
    },
    {
      id: "p-intra",
      kind: "prefix",
      text: "intra- / intro-",
      forms: ["intra", "intro"],
      meaning: "在内；向内；内部",
      note: "表示内部或向内，如 intranet、introduce",
      examples: ["intranet", "introduce", "introvert", "intravenous"]
    },
    {
      id: "p-iso",
      kind: "prefix",
      text: "iso-",
      forms: ["iso"],
      meaning: "等；同；均",
      note: "表示相等或相同，如 isotope、isometric",
      examples: ["isotope", "isometric", "isobar"]
    },
    {
      id: "p-macro",
      kind: "prefix",
      text: "macro-",
      forms: ["macro"],
      meaning: "大；宏观；长",
      note: "表示宏大或整体，如 macroeconomics",
      examples: ["macroeconomics", "macroscopic", "macrocosm"]
    },
    {
      id: "p-mal",
      kind: "prefix",
      text: "mal- / male-",
      forms: ["mal", "male"],
      meaning: "坏；恶；不良",
      note: "表示坏或不良，如 malfunction、malevolent",
      examples: ["malfunction", "malnutrition", "malevolent"]
    },
    {
      id: "p-mega",
      kind: "prefix",
      text: "mega-",
      forms: ["mega"],
      meaning: "大；百万；兆",
      note: "表示巨大或百万，如 megaphone",
      examples: ["megaphone", "megabyte", "megalith"]
    },
    {
      id: "p-meta",
      kind: "prefix",
      text: "meta- / met-",
      forms: ["meta", "met"],
      meaning: "变化；超越；在后",
      note: "表示变化或超越，如 metaphor、method",
      examples: ["metaphor", "metabolism", "method"]
    },
    {
      id: "p-micro",
      kind: "prefix",
      text: "micro-",
      forms: ["micro"],
      meaning: "小；微；微量",
      note: "表示微小，如 microscope、microwave",
      examples: ["microscope", "microwave", "microphone"]
    },
    {
      id: "p-mid",
      kind: "prefix",
      text: "mid-",
      forms: ["mid"],
      meaning: "中；中间；中部",
      note: "表示中间或中部，如 midnight、midway",
      examples: ["midnight", "midway", "midsummer"]
    },
    {
      id: "p-mini",
      kind: "prefix",
      text: "mini-",
      forms: ["mini"],
      meaning: "小；迷你；微型",
      note: "表示小型或微型，如 minibus",
      examples: ["minibus", "miniskirt", "miniature"]
    },
    {
      id: "p-mis",
      kind: "prefix",
      text: "mis-",
      forms: ["mis"],
      meaning: "错误；坏；不当",
      note: "表示错误或不当，如 mistake、misuse",
      examples: ["mistake", "misuse", "misunderstand"]
    },
    {
      id: "p-mono",
      kind: "prefix",
      text: "mono- / mon-",
      forms: ["mono", "mon"],
      meaning: "一；单；独",
      note: "表示单一或单独，如 monopoly、monarch",
      examples: ["monopoly", "monologue", "monarch"]
    },
    {
      id: "p-multi",
      kind: "prefix",
      text: "multi-",
      forms: ["multi"],
      meaning: "多；许多；多重",
      note: "表示多或多重，如 multimedia",
      examples: ["multimedia", "multinational", "multiply"]
    },
    {
      id: "p-neo",
      kind: "prefix",
      text: "neo-",
      forms: ["neo"],
      meaning: "新；新近；现代",
      note: "表示新或现代，如 neolithic、neonatal",
      examples: ["neolithic", "neonatal", "neoclassical"]
    },
    {
      id: "p-non",
      kind: "prefix",
      text: "non-",
      forms: ["non"],
      meaning: "非；不；无",
      note: "表示否定或缺乏，如 nonsense",
      examples: ["nonsense", "nonstop", "nonfiction"]
    },
    {
      id: "p-ob",
      kind: "prefix",
      text: "ob- / oc- / of- / op-",
      forms: ["ob", "oc", "of", "op"],
      meaning: "向；反对；加强",
      note: "表示朝向、反对或加强，如 object、oppose",
      examples: ["object", "occupy", "offer", "oppose"]
    },
    {
      id: "p-omni",
      kind: "prefix",
      text: "omni-",
      forms: ["omni"],
      meaning: "全；都；总；遍",
      note: "表示全部或无所不在，如 omnipotent",
      examples: ["omnipotent", "omnivorous", "omniscient"]
    },
    {
      id: "p-out",
      kind: "prefix",
      text: "out-",
      forms: ["out"],
      meaning: "外；超过；胜过",
      note: "表示向外或超过，如 outdoor、outgrow",
      examples: ["outdoor", "outgrow", "outstanding", "outrun"]
    },
    {
      id: "p-over",
      kind: "prefix",
      text: "over-",
      forms: ["over"],
      meaning: "过度；在上；超过",
      note: "表示过度或在上，如 overwork",
      examples: ["overwork", "overcome", "overlook"]
    },
    {
      id: "p-pan",
      kind: "prefix",
      text: "pan-",
      forms: ["pan"],
      meaning: "全；泛；总",
      note: "表示全部或泛，如 pandemic、panorama",
      examples: ["pandemic", "panorama", "pantheism"]
    },
    {
      id: "p-para",
      kind: "prefix",
      text: "para-",
      forms: ["para"],
      meaning: "旁；辅助；防护",
      note: "表示旁边或辅助，如 parallel、paramedic",
      examples: ["parallel", "paramedic", "parasite"]
    },
    {
      id: "p-per",
      kind: "prefix",
      text: "per-",
      forms: ["per"],
      meaning: "贯穿；完全；极",
      note: "表示贯穿或加强，如 perfect、pervade",
      examples: ["perfect", "pervade", "persist"]
    },
    {
      id: "p-peri",
      kind: "prefix",
      text: "peri-",
      forms: ["peri"],
      meaning: "周围；环绕；围绕",
      note: "表示周围或围绕，如 perimeter",
      examples: ["perimeter", "periscope", "period"]
    },
    {
      id: "p-poly",
      kind: "prefix",
      text: "poly-",
      forms: ["poly"],
      meaning: "多；多个；多边",
      note: "表示多或多边，如 polygon、polysemy",
      examples: ["polygon", "polysemy", "polyglot"]
    },
    {
      id: "p-post",
      kind: "prefix",
      text: "post-",
      forms: ["post"],
      meaning: "后；之后；在后",
      note: "表示在后或之后，如 postwar、postpone",
      examples: ["postwar", "postpone", "postgraduate"]
    },
    {
      id: "p-pre",
      kind: "prefix",
      text: "pre-",
      forms: ["pre"],
      meaning: "前；预先；在之前",
      note: "表示在前或预先，如 preview、predict",
      examples: ["preview", "predict", "prepare"]
    },
    {
      id: "p-pro",
      kind: "prefix",
      text: "pro- / pur-",
      forms: ["pro", "pur"],
      meaning: "向前；支持；代理",
      note: "表示向前或支持，如 progress、purchase",
      examples: ["progress", "promote", "purchase"]
    },
    {
      id: "p-proto",
      kind: "prefix",
      text: "proto-",
      forms: ["proto"],
      meaning: "原始；最初；原型",
      note: "表示最初或原始，如 prototype",
      examples: ["prototype", "protocol", "protoplasm"]
    },
    {
      id: "p-pseudo",
      kind: "prefix",
      text: "pseudo-",
      forms: ["pseudo"],
      meaning: "假；伪；拟",
      note: "表示虚假或貌似，如 pseudonym",
      examples: ["pseudonym", "pseudoscience", "pseudopod"]
    },
    {
      id: "p-re",
      kind: "prefix",
      text: "re-",
      forms: ["re"],
      meaning: "再；回；向后；相反",
      note: "表示再次、返回或相反，如 rebuild、return",
      examples: ["rebuild", "return", "recall"]
    },
    {
      id: "p-retro",
      kind: "prefix",
      text: "retro-",
      forms: ["retro"],
      meaning: "向后；回顾；逆",
      note: "表示向后或回顾，如 retrospect",
      examples: ["retrospect", "retroactive", "retrograde"]
    },
    {
      id: "p-semi",
      kind: "prefix",
      text: "semi-",
      forms: ["semi"],
      meaning: "半；部分；两次",
      note: "表示一半或部分，如 semicircle",
      examples: ["semicircle", "semifinal", "semiconscious"]
    },
    {
      id: "p-sub",
      kind: "prefix",
      text: "sub- / suc- / suf- / sug- / sup- / sus-",
      forms: ["sub", "suc", "suf", "sug", "sup", "sus"],
      meaning: "下；次；副；接近",
      note: "表示在下、次级或接近，如 subway、submit",
      examples: ["subway", "submit", "succeed", "support"]
    },
    {
      id: "p-super",
      kind: "prefix",
      text: "super- / sur-",
      forms: ["super", "sur"],
      meaning: "上；超；过度",
      note: "表示在上或超出，如 supervise、surface",
      examples: ["supervise", "supermarket", "surface", "surpass"]
    },
    {
      id: "p-syn",
      kind: "prefix",
      text: "syn- / sym- / syl-",
      forms: ["syn", "sym", "syl"],
      meaning: "共同；一起；同时",
      note: "表示共同或一起，如 synonym、sympathy",
      examples: ["synonym", "sympathy", "syllable", "synchronize"]
    },
    {
      id: "p-tele",
      kind: "prefix",
      text: "tele-",
      forms: ["tele"],
      meaning: "远；电视；电信",
      note: "表示远距离，如 telephone、telescope",
      examples: ["telephone", "telescope", "television"]
    },
    {
      id: "p-thermo",
      kind: "prefix",
      text: "thermo- / therm-",
      forms: ["thermo", "therm"],
      meaning: "热；温度",
      note: "表示热或温度，如 thermometer、thermal",
      examples: ["thermometer", "thermal", "thermostat"]
    },
    {
      id: "p-trans",
      kind: "prefix",
      text: "trans- / tran-",
      forms: ["trans", "tran"],
      meaning: "横过；穿过；转移",
      note: "表示穿过或转移，如 transport、translate",
      examples: ["transport", "translate", "transfer"]
    },
    {
      id: "p-tri",
      kind: "prefix",
      text: "tri-",
      forms: ["tri"],
      meaning: "三；三次",
      note: "表示三或三次，如 triangle、tricycle",
      examples: ["triangle", "tricycle", "tricolor"]
    },
    {
      id: "p-ultra",
      kind: "prefix",
      text: "ultra-",
      forms: ["ultra"],
      meaning: "超；极；之外",
      note: "表示极端或超出，如 ultrasonic",
      examples: ["ultrasonic", "ultraviolet", "ultramodern"]
    },
    {
      id: "p-un",
      kind: "prefix",
      text: "un-",
      forms: ["un"],
      meaning: "不；非；相反",
      note: "加在形容词或动词前表示否定，如 unhappy、undo",
      examples: ["unhappy", "undo", "unfair"]
    },
    {
      id: "p-under",
      kind: "prefix",
      text: "under-",
      forms: ["under"],
      meaning: "下；不足；副",
      note: "表示在下或不足，如 underground",
      examples: ["underground", "underestimate", "underwear"]
    },
    {
      id: "p-uni",
      kind: "prefix",
      text: "uni-",
      forms: ["uni"],
      meaning: "一；单；统一",
      note: "表示单一或统一，如 uniform、unite",
      examples: ["uniform", "unite", "unicycle"]
    },
    {
      id: "p-up",
      kind: "prefix",
      text: "up-",
      forms: ["up"],
      meaning: "向上；起来；完成",
      note: "表示向上或完成，如 upstairs、uphold",
      examples: ["upstairs", "uphold", "upset"]
    },
    {
      id: "p-vice",
      kind: "prefix",
      text: "vice-",
      forms: ["vice"],
      meaning: "副；次；代理",
      note: "表示副职或代理，如 viceroy、vicegerent",
      examples: ["viceroy", "vicegerent", "viceregal"]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = ENTRIES;
  if (typeof window !== "undefined") {
    window.MORPH_DATA = window.MORPH_DATA || {};
    window.MORPH_DATA.prefix = ENTRIES;
  }
})();