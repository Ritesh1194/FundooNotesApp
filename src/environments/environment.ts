// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://localhost:9050/',
  registerUrl: 'users/registration/',
  loginUrl: 'users/login/',
  forgotpasswordUrl: 'users/forgotpassword/',
  resetPaswordUrl: 'users/update/{token}/',
  getUsersUrl: 'users/getusers/',
  notesApiUrl: 'http://localhost:9050',
  notesCreateUrl: 'notes/create',
  notesUpdateUrl: 'notes/update',
  notesDeleteUrl: 'notes/delete/{id}',
  getAllNotesUrl: 'notes/fetchNote',
  pinNotesUrl: 'notes/pin/{id}',
  unPinnedUrl: 'notes/pin/{id}',
  addReminderUrl: 'notes/addreminder/{token}',
  archiveUrl: 'notes/archieve/{id}',
  unArchiveUrl: 'notes/archieve/{id}',
  getTrashedUrl: 'trashed/{noteId}',
  addColorUrl: 'notes/addColor'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
