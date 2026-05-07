import { memo } from 'react';
import { View } from 'react-native';
import { PortfolioGallery, type PortfolioItem } from '../components/PortfolioGallery';
import { spacing } from '../../../constants/theme';

type Props = {
  items: PortfolioItem[];
};

export const PortfolioTab = memo(function PortfolioTab({ items }: Props) {
  return (
    <View style={{ paddingHorizontal: spacing.md }}>
      <PortfolioGallery title="Portfolio" items={items} />
    </View>
  );
});

