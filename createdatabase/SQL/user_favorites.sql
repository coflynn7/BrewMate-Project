########################
# This stored procedure returns the favorites for a given user
#
########################
drop procedure if exists user_favorites;
delimiter $$
create procedure user_favorites(IN user varchar(25))
begin
select beer.beer_id, beer.Name, beer.style
from favoritebeers
	INNER JOIN beer
		on favoritebeers.beer_id = beer.beer_id
where favoritebeers.username = user;
end $$
delimiter ;
