########################
# This stored procedure inserts a beer into the database
#NOTE I should update this to validate params before storing.
# specifically i should make a new brewery entry if it doesn't exist
#TEST NAMES AND STUFF THAT OVERFLOW THE DATA TYPES
########################
drop procedure if exists insert_beer;
delimiter $$
create procedure insert_beer(IN beerName varchar(100), IN beerStyle varchar(100), IN beerABV varchar(10), IN breweryid bigint)
begin
declare beer_exists INT;
SELECT count(*) into beer_exists
FROM beer
Where name = beerName 
	AND style = beerStyle
    AND abv = beerABV
    AND brewery_id = brewery_id;
IF beer_exists = 0 THEN 
	insert into beer (Name, style, abv, brewery_id)
	values (beerName, beerStyle , beerABV, breweryid);
ELSE
	select 'already exists';
END IF;
end $$
delimiter ;
