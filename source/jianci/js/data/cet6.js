/* 简词词库 · 六级核心词汇 */
(function () {
  var WORDS = [
    {
      id: "c6-001",
      word: "abandon",
      phonetic: "/əˈbændən/",
      pos: "v.",
      meaning: "放弃；抛弃；遗弃",
      example: { en: "He abandoned his old car by the road.", zh: "他把旧车丢在了路边。" },
      similar: [
        { word: "abundant", meaning: "adj. 丰富的；充裕的", note: "拼写只差一个字母，abandon 是「放弃」" }
      ],
      forms: [
        { word: "abandonment", pos: "n.", meaning: "放弃；遗弃" },
        { word: "abandoned", pos: "adj.", meaning: "被遗弃的" }
      ]
    },
    {
      id: "c6-002",
      word: "abolish",
      phonetic: "/əˈbɒlɪʃ/",
      pos: "v.",
      meaning: "废除；取消",
      example: { en: "Congress voted to abolish the unfair tax on imported books last year.", zh: "去年国会投票废除了对进口书籍征收的不公平税款。" },
      similar: [
        { word: "admonish", meaning: "v. 告诫；警告", note: "两词都以元音开头且后接 b/m 与 sh 音，abolish 指「废除」，admonish 指「告诫」" }
      ],
      forms: [
        { word: "abolition", pos: "n.", meaning: "废除；废止" },
        { word: "abolished", pos: "v.", meaning: "废除（过去式）" }
      ]
    },
    {
      id: "c6-003",
      word: "abrupt",
      phonetic: "/əˈbrʌpt/",
      pos: "adj.",
      meaning: "突然的；唐突的",
      example: { en: "The meeting came to an abrupt end when the manager walked out.", zh: "经理走出去之后，会议突然结束了。" },
      similar: [
        { word: "corrupt", meaning: "adj. 腐败的；贪污的", note: "同含 rupt，abrupt 指「突然的」，corrupt 指「腐败的」" }
      ],
      forms: [
        { word: "abruptly", pos: "adv.", meaning: "突然地；唐突地" },
        { word: "abruptness", pos: "n.", meaning: "突然；唐突" }
      ]
    },
    {
      id: "c6-004",
      word: "assemble",
      phonetic: "/əˈsembl/",
      pos: "v.",
      meaning: "集合；聚集；组装",
      example: { en: "The workers assemble the parts into a complete engine within minutes.", zh: "工人们几分钟内就把这些零件组装成一台完整的发动机。" },
      similar: [
        { word: "resemble", meaning: "v. 像；类似于", note: "两词都以 -semble 结尾，resemble 指「像」，assemble 指「集合；组装」" }
      ],
      forms: [
        { word: "assembly", pos: "n.", meaning: "集会；组装" },
        { word: "assembled", pos: "v.", meaning: "组装（过去式）" }
      ]
    },
    {
      id: "c6-005",
      word: "acute",
      phonetic: "/əˈkjuːt/",
      pos: "adj.",
      meaning: "敏锐的；急性的；严重的",
      example: { en: "Dogs have an acute sense of smell that helps them find food.", zh: "狗有敏锐的嗅觉，这有助于它们找到食物。" },
      similar: [
        { word: "cute", meaning: "adj. 可爱的；漂亮的", note: "acute 只比 cute 多一个字母 a，cute 意为「可爱的」" }
      ],
      forms: [
        { word: "acutely", pos: "adv.", meaning: "敏锐地；剧烈地" },
        { word: "acuteness", pos: "n.", meaning: "敏锐；剧烈" }
      ]
    },
    {
      id: "c6-006",
      word: "awkward",
      phonetic: "/ˈɔːkwəd/",
      pos: "adj.",
      meaning: "尴尬的；笨拙的；难对付的",
      example: { en: "There was an awkward silence after he asked about her salary.", zh: "他问起她的薪水后，出现了尴尬的沉默。" },
      similar: [
        { word: "forward", meaning: "adv./adj. 向前；前面的", note: "两词都以 -ward 结尾，forward 指「向前」，awkward 指「尴尬的」" }
      ],
      forms: [
        { word: "awkwardly", pos: "adv.", meaning: "尴尬地；笨拙地" },
        { word: "awkwardness", pos: "n.", meaning: "尴尬；笨拙" }
      ]
    },
    {
      id: "c6-007",
      word: "adverse",
      phonetic: "/ˈædvɜːs/",
      pos: "adj.",
      meaning: "不利的；相反的",
      example: { en: "The plan failed because of adverse weather and poor management.", zh: "由于恶劣天气和管理不善，这项计划失败了。" },
      similar: [
        { word: "reverse", meaning: "v./adj. 颠倒；相反的", note: "两词都以 -verse 结尾，adverse 指「不利的」，reverse 指「颠倒的」" }
      ],
      forms: [
        { word: "adversely", pos: "adv.", meaning: "不利地；有害地" },
        { word: "adversity", pos: "n.", meaning: "逆境；不幸" }
      ]
    },
    {
      id: "c6-008",
      word: "advocate",
      phonetic: "/ˈædvəkeɪt/",
      pos: "v./n.",
      meaning: "提倡；拥护；拥护者",
      example: { en: "Many doctors advocate a balanced diet and regular exercise for everyone.", zh: "许多医生提倡人人保持均衡饮食和规律锻炼。" },
      similar: [
        { word: "devote", meaning: "v. 致力于；奉献", note: "两词都含 vot，advocate 指「提倡」，devote 指「致力于」" }
      ],
      forms: [
        { word: "advocacy", pos: "n.", meaning: "拥护；提倡" },
        { word: "advocated", pos: "v.", meaning: "提倡（过去式）" }
      ]
    },
    {
      id: "c6-009",
      word: "assign",
      phonetic: "/əˈsaɪn/",
      pos: "v.",
      meaning: "分配；指派；布置",
      example: { en: "The editor assigned three reporters to cover the election.", zh: "编辑指派了三名记者去报道这次选举。" },
      similar: [
        { word: "design", meaning: "n./v. 设计；图案", note: "两词都含 sign，design 指「设计」，assign 指「分配；指派」" }
      ],
      forms: [
        { word: "assignment", pos: "n.", meaning: "任务；作业；分配" },
        { word: "assigned", pos: "v.", meaning: "分配（过去式）" }
      ]
    },
    {
      id: "c6-010",
      word: "assert",
      phonetic: "/əˈsɜːt/",
      pos: "v.",
      meaning: "断言；主张；维护",
      example: { en: "The author asserts that early reading habits shape adult thinking.", zh: "作者断言，早期阅读习惯会塑造成年人的思维方式。" },
      similar: [
        { word: "insert", meaning: "v. 插入；嵌入", note: "两词都含 sert，insert 指「插入」，assert 指「断言」" }
      ],
      forms: [
        { word: "assertion", pos: "n.", meaning: "断言；主张" },
        { word: "assertive", pos: "adj.", meaning: "坚定自信的" }
      ]
    },
    {
      id: "c6-011",
      word: "assure",
      phonetic: "/əˈʃʊə(r)/",
      pos: "v.",
      meaning: "使确信；向…保证",
      example: { en: "The doctor assured us that the test results were completely normal.", zh: "医生向我们保证检查结果完全正常。" },
      similar: [
        { word: "ensure", meaning: "v. 确保；保证", note: "两词只差一个字母，ensure 指「确保事情发生」，assure 指「向人保证」" }
      ],
      forms: [
        { word: "assurance", pos: "n.", meaning: "保证；信心" },
        { word: "assured", pos: "adj.", meaning: "有把握的；自信的" }
      ]
    },
    {
      id: "c6-012",
      word: "compel",
      phonetic: "/kəmˈpel/",
      pos: "v.",
      meaning: "强迫；迫使；使不得不",
      example: { en: "Poor health compelled him to give up his teaching job.", zh: "健康不佳迫使他放弃了教书的工作。" },
      similar: [
        { word: "expel", meaning: "v. 驱逐；开除", note: "两词都以 -pel 结尾，expel 指「驱逐」，compel 指「强迫」" }
      ],
      forms: [
        { word: "compelling", pos: "adj.", meaning: "令人信服的；引人入胜的" },
        { word: "compelled", pos: "v.", meaning: "强迫（过去式）" }
      ]
    },
    {
      id: "c6-013",
      word: "conform",
      phonetic: "/kənˈfɔːm/",
      pos: "v.",
      meaning: "符合；遵守；顺从",
      example: { en: "All new buildings must conform to the latest safety standards.", zh: "所有新建筑都必须符合最新的安全标准。" },
      similar: [
        { word: "confirm", meaning: "v. 确认；证实", note: "两词只差一个字母，confirm 指「确认」，conform 指「符合」" }
      ],
      forms: [
        { word: "conformity", pos: "n.", meaning: "一致；遵从" },
        { word: "conformed", pos: "v.", meaning: "符合（过去式）" }
      ]
    },
    {
      id: "c6-014",
      word: "assault",
      phonetic: "/əˈsɔːlt/",
      pos: "n./v.",
      meaning: "袭击；攻击；猛攻",
      example: { en: "The soldiers launched a night assault on the enemy camp.", zh: "士兵们对敌营发动了夜袭。" },
      similar: [
        { word: "assail", meaning: "v. 攻击；抨击", note: "两词拼写接近且都含攻击义，assault 可作名词，assail 只作动词" }
      ],
      forms: [
        { word: "assaults", pos: "n.", meaning: "袭击（复数）" },
        { word: "assaulted", pos: "v.", meaning: "袭击（过去式）" }
      ]
    },
    {
      id: "c6-015",
      word: "assess",
      phonetic: "/əˈses/",
      pos: "v.",
      meaning: "评估；估价；评定",
      example: { en: "Experts were invited to assess the damage caused by the flood.", zh: "专家们受邀评估洪水造成的损失。" },
      similar: [
        { word: "access", meaning: "n. 通道；使用权", note: "两词只差一个字母，access 是名词「通道」，assess 是动词「评估」" }
      ],
      forms: [
        { word: "assessment", pos: "n.", meaning: "评估；评价" },
        { word: "assessed", pos: "v.", meaning: "评估（过去式）" }
      ]
    },
    {
      id: "c6-016",
      word: "asset",
      phonetic: "/ˈæset/",
      pos: "n.",
      meaning: "资产；宝贵的人或物",
      example: { en: "Her ability to speak three languages is a great asset.", zh: "她会说三种语言的能力是极大的优势。" },
      similar: [
        { word: "assess", meaning: "v. 评估；估价", note: "两词只差一个字母，assess 是动词「评估」，asset 是名词「资产」" }
      ],
      forms: [
        { word: "assets", pos: "n.", meaning: "资产（复数）" }
      ]
    },
    {
      id: "c6-017",
      word: "assumption",
      phonetic: "/əˈsʌmpʃn/",
      pos: "n.",
      meaning: "假设；假定；承担",
      example: { en: "Your conclusion rests on the assumption that prices will keep falling.", zh: "你的结论建立在物价会持续下跌这一假设之上。" },
      similar: [
        { word: "consumption", meaning: "n. 消费；消耗", note: "两词都以 -sumption 结尾，assumption 指「假设」，consumption 指「消费」" }
      ],
      forms: [
        { word: "assume", pos: "v.", meaning: "假定；承担" },
        { word: "assumed", pos: "v.", meaning: "假定（过去式）" }
      ]
    },
    {
      id: "c6-018",
      word: "attain",
      phonetic: "/əˈteɪn/",
      pos: "v.",
      meaning: "达到；获得；实现",
      example: { en: "Few runners attain the speed needed to win an Olympic medal.", zh: "很少有赛跑者能达到赢得奥运奖牌所要求的速度。" },
      similar: [
        { word: "obtain", meaning: "v. 获得；得到", note: "两词只差首字母，attain 强调经过努力「达到」，obtain 指「得到」" },
        { word: "retain", meaning: "v. 保留；保持", note: "同以 -tain 结尾，attain 指「达到」，retain 指「保留」" }
      ],
      forms: [
        { word: "attainment", pos: "n.", meaning: "达到；成就" },
        { word: "attained", pos: "v.", meaning: "达到（过去式）" }
      ]
    },
    {
      id: "c6-019",
      word: "consent",
      phonetic: "/kənˈsent/",
      pos: "n./v.",
      meaning: "同意；赞成；准许",
      example: { en: "Her parents finally consented to the trip after weeks of discussion.", zh: "经过数周讨论，她父母终于同意这次旅行。" },
      similar: [
        { word: "content", meaning: "adj./n. 满足的；内容", note: "两词只差一个字母，content 指「满足的；内容」，consent 指「同意」" }
      ],
      forms: [
        { word: "consensus", pos: "n.", meaning: "共识；一致意见" },
        { word: "consented", pos: "v.", meaning: "同意（过去式）" }
      ]
    },
    {
      id: "c6-020",
      word: "crisis",
      phonetic: "/ˈkraɪsɪs/",
      pos: "n.",
      meaning: "危机；紧要关头",
      example: { en: "The company survived the financial crisis by cutting unnecessary costs.", zh: "公司通过削减不必要的开支挺过了这场金融危机。" },
      similar: [
        { word: "critic", meaning: "n. 批评家；评论家", note: "两词都以 cri- 开头，critic 指「批评家」，crisis 指「危机」" }
      ],
      forms: [
        { word: "crises", pos: "n.", meaning: "危机（复数）" },
        { word: "critical", pos: "adj.", meaning: "危急的；关键的" }
      ]
    },
    {
      id: "c6-021",
      word: "bizarre",
      phonetic: "/bɪˈzɑː(r)/",
      pos: "adj.",
      meaning: "奇异的；古怪的",
      example: { en: "He wore a bizarre hat covered with plastic flowers and old keys.", zh: "他戴着一顶古怪的帽子，上面缀满塑料花和旧钥匙。" },
      similar: [
        { word: "bazaar", meaning: "n. 集市；义卖市场", note: "两词只差一个字母，bazaar 是名词「集市」，bizarre 是形容词「怪异的」" }
      ],
      forms: [
        { word: "bizarrely", pos: "adv.", meaning: "古怪地；离奇地" }
      ]
    },
    {
      id: "c6-022",
      word: "boost",
      phonetic: "/buːst/",
      pos: "v.",
      meaning: "促进；提高；推动",
      example: { en: "The new policy is expected to boost sales in small towns.", zh: "新政策有望促进小城镇的销售。" },
      similar: [
        { word: "boast", meaning: "v. 自夸；夸耀", note: "两词只差一个字母，boast 指「自夸」，boost 指「促进」" }
      ],
      forms: [
        { word: "boosted", pos: "v.", meaning: "促进（过去式）" },
        { word: "booster", pos: "n.", meaning: "推动者；助推器" }
      ]
    },
    {
      id: "c6-023",
      word: "campaign",
      phonetic: "/kæmˈpeɪn/",
      pos: "n.",
      meaning: "运动；战役；竞选活动",
      example: { en: "The health campaign encouraged young people to stop smoking.", zh: "这场健康运动鼓励年轻人戒烟。" },
      similar: [
        { word: "champagne", meaning: "n. 香槟酒", note: "与 campaign 拼写相近，champagne 指「香槟酒」，注意别写混" }
      ],
      forms: [
        { word: "campaigns", pos: "n.", meaning: "运动（复数）" },
        { word: "campaigned", pos: "v.", meaning: "参加运动（过去式）" }
      ]
    },
    {
      id: "c6-024",
      word: "currency",
      phonetic: "/ˈkʌrənsi/",
      pos: "n.",
      meaning: "货币；通货；流通",
      example: { en: "The value of the local currency fell sharply against the dollar.", zh: "当地货币对美元的汇率大幅下跌。" },
      similar: [
        { word: "current", meaning: "adj./n. 当前的；水流", note: "同根 curr-，current 指「当前的」，currency 指「货币」" }
      ],
      forms: [
        { word: "currencies", pos: "n.", meaning: "货币（复数）" },
        { word: "current", pos: "adj.", meaning: "当前的；现行的" }
      ]
    },
    {
      id: "c6-025",
      word: "cease",
      phonetic: "/siːs/",
      pos: "v.",
      meaning: "停止；终止",
      example: { en: "The factory ceased production after the safety inspection failed.", zh: "安全检查未通过后，工厂停止了生产。" },
      similar: [
        { word: "seize", meaning: "v. 抓住；夺取", note: "两词只差一个字母，seize 指「抓住」，cease 指「停止」" }
      ],
      forms: [
        { word: "ceased", pos: "v.", meaning: "停止（过去式）" },
        { word: "ceaseless", pos: "adj.", meaning: "不停的；不断的" }
      ]
    },
    {
      id: "c6-026",
      word: "cherish",
      phonetic: "/ˈtʃerɪʃ/",
      pos: "v.",
      meaning: "珍惜；珍爱；怀有",
      example: { en: "I still cherish the memory of our first trip together.", zh: "我仍然珍惜我们一起第一次旅行的回忆。" },
      similar: [
        { word: "cherry", meaning: "n. 樱桃；樱桃树", note: "与 cherish 开头相同，cherry 是名词「樱桃」" }
      ],
      forms: [
        { word: "cherished", pos: "adj.", meaning: "珍爱的；珍藏的" }
      ]
    },
    {
      id: "c6-027",
      word: "cite",
      phonetic: "/saɪt/",
      pos: "v.",
      meaning: "引用；引证；举例",
      example: { en: "The professor cited three studies to support her argument.", zh: "教授引用了三项研究来支持她的论点。" },
      similar: [
        { word: "site", meaning: "n. 地点；场地", note: "两词只差一个字母，site 是名词「地点」，cite 是动词「引用」" }
      ],
      forms: [
        { word: "citation", pos: "n.", meaning: "引用；引文" },
        { word: "citing", pos: "v.", meaning: "引用（现在分词）" }
      ]
    },
    {
      id: "c6-028",
      word: "deceive",
      phonetic: "/dɪˈsiːv/",
      pos: "v.",
      meaning: "欺骗；误导；使误解",
      example: { en: "He deceived investors by hiding the true losses of the firm.", zh: "他隐瞒公司的真实亏损，欺骗了投资者。" },
      similar: [
        { word: "receive", meaning: "v. 收到；接到", note: "两词都以 -ceive 结尾，receive 指「收到」，deceive 指「欺骗」" }
      ],
      forms: [
        { word: "deception", pos: "n.", meaning: "欺骗；诡计" },
        { word: "deceptive", pos: "adj.", meaning: "欺骗性的；误导的" }
      ]
    },
    {
      id: "c6-029",
      word: "decent",
      phonetic: "/ˈdiːsnt/",
      pos: "adj.",
      meaning: "体面的；像样的；正派的",
      example: { en: "After years of hard work they finally found a decent place to live.", zh: "经过多年努力，他们终于找到一处像样的住处。" },
      similar: [
        { word: "descend", meaning: "v. 下降；下来", note: "两词前五个字母相同，descend 指「下降」，decent 指「体面的」" }
      ],
      forms: [
        { word: "decently", pos: "adv.", meaning: "体面地；像样地" },
        { word: "decency", pos: "n.", meaning: "得体；正派" }
      ]
    },
    {
      id: "c6-030",
      word: "commence",
      phonetic: "/kəˈmens/",
      pos: "v.",
      meaning: "开始；着手",
      example: { en: "The ceremony will commence at nine sharp in the main hall.", zh: "典礼将于九点整在大礼堂开始。" },
      similar: [
        { word: "comment", meaning: "n. 评论；意见", note: "两词前六个字母相同，comment 是名词「评论」，commence 是动词「开始」" }
      ],
      forms: [
        { word: "commencement", pos: "n.", meaning: "开始；毕业典礼" },
        { word: "commenced", pos: "v.", meaning: "开始（过去式）" }
      ]
    },
    {
      id: "c6-031",
      word: "defect",
      phonetic: "/ˈdiːfekt/",
      pos: "n.",
      meaning: "缺点；缺陷；瑕疵",
      example: { en: "A tiny defect in the chip caused the whole machine to fail.", zh: "芯片上一个微小的缺陷导致整台机器发生故障。" },
      similar: [
        { word: "detect", meaning: "v. 察觉；发现", note: "两词只差一个字母，detect 指「发现」，defect 指「缺陷」" }
      ],
      forms: [
        { word: "defective", pos: "adj.", meaning: "有缺陷的；有毛病的" },
        { word: "defects", pos: "n.", meaning: "缺陷（复数）" }
      ]
    },
    {
      id: "c6-032",
      word: "commodity",
      phonetic: "/kəˈmɒdəti/",
      pos: "n.",
      meaning: "商品；日用品",
      example: { en: "Clean water is becoming a precious commodity in many dry regions.", zh: "在许多干旱地区，干净的水正成为一种珍贵的商品。" },
      similar: [
        { word: "community", meaning: "n. 社区；群体", note: "两词都以 commo- 开头，community 指「社区」，commodity 指「商品」" }
      ],
      forms: [
        { word: "commodities", pos: "n.", meaning: "商品（复数）" }
      ]
    },
    {
      id: "c6-033",
      word: "deposit",
      phonetic: "/dɪˈpɒzɪt/",
      pos: "n./v.",
      meaning: "存款；押金；存放",
      example: { en: "She paid a deposit of two hundred dollars on the new flat.", zh: "她为那套新公寓支付了两百美元押金。" },
      similar: [
        { word: "depose", meaning: "v. 罢免；废黜", note: "两词同以 depos- 开头，depose 指「罢免」，deposit 指「存放；押金」" }
      ],
      forms: [
        { word: "deposits", pos: "n.", meaning: "存款（复数）" },
        { word: "deposited", pos: "v.", meaning: "存放（过去式）" }
      ]
    },
    {
      id: "c6-034",
      word: "depress",
      phonetic: "/dɪˈpres/",
      pos: "v.",
      meaning: "使沮丧；压低；使萧条",
      example: { en: "The bad weather and heavy losses depressed everyone in the team.", zh: "恶劣的天气和严重的亏损让队里每个人都情绪低落。" },
      similar: [
        { word: "express", meaning: "v. 表达；表示", note: "两词都含 press，express 指「表达」，depress 指「使沮丧」" }
      ],
      forms: [
        { word: "depression", pos: "n.", meaning: "沮丧；萧条" },
        { word: "depressed", pos: "adj.", meaning: "沮丧的；不景气的" }
      ]
    },
    {
      id: "c6-035",
      word: "comply",
      phonetic: "/kəmˈplaɪ/",
      pos: "v.",
      meaning: "遵守；服从；照做",
      example: { en: "All visitors must comply with the safety rules inside the factory.", zh: "所有来访者必须遵守工厂内的安全规定。" },
      similar: [
        { word: "apply", meaning: "v. 申请；应用", note: "两词都以 -ply 结尾，apply 指「申请」，comply 指「遵守」" }
      ],
      forms: [
        { word: "compliance", pos: "n.", meaning: "遵守；顺从" },
        { word: "complied", pos: "v.", meaning: "遵守（过去式）" }
      ]
    },
    {
      id: "c6-036",
      word: "desperate",
      phonetic: "/ˈdespərət/",
      pos: "adj.",
      meaning: "绝望的；极想要的；拼命的",
      example: { en: "The villagers were desperate for clean water after the long drought.", zh: "长期干旱之后，村民们极度渴望干净的饮用水。" },
      similar: [
        { word: "disparate", meaning: "adj. 迥然不同的", note: "与 desperate 拼写相近，disparate 指「迥然不同的」" }
      ],
      forms: [
        { word: "desperately", pos: "adv.", meaning: "拼命地；极度地" },
        { word: "desperation", pos: "n.", meaning: "绝望；铤而走险" }
      ]
    },
    {
      id: "c6-037",
      word: "conceal",
      phonetic: "/kənˈsiːl/",
      pos: "v.",
      meaning: "隐藏；隐瞒",
      example: { en: "He tried to conceal his disappointment behind a cheerful smile.", zh: "他试图用愉快的微笑来隐藏自己的失望。" },
      similar: [
        { word: "concede", meaning: "v. 承认；让步", note: "两词都以 conc- 开头，concede 指「承认；让步」，conceal 指「隐藏」" }
      ],
      forms: [
        { word: "concealed", pos: "v.", meaning: "隐藏（过去式）" },
        { word: "concealment", pos: "n.", meaning: "隐藏；隐瞒" }
      ]
    },
    {
      id: "c6-038",
      word: "concede",
      phonetic: "/kənˈsiːd/",
      pos: "v.",
      meaning: "承认；让步；退让",
      example: { en: "The minister finally conceded that the policy had failed.", zh: "部长最终承认该政策已经失败。" },
      similar: [
        { word: "conceive", meaning: "v. 构想；想出", note: "两词都以 conc- 开头，conceive 指「构想」，concede 指「承认」" }
      ],
      forms: [
        { word: "concession", pos: "n.", meaning: "让步；特许" },
        { word: "conceded", pos: "v.", meaning: "承认（过去式）" }
      ]
    },
    {
      id: "c6-039",
      word: "condemn",
      phonetic: "/kənˈdem/",
      pos: "v.",
      meaning: "谴责；判刑；宣告有罪",
      example: { en: "World leaders quickly condemned the attack on the hospital.", zh: "各国领导人迅速谴责了对医院的袭击。" },
      similar: [
        { word: "condense", meaning: "v. 压缩；浓缩", note: "两词前六个字母相同，condense 指「压缩」，condemn 指「谴责」" }
      ],
      forms: [
        { word: "condemnation", pos: "n.", meaning: "谴责；定罪" },
        { word: "condemned", pos: "adj.", meaning: "被判罪的" }
      ]
    },
    {
      id: "c6-040",
      word: "detect",
      phonetic: "/dɪˈtekt/",
      pos: "v.",
      meaning: "察觉；发现；检测",
      example: { en: "The new sensor can detect tiny amounts of gas in the air.", zh: "这种新传感器能检测出空气中微量的气体。" },
      similar: [
        { word: "defect", meaning: "n. 缺点；缺陷", note: "两词只差一个字母，defect 指「缺陷」，detect 指「发现」" }
      ],
      forms: [
        { word: "detection", pos: "n.", meaning: "察觉；检测" },
        { word: "detective", pos: "n.", meaning: "侦探" }
      ]
    },
    {
      id: "c6-041",
      word: "conscious",
      phonetic: "/ˈkɒnʃəs/",
      pos: "adj.",
      meaning: "有意识的；意识到的；神志清醒的",
      example: { en: "She was conscious of someone watching her from the doorway.", zh: "她意识到有人在门口看着她。" },
      similar: [
        { word: "conscience", meaning: "n. 良心；良知", note: "两词拼写极近，conscience 是名词「良心」，conscious 是形容词「意识到的」" }
      ],
      forms: [
        { word: "consciousness", pos: "n.", meaning: "意识；知觉" },
        { word: "consciously", pos: "adv.", meaning: "有意识地；自觉地" }
      ]
    },
    {
      id: "c6-042",
      word: "discard",
      phonetic: "/dɪsˈkɑːd/",
      pos: "v.",
      meaning: "丢弃；抛弃；扔掉",
      example: { en: "Please discard any food that has been left out overnight.", zh: "请丢弃任何在外面放过夜的食物。" },
      similar: [
        { word: "discord", meaning: "n. 不和；纷争", note: "两词只差一个字母，discord 指「不和」，discard 指「丢弃」" }
      ],
      forms: [
        { word: "discarded", pos: "v.", meaning: "丢弃（过去式）" },
        { word: "discards", pos: "v.", meaning: "丢弃（第三人称单数）" }
      ]
    },
    {
      id: "c6-043",
      word: "dwell",
      phonetic: "/dwel/",
      pos: "v.",
      meaning: "居住；栖息；沉湎于",
      example: { en: "Few families still dwell in that remote mountain village.", zh: "如今很少有家庭还住在那个偏远的山村。" },
      similar: [
        { word: "swell", meaning: "v. 膨胀；肿胀", note: "两词只差一个字母，swell 指「膨胀」，dwell 指「居住」" }
      ],
      forms: [
        { word: "dwelling", pos: "n.", meaning: "住所；住宅" },
        { word: "dweller", pos: "n.", meaning: "居民；居住者" }
      ]
    },
    {
      id: "c6-044",
      word: "consistent",
      phonetic: "/kənˈsɪstənt/",
      pos: "adj.",
      meaning: "一致的；始终如一的；连贯的",
      example: { en: "His story is consistent with the evidence found at the scene.", zh: "他的说法与在现场发现的证据是一致的。" },
      similar: [
        { word: "constant", meaning: "adj. 不断的；恒定的", note: "两词同以 cons- 开头，consistent 指「一致的」，constant 指「不断的」" }
      ],
      forms: [
        { word: "consistency", pos: "n.", meaning: "一致性；连贯性" },
        { word: "consistently", pos: "adv.", meaning: "一贯地；始终如一地" }
      ]
    },
    {
      id: "c6-045",
      word: "dynamic",
      phonetic: "/daɪˈnæmɪk/",
      pos: "adj.",
      meaning: "有活力的；动态的；不断变化的",
      example: { en: "She is a dynamic speaker who can hold any audience for hours.", zh: "她是一位很有活力的演讲者，能让任何听众听上几个小时。" },
      similar: [
        { word: "dynasty", meaning: "n. 王朝；朝代", note: "两词都以 dyn- 开头，dynasty 指「王朝」，dynamic 指「有活力的」" }
      ],
      forms: [
        { word: "dynamics", pos: "n.", meaning: "动力学；动态" },
        { word: "dynamically", pos: "adv.", meaning: "动态地；有活力地" }
      ]
    },
    {
      id: "c6-046",
      word: "constrain",
      phonetic: "/kənˈstreɪn/",
      pos: "v.",
      meaning: "限制；约束；强迫",
      example: { en: "Limited funding constrained the growth of the research team.", zh: "有限的资金制约了研究团队的发展。" },
      similar: [
        { word: "restrain", meaning: "v. 抑制；约束", note: "两词都含 strain，restrain 多指「抑制情绪」，constrain 多指「受条件限制」" }
      ],
      forms: [
        { word: "constraint", pos: "n.", meaning: "限制；约束" },
        { word: "constrained", pos: "adj.", meaning: "受约束的；不自然的" }
      ]
    },
    {
      id: "c6-047",
      word: "contradict",
      phonetic: "/ˌkɒntrəˈdɪkt/",
      pos: "v.",
      meaning: "反驳；与…相矛盾",
      example: { en: "The new data contradict what the earlier report claimed.", zh: "新数据与早先报告的结论相矛盾。" },
      similar: [
        { word: "predict", meaning: "v. 预测；预言", note: "两词都含 dict，predict 指「预测」，contradict 指「反驳；相矛盾」" }
      ],
      forms: [
        { word: "contradiction", pos: "n.", meaning: "矛盾；反驳" },
        { word: "contradictory", pos: "adj.", meaning: "矛盾的；对立的" }
      ]
    },
    {
      id: "c6-048",
      word: "controversial",
      phonetic: "/ˌkɒntrəˈvɜːʃl/",
      pos: "adj.",
      meaning: "有争议的；引起争论的",
      example: { en: "The decision to close the factory proved highly controversial.", zh: "关闭工厂的决定引起了很大争议。" },
      similar: [
        { word: "controversy", meaning: "n. 争论；争议", note: "同词根，controversial 是形容词，controversy 是名词「争论」" }
      ],
      forms: [
        { word: "controversy", pos: "n.", meaning: "争论；争议" },
        { word: "controversially", pos: "adv.", meaning: "引起争议地" }
      ]
    },
    {
      id: "c6-049",
      word: "convert",
      phonetic: "/kənˈvɜːt/",
      pos: "v.",
      meaning: "转变；转换；改建",
      example: { en: "They plan to convert the old factory into a public library.", zh: "他们计划把旧工厂改造成公共图书馆。" },
      similar: [
        { word: "convey", meaning: "v. 传达；运送", note: "两词都以 conv- 开头，convey 指「传达」，convert 指「转变」" }
      ],
      forms: [
        { word: "conversion", pos: "n.", meaning: "转变；转换" },
        { word: "converted", pos: "v.", meaning: "转变（过去式）" }
      ]
    },
    {
      id: "c6-050",
      word: "convey",
      phonetic: "/kənˈveɪ/",
      pos: "v.",
      meaning: "传达；表达；运送",
      example: { en: "Words alone cannot convey how grateful I am for your help.", zh: "仅凭言语无法表达我对你帮助的感激。" },
      similar: [
        { word: "convert", meaning: "v. 转变；转换", note: "两词都以 conv- 开头，convert 指「转变」，convey 指「传达」" }
      ],
      forms: [
        { word: "conveyed", pos: "v.", meaning: "传达（过去式）" },
        { word: "conveyance", pos: "n.", meaning: "运输；传达" }
      ]
    },
    {
      id: "c6-051",
      word: "cope",
      phonetic: "/kəʊp/",
      pos: "v.",
      meaning: "应付；处理；对付",
      example: { en: "Many students find it hard to cope with the pressure of exams.", zh: "许多学生觉得难以应付考试压力。" },
      similar: [
        { word: "copy", meaning: "n./v. 副本；复制", note: "两词只差一个字母，copy 指「复制；副本」，cope 指「应付」" }
      ],
      forms: [
        { word: "coped", pos: "v.", meaning: "应付（过去式）" },
        { word: "coping", pos: "v.", meaning: "应付（现在分词）" }
      ]
    },
    {
      id: "c6-052",
      word: "crucial",
      phonetic: "/ˈkruːʃl/",
      pos: "adj.",
      meaning: "至关重要的；决定性的",
      example: { en: "Early diagnosis is crucial for patients with this rare disease.", zh: "对于患有这种罕见病的患者来说，早期诊断至关重要。" },
      similar: [
        { word: "cruel", meaning: "adj. 残忍的；残酷的", note: "两词都以 cru- 开头，cruel 指「残忍的」，crucial 指「至关重要的」" }
      ],
      forms: [
        { word: "crucially", pos: "adv.", meaning: "关键地；至关重要地" }
      ]
    },
    {
      id: "c6-053",
      word: "cultivate",
      phonetic: "/ˈkʌltɪveɪt/",
      pos: "v.",
      meaning: "培养；耕种；陶冶",
      example: { en: "Reading widely helps students cultivate an interest in other cultures.", zh: "广泛阅读有助于学生培养对其他文化的兴趣。" },
      similar: [
        { word: "culture", meaning: "n. 文化；栽培", note: "同词根 cult-，culture 是名词「文化」，cultivate 是动词「培养」" }
      ],
      forms: [
        { word: "cultivation", pos: "n.", meaning: "培养；耕作" },
        { word: "cultivated", pos: "adj.", meaning: "有教养的；栽培的" }
      ]
    },
    {
      id: "c6-054",
      word: "curb",
      phonetic: "/kɜːb/",
      pos: "v.",
      meaning: "控制；抑制；约束",
      example: { en: "The city hopes to curb traffic by raising parking fees.", zh: "该市希望通过提高停车费来抑制交通流量。" },
      similar: [
        { word: "cure", meaning: "v./n. 治愈；疗法", note: "两词只差一个字母，cure 指「治愈」，curb 指「抑制」" }
      ],
      forms: [
        { word: "curbed", pos: "v.", meaning: "抑制（过去式）" },
        { word: "curbs", pos: "n.", meaning: "路缘；约束（复数）" }
      ]
    },
    {
      id: "c6-055",
      word: "decline",
      phonetic: "/dɪˈklaɪn/",
      pos: "v./n.",
      meaning: "下降；衰退；婉拒",
      example: { en: "Sales of printed newspapers have declined sharply over the past decade.", zh: "过去十年间，纸质报纸的销量急剧下降。" },
      similar: [
        { word: "incline", meaning: "v. 倾向；倾斜", note: "两词都以 -cline 结尾，incline 指「倾向于」，decline 指「下降」" }
      ],
      forms: [
        { word: "declined", pos: "v.", meaning: "下降（过去式）" },
        { word: "declining", pos: "adj.", meaning: "下降的；衰退的" }
      ]
    },
    {
      id: "c6-056",
      word: "deficiency",
      phonetic: "/dɪˈfɪʃnsi/",
      pos: "n.",
      meaning: "缺乏；不足；缺陷",
      example: { en: "A deficiency of vitamin D can weaken the bones over time.", zh: "缺乏维生素 D 会随着时间推移使骨骼变弱。" },
      similar: [
        { word: "efficiency", meaning: "n. 效率；功效", note: "两词都以 -ficiency 结尾，deficiency 指「缺乏」，efficiency 指「效率」" }
      ],
      forms: [
        { word: "deficient", pos: "adj.", meaning: "缺乏的；不足的" },
        { word: "deficiencies", pos: "n.", meaning: "缺乏（复数）" }
      ]
    },
    {
      id: "c6-057",
      word: "deliberate",
      phonetic: "/dɪˈlɪbərət/",
      pos: "adj.",
      meaning: "故意的；深思熟虑的；从容的",
      example: { en: "The fire was not an accident but a deliberate act.", zh: "这场火灾不是意外，而是故意行为。" },
      similar: [
        { word: "delicate", meaning: "adj. 精致的；微妙的", note: "两词都以 deli- 开头，delicate 指「精致的」，deliberate 指「故意的」" }
      ],
      forms: [
        { word: "deliberately", pos: "adv.", meaning: "故意地；从容地" },
        { word: "deliberation", pos: "n.", meaning: "深思；审议" }
      ]
    },
    {
      id: "c6-058",
      word: "demonstrate",
      phonetic: "/ˈdemənstreɪt/",
      pos: "v.",
      meaning: "证明；演示；示威",
      example: { en: "The experiment clearly demonstrates how heat affects the metal.", zh: "这个实验清楚地证明了热如何影响这种金属。" },
      similar: [
        { word: "remonstrate", meaning: "v. 抗议；规劝", note: "两词同以 -monstrate 结尾，demonstrate 指「证明」，remonstrate 指「抗议」" }
      ],
      forms: [
        { word: "demonstration", pos: "n.", meaning: "证明；示威" },
        { word: "demonstrated", pos: "v.", meaning: "证明（过去式）" }
      ]
    },
    {
      id: "c6-059",
      word: "deprive",
      phonetic: "/dɪˈpraɪv/",
      pos: "v.",
      meaning: "剥夺；使丧失",
      example: { en: "The new law deprived thousands of families of their homes.", zh: "这项新法律剥夺了成千上万个家庭的家园。" },
      similar: [
        { word: "derive", meaning: "v. 得到；源于", note: "两词只差一个字母，derive 指「源于」，deprive 指「剥夺」" }
      ],
      forms: [
        { word: "deprivation", pos: "n.", meaning: "剥夺；匮乏" },
        { word: "deprived", pos: "adj.", meaning: "贫困的；被剥夺的" }
      ]
    },
    {
      id: "c6-060",
      word: "derive",
      phonetic: "/dɪˈraɪv/",
      pos: "v.",
      meaning: "得到；源于；提取",
      example: { en: "Many English words derive from Latin and ancient Greek.", zh: "许多英语单词源自拉丁语和古希腊语。" },
      similar: [
        { word: "deprive", meaning: "v. 剥夺；使丧失", note: "两词只差一个字母，deprive 指「剥夺」，derive 指「源自」" }
      ],
      forms: [
        { word: "derivation", pos: "n.", meaning: "起源；派生" },
        { word: "derived", pos: "adj.", meaning: "派生的；衍生的" }
      ]
    },
    {
      id: "c6-061",
      word: "deteriorate",
      phonetic: "/dɪˈtɪəriəreɪt/",
      pos: "v.",
      meaning: "恶化；变坏；退化",
      example: { en: "His health deteriorated rapidly after he stopped taking the medicine.", zh: "他停药之后健康状况迅速恶化。" },
      similar: [
        { word: "determine", meaning: "v. 决定；查明", note: "两词前五个字母相同，determine 指「决定」，deteriorate 指「恶化」" }
      ],
      forms: [
        { word: "deterioration", pos: "n.", meaning: "恶化；退化" },
        { word: "deteriorated", pos: "v.", meaning: "恶化（过去式）" }
      ]
    },
    {
      id: "c6-062",
      word: "diminish",
      phonetic: "/dɪˈmɪnɪʃ/",
      pos: "v.",
      meaning: "减少；缩小；削弱",
      example: { en: "The noise from the street gradually diminished as night fell.", zh: "随着夜幕降临，街上的噪音渐渐减弱了。" },
      similar: [
        { word: "diminutive", meaning: "adj. 微小的；小巧的", note: "同词根 dimin-，diminutive 是形容词「微小的」，diminish 是动词「减少」" }
      ],
      forms: [
        { word: "diminished", pos: "v.", meaning: "减少（过去式）" },
        { word: "diminishing", pos: "adj.", meaning: "递减的；减少的" }
      ]
    },
    {
      id: "c6-063",
      word: "disclose",
      phonetic: "/dɪsˈkləʊz/",
      pos: "v.",
      meaning: "透露；揭露；公开",
      example: { en: "The company refused to disclose the details of the agreement.", zh: "公司拒绝透露协议的细节。" },
      similar: [
        { word: "enclose", meaning: "v. 围住；随附", note: "两词都含 close，enclose 指「围住」，disclose 指「透露」" }
      ],
      forms: [
        { word: "disclosure", pos: "n.", meaning: "披露；揭发" },
        { word: "disclosed", pos: "v.", meaning: "透露（过去式）" }
      ]
    },
    {
      id: "c6-064",
      word: "dispute",
      phonetic: "/dɪˈspjuːt/",
      pos: "n./v.",
      meaning: "争论；争端；对…质疑",
      example: { en: "The two countries remain locked in a bitter trade dispute.", zh: "两国仍陷于激烈的贸易争端之中。" },
      similar: [
        { word: "repute", meaning: "n. 名声；声望", note: "两词都以 -pute 结尾，repute 指「名声」，dispute 指「争端」" }
      ],
      forms: [
        { word: "disputed", pos: "adj.", meaning: "有争议的" },
        { word: "disputes", pos: "n.", meaning: "争端（复数）" }
      ]
    },
    {
      id: "c6-065",
      word: "distinct",
      phonetic: "/dɪˈstɪŋkt/",
      pos: "adj.",
      meaning: "明显的；截然不同的；清楚的",
      example: { en: "There is a distinct difference between the two species of birds.", zh: "这两种鸟之间有明显的区别。" },
      similar: [
        { word: "distinctive", meaning: "adj. 独特的；有特色的", note: "两词同根，distinct 指「明显的；不同的」，distinctive 指「独特醒目的」" }
      ],
      forms: [
        { word: "distinctly", pos: "adv.", meaning: "明显地；清楚地" },
        { word: "distinction", pos: "n.", meaning: "区别；卓越" }
      ]
    },
    {
      id: "c6-066",
      word: "distinguish",
      phonetic: "/dɪˈstɪŋɡwɪʃ/",
      pos: "v.",
      meaning: "区分；辨别；使杰出",
      example: { en: "Young children cannot easily distinguish between fantasy and reality.", zh: "幼儿不容易区分幻想与现实。" },
      similar: [
        { word: "extinguish", meaning: "v. 熄灭；扑灭", note: "两词都以 -stinguish 结尾，extinguish 指「熄灭」，distinguish 指「区分」" }
      ],
      forms: [
        { word: "distinguishable", pos: "adj.", meaning: "可区分的；可辨别的" },
        { word: "distinguished", pos: "adj.", meaning: "杰出的；著名的" }
      ]
    },
    {
      id: "c6-067",
      word: "diverse",
      phonetic: "/daɪˈvɜːs/",
      pos: "adj.",
      meaning: "多样的；不同的；多种的",
      example: { en: "The city is home to people from diverse cultural backgrounds.", zh: "这座城市是来自不同文化背景的人们的家园。" },
      similar: [
        { word: "diversion", meaning: "n. 转移；消遣", note: "同词根 divers-，diversion 是名词「转移」，diverse 是形容词「多样的」" }
      ],
      forms: [
        { word: "diversity", pos: "n.", meaning: "多样性；差异" },
        { word: "diversify", pos: "v.", meaning: "使多样化" }
      ]
    },
    {
      id: "c6-068",
      word: "dominate",
      phonetic: "/ˈdɒmɪneɪt/",
      pos: "v.",
      meaning: "支配；主导；俯视",
      example: { en: "A few large firms dominate the mobile phone market in that country.", zh: "几家大公司主导着那个国家的手机市场。" },
      similar: [
        { word: "domineer", meaning: "v. 专横地支配", note: "同词根 domin-，domineer 指「专横跋扈」，dominate 指「占主导地位」" }
      ],
      forms: [
        { word: "domination", pos: "n.", meaning: "支配；统治" },
        { word: "dominant", pos: "adj.", meaning: "占优势的；支配的" }
      ]
    },
    {
      id: "c6-069",
      word: "drastic",
      phonetic: "/ˈdræstɪk/",
      pos: "adj.",
      meaning: "激烈的；极端的；严厉的",
      example: { en: "The government took drastic measures to control the rising prices.", zh: "政府采取了激烈措施来控制不断上涨的物价。" },
      similar: [
        { word: "dramatic", meaning: "adj. 戏剧性的；急剧的", note: "两词都以 dra- 开头，dramatic 指「戏剧性的」，drastic 指「激烈的」" }
      ],
      forms: [
        { word: "drastically", pos: "adv.", meaning: "激烈地；大幅度地" }
      ]
    },
    {
      id: "c6-070",
      word: "eliminate",
      phonetic: "/ɪˈlɪmɪneɪt/",
      pos: "v.",
      meaning: "消除；排除；淘汰",
      example: { en: "The new system will eliminate most of the paperwork in our office.", zh: "新系统将消除我们办公室的大部分文书工作。" },
      similar: [
        { word: "preliminary", meaning: "adj. 初步的；预备的", note: "两词都含 limin，preliminary 指「初步的」，eliminate 指「消除」" }
      ],
      forms: [
        { word: "elimination", pos: "n.", meaning: "消除；淘汰" },
        { word: "eliminated", pos: "v.", meaning: "消除（过去式）" }
      ]
    },
    {
      id: "c6-071",
      word: "emerge",
      phonetic: "/ɪˈmɜːdʒ/",
      pos: "v.",
      meaning: "出现；浮现；显露",
      example: { en: "Several new problems emerged during the second stage of testing.", zh: "在第二阶段测试中出现了几个新问题。" },
      similar: [
        { word: "merge", meaning: "v. 合并；融合", note: "两词只差前缀 e-，merge 指「合并」，emerge 指「出现」" }
      ],
      forms: [
        { word: "emergence", pos: "n.", meaning: "出现；兴起" },
        { word: "emerging", pos: "adj.", meaning: "新兴的；刚出现的" }
      ]
    },
    {
      id: "c6-072",
      word: "endure",
      phonetic: "/ɪnˈdjʊə(r)/",
      pos: "v.",
      meaning: "忍受；忍耐；持续",
      example: { en: "She endured years of hardship before her career finally took off.", zh: "她忍受了多年的艰辛，事业才终于起步。" },
      similar: [
        { word: "endow", meaning: "v. 捐赠；赋予", note: "两词都以 end- 开头，endow 指「赋予」，endure 指「忍受」" }
      ],
      forms: [
        { word: "endurance", pos: "n.", meaning: "忍耐力；耐久性" },
        { word: "enduring", pos: "adj.", meaning: "持久的；不朽的" }
      ]
    },
    {
      id: "c6-073",
      word: "enhance",
      phonetic: "/ɪnˈhɑːns/",
      pos: "v.",
      meaning: "提高；增强；增进",
      example: { en: "Regular exercise can greatly enhance your ability to concentrate.", zh: "有规律的锻炼能极大增强你的专注能力。" },
      similar: [
        { word: "entrance", meaning: "n. 入口；进入", note: "与 enhance 拼写相近，entrance 是名词「入口」，注意别混用" }
      ],
      forms: [
        { word: "enhancement", pos: "n.", meaning: "提高；增强" },
        { word: "enhanced", pos: "v.", meaning: "提高（过去式）" }
      ]
    },
    {
      id: "c6-074",
      word: "enormous",
      phonetic: "/ɪˈnɔːməs/",
      pos: "adj.",
      meaning: "巨大的；庞大的",
      example: { en: "The company spent an enormous sum of money on the new factory.", zh: "公司在新工厂上花了一笔巨款。" },
      similar: [
        { word: "anonymous", meaning: "adj. 匿名的；无名的", note: "两词词尾相同，anonymous 指「匿名的」，enormous 指「巨大的」" }
      ],
      forms: [
        { word: "enormously", pos: "adv.", meaning: "巨大地；非常" }
      ]
    },
    {
      id: "c6-075",
      word: "ensure",
      phonetic: "/ɪnˈʃʊə(r)/",
      pos: "v.",
      meaning: "确保；保证；担保",
      example: { en: "Please ensure that all the windows are closed before you leave.", zh: "离开前请确保所有窗户都已关好。" },
      similar: [
        { word: "insure", meaning: "v. 投保；给…保险", note: "两词只差一个字母，insure 指「投保」，ensure 指「确保」" }
      ],
      forms: [
        { word: "ensured", pos: "v.", meaning: "确保（过去式）" },
        { word: "ensuring", pos: "v.", meaning: "确保（现在分词）" }
      ]
    },
    {
      id: "c6-076",
      word: "entitle",
      phonetic: "/ɪnˈtaɪtl/",
      pos: "v.",
      meaning: "使有权利；给…命名",
      example: { en: "This ticket entitles you to a free drink at the concert.", zh: "这张票使你有权在音乐会上免费领取一杯饮料。" },
      similar: [
        { word: "title", meaning: "n. 标题；头衔", note: "两词同根 titl-，title 是名词「标题」，entitle 是动词「使有权利」" }
      ],
      forms: [
        { word: "entitlement", pos: "n.", meaning: "权利；资格" },
        { word: "entitled", pos: "adj.", meaning: "有资格的；题名为" }
      ]
    },
    {
      id: "c6-077",
      word: "equivalent",
      phonetic: "/ɪˈkwɪvələnt/",
      pos: "adj./n.",
      meaning: "相等的；等价的；等价物",
      example: { en: "One mile is roughly equivalent to one and a half kilometers.", zh: "一英里大约相当于一点五公里。" },
      similar: [
        { word: "equilibrium", meaning: "n. 平衡；均衡", note: "两词都以 equi- 开头，equilibrium 指「平衡」，equivalent 指「相等的」" }
      ],
      forms: [
        { word: "equivalence", pos: "n.", meaning: "相等；等价" }
      ]
    },
    {
      id: "c6-078",
      word: "essential",
      phonetic: "/ɪˈsenʃl/",
      pos: "adj.",
      meaning: "必要的；必不可少的；本质的",
      example: { en: "Sleep is essential for both physical health and clear thinking.", zh: "睡眠对身体健康和清晰思考都必不可少。" },
      similar: [
        { word: "essence", meaning: "n. 本质；精华", note: "同词根 essen-，essence 是名词「本质」，essential 是形容词「必要的」" }
      ],
      forms: [
        { word: "essentially", pos: "adv.", meaning: "本质上；基本上" },
        { word: "essence", pos: "n.", meaning: "本质；精华" }
      ]
    },
    {
      id: "c6-079",
      word: "evaluate",
      phonetic: "/ɪˈvæljueɪt/",
      pos: "v.",
      meaning: "评价；评估；估计",
      example: { en: "Teachers were asked to evaluate the new textbook before the term started.", zh: "老师们被要求在学期开始前评价这本新教材。" },
      similar: [
        { word: "value", meaning: "n./v. 价值；重视", note: "两词同根 valu-，value 指「价值」，evaluate 指「评估」" }
      ],
      forms: [
        { word: "evaluation", pos: "n.", meaning: "评价；评估" },
        { word: "evaluated", pos: "v.", meaning: "评价（过去式）" }
      ]
    },
    {
      id: "c6-080",
      word: "evident",
      phonetic: "/ˈevɪdənt/",
      pos: "adj.",
      meaning: "明显的；显而易见的",
      example: { en: "It soon became evident that the two sides would never agree.", zh: "很快就明显看出，双方永远不会达成一致。" },
      similar: [
        { word: "evidence", meaning: "n. 证据；迹象", note: "同词根 vid-，evidence 是名词「证据」，evident 是形容词「明显的」" }
      ],
      forms: [
        { word: "evidently", pos: "adv.", meaning: "显然；明显地" },
        { word: "evidence", pos: "n.", meaning: "证据；证明" }
      ]
    },
    {
      id: "c6-081",
      word: "evolve",
      phonetic: "/ɪˈvɒlv/",
      pos: "v.",
      meaning: "演变；进化；逐步发展",
      example: { en: "The small workshop slowly evolved into a large modern company.", zh: "这个小作坊慢慢发展成了一家大型现代公司。" },
      similar: [
        { word: "involve", meaning: "v. 涉及；包含", note: "两词都以 -volve 结尾，involve 指「涉及」，evolve 指「演变」" }
      ],
      forms: [
        { word: "evolution", pos: "n.", meaning: "演变；进化" },
        { word: "evolved", pos: "v.", meaning: "演变（过去式）" }
      ]
    },
    {
      id: "c6-082",
      word: "exaggerate",
      phonetic: "/ɪɡˈzædʒəreɪt/",
      pos: "v.",
      meaning: "夸大；夸张",
      example: { en: "Newspapers sometimes exaggerate the danger to attract more readers.", zh: "报纸有时会夸大危险以吸引更多读者。" },
      similar: [
        { word: "exasperate", meaning: "v. 激怒；使恼火", note: "两词都以 exa- 开头，exasperate 指「激怒」，exaggerate 指「夸大」" }
      ],
      forms: [
        { word: "exaggeration", pos: "n.", meaning: "夸张；夸大之词" },
        { word: "exaggerated", pos: "adj.", meaning: "夸大的；夸张的" }
      ]
    },
    {
      id: "c6-083",
      word: "exceed",
      phonetic: "/ɪkˈsiːd/",
      pos: "v.",
      meaning: "超过；超越；超出",
      example: { en: "The final cost may exceed our original budget by ten percent.", zh: "最终成本可能超出我们原定预算百分之十。" },
      similar: [
        { word: "excess", meaning: "n. 过量；超出", note: "同词根，excess 是名词「过量」，exceed 是动词「超过」" }
      ],
      forms: [
        { word: "excess", pos: "n.", meaning: "过量；超出" },
        { word: "exceeded", pos: "v.", meaning: "超过（过去式）" }
      ]
    },
    {
      id: "c6-084",
      word: "exclusive",
      phonetic: "/ɪkˈskluːsɪv/",
      pos: "adj.",
      meaning: "独有的；排外的；高档的",
      example: { en: "The club is exclusive and only accepts members by invitation.", zh: "这家俱乐部很排外，只接受受邀者入会。" },
      similar: [
        { word: "inclusive", meaning: "adj. 包含的；包容的", note: "两词都以 -clusive 结尾，inclusive 指「包容的」，exclusive 指「排他的」" }
      ],
      forms: [
        { word: "exclusively", pos: "adv.", meaning: "专有地；仅仅" },
        { word: "exclusion", pos: "n.", meaning: "排除；排斥" }
      ]
    },
    {
      id: "c6-085",
      word: "explicit",
      phonetic: "/ɪkˈsplɪsɪt/",
      pos: "adj.",
      meaning: "明确的；直言的；清楚的",
      example: { en: "The teacher gave explicit instructions about how to write the report.", zh: "老师就如何写这份报告给出了明确指示。" },
      similar: [
        { word: "implicit", meaning: "adj. 含蓄的；暗示的", note: "两词仅差前缀，implicit 指「含蓄的」，explicit 指「明确的」" }
      ],
      forms: [
        { word: "explicitly", pos: "adv.", meaning: "明确地；直率地" },
        { word: "explicitness", pos: "n.", meaning: "明确；直白" }
      ]
    },
    {
      id: "c6-086",
      word: "facilitate",
      phonetic: "/fəˈsɪlɪteɪt/",
      pos: "v.",
      meaning: "促进；使便利；推动",
      example: { en: "The new bridge will facilitate trade between the two towns.", zh: "这座新桥将促进两个城镇之间的贸易。" },
      similar: [
        { word: "facility", meaning: "n. 设施；便利", note: "同词根 facil-，facility 是名词「设施」，facilitate 是动词「促进」" }
      ],
      forms: [
        { word: "facilitation", pos: "n.", meaning: "促进；便利化" },
        { word: "facilitated", pos: "v.", meaning: "促进（过去式）" }
      ]
    },
    {
      id: "c6-087",
      word: "fluctuate",
      phonetic: "/ˈflʌktʃueɪt/",
      pos: "v.",
      meaning: "波动；起伏；不稳定",
      example: { en: "Oil prices have fluctuated wildly since the beginning of the year.", zh: "年初以来，油价剧烈波动。" },
      similar: [
        { word: "fluent", meaning: "adj. 流利的；流畅的", note: "两词都以 flu- 开头，fluent 指「流利的」，fluctuate 指「波动」" }
      ],
      forms: [
        { word: "fluctuation", pos: "n.", meaning: "波动；起伏" },
        { word: "fluctuating", pos: "adj.", meaning: "波动的；不稳定的" }
      ]
    },
    {
      id: "c6-088",
      word: "formulate",
      phonetic: "/ˈfɔːmjuleɪt/",
      pos: "v.",
      meaning: "制定；构想；阐述",
      example: { en: "The team spent months trying to formulate a workable plan.", zh: "团队花了几个月时间试图制定一个可行的方案。" },
      similar: [
        { word: "formula", meaning: "n. 公式；配方", note: "同词根，formula 是名词「公式」，formulate 是动词「制定」" }
      ],
      forms: [
        { word: "formulation", pos: "n.", meaning: "制定；表述" },
        { word: "formulated", pos: "v.", meaning: "制定（过去式）" }
      ]
    },
    {
      id: "c6-089",
      word: "genuine",
      phonetic: "/ˈdʒenjuɪn/",
      pos: "adj.",
      meaning: "真正的；真诚的；名副其实的",
      example: { en: "Her surprise at the news seemed entirely genuine to everyone present.", zh: "在场所有人都觉得她对这条消息的惊讶完全是真诚的。" },
      similar: [
        { word: "genius", meaning: "n. 天才；天赋", note: "两词都以 gen- 开头，genius 指「天才」，genuine 指「真正的」" }
      ],
      forms: [
        { word: "genuinely", pos: "adv.", meaning: "真正地；真诚地" },
        { word: "genuineness", pos: "n.", meaning: "真实；真诚" }
      ]
    },
    {
      id: "c6-090",
      word: "guarantee",
      phonetic: "/ˌɡærənˈtiː/",
      pos: "v./n.",
      meaning: "保证；担保；保证书",
      example: { en: "The shop guarantees a full refund if the product is faulty.", zh: "如果产品有缺陷，这家商店保证全额退款。" },
      similar: [
        { word: "guarantor", meaning: "n. 担保人；保证人", note: "同词根，guarantor 指「担保人」，guarantee 指「保证」" }
      ],
      forms: [
        { word: "guaranteed", pos: "adj.", meaning: "有保证的；必定发生的" },
        { word: "guarantees", pos: "n.", meaning: "保证（复数）" }
      ]
    },
    {
      id: "c6-091",
      word: "nevertheless",
      phonetic: "/ˌnevəðəˈles/",
      pos: "adv.",
      meaning: "然而；尽管如此",
      example: { en: "The task was extremely difficult; nevertheless, they finished it on time.", zh: "这项任务极其困难，尽管如此，他们还是按时完成了。" },
      similar: [
        { word: "nonetheless", meaning: "adv. 尽管如此；然而", note: "两词意思几乎相同，nonetheless 更书面，nevertheless 更常见" }
      ],
      forms: [
        { word: "but nevertheless", pos: "phr.", meaning: "尽管如此；然而（常用搭配）" }
      ]
    },
    {
      id: "c6-092",
      word: "moreover",
      phonetic: "/mɔːrˈəʊvə(r)/",
      pos: "adv.",
      meaning: "此外；而且；再者",
      example: { en: "The hotel is cheap; moreover, it is close to the station.", zh: "这家旅馆很便宜，而且离车站很近。" },
      similar: [
        { word: "furthermore", meaning: "adv. 此外；而且", note: "近义，注意区分：furthermore 更正式，moreover 更口语化" }
      ],
      forms: [
        { word: "and moreover", pos: "phr.", meaning: "而且；此外（常用搭配）" }
      ]
    },
    {
      id: "c6-093",
      word: "despite",
      phonetic: "/dɪˈspaɪt/",
      pos: "prep.",
      meaning: "尽管；虽然；不顾",
      example: { en: "Despite the heavy rain, the outdoor concert went ahead as planned.", zh: "尽管下着大雨，露天音乐会还是按计划举行了。" },
      similar: [
        { word: "spite", meaning: "n. 恶意；怨恨", note: "两词都含 spite，spite 是名词「恶意」，despite 是介词「尽管」" }
      ],
      forms: [
        { word: "despite the fact that", pos: "phr.", meaning: "尽管（后接从句的搭配）" }
      ]
    },
    {
      id: "c6-094",
      word: "thereby",
      phonetic: "/ˌðeəˈbaɪ/",
      pos: "adv.",
      meaning: "因此；从而；借此",
      example: { en: "He signed the contract, thereby ending the long dispute.", zh: "他签了合同，从而结束了这场旷日持久的争端。" },
      similar: [
        { word: "therefore", meaning: "adv. 因此；所以", note: "两词都以 there- 开头，therefore 指「因此」，thereby 指「从而」" }
      ],
      forms: [
        { word: "and thereby", pos: "phr.", meaning: "从而；借此（常用搭配）" }
      ]
    },
    {
      id: "c6-095",
      word: "hence",
      phonetic: "/hens/",
      pos: "adv.",
      meaning: "因此；所以；从此",
      example: { en: "The road was blocked by snow, hence the long delay.", zh: "道路被雪堵住了，因此耽搁了很久。" },
      similar: [
        { word: "whence", meaning: "adv. 从何处；由此", note: "两词词形相近，whence 指「从何处」，hence 指「因此」" }
      ],
      forms: [
        { word: "hence the name", pos: "phr.", meaning: "因此得名（常用搭配）" }
      ]
    },
    {
      id: "c6-096",
      word: "otherwise",
      phonetic: "/ˈʌðəwaɪz/",
      pos: "adv./conj.",
      meaning: "否则；另外；在其他方面",
      example: { en: "Write it down now, otherwise you will surely forget it.", zh: "现在就写下来，否则你肯定会忘记。" },
      similar: [
        { word: "likewise", meaning: "adv. 同样地；也", note: "两词都以 -wise 结尾，likewise 指「同样地」，otherwise 指「否则」" }
      ],
      forms: [
        { word: "or otherwise", pos: "phr.", meaning: "或其他情况（常用搭配）" }
      ]
    },
    {
      id: "c6-097",
      word: "whereas",
      phonetic: "/ˌweərˈæz/",
      pos: "conj.",
      meaning: "然而；反之；鉴于",
      example: { en: "He prefers tea, whereas his brother drinks coffee all day.", zh: "他喜欢喝茶，而他弟弟整天喝咖啡。" },
      similar: [
        { word: "whereby", meaning: "adv. 借以；凭此", note: "两词都以 where- 开头，whereby 指「借以」，whereas 指「然而」" }
      ],
      forms: [
        { word: "whereas", pos: "phr.", meaning: "然而（作连词引导对比分句）" }
      ]
    },
    {
      id: "c6-098",
      word: "accordingly",
      phonetic: "/əˈkɔːdɪŋli/",
      pos: "adv.",
      meaning: "因此；相应地；照着",
      example: { en: "The rules have changed, and all staff must act accordingly.", zh: "规定已经改变，全体员工必须相应行事。" },
      similar: [
        { word: "according", meaning: "adj. 相符的；根据", note: "同词根 accord-，according 多用于「根据」短语，accordingly 是副词「因此」" }
      ],
      forms: [
        { word: "act accordingly", pos: "phr.", meaning: "相应行事（常用搭配）" }
      ]
    },
    {
      id: "c6-099",
      word: "imply",
      phonetic: "/ɪmˈplaɪ/",
      pos: "v.",
      meaning: "暗示；意味着；含有…的意思",
      example: { en: "I do not mean to imply that your plan is wrong.", zh: "我并非有意暗示你的方案是错的。" },
      similar: [
        { word: "apply", meaning: "v. 申请；应用", note: "两词都以 -ply 结尾，apply 指「申请」，imply 指「暗示」" }
      ],
      forms: [
        { word: "implication", pos: "n.", meaning: "含意；暗示；影响" },
        { word: "implied", pos: "adj.", meaning: "含蓄的；暗含的" }
      ]
    },
    {
      id: "c6-100",
      word: "inevitable",
      phonetic: "/ɪnˈevɪtəbl/",
      pos: "adj.",
      meaning: "不可避免的；必然的",
      example: { en: "Some conflict is inevitable when so many people work together.", zh: "这么多人一起工作时，一些冲突是不可避免的。" },
      similar: [
        { word: "evitable", meaning: "adj. 可避免的", note: "两词同根，inevitable 加否定前缀 in- 后意为「不可避免的」" }
      ],
      forms: [
        { word: "inevitably", pos: "adv.", meaning: "不可避免地；必然地" }
      ]
    }
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = WORDS;
  if (typeof window !== "undefined") {
    window.WORDBOOK_DATA = window.WORDBOOK_DATA || {};
    window.WORDBOOK_DATA.cet6 = WORDS;
  }
})();