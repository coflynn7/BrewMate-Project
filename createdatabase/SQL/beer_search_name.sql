########################
# This stored procedure looks up a beer by a text string. 
#  it will search with wildcards on both sides of the keyword. 
# A user can enter * to search for all beers. 
########################
drop procedure if exists beer_search_name;
delimiter $$
create procedure beer_search_name(IN beerName varchar(100))
begin
	if beerName = '*'
		THEN set beerName = '%';
	else
		set beerName = concat('%',beerName,'%');
	end if;
select beer.*, brewery.Name 'Brewery_name', brewery.state
from beer
	left outer join brewery
		on beer.brewery_id = brewery.brewery_id
where beer.name LIKE beerName limit 1;
end $$
delimiter ;
