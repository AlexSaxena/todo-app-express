use todo_db;

CREATE TABLE Users (  
 user_id INT NOT NULL AUTO_INCREMENT,  
 username varchar(100) not null,  
 password varchar(255) not null,  
 PRIMARY KEY ( user_id )  
);

CREATE TABLE Todos (  
todo_id INT NOT NULL AUTO_INCREMENT,  
user_id INT,  
todo varchar(255),  
completed BOOLEAN,  
PRIMARY KEY ( todo_id ),  
FOREIGN KEY (user_id) REFERENCES Users(user_id)  
);

CREATE TABLE Friends (  
friend_id INT NOT NULL AUTO_INCREMENT,  
user_id INT,  
friend_name varchar(100) not null,  
PRIMARY KEY ( friend_id ),  
FOREIGN KEY (user_id) REFERENCES Users(user_id)  
);

describe users;  
describe todos;  
describe friends;

select \* from users;  
select \* from todos;  
select \* from friends;
