export type RunbookNode = {
  id: string;
  question: string;
  help: string;
  yes?: string;
  no?: string;
  result?: {
    title: string;
    description: string;
    channel?: string;
    formula?: string;
    formulaSlug?: string;
    clauseIds?: string[];
  };
};

export const runbookNodes: Record<string, RunbookNode> = {
  start: {
    id: "start",
    question: "学习案例当前最突出的，是明显怕冷 / 恶寒吗？",
    help: "这里只训练经典阅读顺序，不用于判断真实患者。",
    yes: "sweat",
    no: "alternating"
  },
  sweat: {
    id: "sweat",
    question: "在太阳表证的学习场景中，有明显汗出吗？",
    help: "先对照第2、3条：汗出恶风与恶寒体痛是两个重要分叉。",
    yes: "wind",
    no: "pain"
  },
  wind: {
    id: "wind",
    question: "是否同时突出恶风、发热、脉缓这一组经典线索？",
    help: "重点不是单独某一个症状，而是组合。",
    yes: "sweat-neck",
    no: "post-sweat-asthma"
  },
  "sweat-neck": {
    id: "sweat-neck",
    question: "汗出恶风之外，项背拘紧是否特别突出？",
    help: "这里对照第14条：同在桂枝汤式框架里，项背强会形成新的学习分叉。",
    yes: "result-guizhi-gegen",
    no: "result-guizhi"
  },
  "post-sweat-asthma": {
    id: "post-sweat-asthma",
    question: "是否是在“发汗后，汗出而喘、无大热”的经典条文上下文中？",
    help: "这是第63条的文本条件，只用于定位原文，不用于根据真实症状选方。",
    yes: "result-maxingshigan",
    no: "result-review"
  },
  pain: {
    id: "pain",
    question: "是否同时有明显身痛、无汗，甚至喘等线索？",
    help: "这是第35条常见的学习组合。",
    yes: "irritability",
    no: "neck"
  },
  irritability: {
    id: "irritability",
    question: "在无汗、身痛的基础上，烦躁是否成为特别突出的线索？",
    help: "第38条把“无汗身痛 + 烦躁”作为大青龙汤学习分叉，并且同时写明误用边界。",
    yes: "result-daqinglong",
    no: "result-mahuang"
  },
  neck: {
    id: "neck",
    question: "项背拘紧是否特别突出？",
    help: "如果项背强明显，可进一步读葛根汤相关条文。",
    yes: "result-gegen",
    no: "fluid"
  },
  fluid: {
    id: "fluid",
    question: "是否更突出咳、喘、干呕与“心下有水气”这一组经典线索？",
    help: "这组关键词用于回到第40条学习小青龙汤与水饮框架。",
    yes: "result-xiaoqinglong",
    no: "result-review"
  },
  alternating: {
    id: "alternating",
    question: "是否突出寒热往来、胸胁不舒、胃口差或喜呕？",
    help: "这是少阳学习路径里非常重要的一组组合线索。",
    yes: "result-xiaochaihu",
    no: "heat"
  },
  heat: {
    id: "heat",
    question: "是否更突出身热、汗自出、不恶寒反恶热？",
    help: "可与太阳阶段的恶寒、恶风对照。",
    yes: "result-yangming",
    no: "digestive"
  },
  digestive: {
    id: "digestive",
    question: "是否突出腹满、呕吐、食不下、自利等消化道表现？",
    help: "这组线索可进入太阴总纲学习。",
    yes: "result-taiyin",
    no: "energy"
  },
  energy: {
    id: "energy",
    question: "是否突出精神状态低下、但欲寐、脉微细或脉沉？",
    help: "这组线索帮助理解少阴篇为什么关注整体机能状态。",
    yes: "result-shaoyin",
    no: "result-jueyin"
  },
  "result-guizhi": {
    id: "result-guizhi",
    question: "",
    help: "",
    result: {
      title: "太阳中风学习路径",
      description: "回到第2条理解“发热、汗出、恶风、脉缓”，再阅读桂枝汤方证。不要把它理解成自动处方。",
      channel: "太阳",
      formula: "桂枝汤",
      formulaSlug: "gui-zhi-tang",
      clauseIds: ["2", "12", "13", "42", "43", "44", "45"]
    }
  },
  "result-mahuang": {
    id: "result-mahuang",
    question: "",
    help: "",
    result: {
      title: "太阳伤寒 / 麻黄汤证学习路径",
      description: "重点对照第3条与第35条，理解恶寒、体痛、无汗、喘等组合。",
      channel: "太阳",
      formula: "麻黄汤",
      formulaSlug: "ma-huang-tang",
      clauseIds: ["3", "35", "36", "46"]
    }
  },
  "result-gegen": {
    id: "result-gegen",
    question: "",
    help: "",
    result: {
      title: "太阳兼项背强学习路径",
      description: "重点阅读第31条，理解为什么“项背强”会成为分叉线索。",
      channel: "太阳",
      formula: "葛根汤",
      formulaSlug: "ge-gen-tang",
      clauseIds: ["31", "32"]
    }
  },
  "result-guizhi-gegen": {
    id: "result-guizhi-gegen",
    question: "",
    help: "",
    result: {
      title: "太阳中风兼项背强学习路径",
      description: "先回到第14条，比较桂枝汤框架与项背强这一新增线索，再与第31条无汗项背强做对照。",
      channel: "太阳",
      formula: "桂枝加葛根汤",
      formulaSlug: "gui-zhi-jia-ge-gen-tang",
      clauseIds: ["14", "31"]
    }
  },
  "result-daqinglong": {
    id: "result-daqinglong",
    question: "",
    help: "",
    result: {
      title: "无汗烦躁 / 大青龙汤学习路径",
      description: "重点阅读第38、39条，并同时注意原文自己写出的误用边界；不要把“烦躁”脱离无汗、脉象与整体上下文单独使用。",
      channel: "太阳",
      formula: "大青龙汤",
      formulaSlug: "da-qing-long-tang",
      clauseIds: ["38", "39"]
    }
  },
  "result-xiaoqinglong": {
    id: "result-xiaoqinglong",
    question: "",
    help: "",
    result: {
      title: "外寒兼水饮 / 小青龙汤学习路径",
      description: "回到第40条，从“心下有水气”统摄咳、喘、干呕等分支，再与大青龙汤的烦躁郁热主轴比较。",
      channel: "太阳",
      formula: "小青龙汤",
      formulaSlug: "xiao-qing-long-tang",
      clauseIds: ["40"]
    }
  },
  "result-maxingshigan": {
    id: "result-maxingshigan",
    question: "",
    help: "",
    result: {
      title: "汗后喘 / 麻杏石甘汤学习路径",
      description: "第63条强调的是发汗后的特定文本上下文：汗出而喘、无大热，并明确说不可更行桂枝汤。这里只做经典定位。",
      channel: "太阳",
      formula: "麻黄杏仁甘草石膏汤",
      formulaSlug: "ma-xing-shi-gan-tang",
      clauseIds: ["63"]
    }
  },
  "result-xiaochaihu": {
    id: "result-xiaochaihu",
    question: "",
    help: "",
    result: {
      title: "少阳学习路径",
      description: "先抓第96条的主证：往来寒热、胸胁苦满、不欲饮食、心烦喜呕。",
      channel: "少阳",
      formula: "小柴胡汤",
      clauseIds: ["96"]
    }
  },
  "result-yangming": {
    id: "result-yangming",
    question: "",
    help: "",
    result: {
      title: "阳明学习路径",
      description: "从第180条总纲与第182条外证开始，对照太阳阶段理解“不恶寒反恶热”。",
      channel: "阳明",
      clauseIds: ["180", "182"]
    }
  },
  "result-taiyin": {
    id: "result-taiyin",
    question: "",
    help: "",
    result: {
      title: "太阴学习路径",
      description: "先阅读第273条与第277条，理解腹满、自利、食不下等表现为何不能机械套用攻下思路。",
      channel: "太阴",
      clauseIds: ["273", "277"]
    }
  },
  "result-shaoyin": {
    id: "result-shaoyin",
    question: "",
    help: "",
    result: {
      title: "少阴学习路径",
      description: "从第281条总纲开始，再比较第301条与第323条，体会同属少阴时仍可能出现不同分支。",
      channel: "少阴",
      clauseIds: ["281", "301", "323"]
    }
  },
  "result-jueyin": {
    id: "result-jueyin",
    question: "",
    help: "",
    result: {
      title: "先进入厥阴与综合复习",
      description: "如果前面的典型分支都不匹配，不要强行归类。阅读第326、337条理解寒热错杂与“厥”的概念，再回到六经地图。",
      channel: "厥阴",
      clauseIds: ["326", "337"]
    }
  },
  "result-review": {
    id: "result-review",
    question: "",
    help: "",
    result: {
      title: "信息不足，回到条文对照",
      description: "这正是学习 Runbook 的重要结论：不是每组表现都必须立刻归类。补充上下文，再从六经总纲重新比较。"
    }
  }
};
