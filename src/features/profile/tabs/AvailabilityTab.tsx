import { memo } from 'react';
import { View } from 'react-native';
import { AvailabilitySection } from '../components/AvailabilitySection';
import { spacing } from '../../../constants/theme';

type Props = {
  nextAvailable: string;
  slots: string[];
  onOpenCalendar?: () => void;
};

export const AvailabilityTab = memo(function AvailabilityTab({ nextAvailable, slots, onOpenCalendar }: Props) {
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md }}>
      <AvailabilitySection nextAvailable={nextAvailable} slots={slots} onOpenCalendar={onOpenCalendar} />
    </View>
  );
});

