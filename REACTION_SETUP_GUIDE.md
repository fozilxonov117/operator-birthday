# Reaction System Setup Guide

## ✅ Current Status: Working with Mock API

The reaction system is now **fully functional** using a local mock API that stores data in localStorage. You can use the app right now and see reactions working!

## 🎯 What's Working Now

- ✅ 5 reaction types (Like, Love, Celebrate, Clap, Fire)
- ✅ Click to add/change reactions
- ✅ Click same reaction to remove it
- ✅ One reaction per device per employee
- ✅ Real-time counts and visual feedback
- ✅ Data persists in browser localStorage
- ✅ Works across page refreshes

## 🚀 How to Test Right Now

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the app in your browser**

3. **Click on a month to see birthdays**

4. **Sidebar will open showing today's birthday cards**

5. **At the bottom of each card, you'll see 5 reaction buttons**

6. **Click any reaction to add it** - you'll see:
   - Button highlights with color
   - Count increases by 1
   - Your selection is saved

7. **Click same reaction again to remove it**

8. **Open in different browser/incognito** to test multiple users

## 📁 Files Created

### Environment Configuration
- `.env` - Contains API URL (currently set to localhost:3001)

### Mock API (Currently Active)
- `src/shared/api/mockReactionApi.ts` - Local storage-based API simulation

### Real API (Ready for Backend)
- `src/shared/api/reactionApi.ts` - Ready to connect to your backend
- `API_DOCUMENTATION.md` - Complete backend API specification

### Feature Components
- `src/features/reactions/config.ts` - Reaction types and UI config
- `src/features/reactions/ui/ReactionButton.tsx` - Individual reaction button
- `src/features/reactions/ui/ReactionList.tsx` - Complete reaction system
- `src/features/reactions/index.ts` - Feature exports

### Utilities
- `src/shared/lib/deviceId.ts` - Device ID generation (uses nanoid)

## 🔄 Switching to Real Backend API

When your backend is ready:

### Step 1: Update the import in `ReactionList.tsx`

**Current (Mock API):**
```typescript
import {
  getReactionStats,
  addReaction,
  updateReaction,
  removeReaction,
} from '../../../shared/api/mockReactionApi.ts';
```

**Change to (Real API):**
```typescript
import {
  getReactionStats,
  addReaction,
  updateReaction,
  removeReaction,
} from '../../../shared/api/reactionApi.ts';
```

### Step 2: Update `.env` with your backend URL

```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Step 3: Restart the dev server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 🔧 Backend Requirements

Your backend needs to implement these 6 endpoints (see `API_DOCUMENTATION.md` for details):

1. `GET /reactions/:employeeId/stats` - Get reaction stats
2. `POST /reactions` - Add new reaction
3. `PUT /reactions/:employeeId` - Update existing reaction
4. `DELETE /reactions/:employeeId` - Remove reaction
5. `GET /reactions/:employeeId` - Get all reactions (optional)
6. `POST /reactions/stats/bulk` - Bulk stats (optional optimization)

### Database Schema Example

```sql
CREATE TABLE reactions (
  id VARCHAR(255) PRIMARY KEY,
  employee_id VARCHAR(255) NOT NULL,
  device_id VARCHAR(255) NOT NULL,
  reaction_type ENUM('like', 'love', 'celebrate', 'clap', 'fire') NOT NULL,
  timestamp BIGINT NOT NULL,
  UNIQUE KEY unique_device_employee (device_id, employee_id),
  INDEX idx_employee (employee_id)
);
```

## 🧪 Testing the Mock API

The mock API stores data in localStorage under the key `birthday-reactions`.

**To view stored data (in browser console):**
```javascript
JSON.parse(localStorage.getItem('birthday-reactions'))
```

**To clear all reactions (for testing):**
```javascript
localStorage.removeItem('birthday-reactions')
```

**To reset device ID (simulate new user):**
```javascript
localStorage.removeItem('birthday-app-device-id')
```

## 🎨 Customization

### Change Reaction Types

Edit `src/features/reactions/config.ts`:

```typescript
export const REACTION_CONFIG = {
  like: { icon: ThumbUpIcon, label: 'Like', color: '#2196f3' },
  // Add or modify reactions here
};
```

### Change Colors

Update the `color` property in `REACTION_CONFIG`:

```typescript
like: { 
  icon: ThumbUpIcon, 
  label: 'Like', 
  color: '#YOUR_COLOR' // Change this
}
```

## 📊 Data Flow

```
User clicks reaction button
       ↓
ReactionList handles click
       ↓
Checks if user already reacted
       ↓
Calls appropriate API function (add/update/remove)
       ↓
Mock API updates localStorage
       ↓
ReactionList reloads stats
       ↓
UI updates with new counts and selection
```

## 🐛 Troubleshooting

**Reactions not showing?**
- Check browser console for errors
- Verify `ReactionList` is imported in `BirthdayCard.tsx`
- Clear localStorage and refresh

**Counts not updating?**
- Open browser DevTools → Application → Local Storage
- Check if `birthday-reactions` key exists
- Verify data is being saved

**"Module not found" errors?**
- Make sure all files have `.ts` extension in imports
- Restart the dev server
- Clear node_modules cache: `rm -rf node_modules && npm install`

## 💡 Next Steps

1. ✅ **Test the mock API** - Add reactions and verify they work
2. 🔨 **Build your backend** - Use the API documentation
3. 🔄 **Switch to real API** - Change the import in ReactionList.tsx
4. 🚀 **Deploy** - Your reaction system is production-ready!

---

**Need help?** Check the API_DOCUMENTATION.md file for complete backend specifications.
