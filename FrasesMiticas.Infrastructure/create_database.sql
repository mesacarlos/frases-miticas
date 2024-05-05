CREATE TABLE "users" (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT,
	email TEXT,
	password TEXT,
	full_name TEXT,
	is_superadmin INTEGER DEFAULT (0),
	profile_pic_url TEXT
);

CREATE TABLE "quotes" (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	quote_author TEXT,
	quote_date INTEGER,
	quote_text TEXT,
	quote_context TEXT
);

CREATE TABLE "comments" (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER,
	quote_id INTEGER,
	comment_date INTEGER,
	comment_text TEXT,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id) ON DELETE CASCADE
);

CREATE TABLE "quotes_users" (
	quote_id INTEGER,
	user_id INTEGER,
	PRIMARY KEY (quote_id, user_id),
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE "reactions" (
	user_id INTEGER,
	quote_id INTEGER,
	reaction_type INTEGER,
	PRIMARY KEY (user_id, quote_id, reaction_type),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id) ON DELETE CASCADE
);

