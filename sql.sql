--query for mysql database

--create table user
CREATE TABLE user (
    id VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

--inser data into table user
INSERT INTO user (id, name, username, password) VALUES
('123', 'Roberth Arrieta Contreras', 'Roarco', 'Roarco16');