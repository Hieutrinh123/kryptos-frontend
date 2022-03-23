import { useIsMobile } from "@/common/styles/responsive";
import React from "react";
import ComputerPersonalReview from "./ComputerPersonalReview";
import MobilePersonalReview from "./MobilePersonalReview";
interface PersonalReviewProps {}

const PersonalReview: React.FC<PersonalReviewProps> = ({}) => {
  const isMobile = useIsMobile();

  return (
    <>{isMobile ? <MobilePersonalReview /> : <ComputerPersonalReview />}</>
  );
};

export default PersonalReview;
