/* 简词词库 · 雅思核心词汇 */
(function () {
  var WORDS = [
    {
      id: "il-001",
      word: "analyse",
      phonetic: "/ˈænəlaɪz/",
      pos: "v.",
      meaning: "分析；解析",
      example: { en: "Researchers analyse the data before drawing any conclusion.", zh: "研究者在得出结论前会先分析数据。" },
      similar: [
        { word: "analyze", meaning: "v. 分析", note: "analyse 是英式拼写，analyze 是美式拼写" },
        { word: "analysis", meaning: "n. 分析", note: "analyse 是动词，analysis 是同根名词" }
      ],
      forms: [
        { word: "analysis", pos: "n.", meaning: "分析；分析报告" },
        { word: "analytical", pos: "adj.", meaning: "分析的；善于分析的" }
      ]
    },
    {
      id: "il-002",
      word: "sustainable",
      phonetic: "/səˈsteɪnəbl/",
      pos: "adj.",
      meaning: "可持续的；能维持的",
      example: { en: "Governments should promote sustainable development to protect natural resources for future generations.", zh: "各国政府应推动可持续发展，为子孙后代保护自然资源。" },
      similar: [
        { word: "sustained", meaning: "adj. 持续的；持久的", note: "sustainable 指可长期维持的，sustained 指已持续一段时间的" }
      ],
      forms: [
        { word: "sustain", pos: "v.", meaning: "维持；支撑" },
        { word: "sustainability", pos: "n.", meaning: "可持续性" }
      ]
    },
    {
      id: "il-003",
      word: "emission",
      phonetic: "/ɪˈmɪʃn/",
      pos: "n.",
      meaning: "排放；排放物",
      example: { en: "Cutting carbon emission from factories has become a priority in many countries.", zh: "减少工厂的碳排放已成为许多国家的优先事项。" },
      similar: [
        { word: "omission", meaning: "n. 省略；遗漏", note: "只差一个字母，emission 是排放，omission 是省略" },
        { word: "mission", meaning: "n. 任务；使命", note: "emission 比 mission 多前缀 e，含义完全不同" }
      ],
      forms: [
        { word: "emissions", pos: "n.", meaning: "排放物（复数）" },
        { word: "emit", pos: "v.", meaning: "排放；发出" }
      ]
    },
    {
      id: "il-004",
      word: "conservation",
      phonetic: "/ˌkɒnsəˈveɪʃn/",
      pos: "n.",
      meaning: "保护；保存",
      example: { en: "The conservation of wildlife requires cooperation between governments and local communities.", zh: "野生动物保护需要政府与当地社区的合作。" },
      similar: [
        { word: "conversation", meaning: "n. 谈话；对话", note: "拼写只差两个字母，conservation 是保护，conversation 是谈话" },
        { word: "conserve", meaning: "v. 保护；节约", note: "conserve 是动词，conservation 是同根名词" }
      ],
      forms: [
        { word: "conserve", pos: "v.", meaning: "保护；节约" }
      ]
    },
    {
      id: "il-005",
      word: "ecosystem",
      phonetic: "/ˈiːkəʊsɪstəm/",
      pos: "n.",
      meaning: "生态系统",
      example: { en: "Pollution can damage the delicate ecosystem of a river within a few years.", zh: "污染能在几年内破坏一条河流脆弱的生态系统。" },
      similar: [
        { word: "system", meaning: "n. 系统；体系", note: "ecosystem 由 eco 加 system 构成，特指生态方面的系统" },
        { word: "ecology", meaning: "n. 生态；生态学", note: "ecology 是学科名称，ecosystem 指具体的生态整体" }
      ],
      forms: [
        { word: "ecosystems", pos: "n.", meaning: "生态系统（复数）" },
        { word: "ecological", pos: "adj.", meaning: "生态的" }
      ]
    },
    {
      id: "il-006",
      word: "pollutant",
      phonetic: "/pəˈluːtənt/",
      pos: "n.",
      meaning: "污染物",
      example: { en: "Industrial pollutants released into rivers threaten fish and other aquatic life.", zh: "排入河流的工业污染物威胁着鱼类和其他水生生物。" },
      similar: [
        { word: "pollution", meaning: "n. 污染", note: "pollutant 指具体的污染物，pollution 指污染的状态" },
        { word: "pollute", meaning: "v. 污染", note: "pollute 是动词，pollutant 是同根名词" }
      ],
      forms: [
        { word: "pollute", pos: "v.", meaning: "污染" },
        { word: "pollution", pos: "n.", meaning: "污染" }
      ]
    },
    {
      id: "il-007",
      word: "recycle",
      phonetic: "/ˌriːˈsaɪkl/",
      pos: "v.",
      meaning: "回收利用；再循环",
      example: { en: "Many households recycle paper and glass to reduce the amount of rubbish.", zh: "许多家庭回收纸张和玻璃，以减少垃圾量。" },
      similar: [
        { word: "reuse", meaning: "v. 再利用", note: "recycle 指加工后再利用，reuse 指直接再次使用" },
        { word: "cycle", meaning: "n. 循环；自行车", note: "recycle 比 cycle 多前缀 re，强调重新循环" }
      ],
      forms: [
        { word: "recycling", pos: "n.", meaning: "回收；回收利用" },
        { word: "recycled", pos: "adj.", meaning: "回收的；再生的" }
      ]
    },
    {
      id: "il-008",
      word: "biodiversity",
      phonetic: "/ˌbaɪəʊdaɪˈvɜːsəti/",
      pos: "n.",
      meaning: "生物多样性",
      example: { en: "Protecting biodiversity in tropical forests is essential for the balance of nature.", zh: "保护热带雨林中的生物多样性对自然平衡至关重要。" },
      similar: [
        { word: "diversity", meaning: "n. 多样性；差异", note: "biodiversity 专指生物多样性，diversity 泛指各种多样性" },
        { word: "biological", meaning: "adj. 生物的", note: "biological 是形容词，biodiversity 是名词" }
      ],
      forms: [
        { word: "diverse", pos: "adj.", meaning: "多样的；不同的" }
      ]
    },
    {
      id: "il-009",
      word: "deforestation",
      phonetic: "/ˌdiːˌfɒrɪˈsteɪʃn/",
      pos: "n.",
      meaning: "砍伐森林；滥伐林木",
      example: { en: "Deforestation in the Amazon has destroyed the homes of countless animal species.", zh: "亚马孙地区的森林砍伐毁掉了无数动物物种的家园。" },
      similar: [
        { word: "forestation", meaning: "n. 造林；植树", note: "deforestation 是砍树，forestation 是种树，前缀 de 表示去除" },
        { word: "forest", meaning: "n. 森林", note: "forest 是名词，deforestation 指砍伐森林的过程" }
      ],
      forms: [
        { word: "deforest", pos: "v.", meaning: "砍伐森林" }
      ]
    },
    {
      id: "il-010",
      word: "renewable",
      phonetic: "/rɪˈnjuːəbl/",
      pos: "adj.",
      meaning: "可再生的；可续期的",
      example: { en: "Solar and wind power are renewable sources that produce almost no pollution.", zh: "太阳能和风能是可再生能源，几乎不产生污染。" },
      similar: [
        { word: "renewed", meaning: "adj. 重新开始的；更新的", note: "renewable 指可再生的，renewed 指已更新的" },
        { word: "nonrenewable", meaning: "adj. 不可再生的", note: "加前缀 non 表示不可再生，意思正好相反" }
      ],
      forms: [
        { word: "renew", pos: "v.", meaning: "更新；续订" },
        { word: "renewal", pos: "n.", meaning: "更新；续期" }
      ]
    },
    {
      id: "il-011",
      word: "contaminate",
      phonetic: "/kənˈtæmɪneɪt/",
      pos: "v.",
      meaning: "污染；弄脏",
      example: { en: "Chemicals from farms can contaminate groundwater and make it unsafe to drink.", zh: "农场使用的化学物质会污染地下水，使其不宜饮用。" },
      similar: [
        { word: "contemplate", meaning: "v. 沉思；考虑", note: "拼写相近但含义无关，contaminate 是弄脏，contemplate 是思考" }
      ],
      forms: [
        { word: "contamination", pos: "n.", meaning: "污染；玷污" },
        { word: "contaminated", pos: "adj.", meaning: "受污染的" }
      ]
    },
    {
      id: "il-012",
      word: "habitat",
      phonetic: "/ˈhæbɪtæt/",
      pos: "n.",
      meaning: "栖息地；生活环境",
      example: { en: "Urban expansion has destroyed the natural habitat of many wild animals.", zh: "城市扩张毁掉了许多野生动物的自然栖息地。" },
      similar: [
        { word: "habit", meaning: "n. 习惯", note: "只差两个字母，habitat 指栖息地，habit 指习惯" },
        { word: "inhabit", meaning: "v. 居住于；栖息于", note: "inhabit 是动词，habitat 是同根名词" }
      ],
      forms: [
        { word: "habitats", pos: "n.", meaning: "栖息地（复数）" },
        { word: "inhabitant", pos: "n.", meaning: "居民；栖息动物" }
      ]
    },
    {
      id: "il-013",
      word: "climate",
      phonetic: "/ˈklaɪmət/",
      pos: "n.",
      meaning: "气候；风气",
      example: { en: "Scientists warn that climate change will raise sea levels in coastal cities.", zh: "科学家警告说，气候变化将抬高沿海城市的海平面。" },
      similar: [
        { word: "climax", meaning: "n. 高潮；顶点", note: "拼写只差两个字母，climate 是气候，climax 是高潮" },
        { word: "climatic", meaning: "adj. 气候的", note: "climate 是名词，climatic 是同根形容词" }
      ],
      forms: [
        { word: "climatic", pos: "adj.", meaning: "气候的；气候上的" },
        { word: "climates", pos: "n.", meaning: "气候（复数）" }
      ]
    },
    {
      id: "il-014",
      word: "drought",
      phonetic: "/draʊt/",
      pos: "n.",
      meaning: "干旱；旱灾",
      example: { en: "A severe drought destroyed most of the crops in the southern region.", zh: "一场严重的干旱毁掉了南部地区大部分的庄稼。" },
      similar: [
        { word: "draught", meaning: "n. 穿堂风；气流", note: "只差一个字母且读音相同，drought 是旱灾，draught 是气流" }
      ],
      forms: [
        { word: "droughts", pos: "n.", meaning: "干旱（复数）" }
      ]
    },
    {
      id: "il-015",
      word: "greenhouse",
      phonetic: "/ˈɡriːnhaʊs/",
      pos: "n.",
      meaning: "温室；暖房",
      example: { en: "Burning fossil fuels increases greenhouse gases and warms the planet rapidly.", zh: "燃烧化石燃料会增加温室气体，使地球迅速变暖。" },
      similar: [
        { word: "glasshouse", meaning: "n. 玻璃暖房", note: "近义，注意区分：glasshouse 强调玻璃结构，greenhouse 泛指温室" }
      ],
      forms: [
        { word: "greenhouses", pos: "n.", meaning: "温室（复数）" }
      ]
    },
    {
      id: "il-016",
      word: "carbon",
      phonetic: "/ˈkɑːbən/",
      pos: "n.",
      meaning: "碳；碳元素",
      example: { en: "Reducing carbon emissions is a key goal of international environmental agreements.", zh: "减少碳排放是国际环境协议的关键目标。" },
      similar: [
        { word: "carton", meaning: "n. 纸盒；纸板箱", note: "只差一个字母，carbon 是碳，carton 是纸盒" }
      ],
      forms: [
        { word: "carbon footprint", pos: "phr.", meaning: "碳足迹" },
        { word: "carbonic", pos: "adj.", meaning: "碳的；含碳的" }
      ]
    },
    {
      id: "il-017",
      word: "waste",
      phonetic: "/weɪst/",
      pos: "n./v.",
      meaning: "废物；浪费",
      example: { en: "Factories should treat waste water before releasing it into local rivers.", zh: "工厂应先把废水处理干净，再排入当地河流。" },
      similar: [
        { word: "waist", meaning: "n. 腰；腰部", note: "读音相同拼写差一个字母，waste 是废物，waist 是腰" }
      ],
      forms: [
        { word: "wasteful", pos: "adj.", meaning: "浪费的；不节约的" },
        { word: "wasted", pos: "adj.", meaning: "被浪费的" }
      ]
    },
    {
      id: "il-018",
      word: "resource",
      phonetic: "/rɪˈsɔːs/",
      pos: "n.",
      meaning: "资源；财力",
      example: { en: "Fresh water is a limited resource that must be shared fairly.", zh: "淡水是有限的资源，必须公平分配。" },
      similar: [
        { word: "source", meaning: "n. 来源；源头", note: "只差两个字母，resource 是资源，source 是来源" },
        { word: "recourse", meaning: "n. 求助；依靠", note: "拼写相近，recourse 多指求助的途径" }
      ],
      forms: [
        { word: "resources", pos: "n.", meaning: "资源（复数）" },
        { word: "resourceful", pos: "adj.", meaning: "足智多谋的" }
      ]
    },
    {
      id: "il-019",
      word: "urban",
      phonetic: "/ˈɜːbən/",
      pos: "adj.",
      meaning: "城市的；都市的",
      example: { en: "Rapid urban growth has created serious problems of housing and traffic.", zh: "城市的快速扩张带来了严重的住房和交通问题。" },
      similar: [
        { word: "urbane", meaning: "adj. 温文尔雅的", note: "只差一个字母，urban 指城市的，urbane 指举止文雅的" },
        { word: "suburban", meaning: "adj. 郊区的", note: "加前缀 sub 表示郊区的，与市区的 urban 相对" }
      ],
      forms: [
        { word: "urbanise", pos: "v.", meaning: "使城市化" },
        { word: "urbanisation", pos: "n.", meaning: "城市化" }
      ]
    },
    {
      id: "il-020",
      word: "rural",
      phonetic: "/ˈrʊərəl/",
      pos: "adj.",
      meaning: "农村的；乡下的",
      example: { en: "Many young people leave rural areas to look for work in cities.", zh: "许多年轻人离开农村，到城市里寻找工作。" },
      similar: [
        { word: "rustic", meaning: "adj. 乡村的；质朴的", note: "近义，注意区分：rural 是地理描述，rustic 强调乡村风格" }
      ],
      forms: [
        { word: "rurally", pos: "adv.", meaning: "在乡村地" },
        { word: "rural areas", pos: "phr.", meaning: "农村地区" }
      ]
    },
    {
      id: "il-021",
      word: "curriculum",
      phonetic: "/kəˈrɪkjələm/",
      pos: "n.",
      meaning: "课程；全部课程",
      example: { en: "The school curriculum should include both academic subjects and practical skills.", zh: "学校课程应同时包含学术科目和实用技能。" },
      similar: [
        { word: "curricula", meaning: "n. 课程（复数）", note: "curricula 是 curriculum 的拉丁语复数形式" },
        { word: "curricular", meaning: "adj. 课程的", note: "curricular 是形容词，常出现在课外活动的说法里" }
      ],
      forms: [
        { word: "curricula", pos: "n.", meaning: "课程（复数）" },
        { word: "curricular", pos: "adj.", meaning: "课程的" }
      ]
    },
    {
      id: "il-022",
      word: "literacy",
      phonetic: "/ˈlɪtərəsi/",
      pos: "n.",
      meaning: "读写能力；识字",
      example: { en: "Improving adult literacy can help people find better paid employment.", zh: "提高成年人的读写能力能帮助人们找到薪酬更好的工作。" },
      similar: [
        { word: "literary", meaning: "adj. 文学的", note: "只差两个字母，literacy 是读写能力，literary 是文学的" },
        { word: "literate", meaning: "adj. 识字的", note: "literate 是形容词，literacy 是同根名词" }
      ],
      forms: [
        { word: "literate", pos: "adj.", meaning: "识字的；有文化的" },
        { word: "illiteracy", pos: "n.", meaning: "文盲；不识字" }
      ]
    },
    {
      id: "il-023",
      word: "tuition",
      phonetic: "/tjuˈɪʃn/",
      pos: "n.",
      meaning: "学费；教学",
      example: { en: "University tuition has risen so quickly that many students need loans.", zh: "大学学费上涨得很快，许多学生不得不贷款。" },
      similar: [
        { word: "tutor", meaning: "n. 导师；家庭教师", note: "同词根，tutor 指人，tuition 指教学或学费" },
        { word: "intuition", meaning: "n. 直觉", note: "只差两个字母，tuition 是学费，intuition 是直觉" }
      ],
      forms: [
        { word: "tutor", pos: "n.", meaning: "导师；家庭教师" },
        { word: "tutorial", pos: "n.", meaning: "辅导课；教程" }
      ]
    },
    {
      id: "il-024",
      word: "discipline",
      phonetic: "/ˈdɪsəplɪn/",
      pos: "n.",
      meaning: "纪律；学科",
      example: { en: "Strict discipline in the classroom does not always improve academic results.", zh: "课堂上严格的纪律并不总能提高学习成绩。" },
      similar: [
        { word: "disciple", meaning: "n. 门徒；追随者", note: "只差两个字母，discipline 是纪律，disciple 是门徒" }
      ],
      forms: [
        { word: "disciplinary", pos: "adj.", meaning: "纪律的；惩戒的" },
        { word: "disciplined", pos: "adj.", meaning: "有纪律的；自律的" }
      ]
    },
    {
      id: "il-025",
      word: "assess",
      phonetic: "/əˈses/",
      pos: "v.",
      meaning: "评估；评定",
      example: { en: "Teachers assess students by means of essays, projects and final examinations.", zh: "教师通过论文、专题作业和期末考试来评估学生。" },
      similar: [
        { word: "access", meaning: "n. 通道；使用权", note: "只差两个字母，assess 是评估，access 是进入或使用" },
        { word: "asset", meaning: "n. 资产；优点", note: "拼写相近，asset 是名词，指资产或长处" }
      ],
      forms: [
        { word: "assessment", pos: "n.", meaning: "评估；评定" },
        { word: "assessor", pos: "n.", meaning: "评审员；评估者" }
      ]
    },
    {
      id: "il-026",
      word: "motivate",
      phonetic: "/ˈməʊtɪveɪt/",
      pos: "v.",
      meaning: "激励；促动",
      example: { en: "Good teachers motivate their students to think independently and ask questions.", zh: "好老师会激励学生独立思考并提问。" },
      similar: [
        { word: "motive", meaning: "n. 动机；目的", note: "同词根，motive 是名词，motivate 是动词" },
        { word: "motion", meaning: "n. 运动；动作", note: "拼写只差两个字母，motion 指运动，motivate 指激励" }
      ],
      forms: [
        { word: "motivation", pos: "n.", meaning: "动机；积极性" },
        { word: "motivated", pos: "adj.", meaning: "有积极性的" }
      ]
    },
    {
      id: "il-027",
      word: "cognitive",
      phonetic: "/ˈkɒɡnətɪv/",
      pos: "adj.",
      meaning: "认知的；认识的",
      example: { en: "Reading regularly improves cognitive skills such as memory and concentration.", zh: "经常阅读能提升记忆力和注意力等认知能力。" },
      similar: [
        { word: "cognition", meaning: "n. 认知；认识", note: "cognitive 是形容词，cognition 是同根名词" },
        { word: "cognate", meaning: "adj. 同源的；同类的", note: "只差两个字母，cognate 多用于语言同源现象" }
      ],
      forms: [
        { word: "cognition", pos: "n.", meaning: "认知；认识过程" },
        { word: "cognitively", pos: "adv.", meaning: "在认知方面" }
      ]
    },
    {
      id: "il-028",
      word: "vocational",
      phonetic: "/vəʊˈkeɪʃənl/",
      pos: "adj.",
      meaning: "职业的；职业培训的",
      example: { en: "Vocational training gives young people practical skills for specific jobs.", zh: "职业培训让年轻人掌握特定工作所需的实用技能。" },
      similar: [
        { word: "vocation", meaning: "n. 职业；使命感", note: "vocation 是名词，vocational 是同根形容词" },
        { word: "vacation", meaning: "n. 假期；休假", note: "拼写很接近，注意 vocational 与职业有关，vacation 指假期" }
      ],
      forms: [
        { word: "vocation", pos: "n.", meaning: "职业；使命感" },
        { word: "vocationally", pos: "adv.", meaning: "在职业方面" }
      ]
    },
    {
      id: "il-029",
      word: "enrol",
      phonetic: "/ɪnˈrəʊl/",
      pos: "v.",
      meaning: "注册；使入学",
      example: { en: "Thousands of students enrol in online courses every year.", zh: "每年有成千上万的学生注册在线课程。" },
      similar: [
        { word: "enroll", meaning: "v. 注册；登记", note: "enrol 是英式拼写，enroll 是美式拼写，含义相同" }
      ],
      forms: [
        { word: "enrolment", pos: "n.", meaning: "注册；入学人数" },
        { word: "enrolled", pos: "adj.", meaning: "已注册的" }
      ]
    },
    {
      id: "il-030",
      word: "scholarship",
      phonetic: "/ˈskɒləʃɪp/",
      pos: "n.",
      meaning: "奖学金；学术研究",
      example: { en: "She won a scholarship that covered her tuition and living costs.", zh: "她获得了一份涵盖学费和生活费的奖学金。" },
      similar: [
        { word: "scholar", meaning: "n. 学者；奖学金获得者", note: "同词根，scholar 指人，scholarship 指奖学金" },
        { word: "scholarly", meaning: "adj. 学术的；博学的", note: "scholarly 是形容词，scholarship 是名词" }
      ],
      forms: [
        { word: "scholar", pos: "n.", meaning: "学者；奖学金获得者" },
        { word: "scholarly", pos: "adj.", meaning: "学术的；博学的" }
      ]
    },
    {
      id: "il-031",
      word: "compulsory",
      phonetic: "/kəmˈpʌlsəri/",
      pos: "adj.",
      meaning: "义务的；强制的",
      example: { en: "In many countries education is compulsory until the age of sixteen.", zh: "在许多国家，教育是义务性的，直到十六岁为止。" },
      similar: [
        { word: "compulsive", meaning: "adj. 强迫性的；难以自制的", note: "只差两个字母，compulsory 指规定必须做，compulsive 指无法自控" }
      ],
      forms: [
        { word: "compel", pos: "v.", meaning: "强迫；迫使" },
        { word: "compulsorily", pos: "adv.", meaning: "强制地；义务地" }
      ]
    },
    {
      id: "il-032",
      word: "graduate",
      phonetic: "/ˈɡrædʒueɪt/",
      pos: "v./n.",
      meaning: "毕业；毕业生",
      example: { en: "She will graduate from university with a degree in economics next year.", zh: "她明年将从大学毕业，取得经济学学位。" },
      similar: [
        { word: "graduation", meaning: "n. 毕业；毕业典礼", note: "同词根，graduation 是名词形式" },
        { word: "undergraduate", meaning: "n. 本科生", note: "加前缀 under 指尚未取得学位的大学生" }
      ],
      forms: [
        { word: "graduation", pos: "n.", meaning: "毕业；毕业典礼" },
        { word: "undergraduate", pos: "n.", meaning: "本科生" }
      ]
    },
    {
      id: "il-033",
      word: "academic",
      phonetic: "/ˌækəˈdemɪk/",
      pos: "adj.",
      meaning: "学术的；学业的",
      example: { en: "Academic success depends on consistent effort rather than natural talent alone.", zh: "学业上的成功依靠持续的努力，而不只是天赋。" },
      similar: [
        { word: "academy", meaning: "n. 学院；研究院", note: "同词根，academy 是名词，academic 是形容词" },
        { word: "academically", meaning: "adv. 在学业上", note: "加后缀 -ly 变成副词" }
      ],
      forms: [
        { word: "academy", pos: "n.", meaning: "学院；研究院" },
        { word: "academically", pos: "adv.", meaning: "在学业上" }
      ]
    },
    {
      id: "il-034",
      word: "qualification",
      phonetic: "/ˌkwɒlɪfɪˈkeɪʃn/",
      pos: "n.",
      meaning: "资格；学历",
      example: { en: "Employers often require a formal qualification before offering a skilled job.", zh: "雇主在提供技术性岗位前，往往要求正式的学历资格。" },
      similar: [
        { word: "qualified", meaning: "adj. 合格的；有资格的", note: "同词根，qualified 是形容词，qualification 是名词" },
        { word: "quality", meaning: "n. 质量；品质", note: "拼写相近，quality 指质量，qualification 指资格" }
      ],
      forms: [
        { word: "qualify", pos: "v.", meaning: "取得资格；使合格" },
        { word: "qualified", pos: "adj.", meaning: "合格的；有资格的" }
      ]
    },
    {
      id: "il-035",
      word: "seminar",
      phonetic: "/ˈsemɪnɑː/",
      pos: "n.",
      meaning: "研讨会；专题课",
      example: { en: "Students present their research findings at a weekly seminar.", zh: "学生们在每周的研讨会上展示自己的研究结果。" },
      similar: [
        { word: "seminary", meaning: "n. 神学院", note: "只差一个字母，seminar 是研讨会，seminary 是神学院" }
      ],
      forms: [
        { word: "seminars", pos: "n.", meaning: "研讨会（复数）" }
      ]
    },
    {
      id: "il-036",
      word: "tutor",
      phonetic: "/ˈtjuːtə/",
      pos: "n.",
      meaning: "导师；家庭教师",
      example: { en: "My tutor suggested several books that would help with the assignment.", zh: "我的导师推荐了几本对完成作业有帮助的书。" },
      similar: [
        { word: "tutorial", meaning: "n. 辅导课；教程", note: "同词根，tutorial 指辅导课，tutor 指导师本人" },
        { word: "tuition", meaning: "n. 教学；学费", note: "同词根，tuition 指教学或学费" }
      ],
      forms: [
        { word: "tutorial", pos: "n.", meaning: "辅导课；教程" },
        { word: "tutoring", pos: "n.", meaning: "辅导；补习" }
      ]
    },
    {
      id: "il-037",
      word: "innovation",
      phonetic: "/ˌɪnəˈveɪʃn/",
      pos: "n.",
      meaning: "创新；革新",
      example: { en: "Technological innovation has changed the way people communicate and work.", zh: "技术创新改变了人们交流和工作的方式。" },
      similar: [
        { word: "innovative", meaning: "adj. 创新的；新颖的", note: "同词根，innovative 是形容词，innovation 是名词" },
        { word: "renovation", meaning: "n. 翻新；整修", note: "拼写相近，renovation 指修整房屋，innovation 指创新" }
      ],
      forms: [
        { word: "innovate", pos: "v.", meaning: "创新；革新" },
        { word: "innovative", pos: "adj.", meaning: "创新的；新颖的" }
      ]
    },
    {
      id: "il-038",
      word: "automate",
      phonetic: "/ˈɔːtəmeɪt/",
      pos: "v.",
      meaning: "使自动化",
      example: { en: "Factories now automate many tasks that were once done by hand.", zh: "如今工厂把许多过去靠手工完成的工序自动化了。" },
      similar: [
        { word: "automatic", meaning: "adj. 自动的；无意识的", note: "automate 是动词，automatic 是同根形容词" },
        { word: "automation", meaning: "n. 自动化", note: "automation 是名词，指自动化的过程" }
      ],
      forms: [
        { word: "automation", pos: "n.", meaning: "自动化" },
        { word: "automated", pos: "adj.", meaning: "自动化的" }
      ]
    },
    {
      id: "il-039",
      word: "digital",
      phonetic: "/ˈdɪdʒɪtl/",
      pos: "adj.",
      meaning: "数字的；数码的",
      example: { en: "Digital technology allows students to access information far more quickly.", zh: "数字技术让学生能更快地获取信息。" },
      similar: [
        { word: "digit", meaning: "n. 数字；手指", note: "同词根，digit 是名词，digital 是形容词" },
        { word: "digitally", meaning: "adv. 数字化地", note: "加后缀 -ly 构成副词" }
      ],
      forms: [
        { word: "digit", pos: "n.", meaning: "数字；手指" },
        { word: "digitally", pos: "adv.", meaning: "以数字方式" }
      ]
    },
    {
      id: "il-040",
      word: "artificial",
      phonetic: "/ˌɑːtɪˈfɪʃl/",
      pos: "adj.",
      meaning: "人造的；人工的",
      example: { en: "Artificial intelligence is transforming industries from medicine to transport.", zh: "人工智能正在改变从医疗到交通的各个行业。" },
      similar: [
        { word: "artifice", meaning: "n. 诡计；技巧", note: "同词根，artifice 指手段或技巧" },
        { word: "artificially", meaning: "adv. 人工地", note: "加后缀 -ly 构成副词" }
      ],
      forms: [
        { word: "artificially", pos: "adv.", meaning: "人工地；人为地" },
        { word: "artifice", pos: "n.", meaning: "诡计；技巧" }
      ]
    },
    {
      id: "il-041",
      word: "algorithm",
      phonetic: "/ˈælɡərɪðəm/",
      pos: "n.",
      meaning: "算法；计算程序",
      example: { en: "A search algorithm decides which websites appear at the top of results.", zh: "搜索算法决定哪些网站出现在结果的最前面。" },
      similar: [
        { word: "logarithm", meaning: "n. 对数", note: "只差两个字母，algorithm 是算法，logarithm 是对数" }
      ],
      forms: [
        { word: "algorithms", pos: "n.", meaning: "算法（复数）" }
      ]
    },
    {
      id: "il-042",
      word: "device",
      phonetic: "/dɪˈvaɪs/",
      pos: "n.",
      meaning: "设备；装置",
      example: { en: "Mobile devices have replaced cameras, maps and music players for many people.", zh: "对许多人来说，移动设备已经取代了相机、地图和音乐播放器。" },
      similar: [
        { word: "devise", meaning: "v. 设计；发明", note: "只差一个字母，device 是名词，devise 是动词" }
      ],
      forms: [
        { word: "devices", pos: "n.", meaning: "设备（复数）" }
      ]
    },
    {
      id: "il-043",
      word: "network",
      phonetic: "/ˈnetwɜːk/",
      pos: "n.",
      meaning: "网络；人脉",
      example: { en: "A reliable network is essential for online learning and remote work.", zh: "稳定的网络对在线学习和远程工作至关重要。" },
      similar: [
        { word: "net", meaning: "n. 网；网络", note: "同词根，net 更口语，network 可指网络系统" },
        { word: "networking", meaning: "n. 建立人脉", note: "networking 侧重社交联络，network 侧重系统本身" }
      ],
      forms: [
        { word: "networking", pos: "n.", meaning: "建立人脉；联网" },
        { word: "networks", pos: "n.", meaning: "网络（复数）" }
      ]
    },
    {
      id: "il-044",
      word: "data",
      phonetic: "/ˈdeɪtə/",
      pos: "n.",
      meaning: "数据；资料",
      example: { en: "The data collected during the experiment supported the original hypothesis.", zh: "实验中收集的数据支持了最初的假设。" },
      similar: [
        { word: "date", meaning: "n. 日期；约会", note: "只差一个字母，data 是数据，date 是日期" },
        { word: "datum", meaning: "n. 数据（单数）", note: "datum 是 data 的单数形式，学术写作中偶有使用" }
      ],
      forms: [
        { word: "database", pos: "n.", meaning: "数据库" },
        { word: "datum", pos: "n.", meaning: "数据（单数）" }
      ]
    },
    {
      id: "il-045",
      word: "efficient",
      phonetic: "/ɪˈfɪʃnt/",
      pos: "adj.",
      meaning: "高效的；效率高的",
      example: { en: "Public transport is a more efficient way to move large numbers of people.", zh: "公共交通是运送大量人群更高效的方式。" },
      similar: [
        { word: "effective", meaning: "adj. 有效的", note: "efficient 强调省时省力，effective 强调能达到预期效果" },
        { word: "efficiency", meaning: "n. 效率", note: "同词根，efficiency 是名词形式" }
      ],
      forms: [
        { word: "efficiency", pos: "n.", meaning: "效率；效能" },
        { word: "efficiently", pos: "adv.", meaning: "高效地" }
      ]
    },
    {
      id: "il-046",
      word: "virtual",
      phonetic: "/ˈvɜːtʃuəl/",
      pos: "adj.",
      meaning: "虚拟的；实际上的",
      example: { en: "Virtual classrooms allow students in remote areas to attend good lectures.", zh: "虚拟课堂让偏远地区的学生也能听到优质课程。" },
      similar: [
        { word: "virtually", meaning: "adv. 几乎；实际上", note: "加后缀 -ly 构成副词" },
        { word: "virtuous", meaning: "adj. 有德行的", note: "只差两个字母，virtuous 指品德高尚" }
      ],
      forms: [
        { word: "virtually", pos: "adv.", meaning: "几乎；实际上" }
      ]
    },
    {
      id: "il-047",
      word: "software",
      phonetic: "/ˈsɒftweə/",
      pos: "n.",
      meaning: "软件；程序",
      example: { en: "The software used by the laboratory records results automatically.", zh: "实验室使用的这款软件会自动记录结果。" },
      similar: [
        { word: "softwood", meaning: "n. 软木材", note: "只差三个字母，software 指软件，softwood 指软木材" }
      ],
      forms: [
        { word: "software update", pos: "phr.", meaning: "软件更新" }
      ]
    },
    {
      id: "il-048",
      word: "privacy",
      phonetic: "/ˈprɪvəsi/",
      pos: "n.",
      meaning: "隐私；私密",
      example: { en: "Many users fear that their privacy is being invaded by large technology firms.", zh: "许多用户担心自己的隐私正被大型科技公司侵犯。" },
      similar: [
        { word: "private", meaning: "adj. 私人的；私密的", note: "同词根，private 是形容词，privacy 是名词" },
        { word: "privy", meaning: "adj. 知情的", note: "拼写相近，privy 多指私下知情的" }
      ],
      forms: [
        { word: "private", pos: "adj.", meaning: "私人的；私密的" },
        { word: "privately", pos: "adv.", meaning: "私下地；私人地" }
      ]
    },
    {
      id: "il-049",
      word: "surveillance",
      phonetic: "/səˈveɪləns/",
      pos: "n.",
      meaning: "监视；监控",
      example: { en: "Constant surveillance in public places raises serious questions about personal freedom.", zh: "公共场所的持续监控引发了关于个人自由的严肃问题。" },
      similar: [
        { word: "surveil", meaning: "v. 监视", note: "surveillance 是名词，surveil 是较罕见的动词形式" }
      ],
      forms: [
        { word: "surveil", pos: "v.", meaning: "监视；监控" }
      ]
    },
    {
      id: "il-050",
      word: "transform",
      phonetic: "/trænsˈfɔːm/",
      pos: "v.",
      meaning: "转变；改造",
      example: { en: "New technology can transform the way a city manages its traffic.", zh: "新技术能够改变一座城市管理交通的方式。" },
      similar: [
        { word: "transfer", meaning: "v. 转移；调动", note: "拼写相近，transfer 指位置或归属的转移" },
        { word: "transformation", meaning: "n. 转变；变革", note: "同词根，transformation 是名词形式" }
      ],
      forms: [
        { word: "transformation", pos: "n.", meaning: "转变；变革" },
        { word: "transformative", pos: "adj.", meaning: "有变革作用的" }
      ]
    },
    {
      id: "il-051",
      word: "infrastructure",
      phonetic: "/ˈɪnfrəstrʌktʃə/",
      pos: "n.",
      meaning: "基础设施",
      example: { en: "Good infrastructure such as roads and railways encourages trade between regions.", zh: "公路和铁路等良好的基础设施能促进地区间的贸易。" },
      similar: [
        { word: "structure", meaning: "n. 结构；构造", note: "同词根，structure 泛指结构，infrastructure 指基础性设施" },
        { word: "superstructure", meaning: "n. 上层建筑", note: "加前缀 super，与 infrastructure 层级相对" }
      ],
      forms: [
        { word: "infrastructural", pos: "adj.", meaning: "基础设施的" }
      ]
    },
    {
      id: "il-052",
      word: "congestion",
      phonetic: "/kənˈdʒestʃən/",
      pos: "n.",
      meaning: "拥堵；阻塞",
      example: { en: "Traffic congestion in the city centre wastes both time and fuel.", zh: "市中心的交通拥堵既浪费时间又浪费燃料。" },
      similar: [
        { word: "congested", meaning: "adj. 拥堵的", note: "同词根，congested 是形容词，congestion 是名词" },
        { word: "digestion", meaning: "n. 消化", note: "拼写相近，digestion 指消化过程" }
      ],
      forms: [
        { word: "congested", pos: "adj.", meaning: "拥堵的；堵塞的" },
        { word: "congest", pos: "v.", meaning: "使拥堵；使堵塞" }
      ]
    },
    {
      id: "il-053",
      word: "population",
      phonetic: "/ˌpɒpjuˈleɪʃn/",
      pos: "n.",
      meaning: "人口；族群",
      example: { en: "The population of the capital has doubled within the last twenty years.", zh: "首都的人口在过去二十年间翻了一倍。" },
      similar: [
        { word: "populous", meaning: "adj. 人口稠密的", note: "同词根，populous 是形容词，population 是名词" },
        { word: "popular", meaning: "adj. 受欢迎的", note: "拼写相近，popular 与受欢迎有关，与人口无关" }
      ],
      forms: [
        { word: "populate", pos: "v.", meaning: "居住于；使人口聚居" },
        { word: "populous", pos: "adj.", meaning: "人口稠密的" }
      ]
    },
    {
      id: "il-054",
      word: "migrate",
      phonetic: "/maɪˈɡreɪt/",
      pos: "v.",
      meaning: "迁移；迁徙",
      example: { en: "Millions of workers migrate to big cities in search of better wages.", zh: "数百万劳动者为寻求更高工资而迁往大城市。" },
      similar: [
        { word: "emigrate", meaning: "v. 移居国外", note: "同词根，emigrate 强调迁出，migrate 泛指迁移" },
        { word: "migration", meaning: "n. 迁移；迁徙", note: "同词根，migration 是名词形式" }
      ],
      forms: [
        { word: "migration", pos: "n.", meaning: "迁移；迁徙" },
        { word: "migrant", pos: "n.", meaning: "移民；迁徙动物" }
      ]
    },
    {
      id: "il-055",
      word: "suburb",
      phonetic: "/ˈsʌbɜːb/",
      pos: "n.",
      meaning: "郊区；城郊",
      example: { en: "Many families move to a quiet suburb to escape the crowded centre.", zh: "许多家庭搬到安静的郊区，以避开拥挤的市中心。" },
      similar: [
        { word: "suburban", meaning: "adj. 郊区的", note: "同词根，suburban 是形容词，suburb 是名词" },
        { word: "urban", meaning: "adj. 城市的", note: "拼写相近，urban 指市区的，suburb 指城郊" }
      ],
      forms: [
        { word: "suburban", pos: "adj.", meaning: "郊区的" },
        { word: "suburbs", pos: "n.", meaning: "郊区（复数）" }
      ]
    },
    {
      id: "il-056",
      word: "residential",
      phonetic: "/ˌrezɪˈdenʃl/",
      pos: "adj.",
      meaning: "住宅的；居住的",
      example: { en: "The council plans to build a new residential area near the station.", zh: "市政委员会计划在车站附近建一个新的住宅区。" },
      similar: [
        { word: "resident", meaning: "n. 居民；住户", note: "同词根，resident 指人，residential 是形容词" },
        { word: "residence", meaning: "n. 住所；住宅", note: "同词根，residence 指具体的居所" }
      ],
      forms: [
        { word: "resident", pos: "n.", meaning: "居民；住户" },
        { word: "residence", pos: "n.", meaning: "住所；住宅" }
      ]
    },
    {
      id: "il-057",
      word: "commute",
      phonetic: "/kəˈmjuːt/",
      pos: "v.",
      meaning: "通勤；上下班往返",
      example: { en: "Thousands of people commute into the city by train every morning.", zh: "每天早上有数千人乘火车通勤进城。" },
      similar: [
        { word: "commune", meaning: "n. 公社；群体", note: "只差两个字母，commune 指共同生活的群体" },
        { word: "commuter", meaning: "n. 通勤者", note: "同词根，commuter 指人，commute 是动词" }
      ],
      forms: [
        { word: "commuter", pos: "n.", meaning: "通勤者" },
        { word: "commuting", pos: "n.", meaning: "通勤" }
      ]
    },
    {
      id: "il-058",
      word: "density",
      phonetic: "/ˈdensəti/",
      pos: "n.",
      meaning: "密度；稠密",
      example: { en: "High population density puts pressure on housing, schools and public transport.", zh: "高人口密度给住房、学校和公共交通带来压力。" },
      similar: [
        { word: "dense", meaning: "adj. 密集的；浓密的", note: "同词根，dense 是形容词，density 是名词" },
        { word: "destiny", meaning: "n. 命运", note: "只差两个字母，destiny 与命运有关" }
      ],
      forms: [
        { word: "dense", pos: "adj.", meaning: "密集的；浓密的" },
        { word: "densely", pos: "adv.", meaning: "密集地" }
      ]
    },
    {
      id: "il-059",
      word: "welfare",
      phonetic: "/ˈwelfeə/",
      pos: "n.",
      meaning: "福利；福祉",
      example: { en: "A generous welfare system protects citizens who lose their jobs.", zh: "完善的福利制度能保护失业的公民。" },
      similar: [
        { word: "farewell", meaning: "n. 告别；辞别", note: "拼写相近，farewell 与告别有关，与福利无关" },
        { word: "warfare", meaning: "n. 战争；冲突", note: "只差两个字母，warfare 指战争行为" }
      ],
      forms: [
        { word: "welfare state", pos: "phr.", meaning: "福利国家" }
      ]
    },
    {
      id: "il-060",
      word: "poverty",
      phonetic: "/ˈpɒvəti/",
      pos: "n.",
      meaning: "贫困；贫穷",
      example: { en: "Education is one of the most effective ways to escape poverty.", zh: "教育是摆脱贫困最有效的途径之一。" },
      similar: [
        { word: "property", meaning: "n. 财产；房产", note: "只差三个字母，property 指财产，poverty 指贫困" },
        { word: "poor", meaning: "adj. 贫穷的", note: "近义，注意区分：poor 是形容词，poverty 是名词" }
      ],
      forms: [
        { word: "poor", pos: "adj.", meaning: "贫穷的" },
        { word: "impoverished", pos: "adj.", meaning: "贫困的" }
      ]
    },
    {
      id: "il-061",
      word: "inequality",
      phonetic: "/ˌɪnɪˈkwɒləti/",
      pos: "n.",
      meaning: "不平等；不均等",
      example: { en: "Widening inequality between rich and poor can lead to social unrest.", zh: "贫富差距不断扩大可能引发社会动荡。" },
      similar: [
        { word: "equality", meaning: "n. 平等；均等", note: "去掉前缀 in 即为反义，equality 指平等" },
        { word: "inequity", meaning: "n. 不公平", note: "只差一个字母，inequity 强调不公平，inequality 强调差距" }
      ],
      forms: [
        { word: "equal", pos: "adj.", meaning: "平等的；相等的" },
        { word: "unequal", pos: "adj.", meaning: "不平等的" }
      ]
    },
    {
      id: "il-062",
      word: "employment",
      phonetic: "/ɪmˈplɔɪmənt/",
      pos: "n.",
      meaning: "就业；雇用",
      example: { en: "The new factory will create employment for hundreds of local residents.", zh: "新工厂将为数百名当地居民创造就业机会。" },
      similar: [
        { word: "employer", meaning: "n. 雇主", note: "同词根，employer 指雇主，employment 指就业" },
        { word: "unemployment", meaning: "n. 失业", note: "加前缀 un 表示失业，与 employment 相反" }
      ],
      forms: [
        { word: "employ", pos: "v.", meaning: "雇用；使用" },
        { word: "unemployed", pos: "adj.", meaning: "失业的" }
      ]
    },
    {
      id: "il-063",
      word: "legislation",
      phonetic: "/ˌledʒɪsˈleɪʃn/",
      pos: "n.",
      meaning: "立法；法规",
      example: { en: "Strict legislation has reduced the amount of plastic waste in the sea.", zh: "严格的法规减少了海洋中的塑料垃圾。" },
      similar: [
        { word: "legislature", meaning: "n. 立法机关", note: "同词根，legislature 指机构，legislation 指法律本身" },
        { word: "legal", meaning: "adj. 合法的；法律的", note: "同词根，legal 是形容词" }
      ],
      forms: [
        { word: "legislate", pos: "v.", meaning: "立法；制定法律" },
        { word: "legislative", pos: "adj.", meaning: "立法的" }
      ]
    },
    {
      id: "il-064",
      word: "policy",
      phonetic: "/ˈpɒləsi/",
      pos: "n.",
      meaning: "政策；方针",
      example: { en: "The government introduced a new policy to encourage renewable energy.", zh: "政府出台了一项鼓励可再生能源的新政策。" },
      similar: [
        { word: "police", meaning: "n. 警察", note: "只差两个字母，police 指警方，policy 指政策" },
        { word: "politics", meaning: "n. 政治", note: "拼写相近，politics 指政治活动" }
      ],
      forms: [
        { word: "policies", pos: "n.", meaning: "政策（复数）" },
        { word: "policymaker", pos: "n.", meaning: "政策制定者" }
      ]
    },
    {
      id: "il-065",
      word: "demographic",
      phonetic: "/ˌdeməˈɡræfɪk/",
      pos: "adj.",
      meaning: "人口的；人口统计的",
      example: { en: "Demographic change means that fewer young workers support more retired people.", zh: "人口结构变化意味着更少的年轻劳动者要供养更多退休者。" },
      similar: [
        { word: "demography", meaning: "n. 人口学；人口统计", note: "同词根，demography 是名词，demographic 是形容词" },
        { word: "democracy", meaning: "n. 民主；民主制度", note: "拼写相近，但 democracy 与政治制度有关" }
      ],
      forms: [
        { word: "demography", pos: "n.", meaning: "人口学；人口统计" },
        { word: "demographics", pos: "n.", meaning: "人口统计数据" }
      ]
    },
    {
      id: "il-066",
      word: "community",
      phonetic: "/kəˈmjuːnəti/",
      pos: "n.",
      meaning: "社区；群体",
      example: { en: "A strong community can support families during difficult economic times.", zh: "在经济困难的时期，一个凝聚力强的社区能支持各个家庭。" },
      similar: [
        { word: "communal", meaning: "adj. 公共的；共有的", note: "同词根，communal 是形容词，强调共有" },
        { word: "communism", meaning: "n. 共产主义", note: "同词根，但属于政治制度概念" }
      ],
      forms: [
        { word: "communal", pos: "adj.", meaning: "公共的；共有的" },
        { word: "communities", pos: "n.", meaning: "社区（复数）" }
      ]
    },
    {
      id: "il-067",
      word: "nutrition",
      phonetic: "/njuˈtrɪʃn/",
      pos: "n.",
      meaning: "营养；营养学",
      example: { en: "Good nutrition during childhood is essential for healthy physical and mental development.", zh: "童年时期良好的营养对身心健康发育至关重要。" },
      similar: [
        { word: "nutritious", meaning: "adj. 有营养的", note: "同词根，nutritious 是形容词，nutrition 是名词" },
        { word: "nutrient", meaning: "n. 营养物；养分", note: "同词根，nutrient 指具体的养分" }
      ],
      forms: [
        { word: "nutritious", pos: "adj.", meaning: "有营养的" },
        { word: "nutrient", pos: "n.", meaning: "营养物；养分" }
      ]
    },
    {
      id: "il-068",
      word: "obesity",
      phonetic: "/əʊˈbiːsəti/",
      pos: "n.",
      meaning: "肥胖；肥胖症",
      example: { en: "Childhood obesity has become a serious public health problem in rich countries.", zh: "儿童肥胖已成为富裕国家严重的公共健康问题。" },
      similar: [
        { word: "obese", meaning: "adj. 肥胖的", note: "同词根，obese 是形容词，obesity 是名词" }
      ],
      forms: [
        { word: "obese", pos: "adj.", meaning: "肥胖的" }
      ]
    },
    {
      id: "il-069",
      word: "immunity",
      phonetic: "/ɪˈmjuːnəti/",
      pos: "n.",
      meaning: "免疫力；免除",
      example: { en: "Vaccination gives children immunity against several dangerous diseases.", zh: "接种疫苗能让儿童对几种危险疾病产生免疫力。" },
      similar: [
        { word: "immune", meaning: "adj. 免疫的；不受影响的", note: "同词根，immune 是形容词，immunity 是名词" },
        { word: "impunity", meaning: "n. 免受惩罚", note: "只差两个字母，impunity 多指不受惩罚" }
      ],
      forms: [
        { word: "immune", pos: "adj.", meaning: "免疫的；不受影响的" },
        { word: "immunise", pos: "v.", meaning: "使免疫；给…接种疫苗" }
      ]
    },
    {
      id: "il-070",
      word: "epidemic",
      phonetic: "/ˌepɪˈdemɪk/",
      pos: "n.",
      meaning: "流行病；蔓延",
      example: { en: "An epidemic of flu closed several schools during the winter months.", zh: "冬季一场流感流行病使好几所学校停课。" },
      similar: [
        { word: "pandemic", meaning: "n. 大流行病", note: "同词根，pandemic 指跨国大流行，epidemic 指局部流行" },
        { word: "endemic", meaning: "adj. 地方性的", note: "同词根，endemic 指某地特有的" }
      ],
      forms: [
        { word: "pandemic", pos: "n.", meaning: "大流行病" },
        { word: "epidemiology", pos: "n.", meaning: "流行病学" }
      ]
    },
    {
      id: "il-071",
      word: "symptom",
      phonetic: "/ˈsɪmptəm/",
      pos: "n.",
      meaning: "症状；征兆",
      example: { en: "A high temperature is often the first symptom of a viral infection.", zh: "高烧往往是病毒感染的首个症状。" },
      similar: [
        { word: "sympathy", meaning: "n. 同情；同情心", note: "拼写相近，sympathy 指同情，symptom 指症状" },
        { word: "symptomatic", meaning: "adj. 有症状的", note: "同词根，symptomatic 是形容词" }
      ],
      forms: [
        { word: "symptomatic", pos: "adj.", meaning: "有症状的；表明的" },
        { word: "symptoms", pos: "n.", meaning: "症状（复数）" }
      ]
    },
    {
      id: "il-072",
      word: "diagnose",
      phonetic: "/ˈdaɪəɡnəʊz/",
      pos: "v.",
      meaning: "诊断；判断",
      example: { en: "Doctors can now diagnose many diseases with a simple blood test.", zh: "如今医生用一次简单的验血就能诊断许多疾病。" },
      similar: [
        { word: "diagnosis", meaning: "n. 诊断；判断", note: "同词根，diagnosis 是名词形式" },
        { word: "diagnostic", meaning: "adj. 诊断的", note: "同词根，diagnostic 是形容词" }
      ],
      forms: [
        { word: "diagnosis", pos: "n.", meaning: "诊断；判断" },
        { word: "diagnostic", pos: "adj.", meaning: "诊断的" }
      ]
    },
    {
      id: "il-073",
      word: "therapy",
      phonetic: "/ˈθerəpi/",
      pos: "n.",
      meaning: "治疗；疗法",
      example: { en: "Physical therapy helped him walk again after the serious accident.", zh: "物理治疗帮助他在那场严重事故后重新行走。" },
      similar: [
        { word: "therapist", meaning: "n. 治疗师", note: "同词根，therapist 指人，therapy 指疗法" },
        { word: "theory", meaning: "n. 理论", note: "只差三个字母，theory 指理论，therapy 指治疗" }
      ],
      forms: [
        { word: "therapist", pos: "n.", meaning: "治疗师" },
        { word: "therapeutic", pos: "adj.", meaning: "治疗的；有疗效的" }
      ]
    },
    {
      id: "il-074",
      word: "vaccine",
      phonetic: "/ˈvæksiːn/",
      pos: "n.",
      meaning: "疫苗",
      example: { en: "A safe vaccine can protect a whole population from a dangerous virus.", zh: "安全的疫苗能保护全体人口免受危险病毒的侵害。" },
      similar: [
        { word: "vaccinate", meaning: "v. 给…接种疫苗", note: "同词根，vaccinate 是动词，vaccine 是名词" },
        { word: "vaccination", meaning: "n. 接种疫苗", note: "同词根，vaccination 指接种这一行为" }
      ],
      forms: [
        { word: "vaccinate", pos: "v.", meaning: "给…接种疫苗" },
        { word: "vaccination", pos: "n.", meaning: "接种疫苗" }
      ]
    },
    {
      id: "il-075",
      word: "sedentary",
      phonetic: "/ˈsedntri/",
      pos: "adj.",
      meaning: "久坐的；不爱活动的",
      example: { en: "A sedentary lifestyle increases the risk of heart disease and diabetes.", zh: "久坐不动的生活方式会增加心脏病和糖尿病的风险。" },
      similar: [
        { word: "sediment", meaning: "n. 沉淀物；沉积物", note: "同词根，sediment 指沉积物，sedentary 指久坐的" },
        { word: "solitary", meaning: "adj. 孤独的；独自的", note: "拼写相近，solitary 强调独处" }
      ],
      forms: [
        { word: "sedentary lifestyle", pos: "phr.", meaning: "久坐的生活方式" }
      ]
    },
    {
      id: "il-076",
      word: "hygiene",
      phonetic: "/ˈhaɪdʒiːn/",
      pos: "n.",
      meaning: "卫生；保健",
      example: { en: "Good personal hygiene prevents the spread of infection in crowded places.", zh: "良好的个人卫生能防止感染在拥挤场所传播。" },
      similar: [
        { word: "hygienic", meaning: "adj. 卫生的；清洁的", note: "同词根，hygienic 是形容词，hygiene 是名词" },
        { word: "hyphen", meaning: "n. 连字符", note: "只差三个字母，hyphen 指标点符号" }
      ],
      forms: [
        { word: "hygienic", pos: "adj.", meaning: "卫生的；清洁的" },
        { word: "hygienically", pos: "adv.", meaning: "卫生地" }
      ]
    },
    {
      id: "il-077",
      word: "chronic",
      phonetic: "/ˈkrɒnɪk/",
      pos: "adj.",
      meaning: "慢性的；长期的",
      example: { en: "Chronic illness among older people places a heavy burden on hospitals.", zh: "老年人的慢性疾病给医院带来了沉重负担。" },
      similar: [
        { word: "chronological", meaning: "adj. 按时间顺序的", note: "同词根，chronological 强调时间顺序" },
        { word: "chronicle", meaning: "n. 编年史；记事", note: "拼写相近，chronicle 指按时间记载的史书" }
      ],
      forms: [
        { word: "chronically", pos: "adv.", meaning: "长期地；慢性地" },
        { word: "chronic illness", pos: "phr.", meaning: "慢性病" }
      ]
    },
    {
      id: "il-078",
      word: "wellbeing",
      phonetic: "/ˌwelˈbiːɪŋ/",
      pos: "n.",
      meaning: "健康；幸福",
      example: { en: "Regular exercise improves both physical fitness and mental wellbeing.", zh: "经常锻炼能同时改善身体健康和心理幸福感。" },
      similar: [
        { word: "welfare", meaning: "n. 福利；福祉", note: "近义，注意区分：wellbeing 指个人身心状态，welfare 指社会福利" },
        { word: "well-being", meaning: "n. 健康；幸福", note: "带连字符的写法更常见于美式英语，含义相同" }
      ],
      forms: [
        { word: "mental wellbeing", pos: "phr.", meaning: "心理健康" }
      ]
    },
    {
      id: "il-079",
      word: "advocate",
      phonetic: "/ˈædvəkeɪt/",
      pos: "v.",
      meaning: "提倡；主张",
      example: { en: "Many scientists advocate stricter limits on the burning of fossil fuels.", zh: "许多科学家主张更严格地限制化石燃料的燃烧。" },
      similar: [
        { word: "advocacy", meaning: "n. 拥护；倡导", note: "同词根，advocacy 是名词，advocate 常作动词" },
        { word: "vocation", meaning: "n. 职业；使命感", note: "只差三个字母，vocation 与职业有关" }
      ],
      forms: [
        { word: "advocacy", pos: "n.", meaning: "拥护；倡导" },
        { word: "advocates", pos: "v.", meaning: "提倡（第三人称单数）" }
      ]
    },
    {
      id: "il-080",
      word: "controversy",
      phonetic: "/ˈkɒntrəvɜːsi/",
      pos: "n.",
      meaning: "争议；争论",
      example: { en: "The decision to build a new airport caused controversy among local residents.", zh: "新建机场的决定在当地居民中引发了争议。" },
      similar: [
        { word: "controversial", meaning: "adj. 有争议的", note: "同词根，controversial 是形容词，controversy 是名词" },
        { word: "converse", meaning: "v. 交谈；谈话", note: "拼写相近，converse 指交谈，与争论无关" }
      ],
      forms: [
        { word: "controversial", pos: "adj.", meaning: "有争议的" },
        { word: "controversially", pos: "adv.", meaning: "有争议地" }
      ]
    },
    {
      id: "il-081",
      word: "controversial",
      phonetic: "/ˌkɒntrəˈvɜːʃl/",
      pos: "adj.",
      meaning: "有争议的；引起争论的",
      example: { en: "The controversial policy divided opinion across the whole country.", zh: "这项有争议的政策使全国的意见产生了分歧。" },
      similar: [
        { word: "controversy", meaning: "n. 争议；争论", note: "同词根，controversy 是名词，controversial 是形容词" },
        { word: "conventional", meaning: "adj. 传统的；常规的", note: "拼写接近，conventional 指符合惯例的" }
      ],
      forms: [
        { word: "controversy", pos: "n.", meaning: "争议；争论" },
        { word: "uncontroversial", pos: "adj.", meaning: "无争议的" }
      ]
    },
    {
      id: "il-082",
      word: "mitigate",
      phonetic: "/ˈmɪtɪɡeɪt/",
      pos: "v.",
      meaning: "减轻；缓解",
      example: { en: "Planting trees can mitigate the effects of air pollution in cities.", zh: "植树能够减轻城市空气污染的影响。" },
      similar: [
        { word: "meditate", meaning: "v. 冥想；沉思", note: "只差两个字母，meditate 指静坐冥想" },
        { word: "mitigation", meaning: "n. 缓解；减轻", note: "同词根，mitigation 是名词形式" }
      ],
      forms: [
        { word: "mitigation", pos: "n.", meaning: "缓解；减轻" },
        { word: "mitigating", pos: "adj.", meaning: "可减轻的" }
      ]
    },
    {
      id: "il-083",
      word: "deteriorate",
      phonetic: "/dɪˈtɪəriəreɪt/",
      pos: "v.",
      meaning: "恶化；退化",
      example: { en: "Air quality may deteriorate rapidly if traffic is not properly controlled.", zh: "如果交通得不到妥善控制，空气质量可能迅速恶化。" },
      similar: [
        { word: "deterioration", meaning: "n. 恶化；退化", note: "同词根，deterioration 是名词形式" }
      ],
      forms: [
        { word: "deterioration", pos: "n.", meaning: "恶化；退化" },
        { word: "deteriorating", pos: "adj.", meaning: "不断恶化的" }
      ]
    },
    {
      id: "il-084",
      word: "exacerbate",
      phonetic: "/ɪɡˈzæsəbeɪt/",
      pos: "v.",
      meaning: "加剧；使恶化",
      example: { en: "Cutting public transport would exacerbate traffic problems in the city centre.", zh: "削减公共交通会加剧市中心的交通问题。" },
      similar: [
        { word: "exasperate", meaning: "v. 使恼怒；激怒", note: "只差两个字母，exasperate 指使人恼火" }
      ],
      forms: [
        { word: "exacerbation", pos: "n.", meaning: "加剧；恶化" }
      ]
    },
    {
      id: "il-085",
      word: "crucial",
      phonetic: "/ˈkruːʃl/",
      pos: "adj.",
      meaning: "至关重要的；关键的",
      example: { en: "Access to clean water is crucial for public health in developing regions.", zh: "在发展中地区，获得清洁饮用水对公共健康至关重要。" },
      similar: [
        { word: "vital", meaning: "adj. 至关重要的", note: "近义，注意区分：crucial 强调起决定作用，vital 强调生死攸关" },
        { word: "crucially", meaning: "adv. 关键地", note: "加后缀 -ly 构成副词，常用来引出关键论点" }
      ],
      forms: [
        { word: "crucially", pos: "adv.", meaning: "关键地；至关重要地" }
      ]
    },
    {
      id: "il-086",
      word: "significant",
      phonetic: "/sɪɡˈnɪfɪkənt/",
      pos: "adj.",
      meaning: "重大的；显著的",
      example: { en: "There has been a significant rise in the number of online shoppers.", zh: "网购者的数量出现了显著增长。" },
      similar: [
        { word: "significance", meaning: "n. 重要性；意义", note: "同词根，significance 是名词，significant 是形容词" },
        { word: "signify", meaning: "v. 表示；意味着", note: "同词根，signify 是动词" }
      ],
      forms: [
        { word: "significance", pos: "n.", meaning: "重要性；意义" },
        { word: "significantly", pos: "adv.", meaning: "显著地；大幅地" }
      ]
    },
    {
      id: "il-087",
      word: "inevitable",
      phonetic: "/ɪnˈevɪtəbl/",
      pos: "adj.",
      meaning: "不可避免的；必然的",
      example: { en: "Some degree of conflict is inevitable when people share limited resources.", zh: "当人们共享有限资源时，某种程度的冲突不可避免。" },
      similar: [
        { word: "inevitably", meaning: "adv. 不可避免地", note: "同词根，inevitably 是副词形式" },
        { word: "inevitability", meaning: "n. 必然性", note: "同词根，inevitability 是名词形式" }
      ],
      forms: [
        { word: "inevitably", pos: "adv.", meaning: "不可避免地" },
        { word: "inevitability", pos: "n.", meaning: "必然性" }
      ]
    },
    {
      id: "il-088",
      word: "implication",
      phonetic: "/ˌɪmplɪˈkeɪʃn/",
      pos: "n.",
      meaning: "影响；含义",
      example: { en: "The new law has serious implications for small businesses.", zh: "这项新法律对小企业有重大影响。" },
      similar: [
        { word: "implicate", meaning: "v. 牵连；暗示", note: "同词根，implicate 是动词，implication 是名词" },
        { word: "application", meaning: "n. 申请；应用", note: "只差两个字母，application 指申请或应用" }
      ],
      forms: [
        { word: "imply", pos: "v.", meaning: "暗示；意味着" },
        { word: "implicit", pos: "adj.", meaning: "含蓄的；隐含的" }
      ]
    },
    {
      id: "il-089",
      word: "perspective",
      phonetic: "/pəˈspektɪv/",
      pos: "n.",
      meaning: "观点；视角",
      example: { en: "From an economic perspective, free trade benefits both rich and poor nations.", zh: "从经济角度看，自由贸易对富国和穷国都有好处。" },
      similar: [
        { word: "prospect", meaning: "n. 前景；可能性", note: "拼写相近，prospect 指未来的前景" },
        { word: "respective", meaning: "adj. 各自的", note: "只差两个字母，respective 指各自的" }
      ],
      forms: [
        { word: "perspectives", pos: "n.", meaning: "观点（复数）" }
      ]
    },
    {
      id: "il-090",
      word: "phenomenon",
      phonetic: "/fəˈnɒmɪnən/",
      pos: "n.",
      meaning: "现象；非凡的人或事",
      example: { en: "Urban migration is a worldwide phenomenon that affects every continent.", zh: "向城市迁移是一种影响各个大洲的世界性现象。" },
      similar: [
        { word: "phenomena", meaning: "n. 现象（复数）", note: "phenomena 是 phenomenon 的复数形式" },
        { word: "phenomenal", meaning: "adj. 非凡的；惊人的", note: "同词根，phenomenal 是形容词" }
      ],
      forms: [
        { word: "phenomena", pos: "n.", meaning: "现象（复数）" },
        { word: "phenomenal", pos: "adj.", meaning: "非凡的；惊人的" }
      ]
    },
    {
      id: "il-091",
      word: "prevalent",
      phonetic: "/ˈprevələnt/",
      pos: "adj.",
      meaning: "普遍的；盛行的",
      example: { en: "This disease is more prevalent in regions with poor sanitation.", zh: "这种疾病在卫生条件差的地区更为普遍。" },
      similar: [
        { word: "prevalence", meaning: "n. 普遍；流行程度", note: "同词根，prevalence 是名词形式" },
        { word: "prevent", meaning: "v. 阻止；预防", note: "拼写相近，prevent 指阻止某事发生" }
      ],
      forms: [
        { word: "prevalence", pos: "n.", meaning: "普遍；流行程度" },
        { word: "prevail", pos: "v.", meaning: "盛行；占优势" }
      ]
    },
    {
      id: "il-092",
      word: "beneficial",
      phonetic: "/ˌbenɪˈfɪʃl/",
      pos: "adj.",
      meaning: "有益的；有好处的",
      example: { en: "Regular exercise is beneficial to both the body and the mind.", zh: "经常锻炼对身心都有好处。" },
      similar: [
        { word: "benefit", meaning: "n. 益处；好处", note: "同词根，benefit 是名词，beneficial 是形容词" },
        { word: "beneficent", meaning: "adj. 行善的；仁慈的", note: "只差三个字母，beneficent 强调乐善好施" }
      ],
      forms: [
        { word: "benefit", pos: "n.", meaning: "益处；好处" },
        { word: "beneficiary", pos: "n.", meaning: "受益者" }
      ]
    },
    {
      id: "il-093",
      word: "detrimental",
      phonetic: "/ˌdetrɪˈmentl/",
      pos: "adj.",
      meaning: "有害的；不利的",
      example: { en: "Excessive use of social media can be detrimental to young people's concentration.", zh: "过度使用社交媒体会损害年轻人的注意力。" },
      similar: [
        { word: "detriment", meaning: "n. 损害；伤害", note: "同词根，detriment 是名词，detrimental 是形容词" },
        { word: "determinant", meaning: "n. 决定因素", note: "拼写相近，determinant 指起决定作用的因素" }
      ],
      forms: [
        { word: "detriment", pos: "n.", meaning: "损害；伤害" },
        { word: "detrimentally", pos: "adv.", meaning: "有害地" }
      ]
    },
    {
      id: "il-094",
      word: "contribute",
      phonetic: "/kənˈtrɪbjuːt/",
      pos: "v.",
      meaning: "贡献；促成",
      example: { en: "Every citizen can contribute to a cleaner environment by recycling household waste.", zh: "每个公民都能通过回收生活垃圾为更清洁的环境作贡献。" },
      similar: [
        { word: "attribute", meaning: "v. 把…归因于", note: "只差两个字母，attribute 指把原因归于某事物" },
        { word: "contribution", meaning: "n. 贡献；捐款", note: "同词根，contribution 是名词形式" }
      ],
      forms: [
        { word: "contribution", pos: "n.", meaning: "贡献；捐款" },
        { word: "contributor", pos: "n.", meaning: "贡献者；投稿人" }
      ]
    },
    {
      id: "il-095",
      word: "illustrate",
      phonetic: "/ˈɪləstreɪt/",
      pos: "v.",
      meaning: "说明；举例说明",
      example: { en: "The chart illustrates the rapid growth of internet use since 2000.", zh: "该图表说明了自2000年以来互联网使用量的快速增长。" },
      similar: [
        { word: "illustration", meaning: "n. 说明；插图", note: "同词根，illustration 是名词形式" },
        { word: "illuminate", meaning: "v. 照亮；阐明", note: "只差三个字母，illuminate 侧重照亮或阐明" }
      ],
      forms: [
        { word: "illustration", pos: "n.", meaning: "说明；插图" },
        { word: "illustrative", pos: "adj.", meaning: "说明性的" }
      ]
    },
    {
      id: "il-096",
      word: "emphasise",
      phonetic: "/ˈemfəsaɪz/",
      pos: "v.",
      meaning: "强调；着重指出",
      example: { en: "Teachers emphasise the importance of planning before writing an essay.", zh: "老师们强调写文章前先做规划的重要性。" },
      similar: [
        { word: "emphasize", meaning: "v. 强调", note: "emphasise 是英式拼写，emphasize 是美式拼写" },
        { word: "emphasis", meaning: "n. 强调；重点", note: "同词根，emphasis 是名词，emphasise 是动词" }
      ],
      forms: [
        { word: "emphasis", pos: "n.", meaning: "强调；重点" },
        { word: "emphatic", pos: "adj.", meaning: "强调的；断然的" }
      ]
    },
    {
      id: "il-097",
      word: "moreover",
      phonetic: "/mɔːrˈəʊvə/",
      pos: "adv.",
      meaning: "此外；而且",
      example: { en: "The plan is expensive; moreover, it may damage the local environment.", zh: "该计划耗资巨大；此外，它还可能破坏当地环境。" },
      similar: [
        { word: "furthermore", meaning: "adv. 此外；而且", note: "近义，注意区分：moreover 更书面，furthermore 语气更强" },
        { word: "however", meaning: "adv. 然而；不过", note: "拼写相近但作用相反，however 表示转折" }
      ],
      forms: [
        { word: "what is more", pos: "phr.", meaning: "而且；更重要的是" }
      ]
    },
    {
      id: "il-098",
      word: "nevertheless",
      phonetic: "/ˌnevəðəˈles/",
      pos: "adv.",
      meaning: "然而；尽管如此",
      example: { en: "The evidence is limited; nevertheless, most experts accept the main conclusion.", zh: "证据有限；尽管如此，多数专家仍接受这一主要结论。" },
      similar: [
        { word: "nonetheless", meaning: "adv. 尽管如此", note: "近义，注意区分：两者可换用，nonetheless 稍显正式" }
      ],
      forms: [
        { word: "none the less", pos: "phr.", meaning: "尽管如此" }
      ]
    },
    {
      id: "il-099",
      word: "consequently",
      phonetic: "/ˈkɒnsɪkwəntli/",
      pos: "adv.",
      meaning: "因此；结果",
      example: { en: "Fuel prices rose sharply; consequently, many commuters switched to the bus.", zh: "燃料价格急剧上涨；因此，许多通勤者改乘公交车。" },
      similar: [
        { word: "consequence", meaning: "n. 后果；结果", note: "同词根，consequence 是名词，consequently 是副词" },
        { word: "consequent", meaning: "adj. 随之而来的", note: "同词根，consequent 是形容词" }
      ],
      forms: [
        { word: "consequence", pos: "n.", meaning: "后果；结果" },
        { word: "consequent", pos: "adj.", meaning: "随之而来的" }
      ]
    },
    {
      id: "il-100",
      word: "therefore",
      phonetic: "/ˈðeəfɔː/",
      pos: "adv.",
      meaning: "因此；所以",
      example: { en: "The sample was too small; therefore, the results cannot be trusted.", zh: "样本太小；因此，这些结果不可信。" },
      similar: [
        { word: "thereby", meaning: "adv. 从而；由此", note: "只差三个字母，thereby 强调通过某方式产生结果" },
        { word: "thereabouts", meaning: "adv. 大约；附近", note: "拼写相近，thereabouts 表示大约或附近" }
      ],
      forms: [
        { word: "and therefore", pos: "phr.", meaning: "因此；所以" }
      ]
    },
    {
      id: "il-101",
      word: "despite",
      phonetic: "/dɪˈspaɪt/",
      pos: "prep.",
      meaning: "尽管；虽然",
      example: { en: "Despite rising costs, many students still choose to study abroad.", zh: "尽管费用上涨，许多学生仍选择出国留学。" },
      similar: [
        { word: "despise", meaning: "v. 鄙视；轻视", note: "只差两个字母，despise 表示厌恶轻视" },
        { word: "in spite of", meaning: "phr. 尽管", note: "近义，注意区分：despite 后直接接名词，in spite of 用法相同但更长" }
      ],
      forms: [
        { word: "in spite of", pos: "phr.", meaning: "尽管；不管" }
      ]
    },
    {
      id: "il-102",
      word: "whereas",
      phonetic: "/ˌweərˈæz/",
      pos: "conj.",
      meaning: "然而；反之",
      example: { en: "Some people prefer city life, whereas others enjoy the peace of the countryside.", zh: "有些人喜欢城市生活，而另一些人则享受乡村的宁静。" },
      similar: [
        { word: "whereby", meaning: "adv. 凭此；借以", note: "拼写相近，whereby 表示通过某种方式" },
        { word: "while", meaning: "conj. 而；虽然", note: "近义，注意区分：whereas 更正式，常用来对比两种观点" }
      ],
      forms: [
        { word: "whereas in practice", pos: "phr.", meaning: "然而在实践中" }
      ]
    },
    {
      id: "il-103",
      word: "account for",
      phonetic: "/əˈkaʊnt fɔː/",
      pos: "phr.",
      meaning: "占（比例）；解释",
      example: { en: "Manufacturing does not account for the whole increase in energy use.", zh: "制造业并不能解释能源消耗的全部增长。" },
      similar: [
        { word: "accountable", meaning: "adj. 有责任的", note: "同词根但含义不同，account for 表示占比或解释" },
        { word: "count for", meaning: "phr. 有价值；有重要性", note: "拼写相近，count for 强调具有重要性" }
      ],
      forms: [
        { word: "accounted for", pos: "phr.", meaning: "占（过去式）" },
        { word: "accounting for", pos: "phr.", meaning: "占（现在分词）" }
      ]
    },
    /* APPEND */
  ];
  if (typeof module !== "undefined" && module.exports) module.exports = WORDS;
  if (typeof window !== "undefined") {
    window.WORDBOOK_DATA = window.WORDBOOK_DATA || {};
    window.WORDBOOK_DATA.ielts = WORDS;
  }
})();