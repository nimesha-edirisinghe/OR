import React from 'react';
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItemI {
  label: string;
  path: string;
}

interface AppBreadcrumbProps {
  items: BreadcrumbItemI[];
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <ChakraBreadcrumb color="#8C8C8C" separator=">">
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index === items.length - 1 ? (
            <BreadcrumbLink>
              <AppText fontSize="12px" fontWeight={500} color="#8C8C8C">
                {item.label}
              </AppText>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink onClick={() => navigate(item.path)}>
              <AppText fontSize="12px" fontWeight={500} color="#8C8C8C">
                {item.label}
              </AppText>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default AppBreadcrumb;
