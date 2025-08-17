########################
# This stored procedure returns information about a beer
#
########################
drop procedure if exists beer_info;
delimiter $$
create procedure beer_info(IN beer bigint)
begin
select beer.*, subq.count 'fav_count', brewery.Name 'Brewery_name', brewery.state 'state'
from beer
	left outer join brewery
		on beer.brewery_id = brewery.brewery_id
	left outer join (select max(beer.beer_id) 'beer_id', count(*) 'count'
						from favoritebeers
							INNER JOIN beer
								on favoritebeers.beer_id = beer.beer_id
						where favoritebeers.beer_id = beer
						group by favoritebeers.beer_id) subq
		on beer.beer_id = subq.beer_id
where beer.beer_id = beer;
end $$
delimiter ;
