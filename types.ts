
export interface QSPVariable {
  symbol: string;
  name: string;
  value: number; // 0-100 normalized score
  description: string;
}

export interface QSPArticle {
  intro: string;       // مقدمة عن الموضوع
  forecasting: string; // التحليل الاستشرافي (فقه المآلات)
  modeling: string;    // النمذجة (شرح التلازمات السننية لغوياً)
  remedies: string;    // المسارات التصحيحية (فقه الاستدراك)
}

export interface QSPAnalysisResult {
  title: string;
  coreVerse: string;
  analysisText: string;
  algebra: string[];
  variables: QSPVariable[];
  article: QSPArticle; // New field for the generated article
  status: 'Safe' | 'Warning' | 'Critical' | 'Collapse';
  recommendations: string[];
  disclaimer: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
