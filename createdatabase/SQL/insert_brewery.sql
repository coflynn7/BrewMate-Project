########################
# This stored procedure inserts a brewery into the database
#NOTE I should update this to validate params before storing.
# specifically i should make a new brewery entry if it doesn't exist
#TEST NAMES AND STUFF THAT OVERFLOW THE DATA TYPES
########################
drop procedure if exists insert_brewery;
delimiter $$
create procedure insert_brewery(IN Name varchar(100), IN state varchar(20), IN website varchar(300), IN type varchar(50), in address varchar(300), IN numLocations int)
begin
declare brew_exists INT;
SELECT count(*) into brew_exists
FROM brewery
Where name = brewery.Name 
	AND brewery.state = state
    AND brewery.website = website
    AND brewery.type = type
    AND brewery.address = address
    AND brewery.numLocations = numLocations;
IF brew_exists = 0 THEN 
	insert into brewery (Name, state, website, type, address, numLocations)
	values (Name, state, website, type, address, numLocations);
ELSE
	select 'already exists';
END IF;
end $$
delimiter ;
