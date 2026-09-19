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
    yes: "result-guizhi",
    no: "result-review"
  },
  pain: {
    id: "pain",
    question: "是否同时有明显身痛、无汗，甚至喘等线索？",
    help: "这是第35条常见的学习组合。",
    yes: "result-mahuang",
    no: "neck"
  },
  neck: {
    id: "neck",
    question: "项背拘紧是否特别突出？",
    help: "如果项背强明显，可进一步读葛根汤相关条文。",
    yes: "result-gegen",
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
      clauseIds: ["2"]
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
      clauseIds: ["3", "35"]
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
      clauseIds: ["31"]
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
