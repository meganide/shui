import { AsyncDatabase } from "promised-sqlite3";
import { db } from "../server.js";

async function createDbConnection() {
  const db = await AsyncDatabase.open("./db.sqlite");
  return db;
}

async function createTable() {
  console.log("Creating tables!")

  await db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(30) NOT NULL,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    Password VARCHAR(60) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Channel (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(30) NOT NULL,
    CreatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS Owner (
    ChannelId INTEGER,
    UserId INTEGER,
    PRIMARY KEY (ChannelId, UserId),
    FOREIGN KEY (ChannelId) REFERENCES Channel(Id),
    FOREIGN KEY (UserId) REFERENCES User(Id)
  );

  CREATE TABLE IF NOT EXISTS Subscription (
    ChannelId INTEGER,
    UserId INTEGER,
    PRIMARY KEY (ChannelId, UserId),
    FOREIGN KEY (ChannelId) REFERENCES Channel(Id),
    FOREIGN KEY (UserId) REFERENCES User(Id)
  );

  CREATE TABLE IF NOT EXISTS Message (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Text TEXT,
    CreatedAt TEXT,
    UpdatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS MessageToChannelToUser (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    ChannelId INTEGER,
    UserId INTEGER,
    MessageId INTEGER,
    FOREIGN KEY (ChannelId) REFERENCES Channel(Id),
    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (MessageId) REFERENCES Message(Id)
  );
  `);
}

export { createDbConnection, createTable };
