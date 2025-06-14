import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string },
  colorName: keyof typeof Colors
) {
  // Always use light mode
  if (props.light) {
    return props.light;
  } else {
    return Colors[colorName];
  }
}
