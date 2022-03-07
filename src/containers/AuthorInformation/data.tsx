import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
interface interactiveItem {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  title: string;
  numInteractive: string | number;
}
const interactiveGroup: interactiveItem[] = [
  {
    icon: PeopleAltOutlinedIcon,
    title: 'Follower',
    numInteractive: 2000,
  },
  {
    icon: DynamicFeedOutlinedIcon,
    title: 'Feeds',
    numInteractive: 2000,
  },
  {
    icon: FavoriteBorderOutlinedIcon,
    title: 'Favorite',
    numInteractive: 2000,
  },
];

export { interactiveGroup };
