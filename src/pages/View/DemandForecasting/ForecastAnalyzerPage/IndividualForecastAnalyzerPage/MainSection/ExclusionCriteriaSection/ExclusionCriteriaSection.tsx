import { FC } from 'react';
import ExclusionCriteriaItem from '../../../FCAnalyzerCommonComponents/ExclusionCriteriaItem/ExclusionCriteriaItem';
import { ExclusionCriteriaResponseI } from 'types/responses/view/forecastAnalyzer';

interface ExclusionCriteriaSectionProps {
  exCriteriaData: ExclusionCriteriaResponseI[] | null;
}

const ExclusionCriteriaSection: FC<ExclusionCriteriaSectionProps> = ({ exCriteriaData }) => {
  return (
    <>
      {exCriteriaData?.map((item) => (
        <ExclusionCriteriaItem
          name={item.name}
          alerted={item.alerted}
          key={item.name}
          value={item.value}
        />
      ))}
    </>
  );
};

export default ExclusionCriteriaSection;
