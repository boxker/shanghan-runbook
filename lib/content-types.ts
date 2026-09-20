export type ChannelName = "太阳" | "阳明" | "少阳" | "太阴" | "少阴" | "厥阴";
export type ReviewStatus = "草稿" | "初校" | "已校";

export type Clause = {
  id: string;
  number: number;
  channel: ChannelName;
  title: string;
  original: string;
  plain: string;
  keywords: string[];
  pattern?: string;
  formula?: string;
  formulaSlug?: string;
  learningNote: string;
  sourceName: string;
  sourceEdition: string;
  sourceUrl: string;
  reviewStatus: ReviewStatus;
  reviewedAt: string;
};

export type Formula = {
  slug: string;
  name: string;
  channel: string;
  summary: string;
  clues: string[];
  caution: string;
  composition: string[];
  clauseIds: string[];
  aliases: string[];
  comparison: string;
  sourceName: string;
  sourceUrl: string;
  reviewStatus: ReviewStatus;
  reviewedAt: string;
};
