create database pearoneProc;

use pearoneProc;

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameUsers NVARCHAR(100) NOT NULL,
    surnameUsers NVARCHAR(100) NOT NULL,
    emailUsers NVARCHAR(255) UNIQUE NOT NULL,
    passwordUsers NVARCHAR(255) NOT NULL,
    passwordConfirm NVARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);

INSERT INTO Users (nameUsers, surnameUsers, emailUsers, passwordUsers, passwordConfirm)
VALUES ('Andres Camilo', 'Rodriguez Lopez', 'arodriguez@cesde.net', 'Temporal10.', 'Temporal10.');
