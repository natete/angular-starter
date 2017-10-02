import { ActionDefinition } from '../../actions/action-definition';

export interface ColumnDefinition {
  type?: string;
  definition: string;
  header: string;
  fieldName: string;
  align?: string;
  color?: string;
  isSortable: boolean;
  additionalClasses?: string;
  actions?: ActionDefinition[];
}
