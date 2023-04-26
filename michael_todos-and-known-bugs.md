# To Do's & Known Bugs

## UserProfile

### To Do:
- Password change functionality
- Refine CSS styling

### Known Bugs:
  - Occasionally/rarely, changes to user's info will not be saved correctly. Changes will appear to have been saved, but if you navigate to home page and navigate back to profile, the "saved" changes will have been discarded. When console logging the axios request, nothing comes back from server, as if the request was never made. 

  - Set up error handler for changing email to one that is already registered. When changed to an already registered email, it appears to save, but when page is reloaded it reverts back to previous email.

  - The first time I tried saving an empty field for bio, it did not save.

