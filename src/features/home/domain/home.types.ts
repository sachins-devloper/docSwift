import { ConversionType } from '../../conversion/domain/enums/ConversionType';

export interface ToolItem {
  id: ConversionType;
  title: string;
  description: string;
  icon: string;
  isPopular?: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  actionText: string;
}
