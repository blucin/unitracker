import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, index, varchar, text, int, date, tinyint, datetime, mysqlEnum, time } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("Account", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	provider: varchar("provider", { length: 191 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 191 }),
	scope: varchar("scope", { length: 191 }),
	idToken: text("id_token"),
	sessionState: varchar("session_state", { length: 191 }),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
		userIdIdx: index("Account_userId_idx").on(table.userId),
	}
});

export const attendance = mysqlTable("Attendance", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	timetableId: varchar("timetableId", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date("date", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		timetableIdUserIdDateKey: uniqueIndex("Attendance_timetableId_userId_date_key").on(table.timetableId, table.userId, table.date),
		timetableIdIdx: index("Attendance_timetableId_idx").on(table.timetableId),
		userIdIdx: index("Attendance_userId_idx").on(table.userId),
	}
});

export const holidays = mysqlTable("Holidays", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	holiday: varchar("holiday", { length: 191 }).notNull(),
	isWeekend: tinyint("isWeekend").default(0).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("endDate", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("startDate", { mode: 'string' }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		startDateEndDateHolidayKey: uniqueIndex("Holidays_startDate_endDate_holiday_key").on(table.startDate, table.endDate, table.holiday),
		userIdIdx: index("Holidays_userId_idx").on(table.userId),
	}
});

export const session = mysqlTable("Session", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
		userIdIdx: index("Session_userId_idx").on(table.userId),
	}
});

export const subject = mysqlTable("Subject", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	subjectName: varchar("subjectName", { length: 191 }).notNull(),
	subjectCode: varchar("subjectCode", { length: 191 }),
	userId: varchar("userId", { length: 191 }).notNull(),
	hasLab: tinyint("hasLab").default(0).notNull(),
},
(table) => {
	return {
		subjectNameSubjectCodeKey: uniqueIndex("Subject_subjectName_subjectCode_key").on(table.subjectName, table.subjectCode),
		userIdIdx: index("Subject_userId_idx").on(table.userId),
	}
});

export const timeTable = mysqlTable("TimeTable", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	subjectId: varchar("subjectId", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	isLab: tinyint("isLab").default(0).notNull(),
	dayName: mysqlEnum("dayName", ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']).notNull(),
	endTime: time("endTime").notNull(),
	startTime: time("startTime").notNull(),
	timetableName: varchar("timetableName", { length: 191 }).notNull(),
},
(table) => {
	return {
		subjectIdDayNameStartTimeEndTimeKey: uniqueIndex("TimeTable_subjectId_dayName_startTime_endTime_key").on(table.subjectId, table.dayName, table.startTime, table.endTime),
		subjectIdIdx: index("TimeTable_subjectId_idx").on(table.subjectId),
		userIdIdx: index("TimeTable_userId_idx").on(table.userId),
	}
});

export const user = mysqlTable("User", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }),
	emailVerified: datetime("emailVerified", { mode: 'string', fsp: 3 }),
	image: varchar("image", { length: 191 }),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const verificationToken = mysqlTable("VerificationToken", {
	identifier: varchar("identifier", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).primaryKey().notNull(),
	expires: datetime("expires", { mode: 'string', fsp: 3 }).notNull(),
},
(table) => {
	return {
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(table.identifier, table.token),
	}
});