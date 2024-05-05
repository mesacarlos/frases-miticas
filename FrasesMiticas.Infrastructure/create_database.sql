CREATE TABLE comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER,
	quote_id INTEGER,
	comment_date INTEGER,
	comment_text TEXT,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id)
);

CREATE TABLE "quotes" (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	quote_author TEXT,
	quote_date INTEGER,
	quote_text TEXT,
	quote_context TEXT
);

CREATE TABLE "quotes_users" (
	quote_id INTEGER,
	user_id INTEGER,
	PRIMARY KEY (quote_id, user_id),
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reactions (
	user_id INTEGER,
	quote_id INTEGER,
	reaction_type INTEGER,
	PRIMARY KEY (user_id, quote_id, reaction_type),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (quote_id) REFERENCES "quotes"(id)
);

CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT,
	email TEXT,
	password TEXT,
	full_name TEXT,
	is_superadmin INTEGER DEFAULT (0),
	profile_pic_url TEXT
);