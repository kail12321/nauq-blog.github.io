/* 简词 · 词根词缀库（词根 a–l） */
(function () {
  var ENTRIES = [
    {
      id: "r-act",
      kind: "root",
      text: "act / ag",
      forms: ["act", "agit"],
      meaning: "做；驱动；do",
      note: "做 → act 行动、agitate 使动起来即鼓动",
      examples: ["action", "active", "actual", "agitate"]
    },
    {
      id: "r-acu",
      kind: "root",
      text: "acu / acr",
      forms: ["acu", "acr", "acer"],
      meaning: "尖；锐利；sharp",
      note: "尖 → acute 尖锐的、acid 酸有刺舌之感",
      examples: ["acute", "acumen", "acrid"]
    },
    {
      id: "r-aer",
      kind: "root",
      text: "aer",
      forms: ["aer"],
      meaning: "空气；air",
      note: "空气 → aerial 空气的、aerobic 需氧的",
      examples: ["aerial", "aerobic", "aeroplane"]
    },
    {
      id: "r-ali",
      kind: "root",
      text: "ali / alter",
      forms: ["ali", "alter", "altr"],
      meaning: "其他；改变；other",
      note: "其他 → alien 外来的、alter 改成另一个样子",
      examples: ["alien", "alter", "alternative", "altruism"]
    },
    {
      id: "r-am",
      kind: "root",
      text: "am / amor",
      forms: ["amor", "amat", "ami"],
      meaning: "爱；love",
      note: "爱 → amateur 因爱好而做的人、amiable 和蔼可亲",
      examples: ["amateur", "amiable", "amorous"]
    },
    {
      id: "r-ambul",
      kind: "root",
      text: "ambul",
      forms: ["ambul"],
      meaning: "走；walk",
      note: "走 → ambulance 四处走的救护车、amble 漫步",
      examples: ["ambulance", "ambulate", "ambulatory"]
    },
    {
      id: "r-anim",
      kind: "root",
      text: "anim",
      forms: ["anim"],
      meaning: "生命；精神；mind",
      note: "生命气息 → animal 有生命者、animate 使有生气",
      examples: ["animal", "animate", "unanimous", "animosity"]
    },
    {
      id: "r-ann",
      kind: "root",
      text: "ann / enn",
      forms: ["ann", "enn"],
      meaning: "年；year",
      note: "年 → annual 每年的、anniversary 一年一度",
      examples: ["annual", "anniversary", "biennial"]
    },
    {
      id: "r-anthrop",
      kind: "root",
      text: "anthrop",
      forms: ["anthrop"],
      meaning: "人类；human",
      note: "人类 → anthropology 研究人类的学问",
      examples: ["anthropology", "philanthropy", "anthropoid"]
    },
    {
      id: "r-aqu",
      kind: "root",
      text: "aqu",
      forms: ["aqu"],
      meaning: "水；water",
      note: "水 → aquarium 养水生物的容器、aquatic 水生的",
      examples: ["aquarium", "aquatic", "aqueduct"]
    },
    {
      id: "r-arch",
      kind: "root",
      text: "arch",
      forms: ["arch"],
      meaning: "首领；首要；chief",
      note: "首领 → architect 首要建造者、monarch 独一统治者",
      examples: ["architect", "monarch", "hierarchy", "archives"]
    },
    {
      id: "r-arm",
      kind: "root",
      text: "arm",
      forms: ["arm"],
      meaning: "武器；装备；arms",
      note: "武器 → army 持武器的队伍、armor 护身装备",
      examples: ["army", "armor", "disarm", "armament"]
    },
    {
      id: "r-art",
      kind: "root",
      text: "art",
      forms: ["art"],
      meaning: "技艺；关节；skill",
      note: "技艺 → artist 有技艺者、article 关节般的小节",
      examples: ["artist", "article", "artificial", "artisan"]
    },
    {
      id: "r-aud",
      kind: "root",
      text: "aud / audit",
      forms: ["aud", "audit", "aur"],
      meaning: "听；hear",
      note: "听 → audience 听众、audio 声音的",
      examples: ["audience", "audio", "audit", "auditorium"]
    },
    {
      id: "r-bell",
      kind: "root",
      text: "bell",
      forms: ["bell"],
      meaning: "战争；war",
      note: "战争 → rebel 再次起战即反叛、belligerent 好战的",
      examples: ["rebellion", "belligerent", "bellicose"]
    },
    {
      id: "r-bene",
      kind: "root",
      text: "bene / bon",
      forms: ["bene", "bon"],
      meaning: "好；善；good",
      note: "好 → benefit 做好事即益处、bonus 好东西",
      examples: ["benefit", "benevolent", "bonus", "bonanza"]
    },
    {
      id: "r-bio",
      kind: "root",
      text: "bio",
      forms: ["bio"],
      meaning: "生命；life",
      note: "生命 → biology 研究生命的学问、biography 写一生",
      examples: ["biology", "biography", "antibiotic"]
    },
    {
      id: "r-brev",
      kind: "root",
      text: "brev",
      forms: ["brev", "brief"],
      meaning: "短；short",
      note: "短 → brief 简短的、abbreviate 使变短",
      examples: ["brief", "abbreviate", "brevity"]
    },
    {
      id: "r-cand",
      kind: "root",
      text: "cand",
      forms: ["cand"],
      meaning: "发光；白；glow",
      note: "白光 → candle 发光的烛、candid 心底明白即坦率",
      examples: ["candle", "candid", "candidate", "incandescent"]
    },
    {
      id: "r-cap",
      kind: "root",
      text: "cap / capt / cept / cip",
      forms: ["cap", "capt", "cept", "cip", "ceiv"],
      meaning: "拿；抓；取；take",
      note: "抓取 → capture 抓住、accept 接过来即接受",
      examples: ["capture", "accept", "receive", "capable"]
    },
    {
      id: "r-card",
      kind: "root",
      text: "card / cord / cour",
      forms: ["card", "cord", "cour", "cor"],
      meaning: "心；heart",
      note: "心 → cardiac 心脏的、courage 心里生出的勇气",
      examples: ["cardiac", "courage", "cordial", "record"]
    },
    {
      id: "r-carn",
      kind: "root",
      text: "carn",
      forms: ["carn"],
      meaning: "肉；flesh",
      note: "肉 → carnivore 食肉者、carnival 谢肉节",
      examples: ["carnival", "carnivore", "carnation"]
    },
    {
      id: "r-ced",
      kind: "root",
      text: "ced / ceed / cess",
      forms: ["ced", "ceed", "cess"],
      meaning: "走；让；go",
      note: "走 → proceed 向前走、recede 往后退",
      examples: ["proceed", "recede", "process", "concede"]
    },
    {
      id: "r-cent",
      kind: "root",
      text: "cent",
      forms: ["cent"],
      meaning: "百；百分之一；hundred",
      note: "百 → century 一百年、percent 每一百中的份",
      examples: ["century", "percent", "centimeter", "centigrade"]
    },
    {
      id: "r-cern",
      kind: "root",
      text: "cern / cret / crim",
      forms: ["cern", "cret", "crim", "cert"],
      meaning: "分辨；筛分；区分",
      note: "筛分 → concern 一起筛即关切、discern 分辨出来",
      examples: ["concern", "secret", "discriminate", "certain"]
    },
    {
      id: "r-chron",
      kind: "root",
      text: "chron",
      forms: ["chron"],
      meaning: "时间；time",
      note: "时间 → chronic 拖长时间的即慢性的、chronology 年代学",
      examples: ["chronic", "chronology", "synchronize"]
    },
    {
      id: "r-cid",
      kind: "root",
      text: "cid / cis",
      forms: ["cid", "cis"],
      meaning: "切；杀；cut",
      note: "切 → decide 切下即决断、precise 切得准即精确",
      examples: ["decide", "precise", "suicide", "scissors"]
    },
    {
      id: "r-claim",
      kind: "root",
      text: "claim / clam",
      forms: ["claim", "clam"],
      meaning: "喊；叫；cry",
      note: "喊 → exclaim 喊出来即惊呼、clamor 喧嚷",
      examples: ["exclaim", "claim", "clamor", "proclaim"]
    },
    {
      id: "r-clar",
      kind: "root",
      text: "clar",
      forms: ["clar"],
      meaning: "清楚；明亮；clear",
      note: "明亮 → clarify 使清楚、declare 讲明白即宣布",
      examples: ["clarify", "clarity", "declare"]
    },
    {
      id: "r-clud",
      kind: "root",
      text: "clud / clus",
      forms: ["clud", "clus"],
      meaning: "关闭；close",
      note: "关 → include 关在里面即包含、exclude 关在外面",
      examples: ["include", "exclude", "conclusion"]
    },
    {
      id: "r-cogn",
      kind: "root",
      text: "cogn / gnos",
      forms: ["cogn", "gnos"],
      meaning: "知道；know",
      note: "知道 → recognize 再认出来、diagnose 诊断得知",
      examples: ["recognize", "cognitive", "diagnose", "prognosis"]
    },
    {
      id: "r-corp",
      kind: "root",
      text: "corp / corpor",
      forms: ["corp", "corpor"],
      meaning: "身体；body",
      note: "身体 → corporation 结成一体的团体、corpse 尸体",
      examples: ["corporation", "corpse", "corporal", "incorporate"]
    },
    {
      id: "r-cosm",
      kind: "root",
      text: "cosm",
      forms: ["cosm"],
      meaning: "宇宙；世界；order",
      note: "宇宙 → cosmos 井然有序的宇宙、cosmic 宇宙的",
      examples: ["cosmic", "cosmos", "cosmopolitan"]
    },
    {
      id: "r-crat",
      kind: "root",
      text: "crat / cracy",
      forms: ["crat", "cracy"],
      meaning: "统治；权力；rule",
      note: "统治 → democracy 人民统治、bureaucracy 官僚统治",
      examples: ["democracy", "aristocrat", "bureaucracy"]
    },
    {
      id: "r-cred",
      kind: "root",
      text: "cred",
      forms: ["cred"],
      meaning: "相信；信任；believe",
      note: "相信 → credit 相信其可还、incredible 不可信的",
      examples: ["credit", "credible", "incredible", "credential"]
    },
    {
      id: "r-cresc",
      kind: "root",
      text: "cresc / creas",
      forms: ["cresc", "creas", "cret"],
      meaning: "生长；增长；grow",
      note: "生长 → increase 往里长即增加、crescent 渐长的月牙",
      examples: ["increase", "crescent", "decrease", "concrete"]
    },
    {
      id: "r-cur",
      kind: "root",
      text: "cur / cours / curs",
      forms: ["cur", "cours", "curs"],
      meaning: "跑；流动；run",
      note: "跑 → current 流动的水流、excursion 跑出去远足",
      examples: ["current", "course", "excursion", "occur"]
    },
    {
      id: "r-dem",
      kind: "root",
      text: "dem / demo",
      forms: ["dem", "demo"],
      meaning: "人民；people",
      note: "人民 → democracy 人民做主、epidemic 在民众中流行",
      examples: ["democracy", "epidemic", "demography", "democratic"]
    },
    {
      id: "r-dent",
      kind: "root",
      text: "dent / dont",
      forms: ["dent", "dont"],
      meaning: "牙；tooth",
      note: "牙 → dentist 治牙的医生、dental 牙齿的",
      examples: ["dentist", "dental", "indent", "orthodontist"]
    },
    {
      id: "r-derm",
      kind: "root",
      text: "derm",
      forms: ["derm"],
      meaning: "皮肤；skin",
      note: "皮肤 → dermatology 研究皮肤的学问、epidermis 表皮",
      examples: ["dermatology", "epidermis", "hypodermic"]
    },
    {
      id: "r-dic",
      kind: "root",
      text: "dic / dict",
      forms: ["dic", "dict"],
      meaning: "说；宣称；say",
      note: "说 → dictate 口述让人写、predict 预先说出即预言",
      examples: ["dictate", "predict", "dictionary", "contradict"]
    },
    {
      id: "r-doc",
      kind: "root",
      text: "doc / doct",
      forms: ["doc", "doct"],
      meaning: "教；证明；teach",
      note: "教 → doctor 有学问的人、document 用来证明的文书",
      examples: ["doctor", "document", "doctrine", "documentary"]
    },
    {
      id: "r-domin",
      kind: "root",
      text: "domin",
      forms: ["domin"],
      meaning: "主人；支配；master",
      note: "主人 → dominate 像主人一样支配、dominion 领地",
      examples: ["dominate", "dominant", "dominion"]
    },
    {
      id: "r-don",
      kind: "root",
      text: "don / dot / dat",
      forms: ["don", "dot", "dat"],
      meaning: "给；give",
      note: "给 → donate 给出去即捐赠、anecdote 未公开的小故事",
      examples: ["donate", "donor", "anecdote", "data"]
    },
    {
      id: "r-duc",
      kind: "root",
      text: "duc / duct",
      forms: ["duc", "duct", "duit"],
      meaning: "引导；lead",
      note: "引导 → conduct 引导着做、produce 引出即生产",
      examples: ["conduct", "produce", "introduce", "duct"]
    },
    {
      id: "r-dur",
      kind: "root",
      text: "dur",
      forms: ["dur"],
      meaning: "持久；坚硬；last",
      note: "持久 → durable 耐久的、endure 忍耐着撑下去",
      examples: ["durable", "endure", "during"]
    },
    {
      id: "r-dyn",
      kind: "root",
      text: "dyn / dynam",
      forms: ["dyn", "dynam"],
      meaning: "力量；power",
      note: "力量 → dynamic 有力量的、dynamite 炸药",
      examples: ["dynamic", "dynamite", "dynasty"]
    },
    {
      id: "r-ego",
      kind: "root",
      text: "ego",
      forms: ["ego"],
      meaning: "我；自我；self",
      note: "我 → egotism 只想着我、egocentric 以我为中心",
      examples: ["ego", "egotism", "egocentric"]
    },
    {
      id: "r-equ",
      kind: "root",
      text: "equ / equi",
      forms: ["equ", "equi"],
      meaning: "相等；平；equal",
      note: "相等 → equal 相等、equator 平分地球的赤道",
      examples: ["equal", "equator", "adequate", "equilibrium"]
    },
    {
      id: "r-err",
      kind: "root",
      text: "err",
      forms: ["err"],
      meaning: "错误；漫游；wander",
      note: "漫游走偏 → error 走错的结果、erratic 游走不定",
      examples: ["error", "erratic", "errand"]
    },
    {
      id: "r-fa",
      kind: "root",
      text: "fa / fat / fab",
      forms: ["fat", "fab", "fam", "fan"],
      meaning: "说话；命运；speak",
      note: "说 → fable 说出的寓言、fate 说定的命运",
      examples: ["fable", "fate", "famous", "infant"]
    },
    {
      id: "r-fac",
      kind: "root",
      text: "fac / fact / fect / fic",
      forms: ["fac", "fact", "fect", "fic", "fash"],
      meaning: "做；制作；make",
      note: "做 → factory 做东西的地方、perfect 做得完全",
      examples: ["factory", "perfect", "efficient", "facile"]
    },
    {
      id: "r-fer",
      kind: "root",
      text: "fer",
      forms: ["fer"],
      meaning: "带来；拿；carry",
      note: "带 → transfer 转着带过去、offer 带到面前即提供",
      examples: ["transfer", "offer", "refer", "fertile"]
    },
    {
      id: "r-fid",
      kind: "root",
      text: "fid / fide",
      forms: ["fid", "fide"],
      meaning: "信任；faith",
      note: "信任 → fidelity 忠信不移、confident 很信自己",
      examples: ["fidelity", "confident", "confide"]
    },
    {
      id: "r-fin",
      kind: "root",
      text: "fin",
      forms: ["fin"],
      meaning: "结束；界限；end",
      note: "界限 → finish 走到界限即完成、infinite 没有界限",
      examples: ["finish", "final", "infinite", "define"]
    },
    {
      id: "r-firm",
      kind: "root",
      text: "firm",
      forms: ["firm"],
      meaning: "坚固；firm",
      note: "坚固 → confirm 使更坚固即确认、affirm 说得坚定",
      examples: ["confirm", "firm", "firmament", "affirm"]
    },
    {
      id: "r-flam",
      kind: "root",
      text: "flam / flagr",
      forms: ["flam", "flagr"],
      meaning: "火焰；燃烧；burn",
      note: "火 → flame 火焰、flammable 容易被点燃的",
      examples: ["flame", "flammable", "inflame", "conflagration"]
    },
    {
      id: "r-flect",
      kind: "root",
      text: "flect / flex",
      forms: ["flect", "flex"],
      meaning: "弯曲；bend",
      note: "弯 → reflect 弯回来即反射、flexible 容易弯的",
      examples: ["reflect", "flexible", "deflect"]
    },
    {
      id: "r-flu",
      kind: "root",
      text: "flu / flux",
      forms: ["flu", "flux"],
      meaning: "流；flow",
      note: "流 → fluent 说话像流水、influx 流入",
      examples: ["fluent", "fluid", "influence", "influx"]
    },
    {
      id: "r-form",
      kind: "root",
      text: "form",
      forms: ["form"],
      meaning: "形状；形成；shape",
      note: "形状 → reform 重新成形即改革、uniform 统一形状",
      examples: ["reform", "uniform", "format", "formulate"]
    },
    {
      id: "r-fort",
      kind: "root",
      text: "fort / forc",
      forms: ["fort", "forc"],
      meaning: "强；力量；strong",
      note: "强 → fortify 使坚固、effort 用力做出来",
      examples: ["fortify", "effort", "comfort", "force"]
    },
    {
      id: "r-frag",
      kind: "root",
      text: "frag / fract",
      forms: ["frag", "fract"],
      meaning: "破碎；break",
      note: "碎 → fragment 碎片、fracture 折断",
      examples: ["fragment", "fracture", "fragile", "refract"]
    },
    {
      id: "r-fug",
      kind: "root",
      text: "fug",
      forms: ["fug"],
      meaning: "逃走；flee",
      note: "逃 → fugitive 逃亡者、refuge 逃进去的避难所",
      examples: ["fugitive", "refuge", "centrifuge"]
    },
    {
      id: "r-fund",
      kind: "root",
      text: "fund / found",
      forms: ["fund", "found"],
      meaning: "底；基础；base",
      note: "底 → foundation 地基、profound 深到底的",
      examples: ["foundation", "profound", "refund", "fundamental"]
    },
    {
      id: "r-gen",
      kind: "root",
      text: "gen / gener",
      forms: ["gen", "gener", "genit"],
      meaning: "产生；种类；birth",
      note: "生 → generate 生出、generation 一代人",
      examples: ["generate", "gene", "generation", "genius"]
    },
    {
      id: "r-geo",
      kind: "root",
      text: "geo",
      forms: ["geo"],
      meaning: "地球；土地；earth",
      note: "地 → geography 描写大地、geology 研究大地",
      examples: ["geography", "geology", "geometry"]
    },
    {
      id: "r-grad",
      kind: "root",
      text: "grad / gress",
      forms: ["grad", "gress"],
      meaning: "走；步；step",
      note: "走 → gradual 一步步的、progress 向前走即进步",
      examples: ["gradual", "progress", "grade", "congress"]
    },
    {
      id: "r-graph",
      kind: "root",
      text: "graph / gram",
      forms: ["graph", "gram"],
      meaning: "写；画；write",
      note: "写画 → photograph 用光写成的照片、telegram 远方写来",
      examples: ["photograph", "telegram", "graphic", "grammar"]
    },
    {
      id: "r-grat",
      kind: "root",
      text: "grat / grac",
      forms: ["grat", "grac"],
      meaning: "感谢；愉快；please",
      note: "谢 → grateful 心怀感谢、grace 令人愉悦的优雅",
      examples: ["grateful", "grace", "congratulate", "gracious"]
    },
    {
      id: "r-grav",
      kind: "root",
      text: "grav / griev",
      forms: ["grav", "griev"],
      meaning: "重；沉重；heavy",
      note: "重 → gravity 重力、grieve 心情沉重即悲伤",
      examples: ["gravity", "grieve", "grave", "aggravate"]
    },
    {
      id: "r-hab",
      kind: "root",
      text: "hab / hibit",
      forms: ["hab", "habit", "hibit"],
      meaning: "拥有；持有；hold",
      note: "持有 → habit 长期持有的习惯、exhibit 拿出来展示",
      examples: ["habit", "exhibit", "prohibit", "inhabit"]
    },
    {
      id: "r-her",
      kind: "root",
      text: "her / hes",
      forms: ["her", "hes"],
      meaning: "粘附；黏住；stick",
      note: "黏 → adhere 粘上去即坚持、hesitate 黏着不动",
      examples: ["adhere", "hesitate", "coherent", "adhesive"]
    },
    {
      id: "r-hosp",
      kind: "root",
      text: "hosp / host",
      forms: ["hosp", "host"],
      meaning: "客人；主人；guest",
      note: "客人 → hospital 接待客人的地方、host 待客的主人",
      examples: ["hospital", "host", "hostel", "hospitality"]
    },
    {
      id: "r-hydr",
      kind: "root",
      text: "hydr",
      forms: ["hydr"],
      meaning: "水；water",
      note: "水 → hydrogen 生成水的元素、dehydrate 去掉水分",
      examples: ["hydrogen", "dehydrate", "hydraulic"]
    },
    {
      id: "r-ject",
      kind: "root",
      text: "ject",
      forms: ["ject"],
      meaning: "投；扔；throw",
      note: "投 → project 向前投即投射、reject 扔回去即拒绝",
      examples: ["project", "reject", "inject", "object"]
    },
    {
      id: "r-jud",
      kind: "root",
      text: "jud / jur / jus",
      forms: ["jud", "jur", "jus"],
      meaning: "判断；法律；judge",
      note: "判断 → judge 判断的人、justice 公正的律法",
      examples: ["judge", "jury", "justice", "jurisdiction"]
    },
    {
      id: "r-junct",
      kind: "root",
      text: "junct / jug",
      forms: ["junct", "jug"],
      meaning: "连接；join",
      note: "连 → junction 连接处、conjugal 结合成夫妻的",
      examples: ["junction", "conjunction", "conjugal"]
    },
    {
      id: "r-labor",
      kind: "root",
      text: "labor / lab",
      forms: ["labor", "lab"],
      meaning: "劳动；work",
      note: "劳动 → labor 劳作、collaborate 一起劳动即合作",
      examples: ["labor", "collaborate", "laboratory", "elaborate"]
    },
    {
      id: "r-lect",
      kind: "root",
      text: "lect / leg / lig",
      forms: ["lect", "leg", "lig"],
      meaning: "选；读；choose",
      note: "选 → select 选出来、collect 挑选拢在一起",
      examples: ["select", "collect", "legend", "religion"]
    },
    {
      id: "r-leg",
      kind: "root",
      text: "leg / legis",
      forms: ["leg", "legis"],
      meaning: "法律；law",
      note: "法律 → legal 合法的、legislate 制定法律",
      examples: ["legal", "legislate", "privilege", "legitimate"]
    },
    {
      id: "r-lev",
      kind: "root",
      text: "lev",
      forms: ["lev"],
      meaning: "举起；轻；raise",
      note: "举 → elevate 举起来、relieve 使轻即减轻",
      examples: ["elevate", "elevator", "lever", "levity"]
    },
    {
      id: "r-liber",
      kind: "root",
      text: "liber",
      forms: ["liber"],
      meaning: "自由；free",
      note: "自由 → liberty 自由、liberate 使获得自由",
      examples: ["liberty", "liberal", "deliberate", "liberate"]
    },
    {
      id: "r-liter",
      kind: "root",
      text: "liter",
      forms: ["liter"],
      meaning: "文字；letter",
      note: "文字 → literal 照字面的、literature 文字作品",
      examples: ["literal", "literature", "illiterate"]
    },
    {
      id: "r-loc",
      kind: "root",
      text: "loc",
      forms: ["loc"],
      meaning: "地方；place",
      note: "地方 → local 当地的、locomotive 能换地方的车",
      examples: ["local", "locate", "locomotive", "dislocate"]
    },
    {
      id: "r-log",
      kind: "root",
      text: "log / logue / loqu",
      forms: ["log", "logue", "loqu"],
      meaning: "说；言语；speak",
      note: "说 → dialogue 两人对着说、eloquent 很会说的",
      examples: ["dialogue", "logic", "eloquent", "monologue"]
    },
    {
      id: "r-luc",
      kind: "root",
      text: "luc / lumin / lustr",
      forms: ["luc", "lumin", "lustr"],
      meaning: "光；照亮；light",
      note: "光 → lucid 明亮清楚的、illuminate 照亮",
      examples: ["lucid", "illuminate", "translucent", "lustrous"]
    },
    {
      id: "r-lud",
      kind: "root",
      text: "lud / lus",
      forms: ["lud", "lus"],
      meaning: "玩；戏弄；play",
      note: "玩 → illusion 玩弄视觉的幻象、prelude 开场戏",
      examples: ["illusion", "prelude", "delude", "ludicrous"]
    },
    {
      id: "r-hum",
      kind: "root",
      text: "hum",
      forms: ["hum"],
      meaning: "土；人；earth",
      note: "土 → human 土里造出的人、humble 贴着地的谦卑",
      examples: ["human", "humble", "humility", "inhume"]
    },
    {
      id: "r-horr",
      kind: "root",
      text: "horr",
      forms: ["horr"],
      meaning: "发抖；恐惧；fear",
      note: "怕得发抖 → horror 恐怖、horrible 可怕的",
      examples: ["horror", "horrible", "horrid", "horrify"]
    },
    {
      id: "r-integr",
      kind: "root",
      text: "integr / teg",
      forms: ["integr", "teg"],
      meaning: "完整；whole",
      note: "完整 → integrate 使成为整体、integrity 品格完整",
      examples: ["integrate", "integrity", "integral", "integument"]
    },
    {
      id: "r-lat",
      kind: "root",
      text: "lat / later",
      forms: ["lat", "later"],
      meaning: "边；侧面；side",
      note: "边 → lateral 侧面的、translate 搬到另一边即翻译",
      examples: ["lateral", "translate", "relate", "collateral"]
    },
    {
      id: "r-lingu",
      kind: "root",
      text: "lingu",
      forms: ["lingu"],
      meaning: "舌头；语言；tongue",
      note: "舌头 → language 用舌头发出的语言、linguistics 语言学",
      examples: ["linguistics", "bilingual", "multilingual"]
    },
    {
      id: "r-lith",
      kind: "root",
      text: "lith",
      forms: ["lith"],
      meaning: "石头；stone",
      note: "石 → monolith 独块巨石、lithosphere 岩石圈",
      examples: ["monolith", "lithosphere", "megalith"]
    },
    {
      id: "r-long",
      kind: "root",
      text: "long",
      forms: ["long"],
      meaning: "长；long",
      note: "长 → prolong 拉长延长、longevity 活得长久",
      examples: ["prolong", "longevity", "longitude"]
    },
    {
      id: "r-lax",
      kind: "root",
      text: "lax / lys",
      forms: ["lax", "lys"],
      meaning: "松；解开；loose",
      note: "松开 → relax 使松下来、analysis 拆解分析",
      examples: ["relax", "analysis", "paralysis"]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = ENTRIES;
  if (typeof window !== "undefined") {
    window.MORPH_DATA = window.MORPH_DATA || {};
    window.MORPH_DATA.rootA = ENTRIES;
  }
})();