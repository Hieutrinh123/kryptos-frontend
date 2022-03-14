import { useIsMobile } from "@/common/styles/responsive";
import React from "react";
import ComputerProfileTabs from "./ComputerProfileTabs";
import MobileProfileTabs from "./MobileProfileTabs";
interface ProfileTabsProps {}

const ProfileTabs: React.FC<ProfileTabsProps> = ({}) => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <MobileProfileTabs /> : <ComputerProfileTabs />}</>;
};

export default ProfileTabs;
