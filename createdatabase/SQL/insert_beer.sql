########################
# This stored procedure inserts a beer into the database
#NOTE I should update this to validate params before storing.
# specifically i should make a new brewery entry if it doesn't exist
#TEST NAMES AND STUFF THAT OVERFLOW THE DATA TYPES
########################
drop procedure if exists insert_beer;
delimiter $$
create procedure insert_beer(IN beerName varchar(100), IN beerStyle varchar(100), IN beerABV varchar(10), IN brewery_id bigint)
begin
insert into beer (Name, style, abv, brewery_id)
values (beerName, beerStyle , beerABV, brewery_id);
end $$
delimiter ;
