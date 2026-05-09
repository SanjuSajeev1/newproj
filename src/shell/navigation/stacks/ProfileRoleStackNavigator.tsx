import { GuestProfileStackNavigator } from "./GuestProfileStackNavigator";
import { UserProfileStackNavigator } from "./UserProfileStackNavigator";
import { useAuthStore } from "../../../store/authStore";

/**
 * Routes profile from the Home stack header: guest sees guest profile, signed-in users and providers share the member profile stack.
 */
export function ProfileRoleStackNavigator() {
  const isGuest = useAuthStore((s) => s.isGuest);
  if (isGuest) {
    return <GuestProfileStackNavigator />;
  }
  return <UserProfileStackNavigator />;
}
