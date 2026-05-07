import { memo } from 'react';
import { View } from 'react-native';
import { ReviewSection, type ReviewItem } from '../components/ReviewSection';
import { spacing } from '../../../constants/theme';

type Props = {
  items: ReviewItem[];
};

export const ReviewsTab = memo(function ReviewsTab({ items }: Props) {
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md }}>
      <ReviewSection title="Reviews" items={items} />
    </View>
  );
});

