export interface Notification {
  type: "post" | "author";
  title: string;
  description: string;
  thumbnail?: string;
  time: Date;
}

export function useNotifications(): Notification[] {
  return [
    {
      title: "Lorem ipsum dolor sit amet",
      type: "author",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: new Date("2001/02/22"),
    },
  ];
}
