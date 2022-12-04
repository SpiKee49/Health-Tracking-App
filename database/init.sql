CREATE DATABASE IF NOT EXISTS maindb;
USE maindb;
CREATE TABLE IF NOT EXISTS Users (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    userpassword VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL UNIQUE,
    weight FLOAT NOT NULL,
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
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (methodID) REFERENCES Methods(methodID)
);
CREATE TABLE IF NOT EXISTS HeartBeat (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    added_date DATE NOT NULL DEFAULT NOW(),
    amount INT NOT NULL,
    userID INT NOT NULL,
    methodID INT DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (methodID) REFERENCES Methods(methodID)
);
CREATE TABLE IF NOT EXISTS Steps (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    added_date DATE NOT NULL DEFAULT NOW(),
    amount INT NOT NULL,
    userID INT NOT NULL,
    methodID INT DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (methodID) REFERENCES Methods(methodID)
);
INSERT INTO Users (username, userpassword, email, weight, height)
VALUES ('miro', 'pele', 'miro@pele.sk', '95.3', '183'),
    ('anton', 'ferko', 'anton@ferko.sk', '75', '201'),
    ('admin', 'admin', 'admin@admin.sk', '100', '100');
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