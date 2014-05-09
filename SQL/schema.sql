CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--   Describe your table here.
-- );

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/





-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
-- contains all the messages sent
-- ---

DROP TABLE IF EXISTS `messages`;
		
CREATE TABLE `messages` (
  `ID` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(1000) NULL DEFAULT NULL,
  `userID` INTEGER(11) NOT NULL,
  `roomID` INTEGER(11) NOT NULL,
  PRIMARY KEY (`ID`)
) COMMENT 'contains all the messages sent';

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `ID` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
		
CREATE TABLE `rooms` (
  `ID` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (userID) REFERENCES `users` (`ID`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomID) REFERENCES `rooms` (`ID`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`ID`,`content`,`userID`,`roomID`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`ID`,`name`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`ID`,`name`) VALUES
-- ('','');
