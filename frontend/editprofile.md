# Adding Custom Avatars

You can easily swap out the predefined avatars in the DevShare application with your own custom images. The avatars are used during the initial Onboarding flow, as well as on the Edit Profile page.

## Where to Edit

The list of avatar URLs is defined in an array called `PREDEFINED_AVATARS` at the top of two different files in the frontend directory:

1. **Onboarding Page:** `src/pages/OnboardingPage/index.tsx`
2. **Edit Profile Page:** `src/pages/EditProfilePage/index.tsx`

If you open those files, you will see an array that looks like this:

```tsx
const PREDEFINED_AVATARS = [
  'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  // ... etc
];
```

## How to Add Your Own

1. Host your desired avatar image publicly (e.g., using Imgur, AWS S3, GitHub, or any other image hosting service).
2. Get the direct URL to the image (it should usually end in `.png`, `.jpg`, etc., though APIs like Dicebear return SVGs).
3. Open both `index.tsx` files mentioned above.
4. Replace one of the existing links inside the `PREDEFINED_AVATARS` array with your new string URL, or just add a new item to the array.

### Best Practices
- **Square Aspect Ratio:** For the best visual results, crop your images so they are perfectly square before uploading them. The CSS will turn the square into a circle (`rounded-full`).
- **File Size:** Keep avatar file sizes relatively small to ensure the page loads quickly when rendering the avatar selection grid.
