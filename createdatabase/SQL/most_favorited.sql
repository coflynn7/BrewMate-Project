########################
# This stored procedure returns the most favorited beers
#
########################
drop procedure if exists most_favorited;
delimiter $$
create procedure most_favorited()
begin
select count(*) 'count', beer.Name, beer.Name, beer.style
from favoritebeers
	INNER JOIN beer
		on favoritebeers.beer_id = beer.beer_id
group by favoritebeers.beer_id;
end $$
delimiter ;
