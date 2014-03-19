CREATE TABLE SmallGoals (
	GSID INT NOT NULL AUTO_INCREMENT,
	Description VARCHAR(256),
	Deadline DATE,
	PRIMARY KEY (GSID),
	FOREIGN KEY (Gid)
		REFERENCES Group(Gid)
);