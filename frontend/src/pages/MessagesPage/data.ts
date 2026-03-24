export const conversations = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=b6e3f4',
    lastMessage: 'Let me know what you think of the new PR!',
    time: '10:42 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    user: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=David&backgroundColor=c0aede',
    lastMessage: 'That solves the state issue perfectly. Thanks.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    user: 'Elena Gomez',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=ffdfbf',
    lastMessage: 'Are we still on for the system design sync tomorrow?',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
];

export const activeChatHistory = [
  {
    id: 1,
    sender: 'Sarah Chen',
    isMe: false,
    text: 'Hey Alex! Did you get a chance to look at the new authentication flow?',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'Me',
    isMe: true,
    text: 'Hey Sarah. Yes, I just pulled the branch. The JWT handling looks much cleaner now.',
    time: '10:35 AM',
  },
  {
    id: 3,
    sender: 'Me',
    isMe: true,
    text: 'I left a minor comment on the refresh token logic though. Check line 42 in auth.ts.',
    time: '10:35 AM',
  },
  {
    id: 4,
    sender: 'Sarah Chen',
    isMe: false,
    text: 'Ah good catch. I missed that edge case when the token is already expired but still in localStorage.',
    time: '10:40 AM',
  },
  {
    id: 5,
    sender: 'Sarah Chen',
    isMe: false,
    text: 'I just pushed a fix. Let me know what you think of the new PR!',
    time: '10:42 AM',
  },
];
