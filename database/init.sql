CREATE DATABASE IF NOT EXISTS maindb;
USE maindb;
CREATE TABLE IF NOT EXISTS Users (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    userpassword VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL UNIQUE,
    age INT NOT NULL,
    height INT NOT NULL
);
CREATE TABLE IF NOT EXISTS Methods (
    methodID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    methodName VARCHAR(20) NOT NULL,
    methodDesc TEXT
);
CREATE TABLE IF NOT EXISTS Weights (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    added_date DATE NOT NULL DEFAULT NOW(),
    amount INT NOT NULL,
    userID INT NOT NULL,
    methodID INT DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (methodID) REFERENCES Methods(methodID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS HeartBeat (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    added_date DATE NOT NULL DEFAULT NOW(),
    amount INT NOT NULL,
    userID INT NOT NULL,
    methodID INT DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (methodID) REFERENCES Methods(methodID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Steps (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    added_date DATE NOT NULL DEFAULT NOW(),
    amount INT NOT NULL,
    userID INT NOT NULL,
    methodID INT DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (methodID) REFERENCES Methods(methodID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Advertisement (
    id INT NOT NULL,
    imageSrc VARCHAR(2083),
    linkTo VARCHAR(2083),
    clickCounter INT DEFAULT NULL
);
INSERT INTO Users (username, userpassword, email, age, height)
VALUES ('miro', 'pele', 'miro@pele.sk', '20', '183'),
    ('anton', 'ferko', 'anton@ferko.sk', '35', '201'),
    ('admin', 'admin', 'admin@admin.sk', '60', '100');
INSERT INTO Methods (methodName, methodDesc)
VALUES (
        'Running',
        'Running at moderate speed for 20 mins'
    ),
    (
        'Cycling',
        'Cycling on road bike for at least 40km'
    ),
    ('Weight lifting', 'Working out for one hour');
INSERT INTO Advertisement (id, imageSrc, linkTo, clickCounter)
VALUES (
        1,
        'https://media.makeameme.org/created/youve-got-mail-5944f8.jpg',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        0
    );