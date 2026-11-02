/* 简词 · 词根词缀库（词根 m–z） */
(function () {
  var ENTRIES = [
    {
      id: "r-magn",
      kind: "root",
      text: "magn / maj / max",
      forms: ["magn", "maj", "max"],
      meaning: "大；伟大",
      note: "大 → magnitude 大小、major 较大的、maximum 最大的",
      examples: ["magnify", "major", "maximum"]
    },
    {
      id: "r-man",
      kind: "root",
      text: "man / manu",
      forms: ["man", "manu"],
      meaning: "手；hand",
      note: "手 → manual 用手做的即手册、manufacture 用手做出即制造",
      examples: ["manual", "manufacture", "manuscript"]
    },
    {
      id: "r-mand",
      kind: "root",
      text: "mand / mend",
      forms: ["mand", "mend"],
      meaning: "命令；委托",
      note: "命令 → command 下令、demand 要求、recommend 推荐即再委托",
      examples: ["command", "demand", "recommend"]
    },
    {
      id: "r-mar",
      kind: "root",
      text: "mar",
      forms: ["mar"],
      meaning: "海；海洋",
      note: "海 → marine 海的、maritime 海上的、submarine 海下面的即潜艇",
      examples: ["marine", "maritime", "submarine"]
    },
    {
      id: "r-mater",
      kind: "root",
      text: "mater / matr",
      forms: ["mater", "matr"],
      meaning: "母亲；母",
      note: "母亲 → maternal 母亲的、maternity 母性、matron 主妇",
      examples: ["maternal", "maternity", "matrimony"]
    },
    {
      id: "r-med",
      kind: "root",
      text: "med / medi",
      forms: ["med", "medi"],
      meaning: "中间；医疗",
      note: "中间 → medium 中间物即媒介、mediate 居中调解、immediate 无中间的即立即",
      examples: ["medium", "mediate", "immediate"]
    },
    {
      id: "r-memor",
      kind: "root",
      text: "memor",
      forms: ["memor"],
      meaning: "记忆；remember",
      note: "记忆 → memory 记忆、memorial 纪念的、commemorate 共同纪念",
      examples: ["memory", "memorial", "commemorate"]
    },
    {
      id: "r-ment",
      kind: "root",
      text: "ment",
      forms: ["ment"],
      meaning: "心智；精神",
      note: "心智 → mental 心理的、mention 提到即动心、comment 评论",
      examples: ["mental", "mention", "comment"]
    },
    {
      id: "r-merg",
      kind: "root",
      text: "merg / mers",
      forms: ["merg", "mers"],
      meaning: "沉没；浸入",
      note: "沉没 → emerge 从水里出来即浮现、immerse 浸入、submerge 沉到下面",
      examples: ["emerge", "immerse", "submerge"]
    },
    {
      id: "r-meter",
      kind: "root",
      text: "meter / metr / mens",
      forms: ["meter", "metr", "mens"],
      meaning: "测量；measure",
      note: "测量 → thermometer 测热的表即温度计、diameter 量过去的线即直径",
      examples: ["thermometer", "diameter", "symmetry", "immense"]
    },
    {
      id: "r-migr",
      kind: "root",
      text: "migr",
      forms: ["migr"],
      meaning: "迁移；移动",
      note: "迁移 → migrate 迁徙、immigrant 迁进来的人即移民、emigrate 迁出去",
      examples: ["migrate", "immigrant", "emigrate"]
    },
    {
      id: "r-milit",
      kind: "root",
      text: "milit",
      forms: ["milit"],
      meaning: "士兵；军事",
      note: "士兵 → military 军事的、militia 民兵、militant 好斗的即尚武的",
      examples: ["military", "militia", "militant"]
    },
    {
      id: "r-min",
      kind: "root",
      text: "min",
      forms: ["min"],
      meaning: "小；少；突出",
      note: "小 → minimum 最小的量、minor 较小的、prominent 向前突出即显眼的",
      examples: ["minimum", "minor", "prominent"]
    },
    {
      id: "r-mir",
      kind: "root",
      text: "mir",
      forms: ["mir"],
      meaning: "惊奇；看",
      note: "惊奇 → miracle 令人惊奇之事即奇迹、mirror 镜子、admire 看了惊叹即钦佩",
      examples: ["miracle", "mirror", "admire"]
    },
    {
      id: "r-mit",
      kind: "root",
      text: "mit / miss",
      forms: ["mit", "miss"],
      meaning: "送；派；放出",
      note: "送 → transmit 送过去即传送、mission 派出的任务、dismiss 送走即解散",
      examples: ["transmit", "mission", "dismiss"]
    },
    {
      id: "r-mob",
      kind: "root",
      text: "mob / mot / mov",
      forms: ["mob", "mot", "mov"],
      meaning: "移动；动",
      note: "移动 → mobile 可动的、motion 运动、remove 移开即移除",
      examples: ["mobile", "motion", "remove"]
    },
    {
      id: "r-mon",
      kind: "root",
      text: "mon / monit",
      forms: ["mon", "monit"],
      meaning: "警告；提醒；单一",
      note: "提醒 → monitor 提醒者即监视器、monument 提醒之物即纪念碑",
      examples: ["monitor", "monument", "summon"]
    },
    {
      id: "r-mor",
      kind: "root",
      text: "mor / mort",
      forms: ["mor", "mort"],
      meaning: "死；death",
      note: "死 → mortal 会死的、immortal 不死的即不朽的、mortgage 死契即抵押",
      examples: ["mortal", "immortal", "mortgage"]
    },
    {
      id: "r-morph",
      kind: "root",
      text: "morph",
      forms: ["morph"],
      meaning: "形状；form",
      note: "形状 → morphology 形态学、amorphous 没有形状的即无定形的",
      examples: ["morphology", "amorphous", "metamorphosis"]
    },
    {
      id: "r-nat",
      kind: "root",
      text: "nat / nasc",
      forms: ["nat", "nasc"],
      meaning: "出生；天生",
      note: "出生 → nature 天性、native 出生的地方即本地的、nascent 刚出生的",
      examples: ["nature", "native", "nascent"]
    },
    {
      id: "r-nav",
      kind: "root",
      text: "nav",
      forms: ["nav"],
      meaning: "船；航行",
      note: "船 → navy 船队即海军、navigate 驾船即航行、naval 海军的",
      examples: ["navy", "navigate", "naval"]
    },
    {
      id: "r-neg",
      kind: "root",
      text: "neg",
      forms: ["neg"],
      meaning: "否认；不",
      note: "否认 → negative 否定的、neglect 不去拾即忽视、negligible 可忽视的",
      examples: ["negative", "neglect", "negligible"]
    },
    {
      id: "r-nom",
      kind: "root",
      text: "nom / nym",
      forms: ["nom", "nym"],
      meaning: "名字；名称",
      note: "名字 → nominate 提名即报出名字、synonym 同名的词即同义词",
      examples: ["nominate", "synonym", "anonymous"]
    },
    {
      id: "r-norm",
      kind: "root",
      text: "norm",
      forms: ["norm"],
      meaning: "标准；规范",
      note: "标准 → normal 合标准的即正常的、abnormal 离标准的即反常的",
      examples: ["normal", "abnormal", "enormous"]
    },
    {
      id: "r-nov",
      kind: "root",
      text: "nov",
      forms: ["nov"],
      meaning: "新；new",
      note: "新 → novel 新的即新奇的、小说，innovate 使变新即创新",
      examples: ["novel", "innovate", "renovate"]
    },
    {
      id: "r-nutri",
      kind: "root",
      text: "nutri / nurs",
      forms: ["nutri", "nurs"],
      meaning: "营养；喂养",
      note: "营养 → nutrition 营养、nutrient 养分、nurse 喂养的人即护士",
      examples: ["nutrition", "nutrient", "nurse"]
    },
    {
      id: "r-ocul",
      kind: "root",
      text: "ocul",
      forms: ["ocul"],
      meaning: "眼睛；eye",
      note: "眼睛 → ocular 眼睛的、binocular 双目的即双筒望远镜",
      examples: ["ocular", "binocular", "oculist"]
    },
    {
      id: "r-oper",
      kind: "root",
      text: "oper",
      forms: ["oper"],
      meaning: "工作；劳作",
      note: "工作 → operate 干活即操作、cooperate 一起干即合作、opera 作品",
      examples: ["operate", "cooperate", "opera"]
    },
    {
      id: "r-opt",
      kind: "root",
      text: "opt",
      forms: ["opt"],
      meaning: "选择；看；最好",
      note: "选择 → option 选项、optical 看东西的即视觉的、optimist 往最好处想的人",
      examples: ["option", "optical", "optimist"]
    },
    {
      id: "r-ora",
      kind: "root",
      text: "ora / orat",
      forms: ["ora", "orat"],
      meaning: "嘴；说；祈祷",
      note: "嘴 → oral 口的、oration 讲话即演说、orator 说话的人即演说家",
      examples: ["oral", "oration", "orator"]
    },
    {
      id: "r-par",
      kind: "root",
      text: "par / para",
      forms: ["par", "para"],
      meaning: "准备；显现；并列",
      note: "准备 → prepare 预先备好、apparent 显现出来即明显的",
      examples: ["prepare", "apparent", "compare"]
    },
    {
      id: "r-part",
      kind: "root",
      text: "part",
      forms: ["part"],
      meaning: "部分；分开",
      note: "部分 → partial 部分的、participate 取一部分即参与、depart 分开走即离开",
      examples: ["partial", "participate", "depart"]
    },
    {
      id: "r-pass",
      kind: "root",
      text: "pass / pat",
      forms: ["pass", "pat"],
      meaning: "通过；感受；忍受",
      note: "通过 → passage 通道、passion 感受强烈即激情、patient 能忍的人即病人",
      examples: ["passage", "passion", "patient"]
    },
    {
      id: "r-pater",
      kind: "root",
      text: "pater / patr",
      forms: ["pater", "patr"],
      meaning: "父亲；祖国",
      note: "父亲 → paternal 父亲的、patriot 爱父辈之地的人即爱国者",
      examples: ["paternal", "patriot", "patron"]
    },
    {
      id: "r-path",
      kind: "root",
      text: "path",
      forms: ["path"],
      meaning: "感觉；疾病",
      note: "感觉 → sympathy 共同的感觉即同情、pathology 病的学问即病理学",
      examples: ["sympathy", "pathology", "pathetic"]
    },
    {
      id: "r-ped",
      kind: "root",
      text: "ped / pod",
      forms: ["ped", "pod"],
      meaning: "脚；足；儿童",
      note: "脚 → pedestrian 用脚走的人、pedal 脚的踏板、tripod 三只脚即三脚架",
      examples: ["pedestrian", "pedal", "tripod"]
    },
    {
      id: "r-pel",
      kind: "root",
      text: "pel / puls",
      forms: ["pel", "puls"],
      meaning: "推；驱使；跳动",
      note: "推 → expel 推出去即驱逐、compel 一起推即强迫、impulse 内心推动即冲动",
      examples: ["expel", "compel", "impulse", "repulse"]
    },
    {
      id: "r-pend",
      kind: "root",
      text: "pend / pens",
      forms: ["pend", "pens"],
      meaning: "悬挂；称量；花费",
      note: "悬挂 → depend 挂着即依靠、pendant 挂着的东西即吊坠、expensive 花钱多的",
      examples: ["depend", "pendant", "expensive", "pension"]
    },
    {
      id: "r-pet",
      kind: "root",
      text: "pet / petit",
      forms: ["pet", "petit"],
      meaning: "追求；请求；小",
      note: "追求 → petition 请求、appetite 追求食物即食欲、compete 一起追求即竞争",
      examples: ["petition", "appetite", "compete"]
    },
    {
      id: "r-phon",
      kind: "root",
      text: "phon",
      forms: ["phon"],
      meaning: "声音；sound",
      note: "声音 → phone 传声之物即电话、phonetics 声音的学问即语音学",
      examples: ["phone", "phonetics", "symphony"]
    },
    {
      id: "r-photo",
      kind: "root",
      text: "photo",
      forms: ["photo"],
      meaning: "光；light",
      note: "光 → photograph 用光写下的图即照片、photon 光的粒子即光子",
      examples: ["photograph", "photon", "photosynthesis"]
    },
    {
      id: "r-plac",
      kind: "root",
      text: "plac",
      forms: ["plac"],
      meaning: "使高兴；平静；放",
      note: "使高兴 → placate 使息怒即安抚、placid 平静的、complacent 满足自得",
      examples: ["placate", "placid", "complacent"]
    },
    {
      id: "r-ple",
      kind: "root",
      text: "ple / plen / plet",
      forms: ["ple", "plen", "plet"],
      meaning: "满；填充；full",
      note: "满 → complete 完全填满即完成、plenty 满出来即丰富、supplement 补充填满",
      examples: ["complete", "plenty", "supplement", "complement"]
    },
    {
      id: "r-plic",
      kind: "root",
      text: "plic / plex / ply",
      forms: ["plic", "plex", "ply"],
      meaning: "折叠；重叠；层",
      note: "折叠 → complex 多层叠在一起即复杂、apply 折上去即应用、multiply 多叠即乘",
      examples: ["complicated", "complex", "apply", "multiply"]
    },
    {
      id: "r-pon",
      kind: "root",
      text: "pon / pos / posit",
      forms: ["pon", "pos", "posit"],
      meaning: "放置；put",
      note: "放置 → compose 放到一起即组成、position 放的位置、postpone 往后放即推迟",
      examples: ["compose", "position", "postpone", "deposit"]
    },
    {
      id: "r-popul",
      kind: "root",
      text: "popul / publ",
      forms: ["popul", "publ"],
      meaning: "人民；公众",
      note: "人民 → popular 受大众喜爱的、population 全体人民即人口、public 公众的",
      examples: ["popular", "population", "public", "publish"]
    },
    {
      id: "r-port",
      kind: "root",
      text: "port",
      forms: ["port"],
      meaning: "搬运；港口",
      note: "搬运 → transport 运过去即运输、import 运进来即进口、export 运出去即出口",
      examples: ["transport", "import", "export", "portable"]
    },
    {
      id: "r-pot",
      kind: "root",
      text: "pot",
      forms: ["pot"],
      meaning: "能力；力量；能",
      note: "能力 → potential 潜在的能力即潜力、potent 有力的、omnipotent 全能",
      examples: ["potential", "potent", "omnipotent"]
    },
    {
      id: "r-prehend",
      kind: "root",
      text: "prehend / pris",
      forms: ["prehend", "pris"],
      meaning: "抓住；抓获",
      note: "抓住 → comprehend 全都抓住即理解、prison 抓起来关的地方即监狱",
      examples: ["comprehend", "prison", "surprise"]
    },
    {
      id: "r-prim",
      kind: "root",
      text: "prim / prin",
      forms: ["prim", "prin"],
      meaning: "第一；首要；最初",
      note: "第一 → primary 第一位的即主要的、primitive 最初的、principle 首要之理",
      examples: ["primary", "primitive", "principle"]
    },
    {
      id: "r-priv",
      kind: "root",
      text: "priv",
      forms: ["priv"],
      meaning: "私人；剥夺；分开",
      note: "私人 → private 私人的、privilege 私人的好处即特权、deprive 夺走私产即剥夺",
      examples: ["private", "privilege", "deprive"]
    },
    {
      id: "r-prob",
      kind: "root",
      text: "prob / prov",
      forms: ["prob", "prov"],
      meaning: "证明；检验；好",
      note: "检验 → prove 检验为真即证明、probable 可证明的即很可能的、approve 认可",
      examples: ["prove", "probable", "approve", "improve"]
    },
    {
      id: "r-proper",
      kind: "root",
      text: "proper / propri",
      forms: ["proper", "propri"],
      meaning: "自己的；恰当的",
      note: "自己的 → property 自己拥有的东西即财产、appropriate 使其成为自己的即恰当的",
      examples: ["property", "appropriate", "proprietor"]
    },
    {
      id: "r-psych",
      kind: "root",
      text: "psych",
      forms: ["psych"],
      meaning: "心灵；精神",
      note: "心灵 → psychology 心灵的学问即心理学、psychic 通灵的",
      examples: ["psychology", "psychic", "psychiatry"]
    },
    {
      id: "r-punct",
      kind: "root",
      text: "punct / pung",
      forms: ["punct", "pung"],
      meaning: "点；刺；扎",
      note: "点 → punctual 卡在点上即准时的、puncture 刺出小点即刺孔、pungent 刺鼻的",
      examples: ["punctual", "puncture", "pungent"]
    },
    {
      id: "r-quer",
      kind: "root",
      text: "quer / quir / ques / quis",
      forms: ["quer", "quir", "ques", "quis"],
      meaning: "问；寻求；寻找",
      note: "问 → query 询问、inquire 问进去即打听、question 问题、require 再寻求即需要",
      examples: ["query", "inquire", "question", "require"]
    },
    {
      id: "r-rad",
      kind: "root",
      text: "rad / ras",
      forms: ["rad", "ras"],
      meaning: "根；光线；刮擦",
      note: "根 → radical 从根上的即根本的、radiate 像光线一样发散、erase 刮掉即擦除",
      examples: ["radical", "radiate", "erase"]
    },
    {
      id: "r-rect",
      kind: "root",
      text: "rect / reg",
      forms: ["rect", "reg"],
      meaning: "直；正；统治",
      note: "直 → correct 使变直即纠正、direct 指向正前方即直接的、regulate 统治即管理",
      examples: ["correct", "direct", "regular", "regulate"]
    },
    {
      id: "r-rid",
      kind: "root",
      text: "rid / ris",
      forms: ["rid", "ris"],
      meaning: "笑；嘲笑",
      note: "笑 → ridiculous 引人发笑的即荒谬的、ridicule 嘲笑、derision 嘲弄",
      examples: ["ridiculous", "ridicule", "derision"]
    },
    {
      id: "r-rog",
      kind: "root",
      text: "rog",
      forms: ["rog"],
      meaning: "问；要求；索求",
      note: "问 → interrogate 在中间发问即审问、arrogant 一再索求即傲慢的",
      examples: ["interrogate", "arrogant", "derogatory"]
    },
    {
      id: "r-rupt",
      kind: "root",
      text: "rupt",
      forms: ["rupt"],
      meaning: "破；断；break",
      note: "破 → interrupt 在中间破开即打断、corrupt 全破了即腐败、erupt 破土而出",
      examples: ["interrupt", "corrupt", "erupt", "bankrupt"]
    },
    {
      id: "r-sacr",
      kind: "root",
      text: "sacr / sanct",
      forms: ["sacr", "sanct"],
      meaning: "神圣；圣洁",
      note: "神圣 → sacred 神圣的、sacrifice 献给神的即牺牲、sanctuary 神圣之地即避难所",
      examples: ["sacred", "sacrifice", "sanctuary"]
    },
    {
      id: "r-sal",
      kind: "root",
      text: "sal / sult",
      forms: ["sal", "sult"],
      meaning: "跳；盐；健康",
      note: "跳 → insult 跳上来踩即侮辱、result 跳回来的东西即结果、salary 盐钱即薪水",
      examples: ["salary", "result", "insult"]
    },
    {
      id: "r-sci",
      kind: "root",
      text: "sci",
      forms: ["sci"],
      meaning: "知道；knowledge",
      note: "知道 → science 知道的学问即科学、conscious 都知道的即意识到的",
      examples: ["science", "conscious", "conscience"]
    },
    {
      id: "r-scop",
      kind: "root",
      text: "scop",
      forms: ["scop"],
      meaning: "看；观察；范围",
      note: "看 → telescope 看远处的镜子即望远镜、scope 看的范围即余地",
      examples: ["telescope", "microscope", "scope"]
    },
    {
      id: "r-scrib",
      kind: "root",
      text: "scrib / script",
      forms: ["scrib", "script"],
      meaning: "写；write",
      note: "写 → describe 写下来即描述、manuscript 手写的稿子即手稿、subscribe 写在下面即订阅",
      examples: ["describe", "manuscript", "subscribe", "prescription"]
    },
    {
      id: "r-sect",
      kind: "root",
      text: "sect / seg",
      forms: ["sect", "seg"],
      meaning: "切；割；分",
      note: "切 → section 切开的部分即部分、insect 身上有切痕的虫即昆虫、segment 切下的一段",
      examples: ["section", "insect", "segment"]
    },
    {
      id: "r-sed",
      kind: "root",
      text: "sed / sess / sid",
      forms: ["sed", "sess", "sid"],
      meaning: "坐；settle",
      note: "坐 → session 坐在一起开会即会议、reside 坐下来住即居住、sediment 沉坐之物即沉淀",
      examples: ["session", "reside", "sediment", "president"]
    },
    {
      id: "r-sen",
      kind: "root",
      text: "sen",
      forms: ["sen"],
      meaning: "老；长；年长",
      note: "老 → senior 年长的、senate 老人议事会即参议院、senile 年老体衰的",
      examples: ["senior", "senate", "senile"]
    },
    {
      id: "r-sens",
      kind: "root",
      text: "sens / sent",
      forms: ["sens", "sent"],
      meaning: "感觉；感受",
      note: "感觉 → sense 感觉、sensitive 感觉灵敏的、sentiment 感情、consent 共同感觉即同意",
      examples: ["sense", "sensitive", "sentiment", "consent"]
    },
    {
      id: "r-sequ",
      kind: "root",
      text: "sequ / secut / sue",
      forms: ["sequ", "secut", "sue"],
      meaning: "跟随；follow",
      note: "跟随 → sequence 一个跟一个即顺序、consecutive 连续跟着的、pursue 一直跟即追求",
      examples: ["sequence", "consecutive", "pursue"]
    },
    {
      id: "r-serv",
      kind: "root",
      text: "serv",
      forms: ["serv"],
      meaning: "服务；保持；奴仆",
      note: "服务 → service 服务、preserve 一直保持即保存、observe 守住看着即观察",
      examples: ["service", "preserve", "observe", "servant"]
    },
    {
      id: "r-sign",
      kind: "root",
      text: "sign",
      forms: ["sign"],
      meaning: "记号；标志；sign",
      note: "记号 → signal 做出记号即信号、design 画下记号即设计、significant 有记号的即重要的",
      examples: ["signal", "design", "significant"]
    },
    {
      id: "r-simil",
      kind: "root",
      text: "simil / simul / sembl",
      forms: ["simil", "simul", "sembl"],
      meaning: "相似；相像；一起",
      note: "相似 → similar 相似的、simulate 做得相似即模仿、assemble 使聚在一起即集合",
      examples: ["similar", "simulate", "assemble", "resemble"]
    },
    {
      id: "r-sist",
      kind: "root",
      text: "sist / sta / stat / stit",
      forms: ["sist", "sta", "stat", "stit"],
      meaning: "站；立；stand",
      note: "站 → insist 站在上面即坚持、stable 站得稳的即稳定的、constitute 站在一起即构成",
      examples: ["insist", "stable", "station", "constitute"]
    },
    {
      id: "r-soci",
      kind: "root",
      text: "soci",
      forms: ["soci"],
      meaning: "同伴；社会；结交",
      note: "同伴 → society 结伴而成即社会、social 社交的、associate 结成同伴即联系",
      examples: ["society", "social", "associate"]
    },
    {
      id: "r-sol",
      kind: "root",
      text: "sol",
      forms: ["sol"],
      meaning: "太阳；单独；安慰",
      note: "太阳 → solar 太阳的、solitary 独自一人的即孤独的、console 安慰",
      examples: ["solar", "solitary", "console"]
    },
    {
      id: "r-solv",
      kind: "root",
      text: "solv / solut",
      forms: ["solv", "solut"],
      meaning: "松开；解开；溶解",
      note: "松开 → solve 解开难题即解决、dissolve 分开松开即溶解、solution 解决办法",
      examples: ["solve", "dissolve", "solution"]
    },
    {
      id: "r-somn",
      kind: "root",
      text: "somn",
      forms: ["somn"],
      meaning: "睡眠；睡",
      note: "睡眠 → insomnia 睡不着即失眠、somnolent 想睡的、somnambulist 梦游者",
      examples: ["insomnia", "somnolent", "somnambulist"]
    },
    {
      id: "r-son",
      kind: "root",
      text: "son",
      forms: ["son"],
      meaning: "声音；sound",
      note: "声音 → sonic 声音的、resonance 声音回响即共鸣、supersonic 超音速的",
      examples: ["sonic", "resonance", "supersonic", "unison"]
    },
    {
      id: "r-soph",
      kind: "root",
      text: "soph",
      forms: ["soph"],
      meaning: "智慧；聪明",
      note: "智慧 → philosophy 爱智慧的学问即哲学、sophisticated 精明老练的",
      examples: ["philosophy", "sophisticated", "sophomore"]
    },
    {
      id: "r-spec",
      kind: "root",
      text: "spec / spect / spic",
      forms: ["spec", "spect", "spic"],
      meaning: "看；look",
      note: "看 → inspect 看进去即检查、respect 再看一眼即尊重、suspicious 偷偷看的即可疑的",
      examples: ["inspect", "respect", "spectacle", "suspicious"]
    },
    {
      id: "r-sper",
      kind: "root",
      text: "sper",
      forms: ["sper"],
      meaning: "希望；hope",
      note: "希望 → prosper 按希望发展即繁荣、desperate 失去希望的即绝望的",
      examples: ["prosper", "desperate", "prosperity"]
    },
    {
      id: "r-spir",
      kind: "root",
      text: "spir",
      forms: ["spir"],
      meaning: "呼吸；精神；气",
      note: "呼吸 → spirit 呼吸之气即精神、inspire 吸进一口气即鼓舞、respiration 呼吸",
      examples: ["spirit", "inspire", "respiration", "conspire"]
    },
    {
      id: "r-string",
      kind: "root",
      text: "string / strict",
      forms: ["string", "strict"],
      meaning: "拉紧；捆紧；束缚",
      note: "拉紧 → strict 拉得紧紧的即严格的、restrict 拉回来即限制、stringent 严格的",
      examples: ["strict", "restrict", "stringent", "constrict"]
    },
    {
      id: "r-stru",
      kind: "root",
      text: "stru / struct",
      forms: ["stru", "struct"],
      meaning: "建造；堆叠；build",
      note: "建造 → structure 建起来的东西即结构、construct 一起建造即构建、instrument 工具",
      examples: ["structure", "construct", "instrument", "destruction"]
    },
    {
      id: "r-sum",
      kind: "root",
      text: "sum / sumpt",
      forms: ["sum", "sumpt"],
      meaning: "拿；取；消费",
      note: "拿 → consume 全拿走即消耗、assume 拿过来即假定、assumption 假定",
      examples: ["consume", "assume", "assumption", "summary"]
    },
    {
      id: "r-tact",
      kind: "root",
      text: "tact / tang / tag",
      forms: ["tact", "tang", "tag"],
      meaning: "接触；触摸；touch",
      note: "接触 → contact 一起接触即联系、tangible 可触摸的即切实的、contagious 接触传染的",
      examples: ["contact", "tangible", "contagious", "tactic"]
    },
    {
      id: "r-tain",
      kind: "root",
      text: "tain / ten / tent / tin",
      forms: ["tain", "ten", "tent", "tin"],
      meaning: "拿住；保持；持有",
      note: "拿住 → contain 一起拿住即包含、maintain 一直拿住即维持、continue 连着拿即继续",
      examples: ["contain", "maintain", "continue", "content"]
    },
    {
      id: "r-tect",
      kind: "root",
      text: "tect",
      forms: ["tect"],
      meaning: "覆盖；遮盖；建造",
      note: "覆盖 → protect 在前面盖上即保护、detect 揭掉盖子即察觉、architect 首要的建造者",
      examples: ["protect", "detect", "architect"]
    },
    {
      id: "r-tele",
      kind: "root",
      text: "tele",
      forms: ["tele"],
      meaning: "远；far",
      note: "远 → telephone 传声到远处即电话、television 看远处即电视",
      examples: ["telephone", "television", "telescope", "telegram"]
    },
    {
      id: "r-temp",
      kind: "root",
      text: "temp / tempor",
      forms: ["temp", "tempor"],
      meaning: "时间；时期",
      note: "时间 → temporary 只在一段时间的即暂时的、contemporary 同时代的、tempo 节拍",
      examples: ["temporary", "contemporary", "tempo"]
    },
    {
      id: "r-tend",
      kind: "root",
      text: "tend / tens / tent",
      forms: ["tend", "tens", "tent"],
      meaning: "伸展；拉紧；倾向",
      note: "伸展 → extend 伸出去即延伸、tension 拉紧的状态即紧张、tentative 试探伸出的",
      examples: ["extend", "tension", "tentative", "intend"]
    },
    {
      id: "r-termin",
      kind: "root",
      text: "termin",
      forms: ["termin"],
      meaning: "界限；终点；结束",
      note: "界限 → terminal 到界限的即终点站、determine 划出界限即决定、exterminate 赶出界限",
      examples: ["terminal", "determine", "exterminate", "terminate"]
    },
    {
      id: "r-terr",
      kind: "root",
      text: "terr",
      forms: ["terr"],
      meaning: "土地；earth；恐吓",
      note: "土地 → territory 一片土地即领土、terrain 地形、terror 吓得人发抖",
      examples: ["territory", "terrain", "terror"]
    },
    {
      id: "r-test",
      kind: "root",
      text: "test",
      forms: ["test"],
      meaning: "证明；作证；见证",
      note: "作证 → testify 作证、protest 在众人前作证即抗议、testament 见证即遗嘱",
      examples: ["testify", "protest", "testament", "contest"]
    },
    {
      id: "r-text",
      kind: "root",
      text: "text",
      forms: ["text"],
      meaning: "编织；文本；text",
      note: "编织 → textile 编织物即纺织品、texture 编织出的手感即质地、context 编在一起的上下文",
      examples: ["textile", "texture", "context"]
    },
    {
      id: "r-the",
      kind: "root",
      text: "the / theo",
      forms: ["the", "theo"],
      meaning: "神；god",
      note: "神 → theology 神的学问即神学、atheist 没有神论的人即无神论者、theory 观看神",
      examples: ["theology", "atheist", "theory"]
    },
    {
      id: "r-therm",
      kind: "root",
      text: "therm",
      forms: ["therm"],
      meaning: "热；heat",
      note: "热 → thermal 热的、thermometer 测热的表即温度计、hypothermia 体温过低",
      examples: ["thermal", "thermometer", "hypothermia"]
    },
    {
      id: "r-tort",
      kind: "root",
      text: "tort",
      forms: ["tort"],
      meaning: "扭；拧；扭曲",
      note: "扭 → distort 扭歪即扭曲、torture 把人扭起来即折磨、retort 扭回来即反驳",
      examples: ["distort", "torture", "retort", "contort"]
    },
    {
      id: "r-tox",
      kind: "root",
      text: "tox",
      forms: ["tox"],
      meaning: "毒；poison",
      note: "毒 → toxic 有毒的、toxin 毒素、detox 去毒即戒毒、intoxicate 使中毒即醉",
      examples: ["toxic", "toxin", "detox", "intoxicate"]
    },
    {
      id: "r-tract",
      kind: "root",
      text: "tract",
      forms: ["tract"],
      meaning: "拉；拖；draw",
      note: "拉 → attract 拉过来即吸引、contract 拉到一起即合同、extract 拉出来即提取",
      examples: ["attract", "contract", "extract", "tractor"]
    },
    {
      id: "r-trib",
      kind: "root",
      text: "trib",
      forms: ["trib"],
      meaning: "给予；分配；部落",
      note: "给予 → contribute 一起给出即贡献、distribute 分开给出即分配、tribute 贡品",
      examples: ["contribute", "distribute", "tribute", "tribe"]
    },
    {
      id: "r-trud",
      kind: "root",
      text: "trud / trus",
      forms: ["trud", "trus"],
      meaning: "推；冲；挤",
      note: "推 → intrude 推进去即闯入、protrude 向前推出即突出、obtrusive 硬挤上来的",
      examples: ["intrude", "protrude", "obtrusive"]
    },
    {
      id: "r-turb",
      kind: "root",
      text: "turb",
      forms: ["turb"],
      meaning: "搅动；混乱；扰乱",
      note: "搅动 → disturb 搅乱即打扰、turbulent 搅动不安的即动荡的、turbine 涡轮",
      examples: ["disturb", "turbulent", "turbine"]
    },
    {
      id: "r-umbr",
      kind: "root",
      text: "umbr",
      forms: ["umbr"],
      meaning: "阴影；影子；shade",
      note: "阴影 → umbrella 遮出阴影的东西即伞、umbrage 心中阴影即不快",
      examples: ["umbrella", "umbrage", "penumbra"]
    },
    {
      id: "r-und",
      kind: "root",
      text: "und / unda",
      forms: ["und", "unda"],
      meaning: "波浪；流动；溢出",
      note: "波浪 → abundant 水波满溢的即丰富的、undulate 起波浪即起伏、inundate 水漫上来即淹没",
      examples: ["abundant", "undulate", "inundate", "redundant"]
    },
    {
      id: "r-urb",
      kind: "root",
      text: "urb",
      forms: ["urb"],
      meaning: "城市；city",
      note: "城市 → urban 城市的、suburb 城市下面即郊区、urbane 有城市风度的即文雅的",
      examples: ["urban", "suburb", "urbane"]
    },
    {
      id: "r-vac",
      kind: "root",
      text: "vac / van / void",
      forms: ["vac", "van", "void"],
      meaning: "空；empty",
      note: "空 → vacation 空出来的日子即假期、vacuum 真空、vanish 变成空即消失",
      examples: ["vacation", "vacuum", "vanish", "avoid"]
    },
    {
      id: "r-vad",
      kind: "root",
      text: "vad / vas",
      forms: ["vad", "vas"],
      meaning: "走；行走；go",
      note: "走 → invade 走进去即入侵、evade 走出去即逃避、invasion 入侵",
      examples: ["invade", "evade", "invasion", "pervasive"]
    },
    {
      id: "r-val",
      kind: "root",
      text: "val / vail",
      forms: ["val", "vail"],
      meaning: "价值；强壮；有用",
      note: "价值 → value 价值、valid 有力有效的、available 可用的、prevail 更有力即盛行",
      examples: ["value", "valid", "available", "prevail"]
    },
    {
      id: "r-ven",
      kind: "root",
      text: "ven / vent",
      forms: ["ven", "vent"],
      meaning: "来；come",
      note: "来 → invent 想出来即发明、prevent 先来挡住即阻止、convention 走到一起即会议",
      examples: ["invent", "prevent", "convention", "avenue"]
    },
    {
      id: "r-ver",
      kind: "root",
      text: "ver",
      forms: ["ver"],
      meaning: "真实；true",
      note: "真实 → verify 使成真即核实、verdict 说出真相即裁决、veracity 真实",
      examples: ["verify", "verdict", "veracity"]
    },
    {
      id: "r-verb",
      kind: "root",
      text: "verb",
      forms: ["verb"],
      meaning: "词；话语；word",
      note: "词 → verbal 词语的即口头的、proverb 放在前面的词即谚语、verbose 话多的",
      examples: ["verbal", "proverb", "verbose"]
    },
    {
      id: "r-vert",
      kind: "root",
      text: "vert / vers",
      forms: ["vert", "vers"],
      meaning: "转；转向；turn",
      note: "转 → convert 转过来即转变、reverse 转回去即颠倒、universe 转成一体即宇宙",
      examples: ["convert", "reverse", "versatile", "universe"]
    },
    {
      id: "r-vest",
      kind: "root",
      text: "vest",
      forms: ["vest"],
      meaning: "衣服；穿衣；投资",
      note: "穿衣 → invest 给穿上衣服即投资、divest 脱掉衣服即剥夺、vestment 法衣",
      examples: ["invest", "divest", "vestment"]
    },
    {
      id: "r-via",
      kind: "root",
      text: "via / viat / voy",
      forms: ["via", "viat", "voy"],
      meaning: "路；道路；way",
      note: "路 → deviate 离开大路即偏离、trivial 路人都知道的即琐碎的、voyage 上路即航行",
      examples: ["deviate", "trivial", "voyage"]
    },
    {
      id: "r-vid",
      kind: "root",
      text: "vid / vis",
      forms: ["vid", "vis"],
      meaning: "看；see",
      note: "看 → video 看的东西即视频、visible 看得见的、provide 向前看即预备提供",
      examples: ["video", "visible", "provide", "television"]
    },
    {
      id: "r-vinc",
      kind: "root",
      text: "vinc / vict",
      forms: ["vinc", "vict"],
      meaning: "征服；战胜；胜利",
      note: "征服 → victory 胜利、convince 完全征服对方即说服、invincible 无法征服的即无敌的",
      examples: ["victory", "convince", "invincible", "evict"]
    },
    {
      id: "r-viv",
      kind: "root",
      text: "viv / vit",
      forms: ["viv", "vit"],
      meaning: "生命；活；life",
      note: "生命 → survive 活过来即幸存、vital 生命的即至关重要的、vivid 有生气的即生动的",
      examples: ["survive", "vital", "vivid", "revive"]
    },
    {
      id: "r-voc",
      kind: "root",
      text: "voc / vok",
      forms: ["voc", "vok"],
      meaning: "叫；声音；呼喊",
      note: "叫 → vocal 出声的即嗓音的、vocabulary 叫得出的词即词汇、invoke 叫进来即祈求",
      examples: ["vocal", "vocabulary", "invoke", "provoke"]
    },
    {
      id: "r-vol",
      kind: "root",
      text: "vol / volunt",
      forms: ["vol", "volunt"],
      meaning: "意愿；意志；自愿",
      note: "意愿 → voluntary 出于意愿的即自愿的、volunteer 自愿者、benevolent 怀着好意的",
      examples: ["voluntary", "volunteer", "benevolent", "volition"]
    },
    {
      id: "r-volv",
      kind: "root",
      text: "volv / volut",
      forms: ["volv", "volut"],
      meaning: "滚动；卷；转",
      note: "滚动 → revolve 转回来即旋转、involve 卷进去即卷入、evolution 滚动向前即进化",
      examples: ["revolve", "involve", "evolution", "revolution"]
    },
    {
      id: "r-vor",
      kind: "root",
      text: "vor",
      forms: ["vor"],
      meaning: "吃；吞食；eat",
      note: "吃 → voracious 大口吞吃的即贪婪的、carnivore 吃肉的动物即食肉动物",
      examples: ["voracious", "carnivore", "herbivore", "omnivore"]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = ENTRIES;
  if (typeof window !== "undefined") {
    window.MORPH_DATA = window.MORPH_DATA || {};
    window.MORPH_DATA.rootM = ENTRIES;
  }
})();