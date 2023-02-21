import { RiskTypes } from 'app/patients/shared/models/patient';
import { SelectItem } from 'app/models/select-item';

export class RiskUtils {
    public static getRiskName(risk: RiskTypes): string {
        switch (risk) {
          case RiskTypes.Low:
            return 'Low';
          case RiskTypes.Medium:
            return 'Med';
          case RiskTypes.High:
            return 'High';
        }
    }

    public static getRiskCssClass(risk: RiskTypes): string {
        switch (risk) {
          case RiskTypes.Low:
            return 'low-risk';
          case RiskTypes.Medium:
            return 'medium-risk';
          case RiskTypes.High:
            return 'high-risk';
        }
    }

    public static getRiskSelectItems(): SelectItem[] {
      return [
        new SelectItem(RiskTypes.Low, this.getRiskName(RiskTypes.Low)),
        new SelectItem(RiskTypes.Medium, this.getRiskName(RiskTypes.Medium)),
        new SelectItem(RiskTypes.High, this.getRiskName(RiskTypes.High))
      ];
    }
}
