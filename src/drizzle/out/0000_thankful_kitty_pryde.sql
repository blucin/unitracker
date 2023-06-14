-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Account` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` text,
	`session_state` varchar(191));

CREATE TABLE `Attendance` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`timetableId` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`date` date NOT NULL);

CREATE TABLE `Holidays` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`date` datetime(3) NOT NULL,
	`holiday` varchar(191) NOT NULL,
	`isWeekend` tinyint NOT NULL DEFAULT 0);

CREATE TABLE `Session` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL);

CREATE TABLE `Subject` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`subjectName` varchar(191) NOT NULL,
	`subjectCode` varchar(191),
	`userId` varchar(191) NOT NULL,
	`hasLab` tinyint NOT NULL DEFAULT 0);

CREATE TABLE `TimeTable` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`subjectId` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`isLab` tinyint NOT NULL DEFAULT 0,
	`dayName` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
	`endTime` time NOT NULL,
	`startTime` time NOT NULL,
	`timetableName` varchar(191) NOT NULL);

CREATE TABLE `User` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` datetime(3),
	`image` varchar(191));

CREATE TABLE `VerificationToken` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) PRIMARY KEY NOT NULL,
	`expires` datetime(3) NOT NULL);

CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account` (`provider`,`providerAccountId`);
CREATE INDEX `Account_userId_idx` ON `Account` (`userId`);
CREATE UNIQUE INDEX `Attendance_timetableId_userId_date_key` ON `Attendance` (`timetableId`,`userId`,`date`);
CREATE INDEX `Attendance_timetableId_idx` ON `Attendance` (`timetableId`);
CREATE INDEX `Attendance_userId_idx` ON `Attendance` (`userId`);
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session` (`sessionToken`);
CREATE INDEX `Session_userId_idx` ON `Session` (`userId`);
CREATE UNIQUE INDEX `Subject_subjectName_subjectCode_key` ON `Subject` (`subjectName`,`subjectCode`);
CREATE INDEX `Subject_userId_idx` ON `Subject` (`userId`);
CREATE UNIQUE INDEX `TimeTable_subjectId_dayName_startTime_endTime_key` ON `TimeTable` (`subjectId`,`dayName`,`startTime`,`endTime`);
CREATE INDEX `TimeTable_subjectId_idx` ON `TimeTable` (`subjectId`);
CREATE INDEX `TimeTable_userId_idx` ON `TimeTable` (`userId`);
CREATE UNIQUE INDEX `User_email_key` ON `User` (`email`);
CREATE UNIQUE INDEX `VerificationToken_token_key` ON `VerificationToken` (`token`);
CREATE UNIQUE INDEX `VerificationToken_identifier_token_key` ON `VerificationToken` (`identifier`,`token`);
*/