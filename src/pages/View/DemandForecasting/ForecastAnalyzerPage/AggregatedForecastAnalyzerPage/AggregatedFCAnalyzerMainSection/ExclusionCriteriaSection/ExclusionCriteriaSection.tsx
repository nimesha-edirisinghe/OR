import { FC } from 'react';
import ExclusionCriteriaItem from '../../../FCAnalyzerCommonComponents/ExclusionCriteriaItem/ExclusionCriteriaItem';
import { ExclusionCriteriaI } from '../helper';

interface ExclusionCriteriaSectionProps {
  exCriteriaData: ExclusionCriteriaI[] | null;
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
