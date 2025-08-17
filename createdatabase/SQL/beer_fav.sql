########################
# This stored procedure returns how often a beer is favorited
#
########################
drop procedure if exists beer_fav;
delimiter $$
create procedure beer_fav(IN beer bigint)
begin
select count(*) 'count', max(beer.beer_id) 'beer_id', max(beer.Name) 'Name', max(beer.style) 'style'
from favoritebeers
	INNER JOIN beer
		on favoritebeers.beer_id = beer.beer_id
where favoritebeers.beer_id = beer
group by favoritebeers.beer_id;
end $$
delimiter ;
