import Favorite from "public/images/favorite.png";
import Feeds from "public/images/feeds.png";
import People from "public/images/people.png";

interface interactiveItem {
  image: StaticImageData;
  title: string;
  numInteractive: string | number;
}
const interactiveGroup: interactiveItem[] = [
  {
    image: People,
    title: "Follower",
    numInteractive: 2000,
  },
  {
    image: Feeds,
    title: "Feeds",
    numInteractive: 2000,
  },
  {
    image: Favorite,
    title: "Favorite",
    numInteractive: 2000,
  },
];

export { interactiveGroup };
