export enum UpdateType {
    /*
          Use when the updated data should be sent out and saved in the database.
      */
    SET = "set",
    /*
          Use when you receive data from the database.
      */
    SYNC = "sync",
  }