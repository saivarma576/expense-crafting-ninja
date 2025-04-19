export interface PolicyComment {
  id: string;
  comment: string;
  user: string;
  timestamp: Date;
  type: 'user' | 'system' | 'bot' | 'approver';
  tags?: string[];
  files?: string[];
}

export interface PolicyViolation {
  id: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  status: 'violation' | 'exception' | 'approved';
  comments?: PolicyComment[];
}
