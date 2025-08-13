########################
# This stored procedure looks up a beer by a text string. 
#  it will search with wildcards on both sides of the keyword. 
# A user can enter * to search for all beers. 
########################
drop procedure if exists brewery_search_name;
delimiter $$
create procedure brewery_search_name(IN brewName varchar(100))
begin
	if brewName = '*'
		THEN set brewName = '%';
	else
		set brewName = concat('%',beerName,'%');
	end if;
select brewery.brewery_id, brewery.Name, brewery.state, brewery.website
from brewery
where brewery.name LIKE brewName;
end $$
delimiter ;