DROP DATABASE IF EXISTS beermate;

CREATE DATABASE BEERMATE;
USE BEERMATE;

DROP TABLE IF EXISTS BREWERY;

CREATE TABLE BREWERY (
	brewery_id BIGINT NOT NULL auto_increment,
    name varchar(100),
    state varchar(20),
    website varchar(300),
    type varchar(50),
	address varchar(300),
    numLocations int,
    PRIMARY KEY (brewery_id)
    );
	
DROP TABLE IF EXISTS BEER;

CREATE TABLE BEER (
	beer_id BIGINT NOT NULL auto_increment,
    Name varchar(100),
    style varchar(100),
    abv varchar(10),
    brewery_id BIGINT,
    FOREIGN KEY (brewery_id) REFERENCES BREWERY(brewery_id) ON delete CASCADE,
	PRIMARY KEY (beer_id)
    );
    
DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
	username varchar(25),
    password varchar(30),
    PRIMARY KEY (username)
    );
    
DROP TABLE IF EXISTS REVIEWS;

CREATE TABLE REVIEWS (
	review_id bigint NOT NULL auto_increment,
    username varchar(25),
    beer_id bigint,
    review_date datetime,
    overall_score int,
    palette_score int,
    aroma_score int,
    appearance_score int,
    taste_score int,
    primary key (review_id),
    foreign key (beer_id) references beer(beer_id) ON DELETE CASCADE,
    foreign key (username) references users(username) ON DELETE cascade
    );
    
DROP TABLE IF EXISTS FAVORITEBEERS;

CREATE TABLE FAVORITEBEERS (
	beer_id bigint,
    username varchar(25),
    PRIMARY KEY (beer_id, username),
    FOREIGN KEY (beer_id) REFERENCES BEER(beer_id) ON DELETE cascade,
    FOREIGN KEY (username) REFERENCES USERS(username) ON delete cascade
    );