/* 简词词库 · 考研核心词汇 */
(function () {
  var WORDS = [
    {
      id: "ky-001",
      word: "abandon",
      phonetic: "/əˈbændən/",
      pos: "v.",
      meaning: "放弃；抛弃；遗弃",
      example: { en: "He abandoned his old car by the side of the road.", zh: "他把旧车丢在了路边。" },
      similar: [
        { word: "abundant", meaning: "adj. 丰富的；充裕的", note: "拼写只差一个字母，abundant 表示「充足的」" },
        { word: "abound", meaning: "v. 大量存在；盛产", note: "拼写相近，abound 强调「数量多」" }
      ],
      forms: [
        { word: "abandonment", pos: "n.", meaning: "放弃；遗弃" },
        { word: "abandoned", pos: "adj.", meaning: "被遗弃的" }
      ]
    },
    {
      id: "ky-002",
      word: "abstract",
      phonetic: "/ˈæbstrækt/",
      pos: "adj./n.",
      meaning: "抽象的；摘要",
      example: { en: "The professor explained an abstract idea with a very simple example.", zh: "教授用一个非常简单的例子解释了一个抽象的概念。" },
      similar: [
        { word: "attract", meaning: "v. 吸引；引起", note: "拼写相近，attract 是「吸引」，与「抽象」无关" },
        { word: "distract", meaning: "v. 使分心；转移", note: "与 abstract 只差首字母，注意区分词义" }
      ],
      forms: [
        { word: "abstraction", pos: "n.", meaning: "抽象概念；提取" },
        { word: "abstractly", pos: "adv.", meaning: "抽象地" }
      ]
    },
    {
      id: "ky-003",
      word: "academic",
      phonetic: "/ˌækəˈdemɪk/",
      pos: "adj./n.",
      meaning: "学术的；学院的；学者",
      example: { en: "Her academic achievements earned her a scholarship at a famous university.", zh: "她的学术成就为她赢得了一所著名大学的奖学金。" },
      similar: [
        { word: "academy", meaning: "n. 学院；学会", note: "同词根，academy 是名词，academic 多作形容词" },
        { word: "academia", meaning: "n. 学术界", note: "同词根，指整个学术圈" }
      ],
      forms: [
        { word: "academically", pos: "adv.", meaning: "学术上；学业上" },
        { word: "academician", pos: "n.", meaning: "院士；学会会员" }
      ]
    },
    {
      id: "ky-004",
      word: "accelerate",
      phonetic: "/əkˈseləreɪt/",
      pos: "v.",
      meaning: "加速；促进",
      example: { en: "The new policy will accelerate the growth of the local economy.", zh: "新政策将加速当地经济的增长。" },
      similar: [
        { word: "celebrate", meaning: "v. 庆祝；赞美", note: "拼写相近，celebrate 意为「庆祝」" },
        { word: "access", meaning: "n. 通道；使用权", note: "开头相似，access 是名词，指「进入的机会」" }
      ],
      forms: [
        { word: "acceleration", pos: "n.", meaning: "加速；加速度" },
        { word: "accelerated", pos: "adj.", meaning: "加快的" }
      ]
    },
    {
      id: "ky-005",
      word: "accomplish",
      phonetic: "/əˈkʌmplɪʃ/",
      pos: "v.",
      meaning: "完成；实现",
      example: { en: "She managed to accomplish all the tasks within a single working day.", zh: "她设法在一个工作日内完成了所有任务。" },
      similar: [
        { word: "accomplice", meaning: "n. 共犯；帮凶", note: "拼写相近，accomplice 指人，是「帮凶」" },
        { word: "complete", meaning: "v. 完成；adj. 完整的", note: "近义，注意区分，complete 更强调「使完整」" }
      ],
      forms: [
        { word: "accomplishment", pos: "n.", meaning: "成就；完成" },
        { word: "accomplished", pos: "adj.", meaning: "技艺高超的；有造诣的" }
      ]
    },
    {
      id: "ky-006",
      word: "accumulate",
      phonetic: "/əˈkjuːmjəleɪt/",
      pos: "v.",
      meaning: "积累；积聚",
      example: { en: "Dust had accumulated on the shelves during the long winter holidays.", zh: "漫长的寒假期间，架子上积满了灰尘。" },
      similar: [
        { word: "accurate", meaning: "adj. 准确的；精确的", note: "开头拼写相近，accurate 意为「准确」" },
        { word: "acclimate", meaning: "v. 适应（新环境）", note: "拼写相近，acclimate 强调「适应」" }
      ],
      forms: [
        { word: "accumulation", pos: "n.", meaning: "积累；堆积物" },
        { word: "accumulative", pos: "adj.", meaning: "累积的" }
      ]
    },
    {
      id: "ky-007",
      word: "acknowledge",
      phonetic: "/əkˈnɒlɪdʒ/",
      pos: "v.",
      meaning: "承认；答谢；确认收到",
      example: { en: "The company finally acknowledged its mistake and promised to pay full compensation.", zh: "该公司最终承认了自己的错误，并承诺支付全额赔偿。" },
      similar: [
        { word: "knowledge", meaning: "n. 知识；了解", note: "同词根，knowledge 是名词，前面多一个 ac-" },
        { word: "recognize", meaning: "v. 认出；承认", note: "近义，注意区分，recognize 更强调「辨认出」" }
      ],
      forms: [
        { word: "acknowledgment", pos: "n.", meaning: "承认；致谢" },
        { word: "acknowledged", pos: "adj.", meaning: "公认的" }
      ]
    },
    {
      id: "ky-008",
      word: "adapt",
      phonetic: "/əˈdæpt/",
      pos: "v.",
      meaning: "适应；改编",
      example: { en: "Plants must adapt to the changing climate in order to survive.", zh: "植物必须适应不断变化的气候才能生存。" },
      similar: [
        { word: "adopt", meaning: "v. 采用；收养", note: "拼写只差一个字母，adopt 是「采纳、收养」" },
        { word: "adept", meaning: "adj. 熟练的；内行的", note: "拼写相近，adept 形容人「在行」" }
      ],
      forms: [
        { word: "adaptation", pos: "n.", meaning: "适应；改编" },
        { word: "adaptable", pos: "adj.", meaning: "能适应的；适应性强的" }
      ]
    },
    {
      id: "ky-009",
      word: "adequate",
      phonetic: "/ˈædɪkwət/",
      pos: "adj.",
      meaning: "足够的；适当的",
      example: { en: "The old heating system is no longer adequate for such a large building.", zh: "这套旧的供暖系统对于这么大的一栋楼来说已经不够用了。" },
      similar: [
        { word: "inadequate", meaning: "adj. 不足的；不适当的", note: "反义词，只多一个前缀 in-" },
        { word: "equate", meaning: "v. 使相等；同等看待", note: "拼写相近，equate 是「视为相等」" }
      ],
      forms: [
        { word: "adequately", pos: "adv.", meaning: "充分地；适当地" },
        { word: "adequacy", pos: "n.", meaning: "充足；适当" }
      ]
    },
    {
      id: "ky-010",
      word: "advocate",
      phonetic: "/ˈædvəkeɪt/",
      pos: "v./n.",
      meaning: "提倡；拥护者",
      example: { en: "Many scientists advocate stricter limits on the emission of greenhouse gases.", zh: "许多科学家提倡对温室气体排放实施更严格的限制。" },
      similar: [
        { word: "vocation", meaning: "n. 职业；使命感", note: "拼写相近，vocation 指「职业、天职」" },
        { word: "advocacy", meaning: "n. 提倡；拥护", note: "同词根的另一种名词形式，指「主张」这件事" }
      ],
      forms: [
        { word: "advocacy", pos: "n.", meaning: "提倡；拥护" },
        { word: "advocated", pos: "v.", meaning: "提倡（过去式）" }
      ]
    },
    {
      id: "ky-011",
      word: "aesthetic",
      phonetic: "/iːsˈθetɪk/",
      pos: "adj.",
      meaning: "美学的；审美的",
      example: { en: "The architect paid close attention to the aesthetic value of the whole design.", zh: "这位建筑师十分注重整个设计的美学价值。" },
      similar: [
        { word: "ethical", meaning: "adj. 道德的；伦理的", note: "拼写相近，ethical 讲的是「伦理道德」" },
        { word: "anesthesia", meaning: "n. 麻醉；麻醉术", note: "拼写相近，是医学词，与「审美」无关" }
      ],
      forms: [
        { word: "aesthetics", pos: "n.", meaning: "美学" },
        { word: "aesthetically", pos: "adv.", meaning: "审美上；美学地" }
      ]
    },
    {
      id: "ky-012",
      word: "allocate",
      phonetic: "/ˈæləkeɪt/",
      pos: "v.",
      meaning: "分配；拨给",
      example: { en: "The government decided to allocate more funds to rural education this year.", zh: "政府决定今年向农村教育拨出更多资金。" },
      similar: [
        { word: "locate", meaning: "v. 找出位置；位于", note: "拼写相近，locate 强调「定位」" },
        { word: "allowance", meaning: "n. 津贴；允许量", note: "同词根，allowance 是名词，指「配额、津贴」" }
      ],
      forms: [
        { word: "allocation", pos: "n.", meaning: "分配；拨款" },
        { word: "allocated", pos: "v.", meaning: "分配（过去式）" }
      ]
    },
    {
      id: "ky-013",
      word: "ambiguous",
      phonetic: "/æmˈbɪɡjuəs/",
      pos: "adj.",
      meaning: "模棱两可的；含糊的",
      example: { en: "His ambiguous answer left everyone wondering what he really meant.", zh: "他模棱两可的回答让大家都不知道他真正的意思。" },
      similar: [
        { word: "unambiguous", meaning: "adj. 明确的；不含糊的", note: "反义词，多一个前缀 un-" },
        { word: "ambition", meaning: "n. 雄心；抱负", note: "拼写相近，ambition 指「志向」" }
      ],
      forms: [
        { word: "ambiguity", pos: "n.", meaning: "歧义；含糊" },
        { word: "ambiguously", pos: "adv.", meaning: "含糊地" }
      ]
    },
    {
      id: "ky-014",
      word: "analyze",
      phonetic: "/ˈænəlaɪz/",
      pos: "v.",
      meaning: "分析；解析",
      example: { en: "Researchers analyze large amounts of data to find hidden social patterns.", zh: "研究人员分析大量数据，以发现隐藏的社会模式。" },
      similar: [
        { word: "analysis", meaning: "n. 分析；分析报告", note: "同词根，analysis 是名词，analyze 是动词" },
        { word: "paralyze", meaning: "v. 使瘫痪；使无法行动", note: "拼写相近，paralyze 是「使瘫软」" }
      ],
      forms: [
        { word: "analysis", pos: "n.", meaning: "分析；分析报告" },
        { word: "analytical", pos: "adj.", meaning: "分析的；善于分析的" }
      ]
    },
    {
      id: "ky-015",
      word: "anticipate",
      phonetic: "/ænˈtɪsɪpeɪt/",
      pos: "v.",
      meaning: "预期；预料；期盼",
      example: { en: "Few economists anticipate a rapid recovery of the global market this year.", zh: "很少有经济学家预期今年全球市场会迅速复苏。" },
      similar: [
        { word: "participate", meaning: "v. 参加；参与", note: "拼写相近，participate 指「加入其中」" },
        { word: "anticipation", meaning: "n. 预期；期望", note: "同词根名词，指「预期」这种状态" }
      ],
      forms: [
        { word: "anticipation", pos: "n.", meaning: "预期；期望" },
        { word: "anticipated", pos: "adj.", meaning: "预期的" }
      ]
    },
    {
      id: "ky-016",
      word: "apparent",
      phonetic: "/əˈpærənt/",
      pos: "adj.",
      meaning: "明显的；表面上的",
      example: { en: "It soon became apparent that the two sides would never reach an agreement.", zh: "很快就可以看出，双方永远无法达成一致。" },
      similar: [
        { word: "transparent", meaning: "adj. 透明的；易懂的", note: "同后缀 -parent，transparent 强调「透明」" },
        { word: "appearance", meaning: "n. 外表；出现", note: "同词根名词，指「外观」或「露面」" }
      ],
      forms: [
        { word: "apparently", pos: "adv.", meaning: "显然；据说" },
        { word: "appear", pos: "v.", meaning: "出现；显得" }
      ]
    },
    {
      id: "ky-017",
      word: "approach",
      phonetic: "/əˈprəʊtʃ/",
      pos: "n./v.",
      meaning: "方法；途径；接近",
      example: { en: "This approach to teaching grammar has proved effective in many classrooms.", zh: "这种语法教学方法在许多课堂上被证明是有效的。" },
      similar: [
        { word: "reproach", meaning: "v. 责备；指责", note: "拼写相近，reproach 是「责怪」" },
        { word: "rebel", meaning: "v. 反抗；n. 反叛者", note: "只差几个字母，注意别混淆词义" }
      ],
      forms: [
        { word: "approachable", pos: "adj.", meaning: "平易近人的；可接近的" },
        { word: "approached", pos: "v.", meaning: "接近（过去式）" }
      ]
    },
    {
      id: "ky-018",
      word: "appropriate",
      phonetic: "/əˈprəʊpriət/",
      pos: "adj./v.",
      meaning: "适当的；挪用；拨给",
      example: { en: "It is not appropriate to discuss personal matters during a formal meeting.", zh: "在正式会议上讨论私事是不合适的。" },
      similar: [
        { word: "approximate", meaning: "adj. 大约的；近似的", note: "拼写相近，approximate 表示「大约」" },
        { word: "proper", meaning: "adj. 恰当的；正确的", note: "近义，注意区分，proper 更侧重「合乎规矩」" }
      ],
      forms: [
        { word: "appropriately", pos: "adv.", meaning: "适当地" },
        { word: "appropriation", pos: "n.", meaning: "挪用；拨款" }
      ]
    },
    {
      id: "ky-019",
      word: "arbitrary",
      phonetic: "/ˈɑːbɪtrəri/",
      pos: "adj.",
      meaning: "任意的；专断的",
      example: { en: "The committee made an arbitrary decision without consulting any of the workers.", zh: "委员会没有征求任何工人的意见就作出了一个专断的决定。" },
      similar: [
        { word: "arbitrate", meaning: "v. 仲裁；公断", note: "同词根，arbitrate 是「居中裁决」的动作" },
        { word: "artillery", meaning: "n. 大炮；炮兵", note: "拼写相近，artillery 是军事词" }
      ],
      forms: [
        { word: "arbitrarily", pos: "adv.", meaning: "任意地；专断地" },
        { word: "arbitrariness", pos: "n.", meaning: "专断；任意性" }
      ]
    },
    {
      id: "ky-020",
      word: "assess",
      phonetic: "/əˈses/",
      pos: "v.",
      meaning: "评估；评定；估价",
      example: { en: "Teachers assess the progress of students through exams and daily assignments.", zh: "教师通过考试和日常作业来评估学生的进步。" },
      similar: [
        { word: "assert", meaning: "v. 断言；维护", note: "拼写相近，assert 是「坚称、维护」" },
        { word: "asset", meaning: "n. 资产；优点", note: "拼写相近，asset 是名词，指「财产」" }
      ],
      forms: [
        { word: "assessment", pos: "n.", meaning: "评估；评价" },
        { word: "assessed", pos: "v.", meaning: "评估（过去式）" }
      ]
    },
    {
      id: "ky-021",
      word: "assume",
      phonetic: "/əˈsjuːm/",
      pos: "v.",
      meaning: "假定；承担；呈现",
      example: { en: "We should not assume that technology alone can solve every social problem.", zh: "我们不应该假定单靠技术就能解决所有社会问题。" },
      similar: [
        { word: "consume", meaning: "v. 消耗；消费", note: "拼写相近，consume 是「消耗掉」" },
        { word: "presume", meaning: "v. 推测；擅自", note: "拼写相近，presume 语气更强，含「擅自认定」意" }
      ],
      forms: [
        { word: "assumption", pos: "n.", meaning: "假设；承担" },
        { word: "assumed", pos: "adj.", meaning: "假定的；假装的" }
      ]
    },
    {
      id: "ky-022",
      word: "attribute",
      phonetic: "/əˈtrɪbjuːt/",
      pos: "v./n.",
      meaning: "把…归因于；属性",
      example: { en: "Scientists attribute the rise in temperature to human activities.", zh: "科学家把气温上升归因于人类活动。" },
      similar: [
        { word: "contribute", meaning: "v. 贡献；促成", note: "拼写相近，contribute 是「作出贡献」" },
        { word: "distribute", meaning: "v. 分发；分配", note: "同词根，distribute 强调「分发出去」" }
      ],
      forms: [
        { word: "attribution", pos: "n.", meaning: "归因；归属" },
        { word: "attributed", pos: "v.", meaning: "归因于（过去式）" }
      ]
    },
    {
      id: "ky-023",
      word: "authentic",
      phonetic: "/ɔːˈθentɪk/",
      pos: "adj.",
      meaning: "真实的；可靠的；正宗的",
      example: { en: "The museum displays several authentic letters written by the famous poet.", zh: "博物馆展出那位著名诗人写的几封真实信件。" },
      similar: [
        { word: "authority", meaning: "n. 权威；当局", note: "拼写相近，authority 指「权力、官方」" },
        { word: "authenticity", meaning: "n. 真实性；可靠性", note: "同词根名词，指「是真的」这一性质" }
      ],
      forms: [
        { word: "authenticity", pos: "n.", meaning: "真实性；可靠性" },
        { word: "authentically", pos: "adv.", meaning: "真实地；正宗地" }
      ]
    },
    {
      id: "ky-024",
      word: "authority",
      phonetic: "/ɔːˈθɒrəti/",
      pos: "n.",
      meaning: "权威；权力；当局",
      example: { en: "The local authority has promised to repair the damaged bridge before winter.", zh: "当地政府承诺在冬季之前修好那座受损的桥梁。" },
      similar: [
        { word: "author", meaning: "n. 作者；创始人", note: "同词根，author 指「写书的人」" },
        { word: "authorize", meaning: "v. 授权；批准", note: "同词根动词，authorize 是「给予权力」" }
      ],
      forms: [
        { word: "authorities", pos: "n.", meaning: "当局；官方（复数）" },
        { word: "authorize", pos: "v.", meaning: "授权；批准" }
      ]
    },
    {
      id: "ky-025",
      word: "aware",
      phonetic: "/əˈweə(r)/",
      pos: "adj.",
      meaning: "意识到的；知道的",
      example: { en: "Most consumers are now aware of the environmental cost of fast fashion.", zh: "如今大多数消费者都意识到快时尚带来的环境代价。" },
      similar: [
        { word: "award", meaning: "n. 奖；奖品", note: "拼写相近，award 是名词，指「奖项」" },
        { word: "unaware", meaning: "adj. 未察觉的；不知道的", note: "反义词，多一个前缀 un-" }
      ],
      forms: [
        { word: "awareness", pos: "n.", meaning: "意识；认识" },
        { word: "unaware", pos: "adj.", meaning: "未意识到的" }
      ]
    },
    {
      id: "ky-026",
      word: "bias",
      phonetic: "/ˈbaɪəs/",
      pos: "n./v.",
      meaning: "偏见；使有偏见",
      example: { en: "The report was criticized for its clear bias against small farmers.", zh: "这份报告因明显对小农户有偏见而受到批评。" },
      similar: [
        { word: "basis", meaning: "n. 基础；根据", note: "拼写相近，basis 意为「依据、基础」" },
        { word: "biased", meaning: "adj. 有偏见的", note: "同词根形容词形式，注意词性变化" }
      ],
      forms: [
        { word: "biased", pos: "adj.", meaning: "有偏见的" },
        { word: "biases", pos: "n.", meaning: "偏见（复数）" }
      ]
    },
    {
      id: "ky-027",
      word: "capacity",
      phonetic: "/kəˈpæsəti/",
      pos: "n.",
      meaning: "容量；能力；职位",
      example: { en: "The new stadium has a capacity of eighty thousand seats.", zh: "这座新体育场可容纳八万个座位。" },
      similar: [
        { word: "capable", meaning: "adj. 有能力的；能干的", note: "同词根形容词，常与 of 连用" },
        { word: "capacitor", meaning: "n. 电容器", note: "同词根，是物理专业术语" }
      ],
      forms: [
        { word: "capable", pos: "adj.", meaning: "有能力的；能干的" },
        { word: "capacious", pos: "adj.", meaning: "容量大的；宽敞的" }
      ]
    },
    {
      id: "ky-028",
      word: "characterize",
      phonetic: "/ˈkærəktəraɪz/",
      pos: "v.",
      meaning: "是…的特征；描述",
      example: { en: "Rapid urbanization has come to characterize the last thirty years of development.", zh: "快速的城市化已成为过去三十年发展的主要特征。" },
      similar: [
        { word: "character", meaning: "n. 性格；角色；字符", note: "同词根名词，指「性格」或「人物」" },
        { word: "characteristic", meaning: "n. 特征；adj. 典型的", note: "同词根，作名词指「特点」，作形容词指「典型的」" }
      ],
      forms: [
        { word: "characteristic", pos: "n./adj.", meaning: "特征；典型的" },
        { word: "characterization", pos: "n.", meaning: "刻画；描述" }
      ]
    },
    {
      id: "ky-029",
      word: "coherent",
      phonetic: "/kəʊˈhɪərənt/",
      pos: "adj.",
      meaning: "连贯的；有条理的",
      example: { en: "A good essay presents a coherent argument supported by reliable evidence.", zh: "一篇好文章会提出一个由可靠证据支撑的连贯论证。" },
      similar: [
        { word: "inherent", meaning: "adj. 固有的；内在的", note: "拼写相近，inherent 强调「本身就有」" },
        { word: "coherence", meaning: "n. 连贯性；一致性", note: "同词根名词，指「条理清楚」这一性质" }
      ],
      forms: [
        { word: "coherence", pos: "n.", meaning: "连贯性；一致性" },
        { word: "coherently", pos: "adv.", meaning: "连贯地；清晰地" }
      ]
    },
    {
      id: "ky-030",
      word: "coincide",
      phonetic: "/ˌkəʊɪnˈsaɪd/",
      pos: "v.",
      meaning: "同时发生；相符；一致",
      example: { en: "Her visit happened to coincide with the opening of the art festival.", zh: "她的来访恰逢艺术节开幕。" },
      similar: [
        { word: "collide", meaning: "v. 相撞；冲突", note: "拼写相近，collide 是「撞上」" },
        { word: "divide", meaning: "v. 分开；划分", note: "拼写相近，divide 意为「分割」" }
      ],
      forms: [
        { word: "coincidence", pos: "n.", meaning: "巧合；一致" },
        { word: "coincident", pos: "adj.", meaning: "同时发生的" }
      ]
    },
    {
      id: "ky-031",
      word: "collapse",
      phonetic: "/kəˈlæps/",
      pos: "v./n.",
      meaning: "倒塌；崩溃；瓦解",
      example: { en: "The ancient bridge collapsed suddenly after several days of heavy rain.", zh: "这座古桥在连续几天大雨后突然倒塌了。" },
      similar: [
        { word: "elaborate", meaning: "v. 详细阐述；adj. 精细的", note: "拼写相近，elaborate 意为「详加说明」" },
        { word: "eclipse", meaning: "n. 日食；月食", note: "拼写相近，是天文词" }
      ],
      forms: [
        { word: "collapsed", pos: "adj.", meaning: "倒塌的" },
        { word: "collapsible", pos: "adj.", meaning: "可折叠的" }
      ]
    },
    {
      id: "ky-032",
      word: "commit",
      phonetic: "/kəˈmɪt/",
      pos: "v.",
      meaning: "承诺；犯（罪、错）",
      example: { en: "The government has committed itself to reducing carbon emissions by half.", zh: "政府已承诺将碳排放量减少一半。" },
      similar: [
        { word: "committee", meaning: "n. 委员会", note: "同词根，committee 指「一群人组成的机构」" },
        { word: "omit", meaning: "v. 省略；遗漏", note: "拼写相近，omit 意为「漏掉」" }
      ],
      forms: [
        { word: "commitment", pos: "n.", meaning: "承诺；投入" },
        { word: "committed", pos: "adj.", meaning: "坚定的；尽心尽力的" }
      ]
    },
    {
      id: "ky-033",
      word: "compelling",
      phonetic: "/kəmˈpelɪŋ/",
      pos: "adj.",
      meaning: "令人信服的；引人入胜的",
      example: { en: "The researcher offered compelling evidence that the policy had failed.", zh: "这位研究者提供了令人信服的证据，表明该政策已经失败。" },
      similar: [
        { word: "competition", meaning: "n. 竞争；比赛", note: "开头拼写相近，competition 指「竞争」" },
        { word: "compulsory", meaning: "adj. 强制的；必修的", note: "同词根，compulsory 强调「必须做的」" }
      ],
      forms: [
        { word: "compel", pos: "v.", meaning: "强迫；迫使" },
        { word: "compellingly", pos: "adv.", meaning: "令人信服地" }
      ]
    },
    {
      id: "ky-034",
      word: "compensate",
      phonetic: "/ˈkɒmpenseɪt/",
      pos: "v.",
      meaning: "补偿；弥补；赔偿",
      example: { en: "The airline agreed to compensate passengers for the long delay.", zh: "航空公司同意就长时间延误向乘客作出赔偿。" },
      similar: [
        { word: "compete", meaning: "v. 竞争；比赛", note: "开头拼写相近，compete 意为「竞争」" },
        { word: "compensatory", meaning: "adj. 补偿性的", note: "同词根形容词，指「用于补偿的」" }
      ],
      forms: [
        { word: "compensation", pos: "n.", meaning: "补偿；赔偿金" },
        { word: "compensatory", pos: "adj.", meaning: "补偿性的" }
      ]
    },
    {
      id: "ky-035",
      word: "competent",
      phonetic: "/ˈkɒmpɪtənt/",
      pos: "adj.",
      meaning: "有能力的；称职的",
      example: { en: "A competent translator can capture both the meaning and the tone.", zh: "一位称职的译者能同时把握意思和语气。" },
      similar: [
        { word: "competition", meaning: "n. 竞争；比赛", note: "拼写相近，competition 指「竞争、赛事」" },
        { word: "competence", meaning: "n. 能力；胜任", note: "同词根名词，指「干得好的本事」" }
      ],
      forms: [
        { word: "competence", pos: "n.", meaning: "能力；胜任" },
        { word: "competently", pos: "adv.", meaning: "胜任地；称职地" }
      ]
    },
    {
      id: "ky-036",
      word: "comprehensive",
      phonetic: "/ˌkɒmprɪˈhensɪv/",
      pos: "adj.",
      meaning: "全面的；综合的",
      example: { en: "The library offers a comprehensive collection of books on modern history.", zh: "这家图书馆提供关于现代史的全面藏书。" },
      similar: [
        { word: "comprehensible", meaning: "adj. 可理解的；易懂的", note: "同词根，后缀不同，意为「能被看懂」" },
        { word: "comprehend", meaning: "v. 理解；领会", note: "同词根动词，comprehend 强调「理解」" }
      ],
      forms: [
        { word: "comprehend", pos: "v.", meaning: "理解；领会" },
        { word: "comprehensively", pos: "adv.", meaning: "全面地" }
      ]
    },
    {
      id: "ky-037",
      word: "compromise",
      phonetic: "/ˈkɒmprəmaɪz/",
      pos: "n./v.",
      meaning: "妥协；折中；危害",
      example: { en: "Both sides finally reached a compromise after hours of difficult negotiation.", zh: "经过数小时的艰难谈判，双方最终达成了妥协。" },
      similar: [
        { word: "comprise", meaning: "v. 包括；由…组成", note: "拼写相近，comprise 意为「包含」" },
        { word: "promise", meaning: "n./v. 承诺；答应", note: "拼写相近，promise 是「许诺」" }
      ],
      forms: [
        { word: "compromising", pos: "adj.", meaning: "有损声誉的" },
        { word: "compromised", pos: "v.", meaning: "妥协（过去式）" }
      ]
    },
    {
      id: "ky-038",
      word: "conceive",
      phonetic: "/kənˈsiːv/",
      pos: "v.",
      meaning: "构想；想象；怀孕",
      example: { en: "It is hard to conceive of a world without written language.", zh: "很难想象一个没有文字的世界。" },
      similar: [
        { word: "deceive", meaning: "v. 欺骗；蒙蔽", note: "拼写只差一个字母，deceive 是「欺骗」" },
        { word: "concept", meaning: "n. 概念；观念", note: "同词根名词，指「头脑中的概念」" }
      ],
      forms: [
        { word: "conception", pos: "n.", meaning: "构想；观念" },
        { word: "conceivable", pos: "adj.", meaning: "可想象的；可信的" }
      ]
    },
    {
      id: "ky-039",
      word: "concise",
      phonetic: "/kənˈsaɪs/",
      pos: "adj.",
      meaning: "简明的；简洁的",
      example: { en: "Her concise summary saved the committee a great deal of time.", zh: "她简洁的总结为委员会节省了大量时间。" },
      similar: [
        { word: "precise", meaning: "adj. 精确的；准确的", note: "拼写只差一个字母，precise 强调「准确」" },
        { word: "consistent", meaning: "adj. 一致的；始终如一的", note: "拼写相近，consistent 指「前后一致」" }
      ],
      forms: [
        { word: "concisely", pos: "adv.", meaning: "简洁地" },
        { word: "conciseness", pos: "n.", meaning: "简明；简洁" }
      ]
    },
    {
      id: "ky-040",
      word: "conduct",
      phonetic: "/kənˈdʌkt/",
      pos: "v./n.",
      meaning: "进行；指挥；行为",
      example: { en: "The team conducted a series of experiments over three consecutive months.", zh: "该团队在连续三个月里进行了一系列实验。" },
      similar: [
        { word: "product", meaning: "n. 产品；产物", note: "拼写相近，product 是名词，指「产物」" },
        { word: "induce", meaning: "v. 引起；诱导", note: "拼写相近，induce 意为「导致」" }
      ],
      forms: [
        { word: "conductor", pos: "n.", meaning: "指挥；导体" },
        { word: "conduction", pos: "n.", meaning: "传导；输送" }
      ]
    },
    {
      id: "ky-041",
      word: "confront",
      phonetic: "/kənˈfrʌnt/",
      pos: "v.",
      meaning: "面对；对抗；使对质",
      example: { en: "Every generation must confront problems that earlier thinkers never imagined.", zh: "每一代人都必须面对前人从未想象过的问题。" },
      similar: [
        { word: "frontier", meaning: "n. 边境；前沿", note: "同词根，frontier 是名词，指「边界」" },
        { word: "confrontational", meaning: "adj. 对抗性的；挑衅的", note: "同词根形容词，形容态度「咄咄逼人」" }
      ],
      forms: [
        { word: "confrontation", pos: "n.", meaning: "对抗；冲突" },
        { word: "confrontational", pos: "adj.", meaning: "对抗性的" }
      ]
    },
    {
      id: "ky-042",
      word: "consensus",
      phonetic: "/kənˈsensəs/",
      pos: "n.",
      meaning: "共识；一致意见",
      example: { en: "There is a growing consensus among doctors about the benefits of exercise.", zh: "医生们对锻炼的益处正逐渐形成共识。" },
      similar: [
        { word: "consent", meaning: "n./v. 同意；允许", note: "拼写相近，consent 强调「点头同意」" },
        { word: "census", meaning: "n. 人口普查", note: "拼写相近，census 是「统计人口」" }
      ],
      forms: [
        { word: "consensual", pos: "adj.", meaning: "一致同意的" },
        { word: "consensuses", pos: "n.", meaning: "共识（复数）" }
      ]
    },
    {
      id: "ky-043",
      word: "consequence",
      phonetic: "/ˈkɒnsɪkwəns/",
      pos: "n.",
      meaning: "结果；后果；重要性",
      example: { en: "One consequence of the new law was a sharp fall in car accidents.", zh: "新法律带来的一个后果是车祸数量急剧下降。" },
      similar: [
        { word: "sequence", meaning: "n. 顺序；一系列", note: "拼写相近，sequence 指「先后次序」" },
        { word: "consequent", meaning: "adj. 随之发生的", note: "同词根形容词，意为「作为结果的」" }
      ],
      forms: [
        { word: "consequent", pos: "adj.", meaning: "随之而来的" },
        { word: "consequently", pos: "adv.", meaning: "因此；结果" }
      ]
    },
    {
      id: "ky-044",
      word: "considerable",
      phonetic: "/kənˈsɪdərəbl/",
      pos: "adj.",
      meaning: "相当大的；重要的",
      example: { en: "The project required a considerable amount of money and patience.", zh: "这个项目需要相当多的资金和耐心。" },
      similar: [
        { word: "considerate", meaning: "adj. 体贴的；考虑周到的", note: "拼写相近，considerate 形容人「为他人着想」" },
        { word: "consider", meaning: "v. 考虑；认为", note: "同词根动词，consider 是「思考」的动作" }
      ],
      forms: [
        { word: "considerably", pos: "adv.", meaning: "相当地；在很大程度上" },
        { word: "consideration", pos: "n.", meaning: "考虑；体贴" }
      ]
    },
    {
      id: "ky-045",
      word: "consistent",
      phonetic: "/kənˈsɪstənt/",
      pos: "adj.",
      meaning: "一致的；始终如一的",
      example: { en: "His performance has been consistent throughout the whole season.", zh: "他的表现整个赛季始终如一。" },
      similar: [
        { word: "persistent", meaning: "adj. 持续的；坚持不懈的", note: "拼写相近，persistent 强调「不放弃」" },
        { word: "consist", meaning: "v. 由…组成；在于", note: "同词根动词，常与 of 连用" }
      ],
      forms: [
        { word: "consistency", pos: "n.", meaning: "一致性；连贯性" },
        { word: "consistently", pos: "adv.", meaning: "一贯地；始终" }
      ]
    },
    {
      id: "ky-046",
      word: "constitute",
      phonetic: "/ˈkɒnstɪtjuːt/",
      pos: "v.",
      meaning: "构成；组成；设立",
      example: { en: "Women now constitute more than half of the students in this department.", zh: "女性现在占该系学生人数的一半以上。" },
      similar: [
        { word: "institute", meaning: "n. 学院；研究所", note: "拼写相近，institute 是名词，指「机构」" },
        { word: "constitution", meaning: "n. 宪法；构成", note: "同词根名词，既指「宪法」也指「组成方式」" }
      ],
      forms: [
        { word: "constitution", pos: "n.", meaning: "宪法；构成" },
        { word: "constitutional", pos: "adj.", meaning: "宪法的；本质的" }
      ]
    },
    {
      id: "ky-047",
      word: "constraint",
      phonetic: "/kənˈstreɪnt/",
      pos: "n.",
      meaning: "限制；约束；克制",
      example: { en: "Time constraint forced the researchers to simplify their original plan.", zh: "时间上的限制迫使研究人员简化了最初的计划。" },
      similar: [
        { word: "restrain", meaning: "v. 抑制；约束", note: "拼写相近，restrain 是动词，意为「克制住」" },
        { word: "constant", meaning: "adj. 不断的；恒定的", note: "拼写相近，constant 强调「持续不变」" }
      ],
      forms: [
        { word: "constrain", pos: "v.", meaning: "限制；约束" },
        { word: "constrained", pos: "adj.", meaning: "受限的；勉强的" }
      ]
    },
    {
      id: "ky-048",
      word: "contemporary",
      phonetic: "/kənˈtemprəri/",
      pos: "adj./n.",
      meaning: "当代的；同时代的；同代人",
      example: { en: "The museum collects contemporary art from artists all over the world.", zh: "这家博物馆收藏来自世界各地艺术家的当代艺术作品。" },
      similar: [
        { word: "temporary", meaning: "adj. 暂时的；临时的", note: "拼写相近，temporary 强调「时间短暂」" },
        { word: "contempt", meaning: "n. 轻视；蔑视", note: "拼写相近，contempt 是「瞧不起」" }
      ],
      forms: [
        { word: "contemporaries", pos: "n.", meaning: "同代人（复数）" },
        { word: "contemporarily", pos: "adv.", meaning: "当代地；同时代地" }
      ]
    },
    {
      id: "ky-049",
      word: "contradict",
      phonetic: "/ˌkɒntrəˈdɪkt/",
      pos: "v.",
      meaning: "反驳；与…相矛盾",
      example: { en: "These new findings contradict the theory that was accepted for decades.", zh: "这些新发现与几十年来被接受的理论相矛盾。" },
      similar: [
        { word: "contract", meaning: "n. 合同；v. 收缩", note: "拼写相近，contract 多指「合同」" },
        { word: "contradictory", meaning: "adj. 矛盾的；对立的", note: "同词根形容词，形容说法「自相矛盾」" }
      ],
      forms: [
        { word: "contradiction", pos: "n.", meaning: "矛盾；反驳" },
        { word: "contradictory", pos: "adj.", meaning: "矛盾的" }
      ]
    },
    {
      id: "ky-050",
      word: "contribute",
      phonetic: "/kənˈtrɪbjuːt/",
      pos: "v.",
      meaning: "贡献；捐资；促成",
      example: { en: "Regular exercise can contribute greatly to both physical and mental health.", zh: "规律锻炼对身心健康都大有助益。" },
      similar: [
        { word: "attribute", meaning: "v. 把…归因于", note: "拼写相近，attribute 是「归因」" },
        { word: "contribution", meaning: "n. 贡献；捐款", note: "同词根名词，指「做出的贡献」" }
      ],
      forms: [
        { word: "contribution", pos: "n.", meaning: "贡献；捐款" },
        { word: "contributor", pos: "n.", meaning: "贡献者；投稿人" }
      ]
    },
    {
      id: "ky-051",
      word: "controversial",
      phonetic: "/ˌkɒntrəˈvɜːʃl/",
      pos: "adj.",
      meaning: "有争议的；引起争论的",
      example: { en: "The proposal to raise tuition fees remains highly controversial among students.", zh: "提高学费的提议在学生中仍然极具争议。" },
      similar: [
        { word: "conventional", meaning: "adj. 传统的；常规的", note: "拼写相近，conventional 指「按惯例的」" },
        { word: "controversy", meaning: "n. 争议；争论", note: "同词根名词，指「争论本身」" }
      ],
      forms: [
        { word: "controversy", pos: "n.", meaning: "争议；争论" },
        { word: "controversially", pos: "adv.", meaning: "有争议地" }
      ]
    },
    {
      id: "ky-052",
      word: "conventional",
      phonetic: "/kənˈvenʃənl/",
      pos: "adj.",
      meaning: "传统的；常规的；惯例的",
      example: { en: "The young designer refused to follow conventional rules of interior decoration.", zh: "这位年轻设计师拒绝遵循室内装饰的传统规则。" },
      similar: [
        { word: "convenient", meaning: "adj. 方便的；便利的", note: "拼写相近，convenient 意为「省事的」" },
        { word: "convention", meaning: "n. 惯例；大会；公约", note: "同词根名词，指「习俗」或「会议」" }
      ],
      forms: [
        { word: "convention", pos: "n.", meaning: "惯例；大会" },
        { word: "conventionally", pos: "adv.", meaning: "按惯例地" }
      ]
    },
    {
      id: "ky-053",
      word: "convey",
      phonetic: "/kənˈveɪ/",
      pos: "v.",
      meaning: "传达；表达；运送",
      example: { en: "Photographs can convey emotions that words alone often fail to express.", zh: "照片能够传达出仅靠文字往往难以表达的情感。" },
      similar: [
        { word: "survey", meaning: "n. 调查；v. 审视", note: "拼写相近，survey 多指「调查」" },
        { word: "conveyance", meaning: "n. 运输；传达", note: "同词根名词，指「运送」或「传递」" }
      ],
      forms: [
        { word: "conveyance", pos: "n.", meaning: "运输；传达" },
        { word: "conveyor", pos: "n.", meaning: "传送带；运送者" }
      ]
    },
    {
      id: "ky-054",
      word: "correlate",
      phonetic: "/ˈkɒrəleɪt/",
      pos: "v./n.",
      meaning: "相关联；使相互关联；相关物",
      example: { en: "Researchers found that income levels correlate closely with years of schooling.", zh: "研究人员发现收入水平与受教育年限密切相关。" },
      similar: [
        { word: "relate", meaning: "v. 有关联；讲述", note: "近义，注意区分，relate 用法更宽泛" },
        { word: "correlation", meaning: "n. 相关性；关联", note: "同词根名词，指「统计上的相关」" }
      ],
      forms: [
        { word: "correlation", pos: "n.", meaning: "相关性；关联" },
        { word: "correlated", pos: "adj.", meaning: "相关的" }
      ]
    },
    {
      id: "ky-055",
      word: "credible",
      phonetic: "/ˈkredəbl/",
      pos: "adj.",
      meaning: "可信的；可靠的",
      example: { en: "The witness gave a credible account of what happened that night.", zh: "那位目击者对当晚发生的事作了可信的陈述。" },
      similar: [
        { word: "credit", meaning: "n. 信用；学分；赞扬", note: "同词根名词，指「信誉、赊账」" },
        { word: "incredible", meaning: "adj. 难以置信的；极好的", note: "反义，多一个前缀 in-" }
      ],
      forms: [
        { word: "credibility", pos: "n.", meaning: "可信度；信誉" },
        { word: "incredible", pos: "adj.", meaning: "难以置信的" }
      ]
    },
    {
      id: "ky-056",
      word: "criterion",
      phonetic: "/kraɪˈtɪəriən/",
      pos: "n.",
      meaning: "标准；准则；尺度",
      example: { en: "Cost should not be the only criterion for choosing a research topic.", zh: "费用不应成为选择研究课题的唯一标准。" },
      similar: [
        { word: "critical", meaning: "adj. 批判的；关键的", note: "拼写相近，critical 意为「批判的」" },
        { word: "criteria", meaning: "n. 标准（复数）", note: "同词的复数形式，学术写作中常被误用为单数" }
      ],
      forms: [
        { word: "criteria", pos: "n.", meaning: "标准（复数）" },
        { word: "criterial", pos: "adj.", meaning: "标准的" }
      ]
    },
    {
      id: "ky-057",
      word: "crucial",
      phonetic: "/ˈkruːʃl/",
      pos: "adj.",
      meaning: "至关重要的；关键的",
      example: { en: "Early diagnosis is crucial for the successful treatment of this disease.", zh: "早期诊断对这种疾病的成功治疗至关重要。" },
      similar: [
        { word: "cruel", meaning: "adj. 残酷的；无情的", note: "拼写相近，cruel 形容人「残忍」" },
        { word: "crucially", meaning: "adv. 关键地；至关重要地", note: "同词根副词，用于强调重要性" }
      ],
      forms: [
        { word: "crucially", pos: "adv.", meaning: "关键地；至关重要地" },
        { word: "crux", pos: "n.", meaning: "关键；症结" }
      ]
    },
    {
      id: "ky-058",
      word: "cultivate",
      phonetic: "/ˈkʌltɪveɪt/",
      pos: "v.",
      meaning: "培养；耕作；陶冶",
      example: { en: "Reading widely helps students cultivate the habit of independent thinking.", zh: "广泛阅读有助于学生培养独立思考的习惯。" },
      similar: [
        { word: "culture", meaning: "n. 文化；培养", note: "同词根名词，指「文化」或「培养物」" },
        { word: "calculate", meaning: "v. 计算；估计", note: "拼写相近，calculate 意为「计算」" }
      ],
      forms: [
        { word: "cultivation", pos: "n.", meaning: "培养；耕作" },
        { word: "cultivated", pos: "adj.", meaning: "有教养的；栽培的" }
      ]
    },
    {
      id: "ky-059",
      word: "deliberate",
      phonetic: "/dɪˈlɪbərət/",
      pos: "adj./v.",
      meaning: "故意的；从容的；仔细考虑",
      example: { en: "The damage to the painting was clearly a deliberate act of vandalism.", zh: "那幅画受到的损坏显然是故意破坏行为。" },
      similar: [
        { word: "liberate", meaning: "v. 解放；释放", note: "拼写相近，liberate 是「使自由」" },
        { word: "deliberation", meaning: "n. 深思熟虑；审议", note: "同词根名词，指「反复权衡」" }
      ],
      forms: [
        { word: "deliberately", pos: "adv.", meaning: "故意地；从容地" },
        { word: "deliberation", pos: "n.", meaning: "深思熟虑；审议" }
      ]
    },
    {
      id: "ky-060",
      word: "demonstrate",
      phonetic: "/ˈdemənstreɪt/",
      pos: "v.",
      meaning: "证明；演示；示威",
      example: { en: "The experiment clearly demonstrates the effect of heat on metal.", zh: "这个实验清楚地证明了热量对金属的影响。" },
      similar: [
        { word: "remonstrate", meaning: "v. 抗议；规劝", note: "拼写相近，remonstrate 是「提出异议」" },
        { word: "demonstration", meaning: "n. 证明；演示；游行", note: "同词根名词，也指「示威游行」" }
      ],
      forms: [
        { word: "demonstration", pos: "n.", meaning: "证明；示威" },
        { word: "demonstrative", pos: "adj.", meaning: "说明的；感情外露的" }
      ]
    },
    {
      id: "ky-061",
      word: "derive",
      phonetic: "/dɪˈraɪv/",
      pos: "v.",
      meaning: "得到；源于；推导",
      example: { en: "Many English words derive from Latin and ancient Greek roots.", zh: "许多英语单词源自拉丁语和古希腊语词根。" },
      similar: [
        { word: "deprive", meaning: "v. 剥夺；使丧失", note: "拼写只差一个字母，deprive 是「夺走」" },
        { word: "derivation", meaning: "n. 起源；派生", note: "同词根名词，指「词源、由来」" }
      ],
      forms: [
        { word: "derivation", pos: "n.", meaning: "起源；派生" },
        { word: "derived", pos: "adj.", meaning: "派生的；衍生的" }
      ]
    },
    {
      id: "ky-062",
      word: "deteriorate",
      phonetic: "/dɪˈtɪəriəreɪt/",
      pos: "v.",
      meaning: "恶化；变坏；退化",
      example: { en: "His health continued to deteriorate despite the best available treatment.", zh: "尽管接受了最好的治疗，他的健康状况还是继续恶化。" },
      similar: [
        { word: "degenerate", meaning: "v. 退化；堕落", note: "近义，注意区分，degenerate 侧重道德或机能退化" },
        { word: "deterrent", meaning: "n. 威慑物；制止因素", note: "拼写开头相同，是名词，指「起吓阻作用的东西」" }
      ],
      forms: [
        { word: "deterioration", pos: "n.", meaning: "恶化；退化" },
        { word: "deteriorated", pos: "v.", meaning: "恶化（过去式）" }
      ]
    },
    {
      id: "ky-063",
      word: "diminish",
      phonetic: "/dɪˈmɪnɪʃ/",
      pos: "v.",
      meaning: "减少；削弱；贬低",
      example: { en: "The influence of printed newspapers has gradually diminished over the past decade.", zh: "过去十年里，纸质报纸的影响力逐渐减弱。" },
      similar: [
        { word: "distinguish", meaning: "v. 区分；辨别", note: "拼写相近，distinguish 意为「分辨」" },
        { word: "minimize", meaning: "v. 使最小化；轻视", note: "近义，注意区分，minimize 强调「降到最低」" }
      ],
      forms: [
        { word: "diminution", pos: "n.", meaning: "减少；缩减" },
        { word: "diminishing", pos: "adj.", meaning: "逐渐减少的" }
      ]
    },
    {
      id: "ky-064",
      word: "discrepancy",
      phonetic: "/dɪsˈkrepənsi/",
      pos: "n.",
      meaning: "差异；不一致；出入",
      example: { en: "The auditors found a serious discrepancy between the two financial reports.", zh: "审计人员发现两份财务报告之间存在严重的不一致。" },
      similar: [
        { word: "discretion", meaning: "n. 谨慎；自行决定权", note: "拼写相近，discretion 指「斟酌处理」" },
        { word: "discrepant", meaning: "adj. 不一致的；有出入的", note: "同词根形容词，形容数据「对不上」" }
      ],
      forms: [
        { word: "discrepant", pos: "adj.", meaning: "不一致的" },
        { word: "discrepancies", pos: "n.", meaning: "差异（复数）" }
      ]
    },
    {
      id: "ky-065",
      word: "distinguish",
      phonetic: "/dɪˈstɪŋɡwɪʃ/",
      pos: "v.",
      meaning: "区分；辨别；使杰出",
      example: { en: "Young children cannot easily distinguish between fantasy and reality.", zh: "幼儿不容易区分幻想与现实。" },
      similar: [
        { word: "extinguish", meaning: "v. 熄灭；扑灭", note: "拼写只差首字母，extinguish 是「灭火」" },
        { word: "distinction", meaning: "n. 区别；卓越；荣誉", note: "同词根名词，指「差别」或「优异成绩」" }
      ],
      forms: [
        { word: "distinction", pos: "n.", meaning: "区别；卓越" },
        { word: "distinguishable", pos: "adj.", meaning: "可区分的" }
      ]
    },
    {
      id: "ky-066",
      word: "diverse",
      phonetic: "/daɪˈvɜːs/",
      pos: "adj.",
      meaning: "多样的；不同的",
      example: { en: "The city is home to people from diverse cultural and religious backgrounds.", zh: "这座城市是来自不同文化和宗教背景的人们的家园。" },
      similar: [
        { word: "reverse", meaning: "v. 颠倒；逆转", note: "拼写相近，reverse 是「反过来」" },
        { word: "diversity", meaning: "n. 多样性；差异", note: "同词根名词，指「多种多样」这一状态" }
      ],
      forms: [
        { word: "diversity", pos: "n.", meaning: "多样性；差异" },
        { word: "diversify", pos: "v.", meaning: "使多样化" }
      ]
    },
    {
      id: "ky-067",
      word: "dominate",
      phonetic: "/ˈdɒmɪneɪt/",
      pos: "v.",
      meaning: "支配；主导；俯视",
      example: { en: "A few large companies dominate the global market for mobile phones.", zh: "少数几家大公司主导着全球手机市场。" },
      similar: [
        { word: "domestic", meaning: "adj. 国内的；家庭的", note: "拼写相近，domestic 指「本国的」" },
        { word: "dominant", meaning: "adj. 占主导地位的", note: "同词根形容词，表示「处于支配地位」" }
      ],
      forms: [
        { word: "dominant", pos: "adj.", meaning: "占优势的；显性的" },
        { word: "dominance", pos: "n.", meaning: "支配地位；优势" }
      ]
    },
    {
      id: "ky-068",
      word: "eliminate",
      phonetic: "/ɪˈlɪmɪneɪt/",
      pos: "v.",
      meaning: "消除；排除；淘汰",
      example: { en: "The new vaccine may eliminate the disease within a few decades.", zh: "这种新疫苗可能在未来几十年内消灭这种疾病。" },
      similar: [
        { word: "illuminate", meaning: "v. 照亮；阐明", note: "拼写相近，illuminate 是「照亮」" },
        { word: "elimination", meaning: "n. 消除；淘汰", note: "同词根名词，指「被排除掉」" }
      ],
      forms: [
        { word: "elimination", pos: "n.", meaning: "消除；淘汰" },
        { word: "eliminated", pos: "v.", meaning: "消除（过去式）" }
      ]
    },
    {
      id: "ky-069",
      word: "emerge",
      phonetic: "/ɪˈmɜːdʒ/",
      pos: "v.",
      meaning: "出现；浮现；显露",
      example: { en: "Several promising solutions emerged during the long discussion.", zh: "在长时间的讨论中出现了几个有前景的解决方案。" },
      similar: [
        { word: "emergency", meaning: "n. 紧急情况；突发事件", note: "开头拼写相同，emergency 指「急事」" },
        { word: "emergence", meaning: "n. 出现；兴起", note: "同词根名词，指「冒出来」这件事" }
      ],
      forms: [
        { word: "emergence", pos: "n.", meaning: "出现；兴起" },
        { word: "emerging", pos: "adj.", meaning: "新兴的；刚出现的" }
      ]
    },
    {
      id: "ky-070",
      word: "empirical",
      phonetic: "/ɪmˈpɪrɪkl/",
      pos: "adj.",
      meaning: "经验的；实证的",
      example: { en: "The claim is supported by empirical data collected over ten years.", zh: "这一主张得到了十年间收集的实证数据的支持。" },
      similar: [
        { word: "empire", meaning: "n. 帝国；大企业集团", note: "拼写相近，empire 指「帝国」" },
        { word: "empiricism", meaning: "n. 经验主义；实证论", note: "同词根名词，是一种哲学主张" }
      ],
      forms: [
        { word: "empirically", pos: "adv.", meaning: "以实证方式；经验上" },
        { word: "empiricism", pos: "n.", meaning: "经验主义" }
      ]
    },
    {
      id: "ky-071",
      word: "enhance",
      phonetic: "/ɪnˈhɑːns/",
      pos: "v.",
      meaning: "提高；增强；改善",
      example: { en: "Regular practice can greatly enhance your ability to speak in public.", zh: "经常练习能大大提高你在公开场合讲话的能力。" },
      similar: [
        { word: "entrance", meaning: "n. 入口；进入权", note: "拼写相近，entrance 指「入口」" },
        { word: "enhancement", meaning: "n. 提高；增强", note: "同词根名词，指「提升」这一结果" }
      ],
      forms: [
        { word: "enhancement", pos: "n.", meaning: "提高；增强" },
        { word: "enhanced", pos: "adj.", meaning: "增强的" }
      ]
    },
    {
      id: "ky-072",
      word: "entitle",
      phonetic: "/ɪnˈtaɪtl/",
      pos: "v.",
      meaning: "使有权利；给…命名",
      example: { en: "This membership card entitles you to use the library after midnight.", zh: "这张会员卡使你有权在午夜后使用图书馆。" },
      similar: [
        { word: "title", meaning: "n. 标题；头衔", note: "同词根名词，指「名称、称号」" },
        { word: "entire", meaning: "adj. 整个的；全部的", note: "拼写相近，entire 意为「完整的」" }
      ],
      forms: [
        { word: "entitlement", pos: "n.", meaning: "权利；津贴" },
        { word: "entitled", pos: "adj.", meaning: "有资格的；题名为" }
      ]
    },
    {
      id: "ky-073",
      word: "equivalent",
      phonetic: "/ɪˈkwɪvələnt/",
      pos: "adj./n.",
      meaning: "相等的；等价的；等价物",
      example: { en: "One mile is roughly equivalent to one and a half kilometres.", zh: "一英里大约相当于一点五公里。" },
      similar: [
        { word: "equivalence", meaning: "n. 相等；等价", note: "同词根名词，指「对等关系」" },
        { word: "equipped", meaning: "adj. 装备的；具备的", note: "拼写相近，equipped 指「配有设备」" }
      ],
      forms: [
        { word: "equivalence", pos: "n.", meaning: "相等；等价" },
        { word: "equivalently", pos: "adv.", meaning: "等价地；同样地" }
      ]
    },
    {
      id: "ky-074",
      word: "essential",
      phonetic: "/ɪˈsenʃl/",
      pos: "adj./n.",
      meaning: "必要的；本质的；要素",
      example: { en: "Clean water is essential to the health of every community.", zh: "清洁的水对每个社区的健康都必不可少。" },
      similar: [
        { word: "essence", meaning: "n. 本质；精华", note: "同词根名词，指「最核心的部分」" },
        { word: "quintessential", meaning: "adj. 典型的；精髓的", note: "同词根，常用来指「最典型的」" }
      ],
      forms: [
        { word: "essence", pos: "n.", meaning: "本质；精华" },
        { word: "essentially", pos: "adv.", meaning: "本质上；基本上" }
      ]
    },
    {
      id: "ky-075",
      word: "evaluate",
      phonetic: "/ɪˈvæljueɪt/",
      pos: "v.",
      meaning: "评价；评估；估价",
      example: { en: "The committee will evaluate each application according to strict criteria.", zh: "委员会将按照严格的标准评估每一份申请。" },
      similar: [
        { word: "value", meaning: "n. 价值；v. 重视", note: "同词根，value 是名词「价值」或动词「看重」" },
        { word: "evacuate", meaning: "v. 疏散；撤离", note: "拼写相近，evacuate 是「撤离」" }
      ],
      forms: [
        { word: "evaluation", pos: "n.", meaning: "评估；评价" },
        { word: "evaluative", pos: "adj.", meaning: "评价性的" }
      ]
    },
    {
      id: "ky-076",
      word: "evident",
      phonetic: "/ˈevɪdənt/",
      pos: "adj.",
      meaning: "明显的；显然的",
      example: { en: "It was evident from her tone that she disagreed with the plan.", zh: "从她的语气可以明显看出她不同意这个计划。" },
      similar: [
        { word: "evidence", meaning: "n. 证据；迹象", note: "同词根名词，指「能说明问题的凭据」" },
        { word: "prudent", meaning: "adj. 谨慎的；精明的", note: "拼写相近，prudent 形容人「审慎」" }
      ],
      forms: [
        { word: "evidence", pos: "n.", meaning: "证据；迹象" },
        { word: "evidently", pos: "adv.", meaning: "显然；据说" }
      ]
    },
    {
      id: "ky-077",
      word: "evolve",
      phonetic: "/ɪˈvɒlv/",
      pos: "v.",
      meaning: "进化；逐步发展；演变",
      example: { en: "Written language continued to evolve over thousands of years.", zh: "书面语言在数千年间不断演化。" },
      similar: [
        { word: "involve", meaning: "v. 涉及；使卷入", note: "拼写只差一个字母，involve 是「牵涉」" },
        { word: "evolution", meaning: "n. 进化；演变", note: "同词根名词，指「长期变化过程」" }
      ],
      forms: [
        { word: "evolution", pos: "n.", meaning: "进化；演变" },
        { word: "evolutionary", pos: "adj.", meaning: "进化的；演变的" }
      ]
    },
    {
      id: "ky-078",
      word: "exaggerate",
      phonetic: "/ɪɡˈzædʒəreɪt/",
      pos: "v.",
      meaning: "夸大；夸张；言过其实",
      example: { en: "Newspapers sometimes exaggerate the dangers of everyday life.", zh: "报纸有时会夸大日常生活中的危险。" },
      similar: [
        { word: "exhausted", meaning: "adj. 疲惫的；耗尽的", note: "拼写相近，exhausted 意为「筋疲力尽」" },
        { word: "exaggeration", meaning: "n. 夸张；夸大之词", note: "同词根名词，指「夸张的说法」" }
      ],
      forms: [
        { word: "exaggeration", pos: "n.", meaning: "夸张；夸大" },
        { word: "exaggerated", pos: "adj.", meaning: "夸大的" }
      ]
    },
    {
      id: "ky-079",
      word: "exceed",
      phonetic: "/ɪkˈsiːd/",
      pos: "v.",
      meaning: "超过；超越；胜过",
      example: { en: "The number of applicants exceeded our most optimistic expectations.", zh: "申请人数超出了我们最乐观的预期。" },
      similar: [
        { word: "proceed", meaning: "v. 继续进行；行进", note: "拼写只差一个字母，proceed 是「接着做」" },
        { word: "excess", meaning: "n. 过量；adj. 多余的", note: "同词根，excess 是名词「过量」" }
      ],
      forms: [
        { word: "excess", pos: "n.", meaning: "过量；超过" },
        { word: "excessive", pos: "adj.", meaning: "过度的；过多的" }
      ]
    },
    {
      id: "ky-080",
      word: "exclusive",
      phonetic: "/ɪkˈskluːsɪv/",
      pos: "adj./n.",
      meaning: "独有的；排他的；专稿",
      example: { en: "The club enjoys exclusive rights to publish his early works.", zh: "该俱乐部享有出版他早期作品的独家权利。" },
      similar: [
        { word: "inclusive", meaning: "adj. 包括在内的；包容的", note: "反义，拼写相近，inclusive 是「包含的」" },
        { word: "exclude", meaning: "v. 排除；把…排斥在外", note: "同词根动词，exclude 是「排除」" }
      ],
      forms: [
        { word: "exclude", pos: "v.", meaning: "排除；不包括" },
        { word: "exclusively", pos: "adv.", meaning: "仅仅；专门地" }
      ]
    },
    {
      id: "ky-081",
      word: "explicit",
      phonetic: "/ɪkˈsplɪsɪt/",
      pos: "adj.",
      meaning: "明确的；直言的；详述的",
      example: { en: "The contract contains explicit rules about overtime and holiday pay.", zh: "合同中包含关于加班和假日工资的明确规定。" },
      similar: [
        { word: "implicit", meaning: "adj. 含蓄的；不言明的", note: "反义，拼写只差首字母，implicit 是「暗示的」" },
        { word: "explain", meaning: "v. 解释；说明", note: "同词根动词，explain 是「讲清楚」" }
      ],
      forms: [
        { word: "explicitly", pos: "adv.", meaning: "明确地；直率地" },
        { word: "explicitness", pos: "n.", meaning: "明确；直白" }
      ]
    },
    {
      id: "ky-082",
      word: "exploit",
      phonetic: "/ɪkˈsplɔɪt/",
      pos: "v./n.",
      meaning: "利用；开发；剥削；功绩",
      example: { en: "Some companies exploit cheap labour in poorer countries.", zh: "一些公司在较贫穷的国家剥削廉价劳动力。" },
      similar: [
        { word: "explore", meaning: "v. 探索；勘探", note: "拼写相近，explore 是「探究」" },
        { word: "exploitation", meaning: "n. 开发；剥削", note: "同词根名词，指「开发利用」或「压榨」" }
      ],
      forms: [
        { word: "exploitation", pos: "n.", meaning: "开发；剥削" },
        { word: "exploitative", pos: "adj.", meaning: "剥削性的" }
      ]
    },
    {
      id: "ky-083",
      word: "facilitate",
      phonetic: "/fəˈsɪlɪteɪt/",
      pos: "v.",
      meaning: "促进；使便利",
      example: { en: "The new railway will facilitate trade between the two regions.", zh: "这条新铁路将促进两个地区之间的贸易。" },
      similar: [
        { word: "facility", meaning: "n. 设施；便利", note: "同词根名词，指「设备、便利条件」" },
        { word: "felicitate", meaning: "v. 祝贺；庆贺", note: "拼写相近，felicitate 是「道贺」" }
      ],
      forms: [
        { word: "facilitation", pos: "n.", meaning: "促进；便利化" },
        { word: "facilitator", pos: "n.", meaning: "促进者；协调人" }
      ]
    },
    {
      id: "ky-084",
      word: "fluctuate",
      phonetic: "/ˈflʌktʃueɪt/",
      pos: "v.",
      meaning: "波动；起伏；不稳定",
      example: { en: "Oil prices fluctuate sharply in response to political events.", zh: "石油价格会因政治事件而剧烈波动。" },
      similar: [
        { word: "fortunate", meaning: "adj. 幸运的；吉利的", note: "拼写相近，fortunate 意为「运气好」" },
        { word: "fluctuation", meaning: "n. 波动；起伏", note: "同词根名词，指「上下变动」" }
      ],
      forms: [
        { word: "fluctuation", pos: "n.", meaning: "波动；起伏" },
        { word: "fluctuating", pos: "adj.", meaning: "波动的" }
      ]
    },
    {
      id: "ky-085",
      word: "fundamental",
      phonetic: "/ˌfʌndəˈmentl/",
      pos: "adj./n.",
      meaning: "基本的；根本的；基本原理",
      example: { en: "Freedom of speech is a fundamental right in a democratic society.", zh: "言论自由是民主社会的一项基本权利。" },
      similar: [
        { word: "foundation", meaning: "n. 基础；基金会", note: "同词根名词，指「根基」或「基金会」" },
        { word: "foundational", meaning: "adj. 基础的；根本的", note: "同词根形容词，多用于学术语境" }
      ],
      forms: [
        { word: "foundation", pos: "n.", meaning: "基础；根基" },
        { word: "fundamentally", pos: "adv.", meaning: "根本上；从根本上" }
      ]
    },
    {
      id: "ky-086",
      word: "generate",
      phonetic: "/ˈdʒenəreɪt/",
      pos: "v.",
      meaning: "产生；生成；引起",
      example: { en: "Solar panels generate electricity even on cloudy winter days.", zh: "太阳能电池板甚至在多云的冬日也能发电。" },
      similar: [
        { word: "generous", meaning: "adj. 慷慨的；大方的", note: "拼写相近，generous 形容人「大方」" },
        { word: "generator", meaning: "n. 发电机；生成器", note: "同词根名词，是「发电的设备」" }
      ],
      forms: [
        { word: "generation", pos: "n.", meaning: "产生；一代" },
        { word: "generator", pos: "n.", meaning: "发电机；生成器" }
      ]
    },
    {
      id: "ky-087",
      word: "hypothesis",
      phonetic: "/haɪˈpɒθəsɪs/",
      pos: "n.",
      meaning: "假设；假说；前提",
      example: { en: "The data did not support the original hypothesis of the research team.", zh: "数据并不支持该研究团队最初的假设。" },
      similar: [
        { word: "synthesis", meaning: "n. 综合；合成", note: "拼写相近，synthesis 意为「综合」" },
        { word: "hypothetical", meaning: "adj. 假设的；假想的", note: "同词根形容词，表示「尚未证实的」" }
      ],
      forms: [
        { word: "hypotheses", pos: "n.", meaning: "假设（复数）" },
        { word: "hypothetical", pos: "adj.", meaning: "假设的" }
      ]
    },
    {
      id: "ky-088",
      word: "illustrate",
      phonetic: "/ˈɪləstreɪt/",
      pos: "v.",
      meaning: "说明；举例说明；插图",
      example: { en: "The diagram helps illustrate how the human heart pumps blood.", zh: "这张图有助于说明人的心脏是如何泵血的。" },
      similar: [
        { word: "illuminate", meaning: "v. 照亮；阐明", note: "拼写相近，illuminate 是「照亮、讲明」" },
        { word: "illustration", meaning: "n. 插图；例证", note: "同词根名词，指「插图」或「例子」" }
      ],
      forms: [
        { word: "illustration", pos: "n.", meaning: "说明；插图" },
        { word: "illustrative", pos: "adj.", meaning: "说明性的" }
      ]
    },
    {
      id: "ky-089",
      word: "imply",
      phonetic: "/ɪmˈplaɪ/",
      pos: "v.",
      meaning: "暗示；意味着；含有…的意思",
      example: { en: "His silence seemed to imply that he accepted the committee decision.", zh: "他的沉默似乎暗示他接受了委员会的决定。" },
      similar: [
        { word: "apply", meaning: "v. 申请；应用", note: "拼写只差一个字母，apply 是「申请、适用」" },
        { word: "infer", meaning: "v. 推断；推论", note: "近义，注意区分，infer 是听者「推断」" }
      ],
      forms: [
        { word: "implication", pos: "n.", meaning: "含义；暗示；影响" },
        { word: "implied", pos: "adj.", meaning: "含蓄的；暗示的" }
      ]
    },
    {
      id: "ky-090",
      word: "incentive",
      phonetic: "/ɪnˈsentɪv/",
      pos: "n.",
      meaning: "激励；动机；奖励措施",
      example: { en: "Tax reductions provide a strong incentive for companies to invest.", zh: "减税为公司投资提供了强大的激励。" },
      similar: [
        { word: "insensitive", meaning: "adj. 不敏感的；麻木的", note: "拼写相近，insensitive 形容人「迟钝」" },
        { word: "incentivize", meaning: "v. 激励；刺激", note: "同词根动词，指「用奖励去推动」" }
      ],
      forms: [
        { word: "incentivize", pos: "v.", meaning: "激励；刺激" },
        { word: "incentives", pos: "n.", meaning: "激励（复数）" }
      ]
    },
    {
      id: "ky-091",
      word: "inevitable",
      phonetic: "/ɪnˈevɪtəbl/",
      pos: "adj.",
      meaning: "不可避免的；必然的",
      example: { en: "Some conflict is inevitable when people work closely together.", zh: "当人们密切合作时，一些冲突是不可避免的。" },
      similar: [
        { word: "invaluable", meaning: "adj. 无价的；极宝贵的", note: "拼写相近，invaluable 意为「极珍贵」" },
        { word: "inevitability", meaning: "n. 必然性", note: "同词根名词，指「躲不掉」这一性质" }
      ],
      forms: [
        { word: "inevitably", pos: "adv.", meaning: "不可避免地；必然地" },
        { word: "inevitability", pos: "n.", meaning: "必然性" }
      ]
    },
    {
      id: "ky-092",
      word: "infer",
      phonetic: "/ɪnˈfɜː(r)/",
      pos: "v.",
      meaning: "推断；推论；暗示",
      example: { en: "From these numbers we can infer that the market is recovering.", zh: "从这些数字我们可以推断出市场正在复苏。" },
      similar: [
        { word: "refer", meaning: "v. 提到；查阅", note: "拼写只差一个字母，refer 是「提及」" },
        { word: "inference", meaning: "n. 推断；推论", note: "同词根名词，指「推出的结论」" }
      ],
      forms: [
        { word: "inference", pos: "n.", meaning: "推断；推论" },
        { word: "inferred", pos: "v.", meaning: "推断（过去式）" }
      ]
    },
    {
      id: "ky-093",
      word: "inherent",
      phonetic: "/ɪnˈhɪərənt/",
      pos: "adj.",
      meaning: "内在的；固有的；天生的",
      example: { en: "There are inherent risks in any long-distance space mission.", zh: "任何远距离太空任务都存在固有风险。" },
      similar: [
        { word: "coherent", meaning: "adj. 连贯的；有条理的", note: "拼写相近，coherent 指「条理清楚」" },
        { word: "inherently", meaning: "adv. 内在地；本质上", note: "同词根副词，用于强调「本身如此」" }
      ],
      forms: [
        { word: "inherently", pos: "adv.", meaning: "本质上；内在地" },
        { word: "inherence", pos: "n.", meaning: "固有；内在性" }
      ]
    },
    {
      id: "ky-094",
      word: "innovative",
      phonetic: "/ˈɪnəveɪtɪv/",
      pos: "adj.",
      meaning: "创新的；革新的",
      example: { en: "The company is known for its innovative approach to product design.", zh: "这家公司以其在产品设计上的创新方法而闻名。" },
      similar: [
        { word: "initiative", meaning: "n. 主动性；倡议", note: "拼写相近，initiative 指「主动去做」" },
        { word: "innovation", meaning: "n. 创新；革新", note: "同词根名词，指「新事物、新方法」" }
      ],
      forms: [
        { word: "innovation", pos: "n.", meaning: "创新；革新" },
        { word: "innovate", pos: "v.", meaning: "创新；改革" }
      ]
    },
    {
      id: "ky-095",
      word: "integrate",
      phonetic: "/ˈɪntɪɡreɪt/",
      pos: "v.",
      meaning: "整合；使成一体；融入",
      example: { en: "Schools should help immigrant children integrate into the local community.", zh: "学校应当帮助移民儿童融入当地社区。" },
      similar: [
        { word: "integrity", meaning: "n. 正直；完整", note: "拼写相近，integrity 多指「诚实正直」" },
        { word: "integration", meaning: "n. 整合；一体化", note: "同词根名词，指「融为一体」的过程" }
      ],
      forms: [
        { word: "integration", pos: "n.", meaning: "整合；一体化" },
        { word: "integrated", pos: "adj.", meaning: "综合的；一体化的" }
      ]
    },
    {
      id: "ky-096",
      word: "interpret",
      phonetic: "/ɪnˈtɜːprɪt/",
      pos: "v.",
      meaning: "解释；理解；口译",
      example: { en: "Different historians interpret the same event in very different ways.", zh: "不同的历史学家对同一事件作出非常不同的解读。" },
      similar: [
        { word: "interrupt", meaning: "v. 打断；中断", note: "拼写相近，interrupt 是「插话、打断」" },
        { word: "interpretation", meaning: "n. 解释；演绎", note: "同词根名词，指「解读方式」" }
      ],
      forms: [
        { word: "interpretation", pos: "n.", meaning: "解释；演绎" },
        { word: "interpreter", pos: "n.", meaning: "口译员；解释者" }
      ]
    },
    {
      id: "ky-097",
      word: "intrinsic",
      phonetic: "/ɪnˈtrɪnsɪk/",
      pos: "adj.",
      meaning: "内在的；本质的；固有的",
      example: { en: "Curiosity seems to be an intrinsic part of human nature.", zh: "好奇心似乎是人性中固有的一部分。" },
      similar: [
        { word: "extrinsic", meaning: "adj. 外在的；非固有的", note: "反义，拼写只差首字母，extrinsic 是「外来的」" },
        { word: "intrinsically", meaning: "adv. 本质上；内在地", note: "同词根副词，强调「就其本身而言」" }
      ],
      forms: [
        { word: "intrinsically", pos: "adv.", meaning: "本质上；内在地" },
        { word: "extrinsic", pos: "adj.", meaning: "外在的；外来的" }
      ]
    },
    {
      id: "ky-098",
      word: "justify",
      phonetic: "/ˈdʒʌstɪfaɪ/",
      pos: "v.",
      meaning: "证明…正当；为…辩护",
      example: { en: "Nothing can justify the use of violence against innocent people.", zh: "任何理由都无法为对无辜者使用暴力开脱。" },
      similar: [
        { word: "testify", meaning: "v. 作证；证明", note: "拼写相近，testify 是「出庭作证」" },
        { word: "justice", meaning: "n. 正义；司法", note: "同词根名词，指「公平正义」" }
      ],
      forms: [
        { word: "justification", pos: "n.", meaning: "正当理由；辩护" },
        { word: "justified", pos: "adj.", meaning: "有正当理由的" }
      ]
    },
    {
      id: "ky-099",
      word: "legitimate",
      phonetic: "/lɪˈdʒɪtɪmət/",
      pos: "adj./v.",
      meaning: "合法的；合理的；使合法",
      example: { en: "Workers have a legitimate right to ask for safer conditions.", zh: "工人有索求更安全工作条件的正当权利。" },
      similar: [
        { word: "legislation", meaning: "n. 立法；法规", note: "拼写相近，legislation 指「法律条文」" },
        { word: "legitimacy", meaning: "n. 合法性；合理性", note: "同词根名词，指「站得住脚」" }
      ],
      forms: [
        { word: "legitimacy", pos: "n.", meaning: "合法性；合理性" },
        { word: "legitimately", pos: "adv.", meaning: "正当地；合理地" }
      ]
    },
    {
      id: "ky-100",
      word: "maintain",
      phonetic: "/meɪnˈteɪn/",
      pos: "v.",
      meaning: "维持；保养；主张",
      example: { en: "It is difficult to maintain a healthy diet while travelling constantly.", zh: "经常出差在外很难保持健康的饮食。" },
      similar: [
        { word: "contain", meaning: "v. 包含；容纳", note: "拼写相近，contain 是「装得下」" },
        { word: "maintenance", meaning: "n. 维护；保养", note: "同词根名词，指「日常保养」" }
      ],
      forms: [
        { word: "maintenance", pos: "n.", meaning: "维护；保养" },
        { word: "maintained", pos: "v.", meaning: "维持（过去式）" }
      ]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = WORDS;
  if (typeof window !== "undefined") {
    window.WORDBOOK_DATA = window.WORDBOOK_DATA || {};
    window.WORDBOOK_DATA.kaoyan = WORDS;
  }
})();