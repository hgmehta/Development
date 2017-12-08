CREATE TABLE users
(
	emailId VARCHAR(60) NOT NULL UNIQUE,
	userName VARCHAR(15) NOT NULL PRIMARY KEY,
	firstName VARCHAR(15) NOT NULL,
	lastName VARCHAR(15) NOT NULL,
	[password] VARCHAR(35) NOT NULL,
	isActive bit NOT NULL DEFAULT 0,
	isDelete bit NOT NULL DEFAULT 0
)

SELECT isActive FROM users WHERE userName = 'harshmehta';
UPDATE users SET isActive = 1 WHERE username = 'harshmehta';

SELECT * FROM users;
DELETE FROM users;
CREATE PROCEDURE registerUser
(
	@emailId VARCHAR(60),
	@username VARCHAR(15),
	@firstName VARCHAR(15),
	@lastName VARCHAR(15),
	@password VARCHAR(35)
)
AS  INSERT INTO users(emailId, userName, firstName, lastName, [password]) 
	VALUES(@emailId, @username, @firstName, @lastName, @password)
	RETURN