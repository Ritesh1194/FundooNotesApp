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
  usersVerifyUrl: 'users/verify',
  getUsersUrl: 'users/getusers',
  notesApiUrl: 'http://localhost:9050',
  notesCreateUrl: 'notes/create',
  notesUpdateUrl: 'notes/update',
  notesDeleteUrl: 'notes/delete',
  getAllNotesUrl: 'notes/fetchNote',
  pinNotesUrl: 'notes/pin',
  addReminderUrl: 'notes/addreminder',
  archiveUrl: 'notes/archieve',
  getTrashedUrl: 'notes/trashed',
  restoreNotesUrl: 'notes/restore',
  addColorUrl: 'notes/addColor',
  getAllPinnedNotesUrl: 'notes/fetchpinnednote',
  getAllArchiveNotesUrl: 'notes/fetcharchivenote',
  getAllTrashedNotesUrl: 'notes/fetchTrashedNote',

  labelApiUrrl: 'http://localhost:9050',
  createLabelUrl: 'label/create',
  addLabelUrl: 'label/addlabel',
  createAndMapUrl: 'label/createandmap',

  collaboratorUrl: 'http://localhost:9050',
  addCollaboratorUrl: 'collaborator/addCollab',
  getCollabaratorUrl: 'collaborator/fetchColabNote'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
