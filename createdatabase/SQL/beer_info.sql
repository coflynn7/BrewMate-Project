########################
# This stored procedure returns information about a beer
#
########################
drop procedure if exists beer_info;
delimiter $$
create procedure beer_info(IN beer bigint)
begin
select beer.*, brewery.Name 'Brewery_name', brewery.state
from beer
	left outer join brewery
		on beer.brewery_id = brewery.brewery_id
where beer.beer_id = beer;
end $$
delimiter ;
